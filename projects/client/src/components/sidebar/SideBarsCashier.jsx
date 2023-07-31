import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

export default function SideBarsCashier() {
  return (
    <>
      <Box w={"100px"} h={"100vh"} bgColor={"teal"}>
        <Link>
          <Flex>
            <Button
              leftIcon={<BiLogOut />}
              w={"100px"}
              fontSize={{ sm: "0px", lg: "12px" }}
            >
              Logout
            </Button>
            {/* <Icon as="button">
              <BiLogOut size={"100px"} />
              Logout
            </Icon> */}
            {/* <IconButton>Phone</IconButton> */}
            {/* <Button leftIcon={""}>Logout</Button> */}
          </Flex>
        </Link>
        <Image src="home.png"></Image>
      </Box>
    </>
  );
}
