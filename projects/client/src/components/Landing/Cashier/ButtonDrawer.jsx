import { Button, useDisclosure } from "@chakra-ui/react";
import DrawerTransactions from "./DrawerTransaction";
import { BsCartCheck } from "react-icons/bs";

export default function ButtonDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="teal"
        leftIcon={<BsCartCheck />}
        borderRadius={"10px"}
        variant={"unstyled"}
        _hover={{ bgColor: "teal", color: "white" }}
        w={"100px"}
      >
        Cart
      </Button>
      <DrawerTransactions isOpen={isOpen} onClose={onClose} />
    </>
  );
}
