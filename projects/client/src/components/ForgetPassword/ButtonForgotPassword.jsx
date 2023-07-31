import { Button, useDisclosure } from "@chakra-ui/react";
import ForgetPassword from "./ForgetPassword";

export default function ButtonForgorPassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        mt={"20px"}
        ml={{ base: "20px", sm: "120px", md: "200px", lg: "300px" }}
        w={"200px"}
        variant={"unstyled"}
        borderRadius={"30px"}
      >
        Forget your password ?
      </Button>
      <ForgetPassword isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
