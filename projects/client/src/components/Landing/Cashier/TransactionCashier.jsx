import { Box, Stack, Text } from "@chakra-ui/react";

export default function TransactionCashier() {
  return (
    <>
      <Box
        bgColor={"black"}
        w={"450px"}
        fontFamily={"montserrat"}
        color={"white"}
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
