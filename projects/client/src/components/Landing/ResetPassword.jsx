import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import { Form, useFormik } from "formik";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";

const resetSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Username must contain at least  characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("newPassword is required"),
});

export default function ResetPassword() {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  const resetPass = async (values) => {
    const url = window.location.href.split("/");
    const token = url.pop();
    try {
      const respon = await axios.patch(
        "http://localhost:8000/mini-project/api/auth/resetPassword",
        {
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ini respon ganti password =>", respon);
      toast({
        title: "Password reset",
        description: "Please login again",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetSchema,
    onSubmit: (values) => {
      resetPass(values);
    },
  });

  return (
    <>
      <Box
        w={"500px"}
        h={"500px"}
        m={"100px auto"}
        bgGradient={
          "radial-gradient(circle at 50% 44.4%, #4f3f66 0, #3b2e5f 25%, #1f1f59 50%, #001253 75%, #00004e 100%)"
        }
        fontFamily={"montserrat"}
        color={"white"}
        borderRadius={"20px"}
      >
        <Text align={"center"} pt={"20px"} fontSize={"40px"}>
          Reset Password
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <Box w={"400px"} m={"30px auto"}>
            <FormControl
              isInvalid={
                formik.touched.newPassword && formik.errors.newPassword
              }
            >
              <Text pt={"32px"} fontSize={"32px"}>
                New Password
              </Text>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  w={"500px"}
                  variant={"flushed"}
                  placeholder="Type here"
                  id="newPassword"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                ></Input>
                <InputRightElement>
                  <Button onClick={handleClick} variant={"unstyled"}>
                    {show ? (
                      <AiFillEyeInvisible size={"40px"} />
                    ) : (
                      <AiFillEye size={"40px"} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <FormErrorMessage>{formik.errors.newPassword}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            >
              <Text fontSize={"24px"} mt={"32px"}>
                Confirm Password
              </Text>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  w={"500px"}
                  variant={"flushed"}
                  placeholder="Type here"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                ></Input>
                <InputRightElement>
                  <Button onClick={handleClick} variant={"unstyled"}>
                    {show ? (
                      <AiFillEyeInvisible size={"40px"} />
                    ) : (
                      <AiFillEye size={"40px"} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <FormErrorMessage>
                    {formik.errors.confirmPassword}
                  </FormErrorMessage>
                )}
            </FormControl>
            <Button mt={"20px"} w={"400px"} colorScheme="green" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
