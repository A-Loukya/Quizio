import { auth } from '@/utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '@/Store/userSlice'; // Ensure `removeUser` is imported

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            uemail: email,
            uname: displayName
          })
        );
        navigate("/dashboard");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [dispatch, navigate]);

  const handleClick = () => {
    if (!auth.currentUser) {
      navigate("/login");
    } else {
      console.log("Sign-out button clicked");
      signOut(auth)
        .then(() => {
          console.log("User signed out successfully");
          dispatch(removeUser());
          navigate("/");
        })
        .catch((error) => {
          console.error("Error during sign-out:", error);
        });
    }
  };

  return (
    <div className="mx-16 my-9 flex justify-between">
      <h1 className="text-5xl text-white font-Fredoka font-semibold">Quizio</h1>
      <button
        className="text-xl px-7 py-2 cursor-pointer hover:bg-white text-white font-Lato hover:text-black rounded-xl border border-gray-700"
        onClick={handleClick}
      >
        {auth.currentUser ? "Sign Out" : "Login"}
      </button>
    </div>
  );
};

export default Header;
