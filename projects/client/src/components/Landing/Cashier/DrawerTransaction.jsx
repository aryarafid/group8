import {
  Box,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ButtonTransaction from "./ButtonTransaction";
import {
  deleteCart,
  deleteFromCart,
} from "../../../redux/reducer/ProductReducer";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
const PUBLIC_URL = "http://localhost:8000";

export default function DrawerTransactions({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { cart, totalHarga } = useSelector((state) => state.ProductReducer);
  const itemCart = cart.reduce((total, item) => total + item.quantity, 0);
  const getImage = (image) => {
    return `${PUBLIC_URL}/${image}`;
  };
  return (
    <>
      <Box
        pos={"absolute"}
        w={"35px"}
        textAlign={"center"}
        h={"35px"}
        borderRadius={"50px"}
        bgColor={"#1a202c"}
        color={"white"}
        fontSize={"24px"}
        mt={"-65px"}
        ml={"-10px"}
      >
        {itemCart}
      </Box>

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        size={{ sm: "sm", md: "sm", lg: "md" }}
      >
        <DrawerOverlay />
        <DrawerContent
          fontFamily={"montserrat"}
          bgColor={"#1a202c"}
          color={"white"}
        >
          <DrawerCloseButton />
          <DrawerHeader>Transactions</DrawerHeader>

          <DrawerBody>
            {cart.map((item) => (
              <Box overflow={"scroll"}>
                <Card
                  w={{ sm: "300px", md: "350px", lg: "400px" }}
                  m={"5px auto"}
                  key={item.id}
                >
                  <CardBody>
                    <Flex>
                      <Box
                        bgImage={getImage(item.productImg)}
                        maxW={{ md: "80px", lg: "150px" }}
                        minW={{ md: "80px", lg: "150px" }}
                        maxH={{ md: "85px", lg: "100px" }}
                        minH={{ md: "85px", lg: "100px" }}
                        bgSize={"cover"}
                        borderRadius={"10px"}
                      ></Box>
                      <Stack ml={"10px"}>
                        <Text
                          fontWeight={"bold"}
                          fontSize={{ md: "12px", lg: "16px" }}
                        >
                          {item.name}
                        </Text>
                        <Text fontSize={{ md: "10px", lg: "12px" }}>
                          {item.description}
                        </Text>
                        <Text>Rp. {item.harga_produk}</Text>
                        <Text fontSize={{ md: "12px", lg: "15px" }}>
                          Qty : {item.quantity}
                        </Text>
                      </Stack>
                    </Flex>
                    <Flex>
                      <Box
                        ml={{ md: "250px", lg: "280px" }}
                        mt={"-20px"}
                        pos={"absolute"}
                      >
                        <IconButton
                          color={"red"}
                          size={"sm"}
                          onClick={() => dispatch(deleteFromCart(item))}
                          icon={<AiFillMinusCircle size={"sm"} />}
                          variant={"unstyled"}
                        ></IconButton>
                        <IconButton
                          icon={<BsFillTrash3Fill size={"sm"} />}
                          variant={"unstyled"}
                          size={"sm"}
                          ml={{ md: "5px", lg: "20px" }}
                          onClick={() => dispatch(deleteCart(item))}
                        ></IconButton>
                      </Box>
                    </Flex>
                  </CardBody>
                </Card>
              </Box>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Box mx={"auto"}>
              <Text fontWeight={"bold"}>Total : Rp. {totalHarga}</Text>
              <ButtonTransaction />
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
