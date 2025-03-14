import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FormLabel, FormControl, VStack, Input, InputGroup, InputRightElement, Button, Image } from '@chakra-ui/react';

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmpswd, setConfirmpswd] = useState("");
    const [pswd, setPswd] = useState("");
    const [pic, setPic] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !pswd || !confirmpswd) {
            toast({
                title: "Please Fill All Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        if (pswd !== confirmpswd) {
            toast({
                title: "Passwords don't Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user",  
                { name, email, password: pswd, pic },
                config
            );

            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
            
        } catch (error) {
            toast({
                title: "Error Occurred!!",
                description: error.response?.data?.message || "Something went wrong!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <VStack spacing="10px">
            <FormControl id="name" isRequired>
                <FormLabel>NAME</FormLabel>
                <Input 
                    placeholder="Enter Name" 
                    onChange={(e) => setName(e.target.value)} 
                />
            </FormControl>

            <FormControl id="email" isRequired>
                <FormLabel>EMAIL</FormLabel>
                <Input 
                    placeholder="Enter Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </FormControl>

            <FormControl id="pswd" isRequired>
                <FormLabel>PASSWORD</FormLabel>
                <InputGroup>
                    <Input 
                        type={show ? "text" : "password"} 
                        placeholder="Enter Password" 
                        onChange={(e) => setPswd(e.target.value)} 
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="cnfpswd" isRequired>
                <FormLabel>CONFIRM PASSWORD</FormLabel>
                <InputGroup>
                    <Input 
                        type={show ? "text" : "password"} 
                        placeholder="Enter Confirm Password" 
                        onChange={(e) => setConfirmpswd(e.target.value)} 
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="pic">
                <FormLabel>PROFILE PHOTO LINK</FormLabel>
                <Input 
                    placeholder="Enter Profile Image URL" 
                    onChange={(e) => setPic(e.target.value)} 
                />
                {pic && (
                    <Image 
                        src={pic} 
                        alt="Profile Preview" 
                        boxSize="100px" 
                        objectFit="cover" 
                        mt={2} 
                    />
                )}
            </FormControl>

            <Button 
                colorScheme="teal" 
                width="100%" 
                style={{ marginTop: 15 }} 
                onClick={submitHandler} 
                isLoading={loading}
            >
                SIGN UP
            </Button>
        </VStack>
    );
};

export default Signup;
