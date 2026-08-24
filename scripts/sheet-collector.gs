/**
 * Oppurtunity — form collector (Google Apps Script)
 *
 * ONE script, ONE spreadsheet, ONE web-app URL, TWO tabs:
 *
 *    Waitlist  ← "Claim early Access" (every WaitlistCTA on the site)
 *    Projects  ← "Post a project · Free" (the /post-a-project form)
 *
 * The site posts JSON to the same /exec URL for both. This script reads the
 * `source` field and files the row in the right tab, so you never have to
 * manage a second deployment. No server, no database, no cost. Both tabs
 * export straight to .xlsx / .csv.
 *
 * ── FIRST-TIME SETUP (about 5 minutes) ─────────────────────────────────
 *  1. Create a Google Sheet. The tabs are created for you in step 3.
 *  2. Extensions → Apps Script. Delete the placeholder, paste this whole
 *     file, and save (Ctrl+S).
 *  3. Pick `setupHeaders` in the function dropdown → Run. Approve the
 *     permission prompt ("This app isn't verified" → Advanced → Go to …).
 *     You are approving your own script; it only touches this sheet.
 *  4. Deploy → New deployment → gear icon → Web app.
 *        Description:     oppurtunity forms
 *        Execute as:      Me
 *        Who has access:  Anyone      ← NOT "Anyone with a Google account",
 *                                       that would force visitors to sign in
 *  5. Copy the Web app URL it gives you (ends in /exec) into .env:
 *        VITE_WAITLIST_ENDPOINT="https://script.google.com/macros/s/AKfy.../exec"
 *     Leave VITE_PROJECT_ENDPOINT blank — the project form falls back to the
 *     same URL, which is exactly what you want with this script.
 *     Then restart `npm run dev` — Vite only reads .env at startup.
 *
 * ── UPGRADING AN EXISTING WAITLIST-ONLY DEPLOYMENT ─────────────────────
 *  Already running the older waitlist-only script? Your Waitlist tab and its
 *  rows are untouched. Do this:
 *    1. Extensions → Apps Script, select all the old code, delete, paste this
 *       file, save.
 *    2. Run `setupHeaders` once. It adds the Projects tab and leaves the
 *       Waitlist tab exactly as it is.
 *    3. Deploy → Manage deployments → pencil (edit) icon →
 *       Version: New version → Deploy.
 *       ⚠️  Use "Manage deployments", NOT "New deployment". A new deployment
 *           hands you a DIFFERENT URL and your .env would stop matching.
 *    4. Nothing to change in .env. Same URL, now serving both forms.
 *
 * ── VERIFY BEFORE TOUCHING THE FRONTEND ────────────────────────────────
 *  Paste the /exec URL into a browser tab. You should see:
 *      {"ok":true,"service":"oppurtunity-collector","tabs":["Waitlist","Projects"]}
 *  If "tabs" is missing, the deployment is still running the old code —
 *  redo the "New version → Deploy" step above.
 *
 * ── IF YOU EDIT THIS FILE LATER ────────────────────────────────────────
 *  Saving is NOT enough. Deploy → Manage deployments → pencil icon →
 *  Version: New version → Deploy. Otherwise the URL keeps running old code.
 */

var WAITLIST_SHEET = "Waitlist";
var WAITLIST_HEADERS = [
  "Received At",
  "Email",
  "Source",
  "Submitted At (client)",
  "User Agent",
];

var PROJECT_SHEET = "Projects";
var PROJECT_HEADERS = [
  "Received At",
  "Status",
  "Salesforce Product",
  "Budget Range",
  "Timeline",
  "Project Title",
  "Description",
  "Work Email",
  "Phone",
  "Submitted At (client)",
  "User Agent",
];

/* Column widths worth setting, per tab: [column number, pixels]. */
var WAITLIST_WIDTHS = [[2, 260]];
var PROJECT_WIDTHS = [
  [3, 150],
  [4, 140],
  [5, 130],
  [6, 300],
  [7, 460],
  [8, 240],
  [9, 150],
];

/**
 * Run this once from the editor. Safe to run again at any time — it only
 * creates what is missing and never touches rows you already have.
 */
function setupHeaders() {
  ensureSheet_(WAITLIST_SHEET, WAITLIST_HEADERS, WAITLIST_WIDTHS);
  ensureSheet_(PROJECT_SHEET, PROJECT_HEADERS, PROJECT_WIDTHS);
  return "ok";
}

function ensureSheet_(name, headers, widths) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    for (var i = 0; i < widths.length; i++) {
      sheet.setColumnWidth(widths[i][0], widths[i][1]);
    }
  }
  return sheet;
}

/** Receives the POST from the site — both forms arrive here. */
function doPost(e) {
  // A lock stops two simultaneous submissions writing to the same row.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (err) {
    return json_({ ok: false, error: "busy" });
  }

  try {
    var body = {};
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }

    var email = String(body.email || "")
      .trim()
      .toLowerCase();
    if (!email || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      return json_({ ok: false, error: "invalid-email" });
    }

    // The project form is the only thing that sends this source.
    return String(body.source || "") === "post-project"
      ? saveProject_(body, email)
      : saveWaitlist_(body, email);
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function saveWaitlist_(body, email) {
  var sheet = ensureSheet_(WAITLIST_SHEET, WAITLIST_HEADERS, WAITLIST_WIDTHS);

  // Skip duplicates so one person refreshing doesn't fill the sheet.
  if (sheet.getLastRow() > 1) {
    var existing = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
    for (var i = 0; i < existing.length; i++) {
      if (String(existing[i][0]).trim().toLowerCase() === email) {
        return json_({ ok: true, duplicate: true });
      }
    }
  }

  sheet.appendRow([
    new Date(),
    email,
    String(body.source || ""),
    String(body.submittedAt || ""),
    String(body.userAgent || "").slice(0, 300),
  ]);

  return json_({ ok: true });
}

function saveProject_(body, email) {
  var sheet = ensureSheet_(PROJECT_SHEET, PROJECT_HEADERS, PROJECT_WIDTHS);
  var title = String(body.title || "").trim();

  /*
   * One company may legitimately post many projects, so we do NOT dedupe on
   * the address alone the way the waitlist does. This only catches the same
   * project being sent twice — a double-click or a refresh-and-resubmit.
   */
  if (sheet.getLastRow() > 1) {
    var rows = sheet.getRange(2, 6, sheet.getLastRow() - 1, 3).getValues();
    for (var i = 0; i < rows.length; i++) {
      var sameTitle = String(rows[i][0]).trim().toLowerCase() === title.toLowerCase();
      var sameEmail = String(rows[i][2]).trim().toLowerCase() === email;
      if (sameTitle && sameEmail) {
        return json_({ ok: true, duplicate: true });
      }
    }
  }

  sheet.appendRow([
    new Date(),
    "New", // Status — move to Verified / Rejected as your team works the list
    String(body.product || ""),
    String(body.budget || ""),
    String(body.timeline || ""),
    title,
    String(body.description || ""),
    email,
    String(body.phone || ""),
    String(body.submittedAt || ""),
    String(body.userAgent || "").slice(0, 300),
  ]);

  return json_({ ok: true });
}

/** Lets you confirm the deployment is live by opening the /exec URL. */
function doGet() {
  return json_({
    ok: true,
    service: "oppurtunity-collector",
    tabs: [WAITLIST_SHEET, PROJECT_SHEET],
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
