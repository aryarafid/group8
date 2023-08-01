import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
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
  const [page, setPage] = useState(1)
  const [name, setName] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [orderByName, setOrderByName] = useState("")
  const [orderByPrice, setOrderByPrice] = useState("")
  const [size, setSize] = useState("")
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = async () => {
    try {
      const url = `http://localhost:8000/mini-project/api/product/products?page=${page}&categoryId=${categoryId}&name=${name}&orderByName=${orderByName}&orderByPrice=${orderByPrice}&size=${size}`;
      const response = await axios.get(url);
      console.log(response.data);
      setPage(response.data.page);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const url = `http://localhost:8000/mini-project/api/category/`;
      const response = await axios.get(url);
      console.log(response.data);
      // setPage(response.data.page);
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  useEffect(() => {
    fetchData();
  }, [categoryId, orderByName, orderByPrice, page]);

  const handleCategoryFilter = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory ? products.filter((product) => product.categoryId === selectedCategory) : products;
  console.log(filteredProducts);

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
