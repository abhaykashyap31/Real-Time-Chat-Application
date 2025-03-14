import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { useState } from 'react';
import axios from "axios"; // Corrected axios import
import { useNavigate } from 'react-router-dom'; // Updated for React Router v6+
import { useToast } from '@chakra-ui/react';

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [pswd, setPswd] = useState("");
    const [loading, setLoading] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const navigate = useNavigate(); // Replaces useHistory

    const submitHandler = async () => {
        setLoading(true);

        if (!email || !pswd) { // Fixed condition to check if fields are empty
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

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, pswd },
                config
            );

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats"); // Navigate to the chats page

        } catch (error) {
            toast({
                title: "Error Occurred!!",
                description: error.response?.data?.message || "Something went wrong!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

    return (
        <VStack>
            <FormControl id="email" isRequired>
                <FormLabel>EMAIL</FormLabel>
                <Input 
                    placeholder="Enter Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </FormControl>

            <FormControl id="pswd" isRequired>
                <FormLabel>PASSWORD</FormLabel>
                <InputGroup>
                    <Input 
                        type={show ? "text" : "password"} 
                        placeholder="Enter Password"
                        value={pswd} 
                        onChange={(e) => setPswd(e.target.value)} 
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button 
                colorScheme="teal" 
                width="100%" 
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                LOGIN
            </Button>

            <Button 
                colorScheme="gray" 
                width="100%" 
                style={{ marginTop: 15 }}
                onClick={() => {
                    setEmail("guest@example.com");
                    setPswd("123456");
                }} 
                isLoading={loading}
            >
                GET GUEST USER CREDENTIALS
            </Button>
        </VStack>
    );
};

export default Login;
