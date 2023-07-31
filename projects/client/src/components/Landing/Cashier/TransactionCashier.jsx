import { Box, Stack, Text } from "@chakra-ui/react";

export default function TransactionCashier() {
  return (
    <>
      <Box
        bgColor={"#223256"}
        w={"450px"}
        fontFamily={"montserrat"}
        color={"white"}
        position={"sticky"}
      >
        <Stack>
          <Box m={"20px 30px"}>
            <Text fontSize={"32px"}>Transactions</Text>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
