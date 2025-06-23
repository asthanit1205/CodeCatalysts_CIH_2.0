// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import welcomeImage from "./welcomeimage.png";

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('patient');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/users/login', {
//         email,
//         password,
//       });

//       const user = res.data.user;

//       if (user.role !== role && !(user.role === 'physio' && role === 'physiotherapist')) {
//         setError(`You are not registered as a ${role}.`);
//         return;
//       }

//       localStorage.setItem('user', JSON.stringify(user));

//       if (role === 'patient') {
//         navigate('/patient-dashboard');
//       } else {
//         navigate('/physio-dashboard');
//       }
//     } catch (err) {
//       setError('Login failed. Please check your email and password.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 via-blue-100 to-purple-200">
//       <div className="text-center mb-8">
//         <img src={welcomeImage} alt="Welcome" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg border-4 border-blue-300" />
//         <h1 className="text-4xl font-extrabold text-blue-800 drop-shadow mb-2">Welcome to PhysioTrack</h1>
//         <p className="text-lg text-green-700 font-medium">Your journey to better health starts here.</p>
//       </div>
//       <form onSubmit={handleLogin} className="bg-white/90 p-8 rounded-2xl shadow-2xl w-96 border-2 border-blue-100">
//         <div className="mb-6">
//           <label className="block mb-1 font-semibold text-blue-700">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border-2 border-blue-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block mb-1 font-semibold text-blue-700">Role</label>
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="w-full border-2 border-green-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//           >
//             <option value="patient">Patient</option>
//             <option value="physiotherapist">Physiotherapist</option>
//           </select>
//         </div>
//         {error && <p className="text-red-500 text-sm mb-3 font-semibold">{error}</p>}
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white py-2 rounded-xl font-bold text-lg shadow-md hover:scale-105 transition-transform hover:from-green-500 hover:to-purple-600"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import welcomeImage from './welcomeimage.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      const user = res.data.user;

      if (user.role !== role && !(user.role === 'physio' && role === 'physiotherapist')) {
        setError(`You are not registered as a ${role}.`);
        return;
      }

      localStorage.setItem('user', JSON.stringify(user));

      if (role === 'patient') {
        navigate('/patient-dashboard');
      } else {
        navigate('/physio-dashboard');
      }
    } catch (err) {
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 via-blue-100 to-purple-200">
      <div className="text-center mb-8">
        <img
          src={welcomeImage}
          alt="Welcome"
          className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg border-4 border-blue-300"
        />
        <h1 className="text-4xl font-extrabold text-blue-800 drop-shadow mb-2">Welcome to PhysioTrack</h1>
        <p className="text-lg text-green-700 font-medium">Your journey to better health starts here.</p>
      </div>

      <form onSubmit={handleLogin} className="bg-white/90 p-8 rounded-2xl shadow-2xl w-96 border-2 border-blue-100">
        {/* Email Field */}
        <div className="mb-5">
          <label className="block mb-1 font-semibold text-blue-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-blue-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <label className="block mb-1 font-semibold text-blue-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-purple-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Role Dropdown */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-blue-700">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border-2 border-green-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <option value="patient">Patient</option>
            <option value="physiotherapist">Physiotherapist</option>
          </select>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-3 font-semibold">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white py-2 rounded-xl font-bold text-lg shadow-md hover:scale-105 transition-transform hover:from-green-500 hover:to-purple-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
