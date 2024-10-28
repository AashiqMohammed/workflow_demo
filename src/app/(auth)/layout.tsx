import Header from "@/Components/Header/Header";
import AuthLayout from "@/Layout/AuthLayout";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <AuthLayout>{children}</AuthLayout>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
