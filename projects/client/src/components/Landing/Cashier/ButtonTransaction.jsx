import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import ModalTransaction from "./ModalTransaction";

export default function ButtonTransaction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        colorScheme="green"
        mt={"10px"}
        w={{ md: "180px", lg: "200px" }}
        onClick={onOpen}
      >
        Bayar
      </Button>
      <ModalTransaction isOpen={isOpen} onClose={onClose} />
    </>
  );
}
