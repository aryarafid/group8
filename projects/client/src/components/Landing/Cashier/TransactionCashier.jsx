import {
  Box,
  Card,
  CardBody,
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
        w={{ sm: "250px", md: "280px", lg: "350px" }}
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
                w={{ md: "200px", lg: "320px" }}
                h={"100px"}
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
                    <Text>Rp.{item.harga_produk}</Text>
                  </Box>
                  <Box textAlign={"center"}>
                    <Flex>
                      <Text fontSize={{ md: "12px", lg: "12px" }}>
                        Qty : {item.quantity}
                      </Text>
                      <IconButton
                        icon={<BsFillTrash3Fill size={"sm"} />}
                        pos={"absolute"}
                        variant={"unstyled"}
                        size={"sm"}
                        ml={{ md: "130px", lg: "250px" }}
                        mt={"-60px"}
                        onClick={() => dispatch(deleteCart(item))}
                      ></IconButton>
                      <IconButton
                        pos={"absolute"}
                        color={"red"}
                        size={"sm"}
                        ml={{ md: "130px", lg: "250px" }}
                        mt={"-10px"}
                        onClick={() => dispatch(deleteFromCart(item))}
                        icon={<AiFillMinusCircle size={"sm"} />}
                        variant={"unstyled"}
                      ></IconButton>
                    </Flex>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          ))}
          <Box pos={"absolute"} mt={"700px"} ml={{ md: "20px", lg: "100px" }}>
            <Text>Total Harga : Rp. {totalHarga}</Text>
            <ButtonTransaction />
          </Box>
        </Stack>
      </Box>
    </>
  );
}
