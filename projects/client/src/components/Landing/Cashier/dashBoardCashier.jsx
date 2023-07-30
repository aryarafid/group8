import { Box, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SideBars from "../../sidebar/Sidebars";
import TransactionCashier from "./TransactionCashier";
import ContentCashier from "./ContentCashier";

export default function DashBoardCashier() {
  return (
    <>
      <Flex>
        <SideBars />
        <ContentCashier />
        <TransactionCashier />
      </Flex>
    </>
  );
}
