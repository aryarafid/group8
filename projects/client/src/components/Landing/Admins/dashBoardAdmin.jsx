import { Box, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SideBarAdmin from "./SideBarAdmin";

export default function DashBoardAdmin() {
  return (
    <>
      <Flex fontFamily={"montserrat"}>
        <SideBarAdmin />
        <Box>Dasboard Admin</Box>
      </Flex>
    </>
  );
}
