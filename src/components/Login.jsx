import { auth } from '@/utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '@/Store/userSlice';

const Login = () => {
  const [IssignIn, setIsSignIn] = useState(true);
  const usenavigate = useNavigate();
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignIn = () => {
    setIsSignIn(!IssignIn)
    console.log(IssignIn)
  }

  const handleSubmit = () => {


    // Validation
    if (!email.current.value || !password.current.value || (!IssignIn && !name.current.value)) {
      alert("Please fill all the required fields.");
      return;
    }

    // Firebase auth call

    if (!IssignIn) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value
          })
            .then(() => {
              console.log("Created user:", user);
              dispatch(addUser({
                uname: user.displayName,
                uemail: user.email
              }));
              usenavigate('/dashboard');
            })
            .catch((error) => {
              console.error("Error updating profile:", error);
              alert(error.message);
            });
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          alert(error.message);
        });
    }
    else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // Use a fallback for displayName if it's null
          console.log("Signed-in user:", user);
          dispatch(addUser({
            uname: user.displayName || "Anonymous", // Fallback value
            uemail: user.email,
          }));

          usenavigate('/dashboard');
        })
        .catch((error) => {
          console.error("Error signing in:", error);
          alert(error.message);
        });

    }
  };

  return (
    <div className='text-white flex justify-center items-center h-screen '>

      <div className='border rounded-xl p-5 w-[410px]'>
        <h2 className='mx-auto text-3xl my-5 text-center font-bold'>{IssignIn ? "Sign In" : "Sign Up"}</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <div className=''>
            {!IssignIn && <div className='flex flex-col'>
              <label className='font-Fredoka text-md'>Name</label>
              <input type='text' className='w-full text-white p-2 rounded-md my-2 bg-[#52535C]' ref={name} />
            </div>}


            <div className='flex flex-col'>
              <label className='font-Fredoka text-md mt-4'>Email</label>
              <input type='email' className='w-full text-white p-2 rounded-md my-2 bg-[#52535C]' ref={email} />
            </div>

            <div className='flex flex-col'>
              <label className='font-Fredoka text-md mt-4'>Password</label>
              <input type='password' className='w-full text-white p-2 rounded-md my-2 bg-[#52535C]' ref={password} />
            </div>

            <p className='font-Fredoka text-md text-gray-400 mt-4'>{IssignIn ? "Don't" : "Already"} have an account? <span className='text-white cursor-pointer hover:underline' onClick={toggleSignIn}>{IssignIn ? "Sign Up" : "Sign In"}</span></p>
            <button type='submit' className='w-full border rounded-md text-center py-3 my-5 bg-white text-black font-playfair font-bold text-xl'>{IssignIn ? "Sign In" : "Sign Up"}</button>

            {/* <div className='flex flex-row justify-center items-center my-4'>
              <hr className='w-28'></hr>
              <span className='mx-3 text-sm'>Or {IssignIn ? "Sign In" : "Sign Up"} with</span>
              <hr className='w-28'></hr>
            </div> */}

            {/* <div className='flex flex-row justify-between text-center'>
              <button className='w-[100px] border rounded-md py-2'>Go</button>
              <button className='w-[100px] border rounded-md py-2'>Gi</button>
              <button className='w-[100px] border rounded-md py-2'>fa</button>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login