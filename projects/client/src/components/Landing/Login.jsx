import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginAuth } from "../../redux/reducer/AuthReducer";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import { BsPersonCircle } from "react-icons/bs";
import { BiSolidLockAlt } from "react-icons/bi";
import ButtonForgorPassword from "../ForgetPassword/ButtonForgotPassword";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .matches(
      /^.*(?=.{6,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Username must contain at least 6 characters, one uppercase, one number"
    ),
  password: Yup.string()
    .matches(
      /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 6 characters, one uppercase, one number and one special case character"
    )
    .required("Password is required"),
});
export default function Login() {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const dispath = useDispatch();
  const handleClick = () => {
    setShow(!show);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispath(loginAuth(values, setLoading, toast));
    },
  });

  return (
    <>
      <Box w={"100%"} h={"100vh"} bgImage={"Wave.svg"} bgPos={"center"}>
        <Stack>
          <Box
            w={{ base: "250px", sm: "380px", md: "450px", lg: "600px" }}
            h={"600px"}
            fontFamily={"montserrat"}
            m={{
              base: "50px auto",
              sm: "60px auto",
              md: "60px auto",
              lg: "80px auto",
            }}
            color={"white"}
            borderRadius={"20px"}
          >
            <Text fontSize={"48px"} pt={"40px"} textAlign={"center"}>
              Ei8th Cashier
            </Text>
            <form onSubmit={formik.handleSubmit}>
              <Box
                w={{ base: "200px", sm: "250px", md: "350px", lg: "400px" }}
                m={"24px auto"}
                // bgColor={"red"}
              >
                <FormControl
                  isInvalid={formik.touched.username && formik.errors.username}
                >
                  <InputGroup>
                    <InputLeftElement m={"20px 10px"}>
                      <BsPersonCircle size={"20px"} />
                    </InputLeftElement>
                    <Input
                      m={"20px 10px"}
                      w={{
                        base: "300px",
                        sm: "350px",
                        md: "450px",
                        lg: "500px",
                      }}
                      focusBorderColor="green.200"
                      placeholder="Username"
                      id="username"
                      name="username"
                      type="text"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    ></Input>
                  </InputGroup>
                  {formik.touched.username && formik.errors.username && (
                    <FormErrorMessage>
                      {formik.errors.username}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.password && formik.errors.password}
                >
                  <InputGroup>
                    <InputLeftElement m={"20px 10px"}>
                      <BiSolidLockAlt size={"20px"} />
                    </InputLeftElement>
                    <Input
                      focusBorderColor="green.200"
                      m={"20px 10px"}
                      type={show ? "text" : "password"}
                      w={{
                        base: "300px",
                        sm: "350px",
                        md: "450px",
                        lg: "500px",
                      }}
                      placeholder="Password"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    ></Input>
                    <InputRightElement>
                      <Button
                        onClick={handleClick}
                        variant={"unstyled"}
                        mt={"40px"}
                        mr={"50px"}
                      >
                        {show ? (
                          <AiFillEyeInvisible
                            size={{
                              base: "8px",
                              sm: "12px",
                              md: "16px",
                              lg: "16px",
                            }}
                          />
                        ) : (
                          <AiFillEye
                            size={{
                              base: "8px",
                              sm: "12px",
                              md: "16px",
                              lg: "16px",
                            }}
                          />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.password && formik.errors.password && (
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <Button
                  mt={"50px"}
                  w={{ base: "200px", sm: "250px", md: "350px", lg: "400px" }}
                  colorScheme="green"
                  type="submit"
                >
                  {isLoading ? <Spinner /> : "Submit"}
                </Button>
              </Box>
            </form>
            <ButtonForgorPassword />
          </Box>
        </Stack>
      </Box>
    </>
  );
}
