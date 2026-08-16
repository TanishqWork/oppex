import { Outlet, ScrollRestoration } from "react-router";

import Footer from "../components/Footer";
import Nav from "../components/Nav";

/* Chrome shared by every route. New pages render into <Outlet /> and get
   the nav and footer for free. */
export default function RootLayout() {
  return (
    <div className="min-h-screen bg-page">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* Jump to the top on navigation, but honour #section links. */}
      <ScrollRestoration
        getKey={(location) =>
          location.hash ? location.key : location.pathname
        }
      />
    </div>
  );
}
