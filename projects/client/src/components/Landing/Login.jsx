import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <>
      <Box w={"100%"} h={"100vh"} fontFamily={"montserrat"}>
        <Stack>
          <Box
            w={"800px"}
            h={"400px"}
            m={"100px auto"}
            bgGradient={
              "linear(180deg, #4f3f66 0, #3b2e5f 25%, #1f1f59 50%, #001253 75%, #00004e 100%)"
            }
            borderRadius={"30px"}
            color={"white"}
          >
            <Text fontSize={"56px"} align={"center"} fontFamily={"montserrat"}>
              Login
            </Text>
            <Box marginLeft={"160px"} w={"500px"}>
              <Text pt={"32px"} fontSize={"24px"}>
                Username
              </Text>
              <Input placeholder="Type here" variant={"flushed"}></Input>
              {/* <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button> */}
              <Text pt={"32px"} fontSize={"24px"}>
                Password
              </Text>
              <InputGroup>
                <Input
                  placeholder="Type here"
                  variant={"flushed"}
                  type={show ? "text" : "password"}
                ></Input>
                <InputRightElement w={"60px"}>
                  <Button onClick={handleClick} w={"100px"}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Flex justify={"space-between"} mt={"30px"}>
                <Button colorScheme="green">Submit</Button>
                <Button colorScheme="red">Cancel</Button>
              </Flex>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
