import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ModalTransaction({ isOpen, onClose }) {
  const [uangCustomer, setUangCustomer] = useState(0);
  const [kembalian, setKembalian] = useState(0);
  const { totalHarga } = useSelector((state) => state.ProductReducer);
  function handlePay() {
    const total = uangCustomer - totalHarga;
    setKembalian(total);
  }
  function reset() {
    setKembalian(0);
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={"montserrat"}>
          <ModalHeader>Checkout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Total Bayar : Rp.{totalHarga}</Text>
            <Input
              placeholder="Uang Customer"
              onChange={(e) => setUangCustomer(e.target.value)}
              borderColor={"blue"}
              _hover={{ borderColor: "green" }}
            ></Input>
            <Text>Kembalian : {kembalian}</Text>
          </ModalBody>

          <ModalFooter gap={"10px"}>
            <Button onClick={handlePay} colorScheme="green">
              Process
            </Button>
            <Button mr={3} onClick={reset}>
              Reset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
