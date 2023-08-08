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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../../../redux/reducer/ProductReducer";

export default function ModalTransaction({ isOpen, onClose }) {
  const toast = useToast();
  const [uangCustomer, setUangCustomer] = useState(0);
  const { cart } = useSelector((state) => state.ProductReducer);
  const [kembalian, setKembalian] = useState(0);
  const { totalHarga } = useSelector((state) => state.ProductReducer);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    // const bayar = document.getElementById("totalBayar").value;
    dispatch(payment(totalHarga, cart, toast));
  };
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
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Text id="totalHarga">Total Bayar : Rp.{totalHarga}</Text>
              <Input
                placeholder="Uang Customer"
                onChange={(e) => setUangCustomer(e.target.value)}
                borderColor={"blue"}
                _hover={{ borderColor: "green" }}
              ></Input>
              <Text>Kembalian : {kembalian}</Text>
            </ModalBody>

            <ModalFooter gap={"10px"}>
              <Button type="submit" onClick={handlePay} colorScheme="green">
                Process
              </Button>
              <Button mr={3} onClick={reset}>
                Reset
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
