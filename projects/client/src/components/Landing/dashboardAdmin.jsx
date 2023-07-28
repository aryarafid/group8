import { Box, IconButton, Image, Stack } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function DashboardAdmin() {
  return (
    <>
      <Box h={"100vh"} w={"100px"} bgColor={"blue"}>
        <Box pt={"100px"}>
          <Link>
            <Image src="home.png" bgColor={"red"}></Image>
          </Link>
        </Box>
      </Box>
    </>
  );
}
