import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'


export default function Auth() {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(false);

  const navigate = useNavigate(); // must declare here not inside other functions/scope else dosen't work
  const toast = useToast();

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };


  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

        // checking for matching passwords
        if (password !== confirmPassword) {
            setError(" Make sure your passwords matches")
            return
        }

        if (!email || !password || !confirmPassword) { 
          setError("Fill the details");
          return;
        }

    const response = await axios.post(`https://fit-flex-dohxze8w5-seemant-rajsingh.vercel.app/workouts/${endpoint}`, { email, password });

    if (response.data.detail) {    // console.log(response.data.detail)
      setError(response.detail);
      toast({
        title: 'Unsuccessful',
        description: `${endpoint} failed`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      })
    } else {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setCookie('Email', response.data.email);
      setCookie('AuthToken', response.data.token);
      navigate('/');
      toast({
        title: 'Success',
        description: `${endpoint} successful`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
    }
  }


  return (

    <div className="auth-container min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="auth-container-box w-96 bg-zinc-800 opacity-80 px-8 pt-8 pb-3 rounded-lg shadow-lg">
        

        <form className="auth-container-form space-y-4">

        <h1 className="text-3xl font-mono text-yellow-400 font-semibold text-center mb-4">FitFlex</h1>

          <div className="mb-4">
            <label htmlFor="email" className="block font-mono text-yellow-400">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-mono text-yellow-400">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password-check" className="block font-mono text-yellow-400">Confirm Password:</label>
            <input
              type="password"
              id="password-check"
              name="password-check"
              placeholder="Confirm your password"
              value={confirmPassword}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black-500"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* error message rendering */}
          { error && 
            <div className='font-mono text-red-500 error flex justify-center'>{error}</div>}


          {/* Submit form button */}
          <div className="submit-button flex justify-center">
            <button
              type="submit"
              className="w-3/6 mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}
            >
              {isLogin ? 'Login' : 'Signup'}
            </button>
          </div>

          <div className="flex justify-center">
            <p className="text-white font-mono">
              {isLogin ? "Don't have an account? " : "Already a member? "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={toggleMode}
              >
                {isLogin ? 'Signup here' : 'Login here'}
              </span>
            </p>
          </div>


        </form>

      </div>
    </div>
  );
}
