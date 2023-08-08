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
  Select,
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
  const token = localStorage.getItem("token");

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
      const url = `http://localhost:8000/api/product/products2?page=${page}&categoryId=${categoryId}&name=${name}&orderByName=${orderByName}&orderByPrice=${orderByPrice}&size=${size}`;
      const response = await axios.get(url);
      console.log(response.data);
      // setPage(response.data.page);
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

  useEffect(() => {
    fetchData();
  }, [categoryId, orderByName, orderByPrice, page, name]);

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
    console.log(token)
    // event.preventDefault();
    try {
      const respon = await axios.patch(
        `http://localhost:8000/api/product/delete/${id}`,
        {},
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
        {},
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

  return (
    <>
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

      <Box>
        {/* product */}
        <Flex wrap={"wrap"} ml={"4em"} mt={'2em'} gap={"20px"}>

          <Heading mb={'1em'}> Products </Heading>
          <Box>
            <AddProduct
              category={category}
            // mt={'2em'}
            />
          </Box>

          {/* Filter */}

          <HStack alignContent={'center'}>
            <InputGroup>
              <InputLeftElement>
                <AiOutlineSearch />
              </InputLeftElement>
              <Input
                // w={{ sm: "200px", md: "280px", lg: "400px" }}
                h={"40px"}
                placeholder="Search Item"
                borderColor={"#223256"}
                focusBorderColor="green"
                _hover={"green"}
                color={"#223256"}
                onChange={handleSearch}
              ></Input>
            </InputGroup>

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

          {/* main products */}
          <Box>
            <Wrap>
              {products.map((product) =>
                <WrapItem>
                  <Card key={product.id}
                    maxW={"150px"} maxH={"300px"}
                    minW={"150px"} minH={"300px"}
                    shadow={"lg"}
                  >
                    <CardBody>
                      {product.productImg ?
                        <Image
                          maxW={"120px"} maxH={"120px"}
                          minW={"120px"} minH={"120px"}
                          src={`http://localhost:8000/${product.productImg}`}
                        ></Image> : <Avatar
                          maxW={"120px"} maxH={"120px"}
                          minW={"120px"} minH={"120px"}

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
      </Box>
    </>
  );
}
