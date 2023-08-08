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
import { BiSolidCategory, BiSolidHome, BiUser } from "react-icons/bi";
import { AiOutlineShop } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../redux/reducer/AuthReducer";
export default function SideBarAdmin() {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Box
        w={"100px"}
        h={"100vh"}
        bgColor={"teal"}
        position={"sticky"}
        color={"white"}
        fontFamily={"montserrat"}
        top={0} zIndex="sticky"
      >
        <Box textAlign={"center"}>
          <AiOutlineShop size={"sm"} />
          <Text>Welcome</Text>
          <Text>{user.role}</Text>
        </Box>
        <Link to={"/productAdmin"}>
          <Box textAlign={"center"} mt={"20px"}>
            <IconButton
              as="button"
              color={"white"}
              variant={"unstyled"}
              w={"80px"}
              h={"100px"}
              icon={<BiSolidCategory size={"2xl"} />}
            ></IconButton>
            <Text>Product & Category</Text>
          </Box>
        </Link>

        <Box textAlign={"center"} color={"white"} fontFamily={"montserrat"}>
          <Link to={"/cashierAdmin"}>
            <IconButton
              as={"button"}
              variant={"unstyled"}
              w={"80px"}
              h={"100px"}
              icon={<BiUser size={"2xl"} />}
            ></IconButton>
            <Text fontSize={"12px"}>Cashier Management</Text>
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
            onClick={() => dispatch(userLogout())}
            icon={<BiLogOut size={"2xl"} />}
          ></IconButton>
          <Text>Logout</Text>
        </Box>

      </Box>
    </>
  );
}
