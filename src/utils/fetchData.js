 import { firebaseApp } from '../firebase-config'
 import { collection, Firestore, getDocs, orderBy, query, doc, getDoc} from 'firebase/firestore'


 
//  fetching all the documents from firebase
export const getAllPosts = async (firestoreDb) => {
    const posts = await getDocs(query(collection(firestoreDb, 'videos'), orderBy('id', 'desc')))
    return posts.docs.map(doc => doc.data())
}

// fetch user info from userid

export const getUserInfo = async(firestoreDb, userId) => {
    const userRef = doc(firestoreDb, 'users', userId)
    const userSnap = await getDoc(userRef)
    if(userSnap.exists()) {
        return userSnap.data()
    } else{
        return 'Nothing there bud!'
    }
}

// fetch the specific video
export const getSinglePost = async(firestoreDb, videoId) =>{
    const videoRef = doc(firestoreDb, 'videos', videoId)
    const videoSnap = await getDoc(videoRef)
    if(videoSnap.exists()) {
        return videoSnap.data()
    } else{
        return 'Nothing there bud!'
    }
}