import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  CardBody,
  CardFooter,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Tab,
  TabList,
  TabPanel, CardHeader,
  Stack, Heading,
  TabPanels,
  Tabs,
  Container,
  useToast,
  Text,
  IconButton,
  HStack
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import Products from "../Cashier/Products";
import useSelector from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios"
import EditableField from "./EditableField";
import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function ProductAndCatAdmin() {
  const [page, setPage] = useState(1)
  const [name, setName] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [orderByName, setOrderByName] = useState("")
  const [orderByPrice, setOrderByPrice] = useState("")
  const [size, setSize] = useState(10)
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [edit, setEdit] = useState("")
  const [data, setData] = useState([])

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');

  const toast = useToast()

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

  const addNewCategory = async () => {
    try {

    } catch (error) {

    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  useEffect(() => {
    fetchData();
  }, [categoryId, orderByName, orderByPrice, page]);

  const handleAddData = (newData) => {
    // Update your data array with the new data
    setData((prevData) => [...prevData, newData]);
  };

  const handleSubmitEdit = async (id) => {
    // event.preventDefault();
    const token = localStorage.getItem("token");

    const name = document.getElementById("name").value

    try {
      const respon = await axios.patch(
        `http://localhost:8000/mini-project/api/cashier/update/${id}`,
        name,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Update cashier succeeded",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        document.location.href = "/cashierAdmin";
      }, 2500);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed. Try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const handleCategoryFilter = (event) => {
    setSelectedCategory(event.target.value);
  };

  const deleteCategory = async (id) => {
    // event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const respon = await axios.delete(
        `http://localhost:8000/mini-project/api/category/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Delete category succeeded",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        document.location.href = "/productAdmin";
      }, 2500);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed. Try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredProducts = selectedCategory ? products.filter((product) => product.categoryId === selectedCategory) : products;
  console.log(filteredProducts);

  return (
    <>
      {/* category */}
      <Box w={'25%'}>
        <Stack spacing='4' m={'2em'}>
          <Heading mb={'1em'}> Category</Heading>
          <AddCategory />
          {category.map((category) => (
            <Card key={category.id}>
              <CardBody>
                <HStack>
                  <Text>{category.name}</Text>
                  <Spacer />
                  {/* <IconButton icon={<FaEdit />} /> */}
                  <EditCategory categoryId={category.id} defVal={category.name} />
                  {/* edit button */}
                  <IconButton icon={<FaTrashAlt />} ml={'0.5em'} onClick={() => deleteCategory(category.id)} />
                  {/* trash button */}
                </HStack>
                {/* </Container> */}
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Box>

      <Divider orientation='vertical' />

      {/* products */}
      <Box>
        {/* product */}
        <Flex wrap={"wrap"} ml={"4em"} mt={'1em'} gap={"20px"} >
          <Heading> Products </Heading>
          {/* <Stack> */}
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
          {/* </Stack> */}
        </Flex>

      </Box>
      {/* </Flex > */}
    </>
  );
}
