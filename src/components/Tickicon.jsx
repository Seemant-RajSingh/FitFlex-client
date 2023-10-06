import React, { useEffect, useState } from 'react'
import { CheckIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

export default function Tickicon( {progress} ) {

  const [isClicked, setIsClicked] = useState(false);

  const toggleColorScheme = () => {
    setIsClicked(!isClicked);
  };

  // adjust tickicon upon workout progress update
  useEffect( () => {
    if(progress != 100) setIsClicked(false);
  }, [progress])

  return (
    <>
        <IconButton
            isRound={true}
            variant='solid'
            colorScheme={(progress == 100) || isClicked ? 'yellow' : 'white'}
            border='2px'
            aria-label='Done'
            fontSize='15px'
            size='sm'
            onClick={toggleColorScheme}
            icon={<CheckIcon />}
        />
    </>
  )
}
