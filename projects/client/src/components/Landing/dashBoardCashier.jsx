import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function DashBoardCashier() {
  return (
    <>
      <Box w={"80px"} h={"100vh"} bgColor={"red"}>
        <Link>
          <Image src="home.png"></Image>
        </Link>
      </Box>
    </>
  );
}
