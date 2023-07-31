import {
    Avatar,
    Box,
    Button,
    Flex,
    Icon,
    IconButton,
    Image,
    Spacer,
    Text,
  } from "@chakra-ui/react";
  import { Link, useNavigate } from "react-router-dom";
  import { BiLogOut } from "react-icons/bi";
  import { BsFillPersonFill } from "react-icons/bs";
  import { BiSolidCategory, BiSolidHome } from "react-icons/bi";
  import { useDispatch } from "react-redux";
export default function SideBarAdmin(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Box w={"100px"} h={"100vh"} bgColor={"#223256"} position={"sticky"}>
        <Link to={"/category"}>
          <Box
            textAlign={"center"}
            color={"white"}
            fontFamily={"montserrat"}
            mt={"100px"}
          >
            <IconButton
              as="button"
              color={"white"}
              variant={"unstyled"}
              w={"80px"}
              h={"100px"}
              icon={<BiSolidCategory size={"2xl"} />}
            ></IconButton>
            <Text>Category</Text>
          </Box>
        </Link>
        <Box textAlign={"center"} color={"white"} fontFamily={"montserrat"}>
          <Link to={"/profile"}>
            <IconButton
              as={"button"}
              variant={"unstyled"}
              w={"80px"}
              h={"100px"}
            >
              <Avatar src={``} size={"lg"} />
            </IconButton>
            <Text>Profile</Text>
          </Link>
        </Box>
        <Link to={"/"}>
          <Box textAlign={"center"} color={"white"} fontFamily={"montserrat"}>
            <IconButton
              as="button"
              color={"white"}
              variant={"unstyled"}
              w={"80px"}
              h={"100px"}
              icon={<BiSolidHome size={"2xl"} />}
            ></IconButton>
            <Text>Home</Text>
          </Box>
        </Link>
        <Box textAlign={"center"} color={"white"} fontFamily={"montserrat"}>
          <IconButton
            as="button"
            color={"white"}
            variant={"unstyled"}
            w={"80px"}
            h={"100px"}
            icon={<BiLogOut size={"2xl"} />}
          ></IconButton>
          <Text>Logout</Text>
        </Box>
      </Box>
    </>
  );
}
