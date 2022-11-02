import { Flex, Image, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserInfo } from '../utils/fetchData'
import { firebaseApp } from '../firebase-config'
import { getFirestore } from 'firebase/firestore'

const VideoPin = ({ data }) => {
  const firestoreDb = getFirestore(firebaseApp)
  const [userId, setuserId] = useState(null)
  const [userInfo, setuserInfo] = useState(null)
  const { colorMode } = useColorMode()
  const bg = useColorModeValue('blackAlpha.700', 'gray.900')
  const textColor = useColorModeValue('gray.100', 'gray.100')


  useEffect(() => {
    if (data) setuserId(data.userId)
    if (userId) getUserInfo(firestoreDb, userId).then((data) => {
      setuserInfo(data)
    })

  }, [userId])

  return (
    <Flex>
    <Flex
      justifyContent={'space-between'}
      direction='column'
      alignContent='center'
      cursor={'pointer'}
      rounded='md'
      shadow={'lg'}
      overflow={'hidden'}
      position='relative'
      bg='grey.200'
      width='full'
    >
      <Link to={`/videoDetail/${data.id}`}>
        <video  width='100%'src={data.videoUrl} muted onMouseOver={(e) => e.target.play()} onMouseOut={(e) => e.target.pause()} />
      </Link>
      <Flex
        position={'absolute'}
        p={'2'}
        bottom='0'
        bg={bg}
        width='full'
        direction={'column'}
        
      >
        <Flex
          width={'full'}
          gap='10px'
          alignItems={'center'}
        >
          <Link to={`/userDetail/${userId}`}>
            <Image src={userInfo?.photoURL}
              rounded='full'
              width={'50px'}
              height={'50px'}
              border='2px'
              borderColor={bg}
              mt={'-10px'}
            />
          </Link>
          <Text color={textColor} fontSize={'20px'} >{data.title}</Text>
        </Flex>
      </Flex>
    </Flex>
    </Flex>
  )
}

export default VideoPin