import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineMail } from "react-icons/ai";

const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email address can not be empty"),
});

export default function ForgetPassword({ isOpen, onClose }) {
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          h={"200px"}
          w={{ base: "200px", sm: "250px", md: "300", lg: "400px" }}
        >
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <form onSubmit={formik.handleSubmit}>
                <FormControl
                  isInvalid={formik.touched.email && formik.errors.email}
                >
                  <InputGroup>
                    <InputLeftElement>
                      <AiOutlineMail />
                    </InputLeftElement>
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
                        lg: "350px",
                      }}
                    ></Input>
                    {formik.touched.email && formik.errors.email && (
                      <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    )}
                  </InputGroup>
                  <Button
                    mt={{ base: "10px", sm: "10px", md: "15px", lg: "20px" }}
                    w={{ base: "50px", sm: "100px", md: "150px", lg: "200px" }}
                    type="submit"
                    colorScheme="teal"
                    fontSize={{
                      base: "12px",
                      sm: "12px",
                      md: "14px",
                      lg: "20px",
                    }}
                  >
                    Get Link
                  </Button>
                </FormControl>
              </form>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
