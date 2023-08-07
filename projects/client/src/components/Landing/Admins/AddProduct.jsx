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
    NumberInputStepper,
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

import { useNavigate } from "react-router-dom";
import SideBarAdmin from "./SideBarAdmin";
import { useState, useEffect } from "react";
import axios from "axios"
import ContentCashier from "../Cashier/ContentCashier";
import SideBarsCashier from "../Cashier/SideBarsCashier";
import TransactionCashier from "../Cashier/TransactionCashier";
import { useParams } from "react-router-dom";

import EditCashier from "./EditCashier";
// import DeleteCashier from "./DeleteCashier";

export default function AddProduct({ onAdd, category }) {
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
            const respon = await axios.post(
                "http://localhost:8000/mini-project/api/product/create",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast({
                title: "Create product  succeeded",
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

    return (
        <>
            <Button colorScheme="teal" mt={'2em'} mb={'1em'} onClick={onOpen}>Add New Product</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add New Product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* <Lorem count={2} /> */}
                            <FormControl isRequired>
                                <FormLabel>Product Name</FormLabel>
                                <Input id='name' name='name' type='name' placeholder="product name" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Product Category</FormLabel>
                                {/* <Input id='categoryId' name='categoryId' type='categoryId' /> */}
                                <Select placeholder='Select category' name="categoryId" id="categoryId">
                                    {category.map((category) =>
                                        <option value={category.id}>{category.name}</option>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Product Image</FormLabel>
                                <Input id='productImg' name='productImg' type='file' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Harga Modal Produk</FormLabel>
                                <Input id='modal_produk' name='modal_produk' type="number" />
                                {/* <NumberInput id='modal_produk' name='modal_produk'> */}
                                {/* <NumberInputField /> */}
                                {/* </NumberInput> */}
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Harga Jual Produk</FormLabel>
                                {/* <NumberInput id='harga_produk' name='harga_produk'> */}
                                {/* <NumberInputField /> */}
                                {/* </NumberInput> */}
                                <Input id='harga_produk' name='harga_produk' type="number" />

                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Quantity</FormLabel>
                                {/* <NumberInput id='quantity' name='quantity'>
                                    <NumberInputField />
                                </NumberInput> */}
                                <Input id='quantity' name='quantity' type="number" />

                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea id='description' name='description' placeholder="deskripsi produk" />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button colorScheme='blue' mr={3} type='submit'>Submit</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

