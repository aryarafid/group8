import { Flex } from "@chakra-ui/react";
import ContentCashier from "../Cashier/ContentCashier";
import SideBarsCashier from "../Cashier/SideBarsCashier";
import TransactionCashier from "../Cashier/TransactionCashier";
import GetProductAdmin from "./GetProductAdmin";
import SideBarAdmin from "./SideBarAdmin";

export default function ProductAdmin() {
  return (
    <>
      <Flex>
        <SideBarAdmin />
        <GetProductAdmin />
      </Flex>
    </>
  );
}
