import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { CloseButton } from '@chakra-ui/react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'


export default function Modal({ mode, setShowModal, workout, getData }) {

  const toast = useToast();

  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const editMode = mode === 'edit'

  const [inputProgress, setInputProgress] = useState(editMode ? workout.progress : 50); // State to track the progress value

  
  const [formData, setFormData] = useState({
    user_email: cookies.Email,
    exercise_title: editMode ? workout.exercise_title : null,
    load: editMode ? workout.load : null,
    reps: editMode ? workout.reps : null,
    progress: editMode ? workout.progress : 50,
  });
  


  const handleChange = (e) => {

    const { name, value } = e.target
    setFormData((formData) => ({
      ...formData,
      [name]: value,
      progress: inputProgress,
    }))
  }



  const postData = async (e) => {
    e.preventDefault();
    try {
      // updating formData progress value
      formData.progress = inputProgress;

      const response = await axios.post('https://fit-flex-dohxze8w5-seemant-rajsingh.vercel.app/workouts', formData);
     
      if (response.status === 200) {
        setShowModal(null);
        getData(); 
        toast({
          title: 'Success',
          description: 'Workout added!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-left',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: "Couldn't add workout",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
    }
  }


  const editData = async (e) => {
    e.preventDefault()
    try {

      // updating formData progress value
      formData.progress = inputProgress;

      const response = await axios.put(`https://fit-flex-dohxze8w5-seemant-rajsingh.vercel.app/workouts/${workout.id}`, formData);

      if (response.status === 200) {
        setShowModal(null);
        getData();
        toast({
          title: 'Success',
          description: 'Workout updated!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-left',
        });
      }
    } catch (error) {
      console.error(error.message);
      toast({
        title: 'Error',
        description: "Couldn't update workout",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
    }
  }





  return (

    <div className="overlay bg-gray-800 bg-opacity-70 w-full h-full fixed top-0 left-0 flex justify-center items-center z-50">

      <div className="modal bg-gray-900 p-6 rounded-lg shadow-lg">


        <div className="form-title-container mb-4 flex justify-between items-center">
          <h3 className='text-white text-lg font-semibold'>
            Let's {mode} your workouts!
          </h3>
          <CloseButton className='ml-10 hover:bg-red-600' onClick={() => setShowModal(null)} />
        </div>



        <form className="flex flex-col space-y-4">
          <input
            required
            maxLength={50}
            placeholder="Enter workout"
            name="exercise_title"
            value={formData.exercise_title}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
          ></input>

          <input
            required
            maxLength={50}
            placeholder="Enter load"
            name="load"
            value={formData.load}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
          ></input>

          <input
            required
            maxLength={50}
            placeholder="Enter reps"
            name="reps"
            value={formData.reps}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
          ></input>

          <label htmlFor="range" className="text-sm text-gray-400">
            Drag to select your current progress
          </label>
          <input
            required
            id="range"
            type="range"
            min="0"
            max="100"
            name="progress"
            value={inputProgress}
            onChange={(e) => { setInputProgress(e.target.value) }}
            className="rounded-lg focus:outline-none"
          ></input>

          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer ${
              'hover:bg-blue-600'
            }`}
            type="submit"
            onClick={editMode ? editData : postData}
          >Submit</button>
        </form>

        
      </div>
    </div>
  )
}
