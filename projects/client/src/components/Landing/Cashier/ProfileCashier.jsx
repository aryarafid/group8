import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import SideBarsCashier from "../../sidebar/SideBarsCashier";

export default function ProfileCashier() {
  return (
    <>
      <Flex>
        <SideBarsCashier />
        <Box fontFamily={"montserrat"} color={"black"} fontSize={"32px"}>
          <Box m={"100px 50px"}>
            <Text>Change Profile Picture</Text>
            <Flex>
              <Box>
                <Avatar size={"2xl"} mt={"50px"} ml={"50px"} />
                <Text>Current Picture</Text>
              </Box>
              <Box ml={"50px"}>
                <Avatar size={"2xl"} mt={"50px"} ml={"30px"} />
                <Text>New Picture</Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
