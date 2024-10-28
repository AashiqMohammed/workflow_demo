import Header from "@/Components/Header/Header";
import AuthLayout from "@/Layout/AuthLayout";
import MainLayout from "@/Layout/MainLayout";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <MainLayout>
        <div className="w-full">{children}</div>
      </MainLayout>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
