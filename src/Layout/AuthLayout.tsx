import React from "react";
import MgtLogo from "@/assets/mgtLogo.png";
// import MgtLogo from "@/assets/mgtLogo_crif.png";
import Image from "next/image";
import LoginImage from "@/assets/login.jpg";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-700 via-blue-900 to-blue-800 min-h-[100vh] flex-1 flex justify-center items-center flex-col overflow-auto overflow-x-hidden px-52 py-16">
        <div className="bg-white-900 flex-1 w-full rounded-lg">
          <div className="grid grid-cols-2 p-10">
            <div className="">
              <Image src={MgtLogo} width={150} height={100} alt="logo"></Image>
              <div className="mt-8">
                <Image
                  src={LoginImage}
                  width={500}
                  height={800}
                  alt="loginImage"
                ></Image>
              </div>
            </div>
            <div className="w-full">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthLayout;
