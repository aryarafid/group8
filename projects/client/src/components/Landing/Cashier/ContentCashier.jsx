import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

export default function ContentCashier() {
  return (
    <>
      <Box w={"900px"} fontFamily={"montserrat"}>
        {/* <Box className="nav" bgColor={"white"} pt={"10px"}> */}
        <Flex justify={"space-around"} m={"20px 20px"}>
          <InputGroup>
            <InputLeftElement>
              <AiOutlineSearch />
            </InputLeftElement>
            <Input
              w={"400px"}
              h={"40px"}
              placeholder="Search Item"
              color={"white"}
              //   borderColor={"red"}
            ></Input>
          </InputGroup>
          <Image
            position={"absolute"}
            ml={"600px"}
            mt={"-20px"}
            src="ei8gthh.png"
            w={"300px"}
            h={"150px"}
          ></Image>
        </Flex>
      </Box>
    </>
  );
}
