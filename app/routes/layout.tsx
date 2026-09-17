import { Outlet } from "react-router";
import { Header } from "~/components/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container mx-auto mb-12 w-full px-4 pt-16 md:px-12 md:pt-0">
        <Outlet />
      </main>
    </>
  );
}
