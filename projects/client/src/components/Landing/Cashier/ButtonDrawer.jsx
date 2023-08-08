import { Button, useDisclosure } from "@chakra-ui/react";
import DrawerTransactions from "./DrawerTransaction";
import { BsCartCheck } from "react-icons/bs";

export default function ButtonDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" leftIcon={<BsCartCheck />}>
        Cart
      </Button>
      <DrawerTransactions isOpen={isOpen} onClose={onClose} />
    </>
  );
}
