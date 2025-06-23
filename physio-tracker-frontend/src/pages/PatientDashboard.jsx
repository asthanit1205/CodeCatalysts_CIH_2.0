// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const PatientDashboard = () => {
// //   const [user, setUser] = useState(null);
// //   const [exercises, setExercises] = useState([]);
// //   const [history, setHistory] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const storedUser = JSON.parse(localStorage.getItem('user'));
// //     if (!storedUser || storedUser.role !== 'patient') {
// //       navigate('/');
// //     } else {
// //       setUser(storedUser);
// //       fetchExercises(storedUser._id);
// //       fetchHistory(storedUser._id);
// //     }
// //   }, []);

// //   const fetchExercises = async (userId) => {
// //     try {
// //       const res = await axios.get(`http://localhost:5000/api/users/${userId}/exercises`);
// //       setExercises(res.data.exercises);
// //     } catch (err) {
// //       console.error('Failed to fetch exercises', err);
// //     }
// //   };

// //   const fetchHistory = async (userId) => {
// //     try {
// //       const res = await axios.get(`http://localhost:5000/api/users/${userId}/session-history`);
// //       setHistory(res.data.history);
// //     } catch (err) {
// //       console.error('Failed to fetch session history', err);
// //     }
// //   };

// //   const startSession = (exerciseId) => {
// //     navigate(`/session/${exerciseId}`);
// //   };

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>

// //       <div className="mb-6">
// //         <h2 className="text-xl font-semibold mb-2">Assigned Exercises</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           {exercises.map((exercise) => (
// //             <div key={exercise._id} className="border p-4 rounded shadow">
// //               <h3 className="font-bold">{exercise.name}</h3>
// //               <p>{exercise.description}</p>
// //               <button
// //                 onClick={() => startSession(exercise._id)}
// //                 className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
// //               >
// //                 Start Exercise
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div>
// //         <h2 className="text-xl font-semibold mb-2">Session History</h2>
// //         <table className="w-full border">
// //           <thead>
// //             <tr className="bg-gray-200">
// //               <th className="border px-4 py-2">Exercise</th>
// //               <th className="border px-4 py-2">Score</th>
// //               <th className="border px-4 py-2">Repetitions</th>
// //               <th className="border px-4 py-2">Duration (s)</th>
// //               <th className="border px-4 py-2">Date</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {history.map((h, idx) => (
// //               <tr key={idx}>
// //                 <td className="border px-4 py-2">{h.exercise?.name || 'N/A'}</td>
// //                 <td className="border px-4 py-2">{h.score}</td>
// //                 <td className="border px-4 py-2">{h.repetitionsDone}</td>
// //                 <td className="border px-4 py-2">{h.durationInSeconds}</td>
// //                 <td className="border px-4 py-2">{new Date(h.timestamp).toLocaleString()}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PatientDashboard;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PatientDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [exercises, setExercises] = useState([]);
//   const [history, setHistory] = useState([]);
//   const navigate = useNavigate();

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
//     navigate(`/session/${exerciseId}`); // Will handle MediaPipe camera view later
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Assigned Exercises</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {exercises.map((exercise) => (
//             <div key={exercise._id} className="border p-4 rounded shadow">
//               <h3 className="font-bold">{exercise.name}</h3>
//               <p>{exercise.description}</p>
//               <button
//                 onClick={() => startSession(exercise._id)}
//                 className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Start Exercise
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-2">Session History</h2>
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border px-4 py-2">Exercise</th>
//               <th className="border px-4 py-2">Score</th>
//               <th className="border px-4 py-2">Repetitions</th>
//               <th className="border px-4 py-2">Duration (s)</th>
//               <th className="border px-4 py-2">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {history.map((h, idx) => (
//               <tr key={idx}>
//                 <td className="border px-4 py-2">{h.exercise?.name || 'N/A'}</td>
//                 <td className="border px-4 py-2">{h.score}</td>
//                 <td className="border px-4 py-2">{h.repetitionsDone}</td>
//                 <td className="border px-4 py-2">{h.durationInSeconds}</td>
//                 <td className="border px-4 py-2">{new Date(h.timestamp).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
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
