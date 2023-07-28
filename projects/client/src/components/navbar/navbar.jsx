import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import Title from "./components/title";
import ButtonLogin from "./components/ButtonLogin";
import Hamburger from "./components/Hamburger";
import NavbarDesktop from "./components/NavbarDesktop";
import NavbarMobile from "./components/NavbarMobile";

export default function Navbar() {
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");
  return (
    <>
      <Box w={"100%"} bgColor={"black"} h={"60px"}>
        {isLargerThanMD ? <NavbarDesktop /> : <NavbarMobile />}
      </Box>
    </>
  );
}
