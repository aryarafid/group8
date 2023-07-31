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
import Products from "./Products";

export default function ContentCashier() {
  return (
    <>
      <Box w={{ md: "900px", lg: "1200px" }} fontFamily={"montserrat"}>
        {/* <Box className="nav" bgColor={"white"} pt={"10px"}> */}
        <Flex justify={"space-around"} m={"20px 20px"}>
          <Image
            // position={"absolute"}
            // ml={{ base: "200px", sm: "300px", md: "400px", lg: "600px" }}
            mt={{ md: "-20px", lg: "-40px" }}
            ml={{ sm: "5px", md: "5px", lg: "10px" }}
            // ml={{ sm: "10px", md: "10px" }}
            src="ei8gthh.png"
            w={{ md: "200px", lg: "300px" }}
            h={{ md: "100px", lg: "150px" }}
          ></Image>
          <Spacer />
          <InputGroup>
            <InputLeftElement>
              <AiOutlineSearch />
            </InputLeftElement>
            <Input
              w={{ sm: "200px", md: "280px", lg: "400px" }}
              h={"40px"}
              placeholder="Search Item"
              borderColor={"#223256"}
              focusBorderColor="green"
              _hover={"green"}
              color={"#223256"}
            ></Input>
          </InputGroup>
        </Flex>
        <Products />
      </Box>
    </>
  );
}
