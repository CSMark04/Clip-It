import React, { useState } from 'react'
import kenbg from '../img/kenbg.jpg'
import {
    Flex,
    HStack,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { firebaseApp } from '../firebase-config'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'


const Login = () => {
    const firebaseAuth = getAuth(firebaseApp)
    const provider = new GoogleAuthProvider()
    const firebaseDb = getFirestore(firebaseApp)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        function onRegister() {
            signInWithEmailAndPassword(auth, email, password).catch((error) =>
                console.log(error)
            );
            navigate("/");
        }
        onRegister();
    };

    const loginGoogle = async () => {
        const { user } = await signInWithPopup(firebaseAuth, provider)
        const { refreshToken, providerData } = user
        localStorage.setItem('user', JSON.stringify(providerData))
        localStorage.setItem('accessToken', JSON.stringify(refreshToken))

        await setDoc(doc(firebaseDb, 'users', providerData[0].uid), providerData[0])

        navigate('/', { replace: true })
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to watch all of our cool <Link color={'blue.400'}>clips</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel placeholder="This doesn't work yet">Email address</FormLabel>
                            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel placeholder="This doesn't work yet">Password</FormLabel>
                            <Input type="password" onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button onSubmit={handleSubmit}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                            <HStack>
                                <Button w='full' leftIcon={<FcGoogle fontSize={25} />}

                                    shadow={'lg'}
                                    onClick={() => loginGoogle()}
                                >
                                    Sign in With Google
                                </Button>
                            </HStack>
                           
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login