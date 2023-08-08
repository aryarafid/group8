import { Flex } from "@chakra-ui/react";
import ContentCashier from "./ContentCashier";
import SideBarsCashier from "./SideBarsCashier";

export default function DashBoardCashier() {
  return (
    <>
      <Flex>
        <SideBarsCashier />
        <ContentCashier />
      </Flex>
    </>
  );
}
