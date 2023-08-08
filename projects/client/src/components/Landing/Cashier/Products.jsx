import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Text,
} from "@chakra-ui/react";
import { addToCart } from "../../../redux/reducer/ProductReducer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Products() {
  const [productList, setProductList] = useState([]);
  let [index, setIndex] = useState(1);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const respon = await axios.get(
        `http://localhost:8000/api/product/products?page=${index}`
      );
      setProductList(respon.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [index]);

  function nextPage() {
    setIndex((index += 1));
  }
  function prevPage() {
    setIndex((index -= 1));
  }

  const handleAddCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <>
      <Flex>
        {productList.map((product) => (
          <Card
            w={{ md: "150px", lg: "440px" }}
            ml={"10px"}
            bgColor={"#223256"}
            h={{ md: "150px", lg: "200px" }}
            key={product.id}
            color={"white"}
          >
            <CardBody>
              <Text>{product.Category.name}</Text>
              <Text>{product.name}</Text>
              <Text>Rp. {product.harga_produk}</Text>
              <Text>Stock : {product.quantity}</Text>
              <Button
                leftIcon={<AiOutlineShoppingCart />}
                mt={"20px"}
                onClick={() => handleAddCart(product)}
              >
                Add to cart
              </Button>
            </CardBody>
          </Card>
        ))}
      </Flex>
      <Box pos={"absolute"} mt={"30vh"} ml={"45vh"}>
        <Button
          mr={"20px"}
          bgColor={"white"}
          color={"black"}
          _hover={{ bgColor: "#223256", color: "white" }}
          onClick={() => prevPage()}
        >
          Prev
        </Button>
        <Button
          bgColor={"white"}
          color={"black"}
          _hover={{ bgColor: "#223256", color: "white" }}
          onClick={() => nextPage()}
        >
          Next
        </Button>
      </Box>
    </>
  );
}