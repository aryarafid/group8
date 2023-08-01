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
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/reducer/AuthReducer";

export default function SideBarsCashier() {
  const { user } = useSelector((state) => state.AuthReducer);
  let imgProfile;
  if (user.imgProfile)
    imgProfile = "http://localhost:8000/" + user.imgProfile.replace(/\\/g, "/");
  console.log("data pada side", user);
  const dispatch = useDispatch();
  return (
    <>
      <Box w={"100px"} h={"100vh"} bgColor={"#223256"} pos={"sticky"}>
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
              <Avatar src={`${imgProfile}`} size={"lg"} />
            </IconButton>
            <Text>Profile</Text>
            <Text>{user.username}</Text>
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
            onClick={() => dispatch(userLogout())}
          ></IconButton>
          <Text>Logout</Text>
        </Box>
      </Box>
    </>
  );
}
