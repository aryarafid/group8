import { Flex } from "@chakra-ui/react";
import ContentCashier from "../Cashier/ContentCashier";
import SideBarsCashier from "../Cashier/SideBarsCashier";
import TransactionCashier from "../Cashier/TransactionCashier";
import ProductAndCatAdmin from "./ProductAndCatAdmin";
import SideBarAdmin from "./SideBarAdmin";

export default function ProductAdmin() {
  return (
    <>
      <Flex>
        <SideBarAdmin />
        <ProductAndCatAdmin />
      </Flex>
    </>
  );
}
