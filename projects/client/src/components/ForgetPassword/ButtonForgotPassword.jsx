import { Button, useDisclosure } from "@chakra-ui/react";
import ForgetPassword from "./ForgetPassword";

export default function ButtonForgorPassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        mt={"20px"}
        ml={{ base: "20px", sm: "60px", md: "60px", lg: "100px" }}
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
