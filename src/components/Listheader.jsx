import React from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom';
import { CiUser } from 'react-icons/ci'
import { useToast } from '@chakra-ui/react'


export default function Listheader({ listName, getData }) {

  const toast = useToast();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const userEmail = cookies.Email;

  const signOut = () => {
    try {
      removeCookie("AuthToken");
      removeCookie("Email");
      navigate("/auth");  
      toast({
        title: 'Success',
        description: "signout successful",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
    } catch (e) {
      console.log(e);
      toast({
        title: 'Error',
        description: "signout failed",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      })
    }
  }

  const user = `${userEmail?.split('@')[0]}`;

  return (
    <div className='p-5 grid place-items-center'>
      <div className='mt-5 bg-zinc-700 bg-opacity-40 p-3 rounded-md w-full lg:w-8/12'>
  
        <div className='flex items-center justify-between'>
  
          <h1 className='pl-5 text-2xl sm:text-4xl font-semibold font-mono text-yellow-400'>{listName}</h1>
  
          <div className="flex button-container pr-2">
            <CiUser className="text-yellow-400 sm:text-3xl lg:text-3xl hidden sm:block" />
            <p className='mr-5 text-yellow-400 font-mono flex items-center'>{user}</p>
            <button className="mr-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-2 rounded-md sm:mr-2" onClick={() => setShowModal(true)}> 
              ADD NEW
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 rounded-md" onClick={signOut}>
              SIGN OUT
            </button>
          </div>
  
        </div>
  
      </div>
      {showModal && (
        <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
  

  
}
