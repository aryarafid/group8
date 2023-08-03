import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import Products from "./Products";
import { useSelector } from "react-redux";

export default function ContentCashier() {
  const { user } = useSelector((state) => state.AuthReducer);
  return (
    <>
      <Box
        w={{ md: "600px", lg: "960px" }}
        // bgColor={"brown"}
        fontFamily={"montserrat"}
      >
        <Flex justify={"space-around"} m={"20px 20px"}>
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
          <Box mr={"10px"} w={"300px"}>
            <Text ml={"60px"}>Welcome, {user.username}</Text>
            <Image
              src="ei8gthh.png"
              w={{ md: "200px", lg: "300px" }}
              h={{ md: "100px", lg: "150px" }}
            ></Image>
          </Box>
        </Flex>
        <Box mt={"20px"} ml={"10px"}>
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList>
              <Tab>Makanan</Tab>
              <Tab>Minuman</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Products />
              </TabPanel>
              <TabPanel>
                <p>Minuman</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}
