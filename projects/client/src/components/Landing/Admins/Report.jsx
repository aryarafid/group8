import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
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
    HStack,
    // Tooltip,
} from "@chakra-ui/react";

const Report = () => {
    const [products, setProducts] = useState([])
    const [graph, setGraph] = useState([])
    const [salesReport, setSalesReport] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")


    const fetchProdInTr = async () => {
        try {
            const url = `http://localhost:8000/api/report/history/`;
            const response = await axios.get(url);
            // console.log(response.data);
            setProducts(response.data.data);
            console.log('products', products);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGraph = async () => {
        try {
            const url = `http://localhost:8000/api/report/graph/`;
            const response = await axios.get(url);
            setGraph(response.data.data);
            console.log(graph)
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const startDate = document.getElementById('startDate').value
            const endDate = document.getElementById('endDate').value

            const response = await axios.post(
                "http://localhost:8000/api/report/sales-report",
                { startDate: startDate, endDate: endDate }
            )
            setSalesReport(response.data.data);
            console.log(salesReport)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProdInTr();
    }, []);

    useEffect(() => {
        fetchGraph();
    }, []);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const days = graph.map((data) => data.day);
    const totalSales = graph.map((data) => parseInt(data.totalSales)); // Convert totalSales to numbers

    const chartData = {
        labels: days,
        datasets: [
            {
                label: 'Total Sales',
                data: totalSales,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    }

    return (
        <>
            <Box m={"2em"} w={"100%"} maxW={"100%"}>
                <Heading as="h1" size={"xl"}>
                    Report
                </Heading>

                <Tabs mt={"2em"} variant='enclosed'>
                    <TabList>
                        <Tab>Sales Graph</Tab>
                        <Tab>Transaction History</Tab>
                        <Tab>Sales Report</Tab>
                    </TabList>

                    <TabPanels>
                        {/*tab1*/}
                        <TabPanel>
                            <Line data={chartData} options={chartOptions} />
                        </TabPanel>

                        {/* tab2 */}
                        <TabPanel>
                            <Accordion>
                                {products.map((products) =>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton key={products.id}>
                                                <Box as="span" flex='1' textAlign='left'>
                                                    Transaction number {products.id}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <p>Date: {products.createdAt}</p>
                                            <p>Cashier ID and username: {products.userId}. {products.User.username}</p>
                                            <p>Total Price: Rp {products.totalPrice}</p>
                                            <Text>
                                                Items:
                                            </Text>
                                            {/* Display TransactionItems */}
                                            {products.TransactionItems.map((transactionItem) => (
                                                <Box key={transactionItem.id}>
                                                    <UnorderedList>
                                                        <ListItem>{transactionItem.Product.name}
                                                            <UnorderedList>
                                                                <ListItem>Quantity: {transactionItem.quantity}</ListItem>
                                                                <ListItem>Price: Rp {transactionItem.price}</ListItem>
                                                            </UnorderedList></ListItem>
                                                    </UnorderedList>

                                                </Box>
                                            ))}
                                        </AccordionPanel>
                                    </AccordionItem>
                                )}

                            </Accordion>
                        </TabPanel>

                        {/* tab3 */}
                        <TabPanel>
                            <form onSubmit={handleSubmit}>
                                <HStack>
                                    <FormControl>
                                        <FormLabel>Select Start Date</FormLabel>
                                        <Input
                                            placeholder="Select Date"
                                            size="md"
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Select End Date</FormLabel>
                                        <Input
                                            placeholder="Select Date"
                                            size="md"
                                            type="date"
                                            id="endDate"
                                            name="endDate"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Button mt={'2em'} type="submit" size='md'>Generate report</Button>
                                    </FormControl>
                                </HStack>
                            </form>

                            <Box mt={'1em'}>
                                <Table variant="striped">
                                    <TableCaption>Sales Report</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>Date</Th>
                                            <Th>Total Sales</Th>
                                            {/* <Th>Item sold</Th>
                                            <Th>Qty</Th>
                                            <Th>Price</Th> */}
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {salesReport.length < 1
                                            ?
                                            <Text>No data</Text>
                                            : (
                                                salesReport.map((data, index) => (
                                                    <Tr key={index}>
                                                        <Td>{data.day}</Td>
                                                        <Td>Rp {data.totalSales}</Td>
                                                    </Tr>
                                                ))
                                            )
                                        }
                                    </Tbody>
                                </Table>

                            </Box>
                        </TabPanel>

                    </TabPanels>
                </Tabs >

            </Box >
        </>
    )
}

export default Report