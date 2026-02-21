import React, { useEffect, useState } from 'react'
import { auth, db } from "../../firebase/firebase.js"
import { doc, getDoc } from "firebase/firestore"
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router';

export default function Profile() {

    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate()

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            
            console.log(user);
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserDetails(docSnap.data())
            } else {
                console.log("User is not logged in")
            }
        })
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    const handleLogout = async() => {
        try{
            await auth.signOut();
            navigate("/login")
            toast.success("Logged Out Successfully")          
        }catch(error){
            toast.error(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            {userDetails ? (
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-md overflow-hidden">

                    {/* Header */}
                    <div className="bg-green-600 px-6 py-8 text-white">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                                <img src={userDetails.photo} className='rounded-4xl border-2 border-white' />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold capitalize">
                                    {userDetails.firstName} {userDetails.lastName} 
                                </h2>
                                <p className="text-sm text-blue-100">
                                    {userDetails.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-4">

                        {/* Info Row */}
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Email</span>
                            <span className="text-sm font-medium text-gray-800">
                                {userDetails.email}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">First Name</span>
                            <span className="text-sm font-medium text-gray-800 capitalize">
                                {userDetails.firstName}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Last Name</span>
                            <span className="text-sm font-medium text-gray-800 capitalize">
                                {userDetails.lastName}
                            </span>
                        </div>

                        {/* Divider */}
                        <hr />

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Link to="/my-orders"
                                className="text-center flex-1 bg-green-600 text-white py-2 rounded-lg
                       hover:bg-green-700 transition"
                            >
                                My Orders
                            </Link>

                            <button onClick={()=>handleLogout()}
                                className="flex-1 border border-gray-300 py-2 rounded-lg
                       hover:bg-gray-100 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* Skeleton Loader */
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6 animate-pulse">
                    <div className="h-20 bg-gray-200 rounded mb-6" />
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded" />
                    </div>
                </div>
            )}
        </div>


    )
}
