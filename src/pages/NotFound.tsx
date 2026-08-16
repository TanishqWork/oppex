import { Link, isRouteErrorResponse, useRouteError } from "react-router";

import { ArrowRight } from "../components/icons";

/* Serves both the no-match route and the router's errorElement. */
export default function NotFound() {
  const error = useRouteError();

  let code = "404";
  let title = "This page hasn't been posted yet.";
  let body = "The link may be out of date, or the page may not exist any more.";

  if (error) {
    if (isRouteErrorResponse(error)) {
      code = String(error.status);
      if (error.status !== 404) {
        title = "Something went wrong.";
        body =
          error.statusText ||
          "An unexpected error occurred while loading this page.";
      }
    } else {
      code = "500";
      title = "Something went wrong.";
      body = "An unexpected error occurred while loading this page.";
    }
  }

  return (
    <section className="grid min-h-[70vh] place-items-center bg-page px-6 py-32">
      <div className="w-full max-w-[640px] text-center">
        <span className="inline-block rounded-md bg-brand/10 px-3 py-2 text-[12px] text-brand">
          Error {code}
        </span>

        <h1 className="display mt-9 text-[clamp(36px,5vw,66px)] text-ink">
          {title}
        </h1>

        <p className="mt-8 font-body text-[18px] leading-[1.55] font-light text-brand">
          {body}
        </p>

        <Link
          to="/"
          className="mt-12 inline-flex h-11 items-center gap-3 rounded-xl bg-brand px-6 font-display text-[16px] text-white transition-transform hover:-translate-y-px"
        >
          Back to home
          <ArrowRight className="size-[18px]" />
        </Link>
      </div>
    </section>
  );
}
