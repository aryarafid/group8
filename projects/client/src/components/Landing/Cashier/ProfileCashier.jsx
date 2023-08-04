import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import SideBarsCashier from "../../sidebar/SideBarsCashier";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeProfile } from "../../../redux/reducer/AuthReducer";
import { color } from "framer-motion";

export default function ProfileCashier() {
  const { user } = useSelector((state) => state.AuthReducer);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  let imgProfile;
  if (user.imgProfile)
    imgProfile = "http://localhost:8000/" + user.imgProfile.replace(/\\/g, "/");

  function changeImage() {
    const [file] = document.getElementById("file").files;
    const imgUrl = URL.createObjectURL(file);
    setImage(imgUrl);
  }
  function handleSubmit() {
    const file = document.getElementById("file").files[0];
    dispatch(changeProfile(file, toast, setLoading));
  }
  return (
    <>
      <Flex>
        <SideBarsCashier />
        <Box fontFamily={"montserrat"} color={"black"} fontSize={"32px"}>
          <Box m={"100px 50px"}>
            <Text>Change Profile Picture</Text>
            <Box>
              <Flex>
                <Box>
                  <Avatar
                    src={`${imgProfile}`}
                    size={"2xl"}
                    mt={"50px"}
                    ml={"50px"}
                  />
                  <Text>Current Picture</Text>
                </Box>
                <Box ml={"50px"}>
                  <Avatar size={"2xl"} src={image} mt={"50px"} ml={"30px"} />
                  <Text>New Picture</Text>
                </Box>
              </Flex>
              <Input
                type="file"
                variant={"unstyled"}
                onChange={changeImage}
                id="file"
              ></Input>
              <Button
                onClick={handleSubmit}
                w={"200px"}
                color={"white"}
                bgColor="#223256"
                _hover={{ bgColor: "teal", color: "#223256" }}
              >
                {isLoading ? <Spinner /> : "Change Profile"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
