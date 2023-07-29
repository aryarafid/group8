import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginAuth } from "../../redux/reducer/AuthReducer";

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
      dispath(loginAuth(values));
    },
  });

  return (
    <>
      <Box w={"100%"} h={"100vh"}>
        <Stack>
          <Box
            w={"800px"}
            h={"550px"}
            bgGradient={
              "radial-gradient(circle at 50% 44.4%, #4f3f66 0, #3b2e5f 25%, #1f1f59 50%, #001253 75%, #00004e 100%)"
            }
            fontFamily={"montserrat"}
            m={"100px auto"}
            color={"white"}
            borderRadius={"20px"}
          >
            <Text fontSize={"48px"} pt={"40px"} textAlign={"center"}>
              Login
            </Text>
            <form onSubmit={formik.handleSubmit}>
              <Box w={"500px"} ml={"150px"}>
                <Text pt={"5px"} fontSize={"32px"}>
                  Username
                </Text>
                <FormControl
                  isInvalid={formik.touched.username && formik.errors.username}
                >
                  <Input
                    w={"500px"}
                    variant={"flushed"}
                    placeholder="Input admin username"
                    id="username"
                    name="username"
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  ></Input>
                  {formik.touched.username && formik.errors.username && (
                    <FormErrorMessage>
                      {formik.errors.username}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.password && formik.errors.password}
                >
                  <Text pt={"32px"} fontSize={"32px"}>
                    Password
                  </Text>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      w={"500px"}
                      variant={"flushed"}
                      placeholder="Type here"
                      id="password"
                      name="password"
                      value={formik.values.password}
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
                  {formik.touched.password && formik.errors.password && (
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Button
                  mt={"50px"}
                  w={"500px"}
                  colorScheme="green"
                  type="submit"
                >
                  Submit Admin
                </Button>
              </Box>
            </form>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
