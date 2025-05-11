import React, { useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState('sign-up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  let navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const url =
      currentState === 'Login'
        ? 'http://localhost:3000/api/user/login'
        : 'http://localhost:3000/api/user/register'

    const data =
      currentState === 'Login'
        ? { email, password }
        : { name, email, password }

    try {
      const response = await axios.post(url, data)
      toast.success(`${currentState === 'Login' ? 'Logged in' : 'Registered'} successfully! ✅`)
      //navigate to homepage after successful login
      if (currentState === 'Login') {
        navigate('/')
      }

      console.log('User:', response.data.user)
      console.log('Token:', response.data.token)

      // Optional: Save the token
      localStorage.setItem('token', response.data.token)

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">{currentState}</h2>
          <hr className="mt-2 border-gray-300" />
        </div>

        {currentState !== 'Login' && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {message && (
          <p className="text-sm text-center text-red-500 mb-4">{message}</p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <p className="cursor-pointer hover:underline">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('sign-up')}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login
