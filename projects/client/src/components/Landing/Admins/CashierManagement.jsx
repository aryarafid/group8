import {
  Flex, Text, Heading, Box, Table,
  Thead,
  Tbody,
  Image,
  Tr,
  Th,
  Td,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Avatar,
  useDisclosure, useToast,
  TableCaption,
  TableContainer,
  Container,
  Modal,
  Editable,
  EditableInput,
  EditablePreview,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue, IconButton, Input, useEditableControls, ButtonGroup, SlideFade, Tooltip
} from "@chakra-ui/react";

import SideBarAdmin from "./SideBarAdmin";
import { useState, useEffect } from "react";
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import EditCashier from "./EditCashier";
import DeleteCashier from "./DeleteCashier";
import AddCashier from "./AddCashier";
import ContentCashier from "../Cashier/ContentCashier";
import SideBarsCashier from "../../sidebar/SideBarsCashier";
import TransactionCashier from "../Cashier/TransactionCashier";

export default function CashierManagement() {
  const [cashierData, setCashierData] = useState([])
  const [showModal1, setShowModal1] = useState(false); //edit
  const [showModal2, setShowModal2] = useState(false); //delete
  const [showModalAdd, setShowModalAdd] = useState(false); //add
  const [pwShow, setpwShow] = useState(false)
  const handleClick = () => setpwShow(!pwShow)
  const toast = useToast()
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [data, setData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure() //add
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [isOpenModal3, setIsOpenModal3] = useState(false);

  const openModal1 = () => {
    setIsOpenModal1(true);
  };

  const handleAddData = (newData) => {
    // Update your data array with the new data
    setData((prevData) => [...prevData, newData]);
  };


  const closeModal2 = () => {
    setIsOpenModal2(false);
  };
  const openModal3 = () => {
    setIsOpenModal3(true);
  };

  const closeModal3 = () => {
    setIsOpenModal3(false);
  };

  const fetchData = async () => {
    try {
      const url = `http://localhost:8000/mini-project/api/cashier`;
      const response = await axios.get(url);
      console.log(response.data);
      setCashierData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCashier = async (id) => {
    // event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const respon = await axios.patch(
        `http://localhost:8000/mini-project/api/cashier/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Delete cashier succeeded",
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
  };
  const undeleteCashier = async (id) => {
    // event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const respon = await axios.patch(
        `http://localhost:8000/mini-project/api/cashier/undelete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Undelete cashier succeeded",
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Flex>
        <SideBarAdmin />
        {/* <ContentCashier /> */}
        <Box m={'2em'} w={'100%'} maxW={'100%'}>
          <Heading as="h1" size={"xl"}>
            Cashier Management
          </Heading>

          <AddCashier onAdd={handleAddData} />

          <Box mt={'1em'} w={'100%'}>
            <TableContainer >
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>No.</Th>
                    <Th>Avatar</Th>
                    <Th>Cashier Username</Th>
                    <Th>Cashier Email</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cashierData.map((cashierData, key2) =>
                    <Tr>
                      <Td>{cashierData.id}</Td>
                      <Td>
                        {cashierData.imgProfile === null ?
                          <Avatar></Avatar> :
                          /* <Image src={`http://localhost:8000/image/${(cashierData.imgProfile)}`}></Image> */
                          <Image
                            maxW={'100px'}
                            src={`http://localhost:8000/${(cashierData.imgProfile)}`}></Image>
                        }
                      </Td>
                      <Td>{cashierData.username}</Td>
                      <Td>{cashierData.email}</Td>
                      <Td>{cashierData.isActive === true ? "Active" : "Inactive"}</Td>
                      <Td>
                        <Link to={`/editCashier/${cashierData.id}`}>
                          <Button colorScheme="green">Edit</Button>
                        </Link>

                        {
                          cashierData.isActive === true ?
                            <Button ml={'0.5em'} colorScheme="red"
                              onClick={() => deleteCashier(cashierData.id)}
                            >Delete</Button>
                            :
                            <Button ml={'0.5em'} colorScheme="blue"
                              onClick={() => undeleteCashier(cashierData.id)}
                            >Undelete</Button>
                        }
                      </Td >
                    </Tr >
                  )
                  }
                </Tbody >
              </Table >
            </TableContainer >
          </Box >
        </Box >
      </Flex >
    </>
  );
}
