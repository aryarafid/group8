import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <Box w={"100%"} h={"100vh"}>
        <Stack>
          <Box
            w={"800px"}
            h={"800px"}
            textAlign={"center"}
            bgColor={"green"}
            m={"100px auto"}
          >
            <Text fontSize={"40px"} fontFamily={"montserrat"}>
              Sign in
            </Text>
            <Text>Don't have any account ? </Text>
            <Link to={"/pageregister"}>
              <Text color={"black"}>Create one</Text>
            </Link>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
