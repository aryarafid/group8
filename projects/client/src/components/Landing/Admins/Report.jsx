import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
    Flex,
    Text,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
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
    Tabs, TabList, TabPanels, Tab, TabPanel,
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

const Report = () => {
    const [products, setProducts] = useState([])

    const fetchProdInTr = async () => {
        try {
            const url = `http://localhost:8000/api/report/products/`;
            const response = await axios.get(url);
            console.log(response.data);
            // setPage(response.data.page);
            setProducts(response.data.data);


            for (const transaction of products) {
                const transactionItems = transaction.TransactionItems;

                // Now you can work with the transactionItems array
                for (const transactionItem of transactionItems) {
                    console.log('Transaction Item:', transactionItem);
                    // ... do something with the transaction item
                }
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchProdInTr();
    }, []);

    return (
        <>
            <Box m={"2em"} w={"100%"} maxW={"100%"}>
                <Heading as="h1" size={"xl"}>
                    Report
                </Heading>

                <Tabs mt={"2em"} variant='enclosed'>
                    <TabList>
                        <Tab>Sales aggregate per day</Tab>
                        <Tab>Transaction History</Tab>
                        <Tab>Sales report by date range</Tab>
                    </TabList>

                    <TabPanels>
                        {/*tab1*/}
                        <TabPanel>
                            <p>one!</p>
                        </TabPanel>

                        {/* tab2 */}
                        <TabPanel>
                            <Accordion>

                                {products.map((products) =>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                <Box as="span" flex='1' textAlign='left'>
                                                    Transaction number {products.id} at {Date(products.createdAt)}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            {/* {products.TransactionItems} */}
                                            {/* Display Transaction details */}
                                            <p>User ID: {products.userId}</p>
                                            <p>Username: {products.User.username}</p>
                                            <p>Total Price: {products.totalPrice}</p>

                                            {/* Display TransactionItems */}
                                            {products.TransactionItems.map((transactionItem) => (
                                                <UnorderedList key={transactionItem.id}>
                                                    <ListItem>Item: {transactionItem.Product.name}</ListItem>
                                                    <ListItem>Price: {transactionItem.price}</ListItem>
                                                </UnorderedList>
                                                /* <div key={transactionItem.id}>
                                                    <p>Item: {transactionItem.Product.name}</p>
                                                    <p>Price: {transactionItem.price}</p>
                                                </div> */
                                            ))}
                                        </AccordionPanel>
                                    </AccordionItem>
                                )}

                            </Accordion>
                        </TabPanel>

                        {/* tab3 */}
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>

                    </TabPanels>
                </Tabs>

            </Box>
        </>
    )
}

export default Report