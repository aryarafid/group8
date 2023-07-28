import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ButtonLogin() {
  return (
    <>
      <Box>
        <Link to={"/login"}>
          <Button colorScheme="green" mt={"10px"} w={"100px"}>
            Login
          </Button>
        </Link>
      </Box>
    </>
  );
}
