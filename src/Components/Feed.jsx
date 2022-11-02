
import React, { useState, useEffect } from 'react'
import { Flex, SimpleGrid } from '@chakra-ui/react'
import { firebaseApp } from '../firebase-config'
import { getFirestore } from 'firebase/firestore'
import { getAllPosts } from '../utils/fetchData'
import Spinner from '../Components/Spinner'
import VideoPin from './VideoPin'


const Feed = () => {
  const firestoreDb = getFirestore(firebaseApp)
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllPosts(firestoreDb).then(data => {
      console.log(data)
      setPosts(data)
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <Flex >
      <Spinner msg={'loading your clips!'} />
    </Flex>
  )
  return (
    <SimpleGrid minChildWidth='full' spacing='15px' width={'full'} autoColumns='max-content' px='2' overflowX={'hidden'}>
      {posts && posts.map((data) => (
        <VideoPin key={data.id}  height='380px' data={data}/>
      ))}
    </SimpleGrid>
  )
}

export default Feed
