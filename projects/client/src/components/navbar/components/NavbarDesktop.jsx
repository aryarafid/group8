import { Box, Button, Flex, Image } from "@chakra-ui/react";
import Title from "./title";
import ButtonLogin from "./ButtonLogin";

export default function NavbarDesktop() {
  return (
    <>
      <Box w={"100%"} bgColor={"black"} h={"60px"}>
        <Flex justify={"space-between"}>
          {/* <Image src="heavenmart"></Image> */}
          <Title />
          <ButtonLogin />
        </Flex>
      </Box>
    </>
  );
}
