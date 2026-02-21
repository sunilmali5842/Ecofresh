import React from 'react'
import signInGoogle from '../../assets/images/google-signin-button.png'
import { auth, db } from '../../firebase/firebase.js'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { doc, setDoc } from "firebase/firestore"


export default function SignInWithGoogle() {

    const navigate = useNavigate()

    function googleLogin() {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
         prompt: "select_account",
        });
        signInWithPopup(auth, provider).then(async (result) => {
            console.log(result);
            const user = result.user;
            if (user) {
                const fullName = user.displayName;
                const parts = fullName.trim().split(" ")
                const firstName = parts[0] || "";
                const lastName = parts.slice(1).join("");

                await setDoc(doc(db, "users", user.uid),
                    {
                        email: user.email,
                        firstName: firstName,
                        photo: user.photoURL,
                        lastName: lastName
                        
                    }
                )
                toast.success("User Looged in Successfully.");
                navigate("/profile")

            }
        })
    }
    return (
        <div>
            <p className='text-center text-gray-400 mb-2'>Or Continue with</p>
            <button onClick={googleLogin} className='text-center m-auto block'>
                <img src={signInGoogle} style={{ height: '60px', width: 'auto', margin: 'auto', cursor: 'pointer', display: 'block' }} alt="Sign in with Google" />
            </button>


        </div>
    )
}
