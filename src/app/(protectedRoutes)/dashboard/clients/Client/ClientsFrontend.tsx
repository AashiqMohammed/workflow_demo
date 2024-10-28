'use client';
import {
  Card,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  AvatarGroup,
  Icon,
  Box,
  Flex,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
// import { MdSettings, MdLock, MdFileDownload } from "react-icons/md";
import { MdSettings, MdLock, MdFileDownload } from "react-icons/md";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import FilterModal from "./FilterModal";
import { setItem } from "@/utils";
import { serviceColors, tableData } from "../../../../../../config";
// import PostmanData from "../../../../../../public/files/2029  Demo - XTip Sportwetten Workflow.postman_collection.json";

const ClientsFrontend = () => {
  const router = useRouter();
  const [clientIndex, setClientIndex] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCredentialsClick = (item: any) => {
    setItem(item);
    router.push("/credentials");
  };

  // const exportJson = () => {
  //   console.log("PostmanData :>> ", PostmanData);
  //   const data = PostmanData;
  //   const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
  //     JSON.stringify(data)
  //   )}`;
  //   const link = document.createElement("a");
  //   link.href = jsonString;
  //   link.download = "workflow.postman_collection.json";
  //   link.click();
  // };

  return (
    <>
      <FilterModal
        clientId={clientIndex}
        isOpen={isOpen}
        onClose={onClose}
        exportJson={() => {}}
      />
      <Card className="mt-10">
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Client Id</Th>
                <Th></Th>
                <Th>Client Name</Th>
                <Th>Service Used</Th>
                <Th>Country</Th>
                <Th>Created At</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((item) => {
                return (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>
                      <Image
                        boxSize="50px"
                        objectFit="inherit"
                        src={item.logo}
                        alt="Logo not available"
                      />
                    </Td>
                    <Td>{item.name}</Td>
                    <Td>
                      <AvatarGroup size="md" max={3}>
                        {item.serviceInitial.map((service, index) => (
                          <Avatar
                            // @ts-ignore
                            //Todo: Fix the lint
                            bg={`${serviceColors[service]}`}
                            color="#fff"
                            key={index}
                            name={service}
                          />
                        ))}
                      </AvatarGroup>
                    </Td>
                    <Td>{item.country}</Td>
                    <Td>{item.createdAt}</Td>
                    <Td>
                      <Flex cursor="pointer" color="blue.700" fontSize="2rem">
                        <Icon
                          as={MdSettings}
                          onClick={() => {
                            setClientIndex(item.id);
                            onOpen();
                          }}
                        />
                        <Icon
                          as={MdLock}
                          onClick={() => onCredentialsClick(item)}
                        />
                        {/* <Icon
                          as={MdFileDownload}
                          onClick={() => exportJson()}
                        /> */}
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default ClientsFrontend;
