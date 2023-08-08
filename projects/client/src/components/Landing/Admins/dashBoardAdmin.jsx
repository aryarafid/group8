import { Box, Flex, Image } from "@chakra-ui/react";
import SideBarAdmin from "./SideBarAdmin";
import ProductAndCatAdmin from "./ProductAndCatAdmin";

export default function DashBoardAdmin() {
  return (
    <>
      <Flex fontFamily={"montserrat"}>
        <SideBarAdmin />
        <ProductAndCatAdmin />
      </Flex>
    </>
  );
}
