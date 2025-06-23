// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-scroll';
// import logo from './logo.png'; // replace with your logo file

// const PatientDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [exercises, setExercises] = useState([]);
//   const [history, setHistory] = useState([]);
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('exercises');

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (!storedUser || storedUser.role !== 'patient') {
//       navigate('/');
//     } else {
//       setUser(storedUser);
//       fetchExercises(storedUser._id);
//       fetchHistory(storedUser._id);
//     }
//   }, []);

//   const fetchExercises = async (userId) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/users/${userId}/exercises`);
//       setExercises(res.data.exercises);
//     } catch (err) {
//       console.error('Failed to fetch exercises', err);
//     }
//   };

//   const fetchHistory = async (userId) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/users/${userId}/session-history`);
//       setHistory(res.data.history);
//     } catch (err) {
//       console.error('Failed to fetch session history', err);
//     }
//   };

//   const startSession = (exerciseId) => {
//     navigate(`/session/${exerciseId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-purple-100 p-8">
//       <h1 className="text-3xl font-extrabold text-blue-800 mb-8 drop-shadow">Welcome, {user?.name}</h1>
//       <div className="mb-10">
//         <h2 className="text-2xl font-bold text-green-700 mb-4">Assigned Exercises</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {exercises.map((exercise) => (
//             <div key={exercise._id} className="bg-white/90 border-2 border-blue-200 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform">
//               <div>
//                 <h3 className="font-bold text-lg text-purple-700 mb-2">{exercise.name}</h3>
//                 <p className="text-gray-700 mb-4">{exercise.description}</p>
//               </div>
//               <button
//                 onClick={() => startSession(exercise._id)}
//                 className="mt-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow hover:from-green-500 hover:to-purple-600 hover:scale-105 transition-transform"
//               >
//                 Start Exercise
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <h2 className="text-2xl font-bold text-purple-700 mb-4">Session History</h2>
//         <div className="overflow-x-auto rounded-2xl shadow-lg">
//           <table className="min-w-full bg-white/90 border-2 border-purple-200">
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-200 via-green-200 to-purple-200">
//                 <th className="border px-4 py-2 text-blue-800 font-semibold">Exercise</th>
//                 <th className="border px-4 py-2 text-green-800 font-semibold">Score</th>
//                 <th className="border px-4 py-2 text-purple-800 font-semibold">Repetitions</th>
//                 <th className="border px-4 py-2 text-blue-800 font-semibold">Duration (s)</th>
//                 <th className="border px-4 py-2 text-green-800 font-semibold">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((h, idx) => (
//                 <tr key={idx} className="hover:bg-purple-50 transition">
//                   <td className="border px-4 py-2">{h.exercise?.name || 'N/A'}</td>
//                   <td className="border px-4 py-2">{h.score}</td>
//                   <td className="border px-4 py-2">{h.repetitionsDone}</td>
//                   <td className="border px-4 py-2">{h.durationInSeconds}</td>
//                   <td className="border px-4 py-2">{new Date(h.timestamp).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'patient') {
      navigate('/');
    } else {
      setUser(storedUser);
      fetchExercises(storedUser._id);
      fetchHistory(storedUser._id);
    }
  }, []);

  const fetchExercises = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}/exercises`);
      setExercises(res.data.exercises);
    } catch (err) {
      console.error('Failed to fetch exercises', err);
    }
  };

  const fetchHistory = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}/session-history`);
      console.log("History from backend:", res.data.history); // ✅ Debug
      setHistory(res.data.history);
    } catch (err) {
      console.error('Failed to fetch session history', err);
    }
  };

  const startSession = (exerciseId) => {
    navigate(`/session/${exerciseId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Assigned Exercises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((exercise) => (
            <div key={exercise._id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{exercise.name || exercise.title}</h3>
              <p>{exercise.description}</p>
              <button
                onClick={() => startSession(exercise._id)}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Start Exercise
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Session History</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Exercise</th>
              <th className="border px-4 py-2">Score</th>
              <th className="border px-4 py-2">Repetitions</th>
              <th className="border px-4 py-2">Duration (s)</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{h.exercise?.name || h.exercise?.title || 'N/A'}</td>
                <td className="border px-4 py-2">{h.score}</td>
                <td className="border px-4 py-2">{h.repetitionsDone}</td>
                <td className="border px-4 py-2">{h.durationInSeconds}</td>
                <td className="border px-4 py-2">{new Date(h.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientDashboard;