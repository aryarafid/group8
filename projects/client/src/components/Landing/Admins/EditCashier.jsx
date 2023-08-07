import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import {
    Flex, Text, Heading, Box, Table,
    Thead,
    useToast,
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
    IconButton, Input, ButtonGroup, SlideFade, Tooltip, InputGroup, InputRightElement
} from "@chakra-ui/react";
import SideBarAdmin from "./SideBarAdmin";


export default function EditCashier() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [imgProfile, setImgProfile] = useState("");
    const navigate = useNavigate();

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:8000/api/cashier/${id}`);
        setUsername(response.data.data.username)
        setEmail(response.data.data.email)
        setImgProfile(response.data.data.imgProfile)
    };

    useEffect(() => {
        getUserById();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const imgProfile = document.getElementById("imgProfile").files[0];

        const formData = new FormData();
        formData.append("username", document.getElementById("username").value);
        formData.append("email", document.getElementById("email").value);
        formData.append("imgProfile", imgProfile);

        console.log(formData);

        try {
            const respon = await axios.patch(
                `http://localhost:8000/api/cashier/update/${id}`,
                formData,
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
    };

    return <>
        <Flex>
            <SideBarAdmin />
            <Box m={'2em'}>
                <Heading mb={'1em'}>Edit Form Cashier #{id}</Heading>
                <form onSubmit={handleSubmit}>
                    {/* <Lorem count={2} /> */}
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            defaultValue={username}
                            id='username'
                            name='username'
                            onChange={(e) => setUsername(e.target.value)}
                            mb={'0.5em'}
                            type='username'
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            defaultValue={email}
                            id='email'
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                            mb={'0.5em'}
                            type='email'
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Avatar</FormLabel>
                        <Input
                            defaultValue={imgProfile}
                            id='imgProfile'
                            name='imgProfile'
                            mb={'0.5em'}
                            type='file'
                        />
                    </FormControl>

                    <Button colorScheme='blue' mr={3} onClick={() => navigate(-1)} >
                        Close
                    </Button>
                    <Button colorScheme='green' mr={3} type='submit'>Submit Edit</Button>
                </form>
            </Box >
        </Flex >
    </>
}