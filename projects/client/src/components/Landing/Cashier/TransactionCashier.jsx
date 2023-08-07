import {
  Box,
  Card,
  CardBody,
  Flex,
  IconButton,
  Image,
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

export default function TransactionCashier() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.ProductReducer);
  const { totalHarga } = useSelector((state) => state.ProductReducer);
  console.log("ini product", cart);
  return (
    <>
      <Box
        // bgColor={"#223256"}
        bgColor={"#1a202c"}
        w={{ sm: "250px", md: "300px", lg: "360px" }}
        fontFamily={"montserrat"}
        color={"white"}
        position={"sticky"}
      >
        <Stack>
          <Box m={"20px 30px"}>
            <Text
              fontSize={{ base: "16px", sm: "24px", md: "24px", lg: "32px" }}
            >
              Transactions
            </Text>
          </Box>
          {cart.map((item) => (
            <Box>
              <Card
                w={{ md: "250px", lg: "320px" }}
                m={"5px auto"}
                key={item.id}
              >
                <CardBody>
                  <Box>
                    <Text mt={"-10px"} fontSize={{ md: "12px", lg: "12px" }}>
                      {item.name}
                    </Text>
                    <Text fontSize={{ md: "8px", lg: "12px" }}>
                      {item.description}
                    </Text>
                    <Text>Rp. {item.harga_produk}</Text>
                  </Box>
                  <Box textAlign={"center"}>
                    <Flex>
                      <Text fontSize={{ md: "12px", lg: "12px" }}>
                        Qty : {item.quantity}
                      </Text>
                      <Box
                        ml={{ md: "80px", lg: "200px" }}
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
                          ml={"20px"}
                          onClick={() => dispatch(deleteCart(item))}
                        ></IconButton>
                      </Box>
                    </Flex>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          ))}
          <Box pos={"absolute"} mt={"680px"} ml={{ md: "50px", lg: "80px" }}>
            <Text>Total Harga : Rp. {totalHarga}</Text>
            <ButtonTransaction />
          </Box>
        </Stack>
      </Box>
    </>
  );
}
