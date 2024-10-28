"use client";
import {
  Card,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

const UsersClient = () => {
  const tableData = [
    {
      name: "Elsie",
      email: "elsie@gmail.com",
      role: "admin",
      mobile: "7834569248",
      gender: "Female",
    },
    {
      name: "Jay",
      email: "jay@mgt.eu",
      role: "editor",
      mobile: "9875676547",
      gender: "Male",
    },
    {
      name: "Niamh",
      email: "niamh@gmail.com",
      role: "user",
      mobile: "7823457823",
      gender: "Male",
    },
    {
      name: "Cora",
      email: "cora@gmail.com",
      role: "guest",
      mobile: "7823457823",
      gender: "Female",
    },
    {
      name: "Kimberley",
      email: "kimberley@gmail.com",
      role: "guest",
      mobile: "7823457823",
      gender: "Male",
    },
    {
      name: "Esther",
      email: "esther@mgt.eu",
      role: "user",
      mobile: "7823457823",
      gender: "Female",
    },
    {
      name: "Gemma",
      email: "gemma@gmail.com",
      role: "user",
      mobile: "7823457823",
      gender: "Female",
    },
    {
      name: "Demi",
      email: "demi@gmail.com",
      role: "user",
      mobile: "7823457823",
      gender: "Male",
    },
    {
      name: "Iqra",
      email: "iqra@mgt.eu",
      role: "admin",
      mobile: "7823457823",
      gender: "Female",
    },
    {
      name: "Dorothy",
      email: "dorothy@gmail.com",
      role: "user",
      mobile: "7823457823",
      gender: "Male",
    },
  ];

  return (
    <Card className="mt-12">
      <TableContainer className="">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Gender</Th>
              <Th>Mobile</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.gender}</Td>
                  <Td>{item.mobile}</Td>
                  <Td>{item.role}</Td>
                </Tr>
              );
            })}
          </Tbody>
          {/* <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot> */}
        </Table>
      </TableContainer>
    </Card>
  );
};

export default UsersClient;
