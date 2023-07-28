import { Box, Flex, Icon, IconButton, Text, Image } from "@chakra-ui/react";
import Hamburger from "./Hamburger";

export default function NavbarMobile() {
  return (
    <>
      <Box w={"100%"} bgColor={"blue"} h={"60px"}>
        <Flex justify={"space-between"}>
          <Image src="heavenmart.png" h={"50px"}></Image>
          <Hamburger />
        </Flex>
      </Box>
    </>
  );
}
