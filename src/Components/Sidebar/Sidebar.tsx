"use client";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from "@chakra-ui/react";
import MgtLogo from "@/assets/mgtLogo.png";
// import MgtLogo from "@/assets/mgtLogo_crif.png";
import Image from "next/image";
import Link from "next/link";

interface ISidebar {
  isOpen: boolean;
  onClose: VoidFunction;
}

const Sidebar = ({ isOpen, onClose }: ISidebar) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        //   finalFocusRef={}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Image src={MgtLogo} width={150} height={200} alt="Mgt Logo" />
          </DrawerHeader>
          <DrawerBody>
            <p className="text-primary text-h5 font-bold mb-4">
              System Configurations
            </p>

            <div className="grid grid-rows-2 gap-4 px-6">
              <Link href="/dashboard/clients">
                <div className="bg-primary p-4 rounded-[8px] cursor-pointer">
                  <p className="text-white-900">Clients</p>
                </div>
              </Link>
              <Link href="/dashboard/users">
                <div className="bg-white-800 p-4 rounded-[8px] cursor-pointer">
                  <p className="text-black">Users</p>
                </div>
              </Link>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
