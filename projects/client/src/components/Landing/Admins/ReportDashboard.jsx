import { Box, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SideBarAdmin from "./SideBarAdmin";
import ProductAndCatAdmin from "./ProductAndCatAdmin";
import Report from "./Report";

export default function ReportDashboard() {
    return (
        <>
            <Flex fontFamily={"montserrat"}>
                <SideBarAdmin />
                <Report />
            </Flex>
        </>
    );
}
