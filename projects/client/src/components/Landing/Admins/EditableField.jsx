import { useState } from 'react';
import {
    Input, Button, Avatar,
    Box,
    Card,
    Divider,
    CardBody,
    CardFooter,
    Flex,
    Image,
    InputGroup,
    InputLeftElement,
    Spacer,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Tab,
    TabList,
    TabPanel, CardHeader,
    Stack, Heading,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
import axios from "axios"

const EditableField = ({ initialValue, apiUrl }) => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // const handleEdit = () => {
    //     setEditing(true);
    // };

    // const handleSave = () => {
    //     setEditing(false);
    //     onSave(value);
    // };

    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };

    const handleSave = async (apiUrl) => {
        const token = localStorage.getItem("token");
        const data = value;
        try {
            const respon = await axios.patch(
                apiUrl,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // toast({
            //     title: "Update cashier succeeded",
            //     status: "success",
            //     duration: 3000,
            //     isClosable: true,
            // });
            setTimeout(() => {
                document.location.href = "/ProductAndCatAdmin";
            }, 2500);
        } catch (error) {
            console.log(error);
            // toast({
            //     title: "Failed. Try again",
            //     status: "error",
            //     duration: 3000,
            //     isClosable: true,
            // });
        }
    };

    return (
        <Editable
            value={value}
            onChange={(newValue) => setValue(newValue)}
            isPreviewFocusable={!isEditing}
            onSubmit={handleSave}
        >
            {isEditing ? (
                <>
                    <EditableInput />
                    <Button size="sm" onClick={handleSave} isLoading={isLoading}>
                        Save
                    </Button>
                </>
            ) : (
                <>
                    <EditablePreview />
                    <Button size="sm" onClick={() => setIsEditing(true)}>
                        Edit
                    </Button>
                </>
            )}
        </Editable>
    );
};

export default EditableField;
