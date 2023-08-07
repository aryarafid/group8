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
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import Products from "./Products";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { addToCart } from "../../../redux/reducer/ProductReducer";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function ContentCashier() {
  const PUBLIC_URL = "http://localhost:8000";
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [orderByName, setOrderByName] = useState("");
  const [orderByPrice, setOrderByPrice] = useState("");
  const [size, setSize] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getImage = (image) => {
    return `${PUBLIC_URL}/${image}`;
  };

  const fetchData = async () => {
    try {
      const url = `http://localhost:8000/api/product/products?page=${page}&categoryId=${categoryId}&name=${name}&orderByName=${orderByName}&orderByPrice=${orderByPrice}&size=${size}`;
      const response = await axios.get(url);
      console.log("?", response.data);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const url = `http://localhost:8000/`;
      const response = await axios.get(url);
      console.log(response.data);
      // setPage(response.data.page);
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchData();
  }, [categoryId, orderByName, orderByPrice, page]);

  const handleNext = () => {
    if (page) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleCategoryFilter = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : products;
  console.log(filteredProducts);

  return (
    <>
      <Box w={{ md: "600px", lg: "980px" }} fontFamily={"montserrat"}>
        <Flex justify={"space-around"} m={"20px 20px"}>
          <Image
            mt={{ md: "-20px", lg: "-40px" }}
            ml={{ sm: "5px", md: "5px", lg: "10px" }}
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
        <Tabs variant="soft-rounded" colorScheme="blue" paddingLeft={"1em"}>
          <TabList>
            {category.map((category) => (
              <Tab
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* product */}
              <Flex
                wrap={"wrap"}
                ml={{ md: "1px", lg: "4em" }}
                mt={"1em"}
                gap={"20px"}
              >
                {products.map((product) => (
                  <Card key={product.id} maxW={"500px"} shadow={"lg"}>
                    <CardBody>
                      <Box
                        w={"200px"}
                        h={"80px"}
                        bgImage={getImage(product.productImg)}
                        // bgImage={product.productImg}
                      ></Box>
                      <Text>{product.name}</Text>
                      <Text>Rp. {product.harga_produk}</Text>
                    </CardBody>
                    <CardFooter>
                      <Button
                        leftIcon={<AiOutlineShoppingCart />}
                        variant={"unstyled"}
                        onClick={() => dispatch(addToCart(product))}
                      >
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                <Stack
                  pos={"absolute"}
                  mt={"530px"}
                  ml={"150px"}
                >
                  <Flex>
                    <Button
                      onClick={handlePrev}
                      _hover={{ bgColor: "#223256", color: "white" }}
                      bgColor={"white"}
                      w={"100px"}
                      h={"30px"}
                    >
                      Prev
                    </Button>
                    <Button
                      onClick={handleNext}
                      _hover={{ bgColor: "#223256", color: "white" }}
                      bgColor={"white"}
                      ml={"200px"}
                      w={"100px"}
                      h={"30px"}
                    >
                      Next
                    </Button>
                  </Flex>
                </Stack>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
