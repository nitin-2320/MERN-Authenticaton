


// import React ,{useContext,useEffect}from 'react';
// import { assets } from '../assets/assets';
// import { useNavigate } from 'react-router-dom';
// import AppContent from '../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const EmailVerify = () => {
//   const navigate = useNavigate(); // FIX: define navigate here

//   axios.defaults.withCredentials=true
//   const {backendUrl,isLoggedin,userData,getUserData}=useContext(AppContent)
//   const inputRefs=React.useRef([])

//   const handleInput=(e,index)=>{
//     if(e.target.value.length>0 && index<inputRefs.current.length-1){
//       inputRefs.current[index+1].focus()
//     }
//   }

//   const handleKeyDown=(e,index)=>{
//     if(e.key==='Backspace' && e.target.value==='' && index>0){
//       inputRefs.current[index-1].focus()
//     }
//   }

//   const handlePaste=(e)=>{
//     const paste=e.clipboardData.getData('text')
//     const pasteArray=paste.split('');
//     pasteArray.forEach((char,index)=>{
//       if(inputRefs.current[index]){
//           inputRefs.current[index].value=char;
//       }

//     })
//   }

//   const onSubmitHandler=async(e)=>{
//     try {
//         e.preventDefault();
//         const otpArray=inputRefs.current.map(e=>e.value)
//         const otp=otpArray.join('')

//         const{data}=await axios.post(backendUrl +'/api/auth/verify-account',{otp})
//         if(data.success){
//           toast.success(data.message)
//           getUserData()
//           navigate('/')
//         }else{
//           toast.error(data.message)
//         }
//     } catch (error) {
//       toast.error(error.message)
      
//     }
//   }

//   useEffect(()=>{
//     isLoggedin && userData &&userData.isAccountVerified && navigate('/')
//   },[isLoggedin,userData])


//   return (
//     <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
//       <img 
//         onClick={() => navigate('/')} 
//         src={assets.logo} 
//         alt="" 
//         className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
//       />
//       <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
//         <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
//         <p className='text-center mb-6 text-indigo-300'>
//           Enter the 6-digit code sent to your email id.
//         </p>
//         <div className='flex justify-between mb-8' onPaste={handlePaste}>
//           {Array(6).fill(0).map((_, index)=>(
//             <input type="text" maxlength ='1' key={index} required
//             className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
//             ref={e=>inputRefs.current[index]=e}
//             onInput={(e)=> handleInput(e,index)}
//             onKeyDown={(e)=>handleKeyDown(e,index)}
//             />
//           ))}

//         </div>
//         <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Verify Email</button>
//       </form>
//     </div>
//   );
// };

// export default EmailVerify;




import React, { useContext, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import AppContent from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailVerify = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((el) => el.value);
      const otp = otpArray.join('');

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) navigate('/');
  }, [isLoggedin, userData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="absolute left-6 sm:left-16 top-6 w-28 sm:w-32 cursor-pointer drop-shadow-md"
      />

      <form
        onSubmit={onSubmitHandler}
        className="bg-white border border-gray-200 p-8 rounded-2xl shadow-xl w-full max-w-md text-sm animate-fadeIn"
      >
        <h1 className="text-gray-900 text-2xl font-semibold text-center mb-3">
          Verify Your Email
        </h1>
        <p className="text-center mb-6 text-gray-500">
          Enter the 6-digit code sent to your email address
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        {/* Verify Button */}
        <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition font-medium">
          Verify Email
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Didn’t receive the code?{' '}
          <span
            className="text-indigo-600 hover:underline cursor-pointer"
            onClick={() => toast.info('Resend OTP feature can be implemented')}
          >
            Resend
          </span>
        </p>
      </form>
    </div>
  );
};

export default EmailVerify;
