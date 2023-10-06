import { Progress } from '@chakra-ui/react'
import { useState } from 'react';
import axios from 'axios'
import Modal from './Modal'
import { useToast } from '@chakra-ui/react'

import Tickicon from './Tickicon'


const ListItem = ({ workout, getData }) => {

  const toast = useToast();
  const [showModal, setShowModal] = useState(null)

  const deleteItem = async () => {
    try {
      const response = await axios.delete(`https://fit-flex-dohxze8w5-seemant-rajsingh.vercel.app/workouts/${workout.id}`);

      if (response.status === 200) {
        getData();
        toast({
          title: 'Success',
          description: "Workout deleted!",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-left',
        });
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: "Couldn't delete workout",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
    }
  }

  return (
    <div className="listItem mt-5 sm:mt-10">
  
      <div className="m-3 flex flex-col sm:flex-row justify-center gap-3">
        <div className='tick m-0'><Tickicon progress={workout.progress} /></div>
  
        <div className="info-container p-3 sm:w-8/12 bg-zinc-700 bg-opacity-50 border-2 border-yellow-400 rounded-md text-slate-100 font-mono text-lg">
  
          <div className="flex justify-between">
            <p className="font-bold">EXERCISE:</p>
            <p>{workout.exercise_title}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">LOAD:</p>
            <p>{workout.load} kg</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">REPS:</p>
            <p>{workout.reps}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">UPDATED ON:</p>
            <p>{workout.date}</p>
          </div>
  
          <div className="flex justify-between">
            <p className="mr-4">PROGRESS:</p>
            <div className="w-full sm:w-8/12 mr-0 mt-2 sm:mt-4">
              <Progress value={workout.progress} size="xs" colorScheme="pink" />
            </div>
          </div>
  
        </div>
      </div>
  
      <div className='flex justify-center mt-1'>
        <button className='edit bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-1 rounded-md mr-2' onClick={() => setShowModal(true)}>EDIT</button>
        <button className='delete bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-md' onClick={deleteItem}>DELETE</button>
      </div>
  
      {showModal && (
        <Modal
          mode={'edit'}
          setShowModal={setShowModal}
          workout={workout}
          getData={getData}
        />
      )}
  
    </div>
  );
  
  
  
  
};

export default ListItem;
