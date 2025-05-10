import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('sign-up')

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
      onSubmit={onSubmitHandler}
      className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">{currentState}</h2>
          <hr className="mt-2 border-gray-300" />
        </div>

        {currentState === 'Login' ? null : (
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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
