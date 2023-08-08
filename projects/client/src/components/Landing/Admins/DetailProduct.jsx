import {
    Flex, Text, Heading, Box, Table,
    Thead,
    Tbody,
    Textarea,
    Image,
    Tr,
    Select,
    Th,
    NumberInput,
    NumberInputField,
    TableCaption,
    Td,
    NumberInputStepper,
    FormControl,
    FormLabel,
    Tabs, TabList, TabPanels, Tab, TabPanel,
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

import { useNavigate } from "react-router-dom";
import SideBarAdmin from "./SideBarAdmin";
import { useState, useEffect } from "react";
import axios from "axios"
import ContentCashier from "../Cashier/ContentCashier";
import SideBarsCashier from "../Cashier/SideBarsCashier";
import { FaEye } from "react-icons/fa";
import { useParams } from "react-router-dom";

import EditCashier from "./EditCashier";
// import DeleteCashier from "./DeleteCashier";

export default function DetailProduct({ data, category }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [pwShow, setpwShow] = useState(false)
    const handleClick = () => setpwShow(!pwShow)
    const toast = useToast()
    const navigate = useNavigate();

    const initialFormData = {
        // Initialize with empty fields for your data structure
        // For example:
        name: "",
        categoryId: "",
        productImg: "",
        modal_produk: "",
        harga_produk: "",
        quantity: "",
        description: "",
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const productImg = document.getElementById("productImg").files[0];
        const formData = new FormData();

        formData.append("name", document.getElementById("name").value);
        formData.append("categoryId", document.getElementById("categoryId").value);
        formData.append("modal_produk", document.getElementById("modal_produk").value);
        formData.append("harga_produk", document.getElementById("harga_produk").value);
        formData.append("quantity", document.getElementById("quantity").value);
        formData.append("productImg", productImg);
        formData.append("description", document.getElementById("description").value);

        console.log(formData);

        try {
            const respon = await axios.patch(
                `http://localhost:8000/api/product/update/${data.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast({
                title: "Update product succeeded",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            // setTimeout(() => {
            //     document.location.href = "/productAdmin";
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
            {/* <Button colorScheme="teal" mt={'2em'} mb={'1em'} onClick={onOpen}>Add New Product</Button> */}
            <IconButton icon={<FaEye />} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>

                <ModalOverlay />
                <ModalContent maxW={'600px'}>
                    <ModalHeader>Produk #{data.id}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs>
                            <TabList>
                                <Tab>Detail Produk</Tab>
                                <Tab>Edit Produk</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    {/* <TableContainer> */}
                                    <Table>
                                        <Tbody>
                                            <Tr>
                                                <Td>Product Name</Td>
                                                <Td>:</Td>
                                                <Td>{data.name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Product Category</Td>
                                                <Td>:</Td>
                                                <Td>{data.Category.name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Product Image</Td>
                                                <Td>:</Td>
                                                <Td>
                                                    {data.productImg ?
                                                        <Image
                                                            w={'200px'} h={'180px'}
                                                            src={`http://localhost:8000/${data.productImg}`}
                                                        ></Image> :
                                                        "no picture"
                                                    }
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Harga Modal Produk</Td>
                                                <Td>:</Td>
                                                <Td>{data.modal_produk}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Harga Jual Produk</Td>
                                                <Td>:</Td>
                                                <Td>{data.harga_produk}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Quantity</Td>
                                                <Td>:</Td>
                                                <Td>{data.quantity}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Description</Td>
                                                <Td>:</Td>
                                                <Td>{data.description}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Status</Td>
                                                <Td>:</Td>
                                                <Td>{
                                                    data.isActive === true ? "Active" : "Inactive"
                                                }</Td>
                                            </Tr>


                                        </Tbody>
                                    </Table>
                                    {/* </TableContainer> */}

                                </TabPanel>

                                <TabPanel>
                                    <form onSubmit={handleSubmit}>
                                        <FormControl isRequired>
                                            <FormLabel>Product Name</FormLabel>
                                            <Input id='name' name='name' type='name' defaultValue={data.name} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Product Category</FormLabel>
                                            <Select placeholder='Select category' name="categoryId" id="categoryId" defaultValue={parseInt(data.Category.id)}>
                                                {category.map((category) =>
                                                    <option value={category.id} >{category.name}</option>
                                                )}
                                            </Select>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Product Image</FormLabel>
                                            <Input id='productImg' name='productImg' type='file' />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Harga Modal Produk</FormLabel>
                                            <Input id='modal_produk' name='modal_produk' type="number" defaultValue={data.modal_produk} />
                                            {/* <NumberInput id='modal_produk' name='modal_produk'> */}
                                            {/* <NumberInputField /> */}
                                            {/* </NumberInput> */}
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Harga Jual Produk</FormLabel>
                                            {/* <NumberInput id='harga_produk' name='harga_produk'> */}
                                            {/* <NumberInputField /> */}
                                            {/* </NumberInput> */}
                                            <Input id='harga_produk' name='harga_produk' type="number"
                                                defaultValue={data.harga_produk} />

                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Quantity</FormLabel>
                                            {/* <NumberInput id='quantity' name='quantity'>
                                    <NumberInputField />
                                </NumberInput> */}
                                            <Input id='quantity' name='quantity' type="number"
                                                defaultValue={data.quantity} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Description</FormLabel>
                                            <Textarea id='description' name='description'
                                                defaultValue={data.description} />

                                        </FormControl>

                                        <ModalFooter>
                                            <Button mr={3} onClick={onClose}>
                                                Close
                                            </Button>
                                            <Button colorScheme='blue' mr={3} type='submit'>Submit</Button>
                                        </ModalFooter>
                                    </form>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

