import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email address can not be empty"),
});

export default function ForgetPassword() {
  const resetPassword = async (values) => {
    try {
      const respon = await axios.put(
        `http://localhost:8000/mini-project/api/auth/forgotPassword`,
        {
          email: values.email,
          FE_URL: "http://localhost:3000",
        }
      );
      console.log("forget password => ", respon);
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ResetSchema,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });
  return (
    <>
      <Box
        mt={"20px"}
        ml={{ base: "64px", sm: "64px", md: "100px", lg: "150px" }}
      >
        <Text>Forget your password ?</Text>
        <Flex mt={"20px"}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              isInvalid={formik.touched.email && formik.errors.email}
            >
              <Input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email Address"
                w={{
                  base: "200px",
                  sm: "250px",
                  md: "300px",
                  lg: "300px",
                }}
                variant={"flushed"}
              ></Input>
              {formik.touched.email && formik.errors.email && (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              )}
              <Button
                w={{ base: "50px", sm: "100px", md: "150px", lg: "200px" }}
                type="submit"
                colorScheme="yellow"
                fontSize={{ base: "12px", sm: "12px", md: "16px", lg: "20px" }}
              >
                Reset Password
              </Button>
            </FormControl>
          </form>
        </Flex>
      </Box>
    </>
  );
}
