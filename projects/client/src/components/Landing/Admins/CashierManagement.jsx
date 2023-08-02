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
  TableContainer,
  Avatar,
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
  useDisclosure,
  IconButton, Input, ButtonGroup, SlideFade, Tooltip, InputGroup, InputRightElement, useToast
} from "@chakra-ui/react";

import SideBarAdmin from "./SideBarAdmin";
import { useState, useEffect } from "react";
import axios from "axios"
import ContentCashier from "../Cashier/ContentCashier";
import SideBarsCashier from "../../sidebar/SideBarsCashier";
import TransactionCashier from "../Cashier/TransactionCashier";
import { useParams } from "react-router-dom";

import EditCashier from "./EditCashier";
import DeleteCashier from "./DeleteCashier";
import AddCashier from "./AddCashier";


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

  const handleEditButtonClick = (id) => {
    setSelectedItemId(id);
    setShowModal1(true);
  };

  const handleAddData = (newData) => {
    // Update your data array with the new data
    setData((prevData) => [...prevData, newData]);
  };


  const { isOpen, onOpen, onClose } = useDisclosure() //add

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
                        <Button colorScheme="blue"
                          onClick={() => handleEditButtonClick(cashierData.id)}
                        >Detail</Button>

                        <Button ml={'0.5em'} colorScheme="red"
                          onClick={() => DeleteCashier(cashierData.id)
                          }
                        >Delete</Button>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Flex >

    </>
  );
}
