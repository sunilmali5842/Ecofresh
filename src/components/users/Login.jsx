import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { auth } from '../../firebase/firebase'
import toast from 'react-hot-toast'
import SignInWithGoogle from './SignInWithGoogle'

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("User Logged in Successfully")
            navigate("/profile")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg my-10">

            <form
                onSubmit={handleSubmit} className='space-y-5 '>
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Welcome Back
                </h2>

                <p className="text-sm text-center text-gray-500">
                    Please sign in to your account
                </p>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-medium
               hover:bg-green-700 transition duration-200"
                >
                    Login
                </button>

                <p className="text-sm text-center text-gray-600">
                    New here?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Create an account
                    </Link>
                </p>
                
            </form>
            <SignInWithGoogle />


        </div>
    )
}
