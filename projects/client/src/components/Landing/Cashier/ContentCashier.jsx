import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Image,
  Select,
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
  HStack,
  Center,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import Products from "./Products";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { addToCart } from "../../../redux/reducer/ProductReducer";
import {
  AiOutlineShoppingCart,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";

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
      const url = `http://localhost:8000/api/category/`;
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
  }, [categoryId, orderByName, orderByPrice, page, name]);

  const handleNext = () => {
    if (page) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearch = (event) => {
    setName(event.target.value);
  };

  const handleCategoryFilter = (event) => {
    setCategoryId(event.target.value);
  };

  const handleOrderByName = (event) => {
    setOrderByName(event.target.value);
  };

  const handleOrderByPrice = (event) => {
    setOrderByPrice(event.target.value);
  };

  return (
    <>
      <Box w={{
        md: "600px",
        lg: "980px"
      }} fontFamily={"montserrat"}>
        <Flex justify={"space-around"} m={"20px 20px"}>
          <Image
            mt={{ md: "-20px", lg: "-40px" }}
            ml={{ sm: "5px", md: "5px", lg: "10px" }}
            src="ei8gthh.png"
            w={{ md: "200px", lg: "300px" }}
            h={{ md: "100px", lg: "150px" }}
          ></Image>
          <Spacer />

          {/* Filter */}
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
              onChange={handleSearch}
            ></Input>
          </InputGroup>
        </Flex>

        {/* Filter */}
        <Center>
          <HStack w={'70%'} alignContent={'center'}>
            <Select placeholder='Select all category' name="categoryId" id="categoryId" value={categoryId} onChange={handleCategoryFilter}>
              {category.map((category) =>
                <option value={category.id} >{category.name}</option>
              )}
            </Select>

            {/* orderByName */}
            <Select
              placeholder='Sort by name'
              name='orderByName'
              id='orderByName'
              value={orderByName}
              onChange={handleOrderByName}
            >
              {/* <option value='null'>---</option> */}
              <option value='ASC'>A-Z</option>
              <option value='DESC'>Z-A</option>
            </Select>

            <Select
              placeholder='Sort by price'
              name='orderByPrice'
              id='orderByPrice'
              value={orderByPrice}
              onChange={handleOrderByPrice}
            >
              <option value='ASC'>Terkecil-Terbesar</option>
              <option value='DESC'>Terbesar-Terkecil</option>
            </Select>

          </HStack>
        </Center>

        {/* products */}
        <Flex
          wrap={"wrap"}
          ml={{
            md: "1px",
            lg: "2.5em"
          }}
          mt={"1em"}
          gap={"20px"}
        >
          {products.map((product) => (
            //<Card key={product.id} maxW={"240px"} maxH={"360px"} shadow={"lg"}> 
            /* 4:6 */
            /* <Card key={product.id} maxW={"120px"} maxH={"180px"} shadow={"lg"}> */
            < Card key={product.id} maxW={"200px"} maxH={"300px"} shadow={"lg"} >
              <CardBody>
                {product.productImg ?
                  <Image
                    /* <Box */
                    // w={"200px"}
                    // h={"80px"}
                    // bgImage={getImage(product.productImg)}
                    // w={'200px'} h={'180px'}
                    //w={'100px'} h={'90px'}
                    w={'120px'} h={'108px'}

                    src={getImage(product.productImg)}
                  ></Image> : <Avatar
                    // w={'200px'} h={'180px'}
                    //w={'100px'} h={'90px'}
                    w={'120px'} h={'108px'}

                  />
                }

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
        </Flex >
        <Stack
          pos={"absolute"}
          mt={"2em"}
          mb={"2em"}
          ml={"250px"}
        >
          <Flex>
            <Button
              onClick={handlePrev}
              _hover={{ bgColor: "#223256", color: "white" }}
              bgColor={"white"}
              w={"100px"}
              h={"30px"}
              isDisabled={page === 1 ? true : false}
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
              isDisabled={products.length < 10}
            >
              Next
            </Button>
          </Flex>
        </Stack>
      </Box >
    </>
  );
}
