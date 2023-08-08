import {
  Flex,
  Text,
  Heading,
  Box,
  Table,
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
  IconButton,
  Input,
  ButtonGroup,
  SlideFade,
  Tooltip,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import SideBarAdmin from "./SideBarAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import ContentCashier from "../Cashier/ContentCashier";
import SideBarsCashier from "../Cashier/SideBarsCashier";
import { useParams } from "react-router-dom";

import EditCashier from "./EditCashier";
// import DeleteCashier from "./DeleteCashier";

export default function AddCashier({ onAdd }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pwShow, setpwShow] = useState(false);
  const handleClick = () => setpwShow(!pwShow);
  const toast = useToast();

  const initialFormData = {
    // Initialize with empty fields for your data structure
    // For example:
    username: "",
    email: "",
    password: "",
    imgProfile: "",
    // Add other fields as needed
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const imgProfile = document.getElementById("imgProfile").files[0];
    const formData = new FormData();
    // console.log(data);

    formData.append("username", document.getElementById("username").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("password", document.getElementById("password").value);
    // formData.append("data", JSON.stringify(data));
    formData.append("imgProfile", imgProfile);
    console.log(formData);

    try {
      const respon = await axios.post(
        "http://localhost:8000/api/cashier/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Create cashier succeeded",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // setTimeout(() => {
      //   document.location.href = "/cashierAdmin";
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
      <Button colorScheme="teal" mt={"2em"} mb={"1em"} onClick={onOpen}>
        Add New Cashier
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Cashier</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Lorem count={2} /> */}
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input id="username" name="username" type="username" />
              </FormControl>

              <FormControl>
                <FormLabel>Avatar</FormLabel>
                <Input id="imgProfile" name="imgProfile" type="file" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input id="email" name="email" type="email" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={pwShow ? "text" : "password"}
                    placeholder="Enter password"
                    id="password"
                    name="password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {pwShow ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue" mr={3} type="submit">
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
