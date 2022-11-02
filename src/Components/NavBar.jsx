import React, { useState, useContext, useEffect } from 'react'
import { signOut } from "firebase/auth";
import tlogo from '../img/tlogo.png'
import logo2 from '../img/logo2.png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider';
import {
    useColorModeValue, Flex, useColorMode, Image, Input, InputLeftElement, InputGroup, Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { IoSearch, IoMoon, IoSunny, IoAdd, IoLogOut } from 'react-icons/io5'
import { auth } from '../firebase-config';

const NavBar = ({ user }) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { currentUser } = useContext(AuthContext);
    const bg = useColorModeValue('gray.600', 'gray.300')
    const navigate = useNavigate();
    const clickLogout = () => {
        if (currentUser) {
          signOut(auth);
        } else {
          navigate("/login");
        }
      };

    return (
        <Flex
            justifyContent={'space-between'}
            alignItems='center'
            width={'full'}
            p={4}
            bg={useColorModeValue('gray.100', 'gray.900')}
        >
            <Link to={'/'}>
                <Image src={colorMode == 'light' ? tlogo : logo2} width={'180px'} height={'120px'} />

            </Link>
            

            <Flex
                justifyContent={'center'}
                alignContent='center'
            >
                <Flex
                    width={'40px'}
                    height='40px'
                    justifyContent={'center'}
                    alignItems='center'
                    cursor={'pointer'}
                    borderRadius='5px'
                    onClick={toggleColorMode}
                >
                    {colorMode == 'light' ? (<IoMoon fontSize={25} />) : (<IoSunny fontSize={25} />)}
                </Flex>

                {/* create button */}
                <Link to={'/create'}>
                    <Flex
                        justifyContent={'center'}
                        alignItems='center'
                        bg={bg}
                        width='40px'
                        height='40px'
                        borderRadius='5px'
                        mx={6}
                        cursor='pointer'
                        _hover={{ shadow: 'md' }}
                        transition='ease-in-out'
                        transitionDuration={'0.3s'}


                    >
                        <IoAdd fontSize={25} color={`${colorMode == 'dark' ? '#111' : '#f1f1f1'}`} />
                    </Flex>
                </Link>
                <Menu>
                    <MenuButton>
                        <Image src={ user?.photoURL } width='40px' height='40px' rounded='full' />
                    </MenuButton>
                    <MenuList shadow={'lg'}>
                        <Link to={''}>
                        <MenuItem>My Account</MenuItem>
                        </Link>
                        <Link to={'/login'}>
                         <MenuItem onClick={clickLogout} flexDirection={'row'} alignItems='center' gap={4}>Logout <IoLogOut fontSize={20} /></MenuItem>
                         </Link>                        
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}

export default NavBar