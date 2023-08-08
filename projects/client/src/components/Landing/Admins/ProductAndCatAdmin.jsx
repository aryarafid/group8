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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
  HStack,
  Wrap, WrapItem, useDisclosure
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import Products from "../Cashier/Products";
import useSelector from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios"
import EditableField from "./EditableField";
import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";
import { FaEdit, FaTrashAlt, FaRegCheckSquare } from "react-icons/fa";
import AddProduct from "./AddProduct";
import DetailProduct from "./DetailProduct";

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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');

  const toast = useToast()

  const fetchData = async () => {
    try {
      const url = `http://localhost:8000/api/product/products?page=${page}&categoryId=${categoryId}&name=${name}&orderByName=${orderByName}&orderByPrice=${orderByPrice}&size=${size}`;
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
      const url = `http://localhost:8000/api/category/`;
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

  const deleteCategory = async (id) => {
    // event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const respon = await axios.delete(
        `http://localhost:8000/api/category/delete/${id}`,
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
      // setTimeout(() => {
      //   document.location.href = "/productAdmin";
      // }, 2500);
      window.location.reload()
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

  const deleteProduct = async (id) => {
    // event.preventDefault();
    const token = localStorage.getItem("token");
    // console.log(token)
    try {
      const respon = await axios.patch(
        `http://localhost:8000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Delete product succeeded",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // setTimeout(() => {
      //   document.location.href = "/productAdmin";
      // }, 2500);
      window.location.reload()
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

  const activateProduct = async (id) => {
    // event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const respon = await axios.patch(
        `http://localhost:8000/api/product/activate/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Delete product succeeded",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // setTimeout(() => {
      //   document.location.href = "/productAdmin";
      // }, 2500);
      window.location.reload()
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
                  <IconButton icon={<FaTrashAlt />} ml={'0.5em'} onClick={onOpen} />

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Yakin ingin menghapus data ini?</ModalHeader>
                      <ModalBody>
                        <Text>Data tidak dapat kembali.</Text>
                      </ModalBody>
                      <ModalCloseButton />
                      <ModalFooter>
                        <Button variant={'ghost'} mr={3} onClick={onClose}>
                          Close
                        </Button>
                        <Button colorScheme='red' onClick={() => deleteCategory(category.id)}>Delete</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
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
        <Flex wrap={"wrap"} ml={"4em"} mt={'2em'} gap={"20px"}>
          <Box>
            <Heading mb={'1em'}> Products </Heading>
            <AddProduct
              category={category} />
          </Box>
          {/* tombol */}

          <Box>
            <Wrap>
              {filteredProducts.map((product) =>
                <WrapItem>
                  <Card key={product.id} maxW={"240px"} maxH={"360px"}>
                    <CardBody>
                      {product.productImg ?
                        <Image
                          w={'200px'} h={'180px'}
                          src={`http://localhost:8000/${product.productImg}`}
                        ></Image> : <Avatar
                          w={'200px'} h={'180px'}
                        />
                      }
                      <Stack>
                        <Text as='b'>
                          {product.name}
                        </Text>
                        <Text noOfLines={1}>
                          {product.description}
                        </Text>
                      </Stack>
                      <HStack mt={'10px'}>
                        <Spacer></Spacer>

                        <DetailProduct data={product} category={category} />

                        {product.isActive === true ?
                          (
                            < IconButton icon={<FaTrashAlt />} ml={'0.5em'} colorScheme={'red'} onClick={() => deleteProduct(product.id)} />
                          ) :
                          (
                            < IconButton icon={<FaRegCheckSquare />} ml={'0.5em'} colorScheme={'green'} onClick={() => activateProduct(product.id)} />
                          )
                        }
                      </HStack>
                    </CardBody>
                  </Card>
                </WrapItem>
              )}
            </Wrap>
          </Box>

        </Flex>

      </Box>
      {/* </Flex > */}
    </>
  );
}
