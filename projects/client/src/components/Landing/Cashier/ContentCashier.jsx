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
import useSelector from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios"


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

        {/* tab */}
        <Tabs variant='soft-rounded' colorScheme='blue' paddingLeft={'4em'}>

          <TabList>
            {category.map((category) =>
              <Tab key={category.id} onClick={() => setSelectedCategory(category.id)}>
                {category.name}
              </Tab>
            )}
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* product */}
              <Flex wrap={"wrap"} ml={"4em"} mt={'1em'} gap={"20px"} >
                {filteredProducts.map((product) =>
                  <Card key={product.id} maxW={"500px"} maxH={"350px"}>
                    <CardBody>
                      <Box
                        // bgImage={ }
                        w={"200px"} h={"180px"}></Box>
                      <Text>
                        {product.name}
                      </Text>
                      <Text>
                        {product.harga_produk}
                      </Text>
                    </CardBody>
                    <CardFooter>
                      <Button variant={"unstyled"}>Add to cart</Button>
                    </CardFooter>
                  </Card>
                )}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>



      </Box>
    </>
  );
}
