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

export default function AddCategory({ onAdd }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [pwShow, setpwShow] = useState(false)
    const handleClick = () => setpwShow(!pwShow)
    const toast = useToast()
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        const name = document.getElementById('name').value
        console.log(name);

        try {
            const respon = await axios.post(
                "http://localhost:8000/api/category/create",
                { name: name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast({
                title: "Create category succeeded",
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
            <Button colorScheme="teal" mt={'2em'} mb={'1em'} onClick={onOpen}>Add New Category</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add New Category</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* <Lorem count={2} /> */}
                            <FormControl isRequired>
                                <FormLabel>Category Name</FormLabel>
                                <Input id='name' name='name' type='name' />
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

