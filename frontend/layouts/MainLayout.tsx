import type { FC, PropsWithChildren } from "react";
import NavBar from "../components/Navbar";

interface MainLayoutProps {
  className?: string;
}

const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  className = "",
  children,
}) => (
  <div className="flex min-h-screen flex-col pb-4">
    <NavBar />
    <main className={className}>{children}</main>
  </div>
);

export default MainLayout;
