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
    Avatar,
    useDisclosure,
    useToast,
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
    useColorModeValue,
    IconButton,
    Input,
    useEditableControls,
    ButtonGroup,
    SlideFade,
    Tooltip,
} from "@chakra-ui/react";

import SideBarAdmin from "./SideBarAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import EditCashier from "./EditCashier";
// import DeleteCashier from "./DeleteCashier";
import AddCashier from "./AddCashier";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Report = () => {
    return (
        < Box m={"2em"} w={"100%"} maxW={"100%"} >
            <Heading as="h1" size={"xl"}>
                Report
            </Heading>

            <Box mt={"1em"} w={"100%"}>
                <TableContainer>
                    <Table variant="simple">
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

                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box >
    )
}

export default Report