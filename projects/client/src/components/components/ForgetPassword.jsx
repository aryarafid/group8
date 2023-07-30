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
      <Box ml={"150px"} mt={"20px"}>
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
                w={"300px"}
                variant={"flushed"}
              ></Input>
              {formik.touched.email && formik.errors.email && (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              )}
              <Button w={"200px"} type="submit" colorScheme="yellow">
                Reset Password
              </Button>
            </FormControl>
          </form>
        </Flex>
      </Box>
    </>
  );
}
