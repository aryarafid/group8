import { Flex } from "@chakra-ui/react";
import ContentCashier from "./ContentCashier";
import SideBarsCashier from "../../sidebar/SideBarsCashier";
import TransactionCashier from "./TransactionCashier";

export default function CategoryProduct() {
  return (
    <>
      <Flex>
        <SideBarsCashier />
        <ContentCashier />
        <TransactionCashier />
      </Flex>
    </>
  );
}
