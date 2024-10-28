"use client";

import Link from "next/link";
import logoIcon from "@/assets/mgtNewLogo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Button, useDisclosure, Icon } from "@chakra-ui/react";
import Sidebar from "../Sidebar/Sidebar";
import { TbLogout } from 'react-icons/tb';
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Header = () => {
  //   const userData = getCookie("user-data")
  //     ? JSON.parse(getCookie("user-data") as string)
  //     : null;

  const router = useRouter();
  const toast = useToast();

  const onLogout = () => {
    toast({
        title: "Logging out",
        status: "success",
        duration: 500,
        isClosable: true,
        position: "top-right",
      });
      router.push("/login");
  };


  const path = usePathname();

  const userData = { firstName: "", image: "" };
  const btnRef = useRef();

  const { onOpen, isOpen, onClose } = useDisclosure();

  // const initial = `${userData?.firstName?.charAt(0) || ''}${
  //   userData?.firstName?.charAt(1) || ''
  // }`.toLocaleUpperCase();

  return (
    <>
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <header className="bg-primary h-[80px] min-h-[80px] sticky top-0 z-50">
        <div className="flex items-center justify-between px-12 leading-body-3 font-semibold text-body-3 mx-auto h-[80px] min-h-[80px]">
          <nav className="h-full w-full flex items-center justify-between">
            <div className="flex items-center h-full">
              <div className="cursor-pointer" onClick={onOpen}>
                <Image
                  src={logoIcon}
                  alt="Logo"
                  className=""
                  width="50"
                  height="50"
                />
              </div>
            </div>

            <div className="flex">
              <div className="flex items-center">
                <p className="text-sm font-medium leading-[19px] text-white mr-3">
                  {userData?.firstName}
                </p>
                {userData?.image ? (
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <Image src={userData?.image} alt="user image"></Image>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex space-x-6">
                      <div className="avatar online placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                          <span className="text-xl">SM</span>
                        </div>
                      </div>
                      <div className="h-5 w-6 mt-1.5">
                        <Icon
                          boxSize={8}
                          as={TbLogout}
                          onClick={onLogout}
                          color={"white"}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
