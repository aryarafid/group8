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
    const [aggregate, setAggregate] = useState([])
    const [salesReport, setSalesReport] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")


    const fetchProdInTr = async () => {
        try {
            const url = `http://localhost:8000/api/report/products/`;
            const response = await axios.get(url);
            console.log(response.data);
            setProducts(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDayAggregate = async () => {
        try {
            const url = `http://localhost:8000/api/report/aggregate/`;
            const response = await axios.get(url);
            setAggregate(response.data.data);
            console.log(aggregate)
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
        fetchDayAggregate();
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

    const days = aggregate.map((data) => data.day);
    const totalSales = aggregate.map((data) => parseInt(data.totalSales)); // Convert totalSales to numbers

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
                                            <AccordionButton>
                                                <Box as="span" flex='1' textAlign='left'>
                                                    Transaction number {products.id} at {Date(products.createdAt)}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <p>Cashier ID and username: {products.userId}. {products.User.username}</p>
                                            <p>Total Price: Rp {products.totalPrice}</p>

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