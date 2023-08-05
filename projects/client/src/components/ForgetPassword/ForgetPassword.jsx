import {
  Button,
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
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email address can not be empty"),
});

export default function ForgetPassword({ isOpen, onClose }) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const resetPassword = async (values) => {
    try {
      setLoading(true);
      const respon = await axios.put(
        `${URL_API}/auth-management/auth/forgotPassword`,
        {
          email: values.email,
          FE_URL: "http://localhost:3000",
        }
      );
      console.log("forget password => ", respon);
      toast({
        title: "Link reset password send",
        description: "Please check your email",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Invalid emaill address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
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
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(20deg)" />
        <ModalContent
          h={"200px"}
          w={{ base: "200px", sm: "300px", md: "350px", lg: "400px" }}
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
                  </InputGroup>
                  {formik.touched.email && formik.errors.email && (
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  )}
                  {isLoading ? (
                    <Button
                      mt={{ base: "10px", sm: "10px", md: "15px", lg: "20px" }}
                      w={{
                        base: "50px",
                        sm: "100px",
                        md: "150px",
                        lg: "200px",
                      }}
                      type="submit"
                      borderRadius={"10px"}
                      colorScheme="teal"
                      fontSize={{
                        base: "12px",
                        sm: "12px",
                        md: "14px",
                        lg: "20px",
                      }}
                    >
                      <Spinner />
                    </Button>
                  ) : (
                    <Button
                      mt={{ base: "10px", sm: "10px", md: "15px", lg: "20px" }}
                      w={{
                        base: "50px",
                        sm: "100px",
                        md: "150px",
                        lg: "200px",
                      }}
                      type="submit"
                      borderRadius={"10px"}
                      colorScheme="teal"
                      fontSize={{
                        base: "12px",
                        sm: "12px",
                        md: "14px",
                        lg: "20px",
                      }}
                      rightIcon={<BsArrowUpRight />}
                    >
                      Get link
                    </Button>
                  )}
                </FormControl>
              </form>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
