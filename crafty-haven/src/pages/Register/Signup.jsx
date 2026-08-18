import React, { useState } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  Input,
  Button,
  Text,
  Link,
  VStack,
  Image,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import logoImage from "../../Image/CraftyHaven.png";

// Custom SVG Icons matching the glassmorphic design
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      setMessage(response.data.msg);
      setFormData({ fullName: "", email: "", password: "" });
      navigate('/login') // Let's use what Login.jsx also expects, Login was going to '/', but original code navigated to '/login' after register!
    } catch (error) {
      setMessage(error.response?.data?.msg || "Registration failed!");
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      backgroundImage="linear-gradient(pink, #9797ED)"
      p={6}
    >
      <Box
        w="full"
        maxW="420px"
        bg="whiteAlpha.600"
        backdropFilter="blur(16px)"
        border="1px solid"
        borderColor="whiteAlpha.500"
        borderRadius="2xl"
        p={{ base: 8, md: 10 }}
        boxShadow="2xl"
        textAlign="center"
      >
        <Image 
          src={logoImage} 
          alt="Crafty Heaven Logo" 
          mx="auto" 
          mb={4} 
          maxH="70px" 
          objectFit="contain" 
        />
        
        <Heading mb={8} color="#7F508B" fontSize="3xl" fontWeight="black" letterSpacing="tight">
          Register
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl isRequired>
              <InputGroup>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  borderRadius="full"
                  bg="whiteAlpha.700"
                  border="1px solid"
                  borderColor="whiteAlpha.500"
                  color="#7F508B"
                  _placeholder={{ color: "#7F508B", opacity: 0.7 }}
                  _hover={{ borderColor: "#7F508B" }}
                  _focus={{ borderColor: "#7F508B", boxShadow: "0 0 0 1px #7F508B", bg: "whiteAlpha.800" }}
                  py={6}
                  px={6}
                  fontWeight="medium"
                />
                <InputRightElement h="100%" pr={4} color="#7F508B">
                  <UserIcon />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <InputGroup>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  borderRadius="full"
                  bg="whiteAlpha.700"
                  border="1px solid"
                  borderColor="whiteAlpha.500"
                  color="#7F508B"
                  _placeholder={{ color: "#7F508B", opacity: 0.7 }}
                  _hover={{ borderColor: "#7F508B" }}
                  _focus={{ borderColor: "#7F508B", boxShadow: "0 0 0 1px #7F508B", bg: "whiteAlpha.800" }}
                  py={6}
                  px={6}
                  fontWeight="medium"
                />
                <InputRightElement h="100%" pr={4} color="#7F508B">
                  <MailIcon />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <InputGroup>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  borderRadius="full"
                  bg="whiteAlpha.700"
                  border="1px solid"
                  borderColor="whiteAlpha.500"
                  color="#7F508B"
                  _placeholder={{ color: "#7F508B", opacity: 0.7 }}
                  _hover={{ borderColor: "#7F508B" }}
                  _focus={{ borderColor: "#7F508B", boxShadow: "0 0 0 1px #7F508B", bg: "whiteAlpha.800" }}
                  py={6}
                  px={6}
                  fontWeight="medium"
                />
                <InputRightElement h="100%" pr={4} color="#7F508B">
                  <LockIcon />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {message && (
              <Text color={message === "Registration failed!" ? "red.500" : "green.600"} fontSize="sm" fontWeight="bold">
                {message}
              </Text>
            )}

            <Button
              type="submit"
              w="full"
              backgroundColor="white"
              color="#7F508B"
              borderRadius="full"
              py={7}
              mt={6}
              fontSize="lg"
              fontWeight="extrabold"
              _hover={{ bg: "gray.100", transform: "translateY(-2px)", boxShadow: "xl" }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.2s"
            >
              Sign Up
            </Button>
          </VStack>
        </form>

        <Text mt={8} fontSize="sm" color="#7F508B" fontWeight="medium">
          Already have an account?{" "}
          <Link as={RouterLink} to="/" fontWeight="extrabold" _hover={{ textDecoration: "underline" }}>
            Login
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Signup;
