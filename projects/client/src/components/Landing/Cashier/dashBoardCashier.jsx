import { Box, Flex, Image } from "@chakra-ui/react";
import TransactionCashier from "./TransactionCashier";
import ContentCashier from "./ContentCashier";
import SideBarsCashier from "../../sidebar/SideBarsCashier";

export default function DashBoardCashier() {
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
