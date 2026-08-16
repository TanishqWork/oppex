/**
 * Oppurtunity — waitlist collector (Google Apps Script)
 *
 * Appends every waitlist signup as a row in a Google Sheet. No server, no
 * database, no cost. The sheet exports straight to .xlsx / .csv.
 *
 * ── SETUP (about 5 minutes) ────────────────────────────────────────────
 *  1. Create a Google Sheet. Name the first tab exactly:  Waitlist
 *     (if you skip this, the script creates the tab on first submission)
 *  2. Extensions → Apps Script. Delete the placeholder, paste this whole file,
 *     and save.
 *  3. Pick `setupHeaders` in the function dropdown → Run. Approve the
 *     permission prompt ("This app isn't verified" → Advanced → Go to …).
 *     You are approving your own script; it only touches this sheet.
 *  4. Deploy → New deployment → gear icon → Web app.
 *        Description:     waitlist
 *        Execute as:      Me
 *        Who has access:  Anyone      ← NOT "Anyone with a Google account",
 *                                       that would force visitors to sign in
 *  5. Copy the Web app URL it gives you (ends in /exec) into .env:
 *        VITE_WAITLIST_ENDPOINT="https://script.google.com/macros/s/AKfy.../exec"
 *     Then restart `npm run dev` — Vite only reads .env at startup.
 *
 * ── VERIFY BEFORE TOUCHING THE FRONTEND ────────────────────────────────
 *  Paste the /exec URL into a browser tab. You should see:
 *      {"ok":true,"service":"oppurtunity-waitlist"}
 *  If you see that, the deployment is live and any later problem is in the
 *  frontend, not here.
 *
 * ── IF YOU EDIT THIS FILE LATER ────────────────────────────────────────
 *  Saving is NOT enough. Deploy → Manage deployments → pencil icon →
 *  Version: New version → Deploy. Otherwise the URL keeps running old code.
 */

var SHEET_NAME = "Waitlist";
var HEADERS = ["Received At", "Email", "Source", "Submitted At (client)", "User Agent"];

/** Run this once from the editor to create and freeze the header row. */
function setupHeaders() {
  var sheet = getSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(2, 260);
  }
  return "ok";
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

/** Receives the POST from the site. */
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

    var email = String(body.email || "").trim().toLowerCase();
    if (!email || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      return json_({ ok: false, error: "invalid-email" });
    }

    var sheet = getSheet_();
    if (sheet.getLastRow() === 0) setupHeaders();

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
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Lets you confirm the deployment is live by opening the /exec URL. */
function doGet() {
  return json_({ ok: true, service: "oppurtunity-waitlist" });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
