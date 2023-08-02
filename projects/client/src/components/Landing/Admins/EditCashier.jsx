import React from 'react'
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

export default function EditCashier({ isOpen, onClose, cashierData, onSave }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formData, setFormData] = useState(cashierData);

    useEffect(() => {
        setFormData(cashierData);
    }, [cashierData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        const data = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
        };

        // console.log(data);

        try {
            const respon = await axios.post(
                `http://localhost:8000/mini-project/api/cashier/update/${}`,
                data,
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
        <Button colorScheme="green"
            onClick={isOpen}
        >Edit</Button>

        <Modal isOpen={onOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
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
                            <Image src={cashierData.imgProfile}>
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
                        <Button colorScheme='green' mr={3}>Submit Edit</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    </>
}