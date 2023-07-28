import { Box, Button, Flex } from "@chakra-ui/react";
import Title from "./title";
import ButtonLogin from "./ButtonLogin";

export default function NavbarDesktop() {
  return (
    <>
      <Box w={"100%"} bgColor={"black"} h={"60px"}>
        <Flex justify={"space-between"}>
          <Title />
          <ButtonLogin />
        </Flex>
      </Box>
    </>
  );
}
