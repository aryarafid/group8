import {
  Flex, Text, Heading, Box, Table,
  Thead,
  Tbody,
  Image,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  TableContainer,
  Container,
  Avatar,
  Modal,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue, IconButton, Input, useEditableControls, ButtonGroup, SlideFade, Tooltip
} from "@chakra-ui/react";
import SideBarAdmin from "./SideBarAdmin";
import { useState, useEffect } from "react";
import axios from "axios"
import ContentCashier from "../Cashier/ContentCashier";
import SideBarsCashier from "../../sidebar/SideBarsCashier";
import TransactionCashier from "../Cashier/TransactionCashier";

export default function CashierManagement() {
  const [cashierData, setCashierData] = useState([])
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [isOpenModal3, setIsOpenModal3] = useState(false);
  const openModal1 = () => {
    setIsOpenModal1(true);
  };

  const closeModal1 = () => {
    setIsOpenModal1(false);
  };

  const openModal2 = () => {
    setIsOpenModal2(true);
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

  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { isOpen2, onOpen2, onClose2 } = useDisclosure()

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

  let no = 1

  return (
    <>
      <Flex>
        <SideBarAdmin />
        {/* <ContentCashier /> */}
        <Box m={'2em'} w={'100%'} maxW={'100%'}>
          <Heading as="h1" size={"xl"}>
            Cashier Management
          </Heading>
          <Button colorScheme="blue" mt={'2em'} mb={'1em'} onClick={openModal3}>
            Add New Cashier
          </Button>

          <Modal isOpen={isOpenModal3} onClose={closeModal3}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Cashier</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* <Lorem count={2} /> */}
                <Text>Username</Text>
                <Input placeholder='Uname' />

                <Text>Avatar</Text>
                <Input placeholder='uplod image' />

                <Text >Email</Text>
                <Input placeholder='Basic usage' />

                <Text >Password</Text>
                <Input placeholder='Basic usage' />
              </ModalBody>

              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme='blue' mr={3}>Submit</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

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
                  {cashierData.map((cashierData) =>
                    <Tr>
                      <Td>{no++}</Td>
                      <Td>
                        {cashierData.imgProfile === null ?
                          <Avatar></Avatar> : cashierData.imgProfile
                        }
                      </Td>
                      <Td>{cashierData.username}</Td>
                      <Td>{cashierData.email}</Td>
                      <Td>{cashierData.isActive === true ? "Active" : "Inactive"}</Td>
                      <Td>
                        <Button colorScheme="blue" onClick={openModal1}>Detail</Button>
                        <Button ml={'0.5em'} colorScheme="red" onClick={openModal2}>Delete</Button>
                      </Td>

                      <Modal isOpen={isOpenModal1} onClose={closeModal1}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>ID #{cashierData.id}</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            {/* <Lorem count={2} /> */}
                            <Text>Username</Text>
                            <Editable defaultValue={cashierData.username}>
                              <EditablePreview />
                              <EditableInput />
                            </Editable>

                            <Text>Avatar</Text>
                            {cashierData.imgProfile === null ? <Avatar></Avatar> :
                              <Image>
                                {cashierData.imgProfile}
                              </Image>
                            }
                            <Text >Email</Text>
                            <Editable defaultValue={cashierData.email}>
                              <EditablePreview />
                              <EditableInput />
                            </Editable>

                            <Text>Role</Text>
                            <Editable defaultValue={cashierData.role}>
                              <EditablePreview />
                              <EditableInput />
                            </Editable>

                            <Text>Status</Text>
                            <Editable defaultValue={cashierData.isActive}>
                              <EditablePreview />
                              <EditableInput />
                            </Editable>
                          </ModalBody>

                          <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                              Close
                            </Button>
                            <Button colorScheme='green' mr={3}>Edit</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>

                      <Modal isOpen={isOpenModal2} onClose={closeModal2}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Yakin menghapus Cashier ID #{cashierData.id}?</ModalHeader>
                          <ModalCloseButton />

                          <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button colorScheme='red' mr={3}>Delete</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
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
