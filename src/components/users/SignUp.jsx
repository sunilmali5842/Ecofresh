import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, db } from '../../firebase/firebase.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { doc, setDoc } from "firebase/firestore"

export default function SignUp() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser;
            console.log(user);
            if (user) {
                await setDoc(doc(db, "users", user.uid),
                    {
                        email: user.email,
                        firstName: firstName,
                        lastName: lastName,
                        photo: ""
                    }
                )
            }
            toast.success("User registered Successfully");
            navigate("/login")
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    return (
        <div>

            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4 my-8"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Create Account
                </h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                    </label>
                    <input
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                    </label>
                    <input
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg
               hover:bg-green-700 transition duration-200"
                >
                    Sign Up
                </button>
            </form>

        </div>
    )
}
