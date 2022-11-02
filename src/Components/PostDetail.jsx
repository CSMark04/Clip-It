import { Box, Flex, Text, useColorModeValue, Grid, GridItem, Image, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoHome } from 'react-icons/io5'
import { Link, useParams } from 'react-router-dom'
import { getSinglePost } from '../utils/fetchData'
import { firebaseApp } from '../firebase-config'
import { getFirestore } from 'firebase/firestore'
import Spinner from './Spinner'
import ReactPlayer from 'react-player'
import { getUserInfo } from '../utils/fetchData'
import HTMLReactParser from 'html-react-parser'


const PostDetail = () => {
  const bg = useColorModeValue('blackAlpha.700', 'gray.900')
  const firestoreDb = getFirestore(firebaseApp)
  const [videoInfo, setvideoInfo] = useState(null)
  const [loading, setloading] = useState(false)
  const { videoId } = useParams()
  const textColor = useColorModeValue('gray.900', 'gray.50')
  const [userInfo, setuserInfo] = useState(null)
  const { colorMode } = useColorMode()


  useEffect(() => {
    if (videoId) {
      setloading(true)
      getSinglePost(firestoreDb, videoId).then(data => {
        getUserInfo(firestoreDb, data.userId).then((user) => {
          setuserInfo(user)
        })
        setvideoInfo(data)
        setloading(false)
      })
    }
  }, [])

  if (loading) return <Spinner msg={'Loading your Clip!'} />


  return (
    <Flex
      width={'full'}
      height='auto'
      justifyContent={'center'}
      alignItems='center'
      direction={'column'}
      py={2}
      px={4}
    >
      <Flex
        alignItems={'center'}
        width='full'
        my={4}
      >
        <Link to={'/'}>
          <IoHome fontSize={25} />
        </Link>
        <Box width={'1px'} height='25px' bg={'gray.500'} mx={2}></Box>
        <Text color={textColor} fontWeight='semibold' width={'100%'}> {videoInfo?.title} </Text>
      </Flex>
      <Grid templateRows='repeat(2, 1fr)' templateColumns={'repeat(3,1fr)'} gap={2} width='100%'>
        <GridItem width={'100%'} colSpan='3'>
          <Flex width={'full'} bg='black' position='relative'>
            <ReactPlayer
              url={videoInfo?.videoUrl}
              width='100%'
              height={'100%'}
              controls
            />
          </Flex>
        </GridItem>

        <GridItem width={'100%'} colSpan='3' >
          <Flex width={'full'} position='relative'>
            {
              userInfo && (
                <Flex

                  direction={'column'}
                  width='full'
                >
                  <Flex width='full' alignItems='center' gap={'20px'}>
                    <Image src={userInfo?.photoURL} />
                    <Text fontSize='35px' fontWeight={'semibold'}>{userInfo?.displayName}</Text>
                  </Flex>
                </Flex>
              )
            }
          </Flex>
          {videoInfo?.description && (
            <Flex my={6} direction='column'><Text my={2} fontSize='35px' fontWeight={'semibold'}>Description</Text>
            <Text my={2} fontSize='20px' fontWeight={'semibold'}>{HTMLReactParser(videoInfo?.description)}</Text>
            </Flex>
          )}
        </GridItem>

      </Grid>
    </Flex>
  )
}

export default PostDetail