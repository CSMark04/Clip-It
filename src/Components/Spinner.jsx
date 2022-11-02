import React, { useEffect } from 'react'
import { Flex, Progress, Text, Tooltip } from '@chakra-ui/react'
import { FidgetSpinner } from "react-loader-spinner"

const Spinner = ({ msg, progress }) => {
    useEffect(() => { }, [progress])
    return (
        <Flex
            direction={'column'}
            alignItems='center'
            justifyContent={'center'}
            height='full'
            px={10}
        >
            <FidgetSpinner
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
                ballColors={['#ff0000', '#00ff00', '#0000ff']}
                backgroundColor="0000"
            />
            <Text fontSize={25} textAlign='center' px={2}>
                {msg}
            </Text>
            {progress && (
                <Progress
                    mt={50}
                    hasStripe
                    isAnimated
                    size='sm'
                    value={Number.parseInt(progress)}
                    width={'lg'}
                    rounded='sm'
                    colorScheme={'linkedin'}
                />
            )}
        </Flex>
    )
}

export default Spinner