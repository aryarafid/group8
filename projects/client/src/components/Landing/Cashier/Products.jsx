import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Products() {
  return (
    <>
      <Flex wrap={"wrap"} ml={"30px"} gap={"20px"}>
        <Card maxW={"500px"} maxH={"350px"}>
          <CardBody>
            <Box bgImage={"miegorengjawa.jpeg"} w={"200px"} h={"180px"}></Box>
            <Text>Mie Goreng Jawa</Text>
            <Text>Rp.2 Juta</Text>
          </CardBody>
          <CardFooter>
            <Button variant={"unstyled"}>Add to cart</Button>
          </CardFooter>
        </Card>

        {/* <Card maxW={"500px"} maxH={"350px"}>
          <CardBody>
            <Box bgImage={"ayamm.jpeg"} w={"200px"} h={"180px"}></Box>
            <Text>Ayam Sakti</Text>
            <Text>Rp.200.000 aja</Text>
          </CardBody>
          <CardFooter>
            <Button variant={"unstyled"}>Add to cart</Button>
          </CardFooter>
        </Card> */}

      </Flex>
    </>
  );
}
