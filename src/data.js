import { IoGameController } from 'react-icons/io5'
import { Image } from '@chakra-ui/react'
import ow2logo from '../src/img/ow2logo.png'
import fglogo from '../src/img/fglogo.png'
import flogo from '../src/img/flogo.png'
import rlogo from '../src/img/rlogo.png'
import vallogo from '../src/img/vallogo.png'
import etex1 from '../src/img/etex1.png'

//  ADD LOGOS FOR THE GAMES INSTEAD OF THE ICONS 
export const categories = [
    {
        id: 1,
        name: 'Overwatch 2',
        iconSrc:  <Image src= {ow2logo} alt='Overwatch 2' borderRadius={'full'} boxSize='35px'/>
    },
    {
        id: 2,
        name: 'Valorant',
        iconSrc: <Image src= {vallogo} alt='Valorant' borderRadius={'full'} boxSize='35px'/>
    },
    {
        id: 3,
        name: 'Rust',
        iconSrc: <Image src= {rlogo} alt='Rust' borderRadius={'full'} boxSize='35px'/>
    },
    {
        id: 4,
        name: 'Elden Ring',
        iconSrc: <Image src= {etex1} alt=   'Elden Ring' borderRadius={'full'} boxSize='35px'/>
    },
    {
        id: 5,
        name: 'Fall Guys',
        iconSrc: <Image src= {fglogo} alt='Fallguys' borderRadius={'full'} boxSize='35px'/>
    },
    {
        id: 6,
        name: 'Fortnite',
        iconSrc:<Image src= {flogo} alt='Fortnite' borderRadius={'full'} boxSize='35px'/>
    },
    {
        id: 7,
        name: 'Other',
        iconSrc: <IoGameController fontSize={30} />
    }
]