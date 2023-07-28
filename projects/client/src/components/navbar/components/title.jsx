import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Title() {
  return (
    <>
      <Box>
        <Link to={"/"}>
          <Text
            fontSize={"32px"}
            color={"blue"}
            fontFamily={"montserrat"}
            ml={{ base: "10px", sm: "15px", md: "15px", lg: "50px" }}
          >
            Heaven Mart
          </Text>
        </Link>
      </Box>
    </>
  );
}
