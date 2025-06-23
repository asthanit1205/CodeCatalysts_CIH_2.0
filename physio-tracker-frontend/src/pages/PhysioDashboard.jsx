// // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // import axios from 'axios';
// // // // // // // // import { useNavigate } from 'react-router-dom';

// // // // // // // // const PhysiotherapistDashboard = () => {
// // // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // // //   const [exercises, setExercises] = useState([]);
// // // // // // // //   const [selectedPatient, setSelectedPatient] = useState('');
// // // // // // // //   const [selectedExercises, setSelectedExercises] = useState([]);
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   useEffect(() => {
// // // // // // // //     const storedUser = JSON.parse(localStorage.getItem('user'));
// // // // // // // //     if (!storedUser || storedUser.role !== 'physiotherapist') {
// // // // // // // //       navigate('/');
// // // // // // // //     }
// // // // // // // //     fetchPatients();
// // // // // // // //     fetchExercises();
// // // // // // // //   }, []);

// // // // // // // //   const fetchPatients = async () => {
// // // // // // // //     try {
// // // // // // // //       const res = await axios.get('http://localhost:5000/api/all-patients');
// // // // // // // //       setPatients(res.data);
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Failed to fetch patients', err);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const fetchExercises = async () => {
// // // // // // // //     try {
// // // // // // // //       const res = await axios.get('http://localhost:5000/api/exercises');
// // // // // // // //       setExercises(res.data);
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Failed to fetch exercises', err);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleAssign = async () => {
// // // // // // // //     try {
// // // // // // // //       await axios.post(`http://localhost:5000/api/users/assign-exercise/${selectedPatient}`, {
// // // // // // // //         exerciseIds: selectedExercises,
// // // // // // // //       });
// // // // // // // //       alert('Exercises assigned successfully!');
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Assignment failed', err);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const toggleExerciseSelection = (id) => {
// // // // // // // //     setSelectedExercises((prev) =>
// // // // // // // //       prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="p-6">
// // // // // // // //       <h1 className="text-2xl font-bold mb-4">Physiotherapist Dashboard</h1>

// // // // // // // //       <div className="mb-4">
// // // // // // // //         <label className="font-semibold">Select Patient:</label>
// // // // // // // //         <select
// // // // // // // //           className="border p-2 ml-2"
// // // // // // // //           value={selectedPatient}
// // // // // // // //           onChange={(e) => setSelectedPatient(e.target.value)}
// // // // // // // //         >
// // // // // // // //           <option value="">-- Select --</option>
// // // // // // // //           {patients.map((p) => (
// // // // // // // //             <option key={p._id} value={p._id}>
// // // // // // // //               {p.name} ({p.email})
// // // // // // // //             </option>
// // // // // // // //           ))}
// // // // // // // //         </select>
// // // // // // // //       </div>

// // // // // // // //       <div className="mb-4">
// // // // // // // //         <label className="font-semibold">Select Exercises to Assign:</label>
// // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
// // // // // // // //           {exercises.map((ex) => (
// // // // // // // //             <div key={ex._id} className="border p-2 rounded">
// // // // // // // //               <input
// // // // // // // //                 type="checkbox"
// // // // // // // //                 value={ex._id}
// // // // // // // //                 onChange={() => toggleExerciseSelection(ex._id)}
// // // // // // // //                 checked={selectedExercises.includes(ex._id)}
// // // // // // // //               />
// // // // // // // //               <span className="ml-2 font-medium">{ex.name}</span>
// // // // // // // //             </div>
// // // // // // // //           ))}
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       <button
// // // // // // // //         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
// // // // // // // //         onClick={handleAssign}
// // // // // // // //         disabled={!selectedPatient || selectedExercises.length === 0}
// // // // // // // //       >
// // // // // // // //         Assign Exercises
// // // // // // // //       </button>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default PhysiotherapistDashboard;






// // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // import axios from 'axios';

// // // // // // // const PhysioDashboard = () => {
// // // // // // //   const [patients, setPatients] = useState([]);
// // // // // // //   const [exercises, setExercises] = useState([]);
// // // // // // //   const [selectedPatient, setSelectedPatient] = useState('');
// // // // // // //   const [selectedExercise, setSelectedExercise] = useState('');
// // // // // // //   const [status, setStatus] = useState('');

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchData = async () => {
// // // // // // //       try {
// // // // // // //         const usersRes = await axios.get('http://localhost:5000/api/users');
// // // // // // //         const exerciseRes = await axios.get('http://localhost:5000/api/exercises');

// // // // // // //         setPatients(usersRes.data.users.filter(u => u.role === 'patient'));
// // // // // // //         setExercises(exerciseRes.data.exercises);
// // // // // // //       } catch (err) {
// // // // // // //         console.error("❌ Error fetching data:", err);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchData();
// // // // // // //   }, []);

// // // // // // //   const handleAssign = async () => {
// // // // // // //     if (!selectedPatient || !selectedExercise) return;
// // // // // // //     try {
// // // // // // //       const res = await axios.post(`http://localhost:5000/api/users/assign-exercise/${selectedPatient}`, {
// // // // // // //         exerciseIds: [selectedExercise]
// // // // // // //       });
// // // // // // //       setStatus('✅ Exercise Assigned!');
// // // // // // //     } catch (err) {
// // // // // // //       console.error('❌ Assignment failed:', err);
// // // // // // //       setStatus('❌ Failed to assign.');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="p-8">
// // // // // // //       <h1 className="text-2xl font-bold mb-6">Physiotherapist Dashboard</h1>

// // // // // // //       <div className="mb-4">
// // // // // // //         <label className="block mb-2 font-semibold">Select Patient:</label>
// // // // // // //         <select
// // // // // // //           className="border p-2 rounded w-64"
// // // // // // //           onChange={(e) => setSelectedPatient(e.target.value)}
// // // // // // //           value={selectedPatient}
// // // // // // //         >
// // // // // // //           <option value="">-- Select --</option>
// // // // // // //           {patients.map((p) => (
// // // // // // //             <option key={p._id} value={p._id}>
// // // // // // //               {p.name}
// // // // // // //             </option>
// // // // // // //           ))}
// // // // // // //         </select>
// // // // // // //       </div>

// // // // // // //       <div className="mb-4">
// // // // // // //         <label className="block mb-2 font-semibold">Select Exercise:</label>
// // // // // // //         <select
// // // // // // //           className="border p-2 rounded w-64"
// // // // // // //           onChange={(e) => setSelectedExercise(e.target.value)}
// // // // // // //           value={selectedExercise}
// // // // // // //         >
// // // // // // //           <option value="">-- Select --</option>
// // // // // // //           {exercises.map((ex) => (
// // // // // // //             <option key={ex._id} value={ex._id}>
// // // // // // //               {ex.title}
// // // // // // //             </option>
// // // // // // //           ))}
// // // // // // //         </select>
// // // // // // //       </div>

// // // // // // //       <button
// // // // // // //         onClick={handleAssign}
// // // // // // //         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
// // // // // // //         disabled={!selectedPatient || !selectedExercise}
// // // // // // //       >
// // // // // // //         Assign Exercises
// // // // // // //       </button>

// // // // // // //       {status && <p className="mt-4 text-green-600 font-semibold">{status}</p>}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default PhysioDashboard;





// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import axios from 'axios';

// // // // // // const PhysioDashboard = () => {
// // // // // //   const [patients, setPatients] = useState([]);
// // // // // //   const [exercises, setExercises] = useState([]);
// // // // // //   const [selectedPatient, setSelectedPatient] = useState('');
// // // // // //   const [selectedExercises, setSelectedExercises] = useState([]);
// // // // // //   const [message, setMessage] = useState('');

// // // // // //   useEffect(() => {
// // // // // //     const fetchData = async () => {
// // // // // //       try {
// // // // // //         const usersRes = await axios.get('http://localhost:5000/api/users');
// // // // // //         const exRes = await axios.get('http://localhost:5000/api/exercises');
// // // // // //         setPatients(usersRes.data.users);
// // // // // //         setExercises(exRes.data.exercises);
// // // // // //       } catch (err) {
// // // // // //         console.error("❌ Error fetching data", err);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchData();
// // // // // //   }, []);

// // // // // //   const handleAssign = async () => {
// // // // // //     if (!selectedPatient || selectedExercises.length === 0) {
// // // // // //       setMessage('Please select a patient and at least one exercise');
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //     //   await axios.post(`http://localhost:5000/api/assign-exercise/${selectedPatient}`, {
// // // // // //     //     exerciseIds: selectedExercises,
// // // // // //     //   });

// // // // // //     await axios.post(`http://localhost:5000/api/users/assign-exercise/${selectedPatient}`, {
// // // // // //   exerciseIds: selectedExercises,
// // // // // // });

// // // // // //       setMessage('✅ Exercises assigned successfully!');
// // // // // //     } catch (err) {
// // // // // //       console.error("❌ Assignment failed", err);
// // // // // //       setMessage('❌ Failed to assign exercises');
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="p-8">
// // // // // //       <h1 className="text-2xl font-bold mb-6">Physiotherapist Dashboard</h1>

// // // // // //       {/* Select Patient */}
// // // // // //       <label className="block mb-2 font-medium">Select Patient:</label>
// // // // // //       <select
// // // // // //         value={selectedPatient}
// // // // // //         onChange={(e) => setSelectedPatient(e.target.value)}
// // // // // //         className="border px-4 py-2 rounded w-64 mb-4"
// // // // // //       >
// // // // // //         <option value="">-- Select --</option>
// // // // // //         {patients.map((p) => (
// // // // // //           <option key={p._id} value={p._id}>
// // // // // //             {p.name} ({p.email})
// // // // // //           </option>
// // // // // //         ))}
// // // // // //       </select>

// // // // // //       {/* Select Exercises */}
// // // // // //       <label className="block mb-2 font-medium">Select Exercises:</label>
// // // // // //       <select
// // // // // //         multiple
// // // // // //         value={selectedExercises}
// // // // // //         onChange={(e) =>
// // // // // //           setSelectedExercises(Array.from(e.target.selectedOptions, (opt) => opt.value))
// // // // // //         }
// // // // // //         className="border px-4 py-2 rounded w-64 h-32 mb-4"
// // // // // //       >
// // // // // //         {exercises.map((ex) => (
// // // // // //           <option key={ex._id} value={ex._id}>
// // // // // //             {ex.title}
// // // // // //           </option>
// // // // // //         ))}
// // // // // //       </select>

// // // // // //       <br />
// // // // // //       <button
// // // // // //         onClick={handleAssign}
// // // // // //         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
// // // // // //       >
// // // // // //         Assign Exercises
// // // // // //       </button>

// // // // // //       {message && <p className="mt-4 text-lg font-semibold text-green-700">{message}</p>}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default PhysioDashboard;






// // // // // // PhysioDashboard.jsx
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';

// // // // // const PhysioDashboard = () => {
// // // // //   const [activeTab, setActiveTab] = useState('assign');
// // // // //   const [patients, setPatients] = useState([]);
// // // // //   const [exercises, setExercises] = useState([]);
// // // // //   const [sessionHistory, setSessionHistory] = useState([]);

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         const usersRes = await axios.get('http://localhost:5000/api/users');
// // // // //         const exRes = await axios.get('http://localhost:5000/api/exercises');
// // // // //         setPatients(usersRes.data.users);
// // // // //         setExercises(exRes.data.exercises);
// // // // //       } catch (err) {
// // // // //         console.error("Error fetching dashboard data", err);
// // // // //       }
// // // // //     };
// // // // //     fetchData();
// // // // //   }, []);

// // // // //   const fetchHistory = async (userId) => {
// // // // //     try {
// // // // //       const res = await axios.get(`http://localhost:5000/api/users/${userId}/session-history`);
// // // // //       setSessionHistory(res.data.history);
// // // // //     } catch (err) {
// // // // //       console.error("Error fetching session history", err);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="p-6">
// // // // //       <div className="flex gap-4 mb-6">
// // // // //         <button onClick={() => setActiveTab('patients')} className="bg-gray-200 px-4 py-2 rounded">Patients</button>
// // // // //         <button onClick={() => setActiveTab('exercises')} className="bg-gray-200 px-4 py-2 rounded">Exercises</button>
// // // // //         <button onClick={() => setActiveTab('assign')} className="bg-gray-200 px-4 py-2 rounded">Assign</button>
// // // // //         <button onClick={() => setActiveTab('history')} className="bg-gray-200 px-4 py-2 rounded">History</button>
// // // // //       </div>

// // // // //       {activeTab === 'patients' && (
// // // // //         <div>
// // // // //           <h2 className="text-xl font-bold mb-4">Registered Patients</h2>
// // // // //           {patients.map(p => (
// // // // //             <div key={p._id} className="border p-3 mb-2 rounded shadow">
// // // // //               <p><strong>Name:</strong> {p.name}</p>
// // // // //               <p><strong>Email:</strong> {p.email}</p>
// // // // //               <p><strong>Condition:</strong> {p.condition || 'N/A'}</p>
// // // // //               <button onClick={() => fetchHistory(p._id)} className="text-blue-600 mt-1">View History</button>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       )}

// // // // //       {activeTab === 'exercises' && (
// // // // //         <div>
// // // // //           <h2 className="text-xl font-bold mb-4">Available Exercises</h2>
// // // // //           {exercises.map(ex => (
// // // // //             <div key={ex._id} className="border p-3 mb-2 rounded shadow">
// // // // //               <p><strong>Title:</strong> {ex.title}</p>
// // // // //               <p><strong>Description:</strong> {ex.description}</p>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       )}

// // // // //       {activeTab === 'assign' && <AssignExercisePanel patients={patients} exercises={exercises} />}

// // // // //       {activeTab === 'history' && sessionHistory.length > 0 && (
// // // // //         <div>
// // // // //           <h2 className="text-xl font-bold mb-4">Session History</h2>
// // // // //           {sessionHistory.map((s, i) => (
// // // // //             <div key={i} className="border p-3 mb-2 rounded">
// // // // //               <p><strong>Exercise:</strong> {s.exercise?.title || s.exercise}</p>
// // // // //               <p><strong>Score:</strong> {s.score}</p>
// // // // //               <p><strong>Reps:</strong> {s.repetitionsDone}</p>
// // // // //               <p><strong>Duration:</strong> {s.durationInSeconds} sec</p>
// // // // //               <p><strong>Time:</strong> {new Date(s.timestamp).toLocaleString()}</p>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // const AssignExercisePanel = ({ patients, exercises }) => {
// // // // //   const [selectedPatient, setSelectedPatient] = useState('');
// // // // //   const [selectedExercises, setSelectedExercises] = useState([]);
// // // // //   const [message, setMessage] = useState('');

// // // // //   const handleAssign = async () => {
// // // // //     if (!selectedPatient || selectedExercises.length === 0) {
// // // // //       setMessage('Please select a patient and at least one exercise');
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       await axios.post(`http://localhost:5000/api/users/assign-exercise/${selectedPatient}`, {
// // // // //         exerciseIds: selectedExercises,
// // // // //       });
// // // // //       setMessage('✅ Exercises assigned successfully!');
// // // // //     } catch (err) {
// // // // //       console.error("Assignment failed", err);
// // // // //       setMessage('❌ Failed to assign exercises');
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <h2 className="text-xl font-bold mb-4">Assign Exercises</h2>
// // // // //       <label className="block mb-2">Select Patient:</label>
// // // // //       <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} className="border px-4 py-2 rounded w-64 mb-4">
// // // // //         <option value="">-- Select Patient --</option>
// // // // //         {patients.map(p => (
// // // // //           <option key={p._id} value={p._id}>{p.name}</option>
// // // // //         ))}
// // // // //       </select>

// // // // //       <label className="block mb-2">Select Exercises:</label>
// // // // //       <select multiple value={selectedExercises} onChange={(e) => setSelectedExercises(Array.from(e.target.selectedOptions, opt => opt.value))} className="border px-4 py-2 rounded w-64 h-32 mb-4">
// // // // //         {exercises.map(ex => (
// // // // //           <option key={ex._id} value={ex._id}>{ex.title}</option>
// // // // //         ))}
// // // // //       </select>

// // // // //       <br />
// // // // //       <button onClick={handleAssign} className="bg-blue-600 text-white px-4 py-2 rounded">Assign</button>
// // // // //       {message && <p className="mt-2 text-green-600 font-semibold">{message}</p>}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PhysioDashboard;






// // // // import React, { useEffect, useState } from 'react';
// // // // import axios from 'axios';

// // // // const PhysioDashboard = () => {
// // // //   const [patients, setPatients] = useState([]);
// // // //   const [exercises, setExercises] = useState([]);
// // // //   const [selectedPatient, setSelectedPatient] = useState('');
// // // //   const [selectedExercises, setSelectedExercises] = useState([]);
// // // //   const [message, setMessage] = useState('');
// // // //   const [activeTab, setActiveTab] = useState('assign');

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const usersRes = await axios.get('http://localhost:5000/api/users');
// // // //         const exRes = await axios.get('http://localhost:5000/api/exercises');
// // // //         setPatients(usersRes.data.users);
// // // //         setExercises(exRes.data.exercises);
// // // //       } catch (err) {
// // // //         console.error('❌ Error fetching data', err);
// // // //       }
// // // //     };
// // // //     fetchData();
// // // //   }, []);

// // // //   const handleAssign = async () => {
// // // //     if (!selectedPatient || selectedExercises.length === 0) {
// // // //       setMessage('Please select a patient and at least one exercise');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       await axios.post(`http://localhost:5000/api/users/assign-exercise/${selectedPatient}`, {
// // // //         exerciseIds: selectedExercises,
// // // //       });
// // // //       setMessage('✅ Exercises assigned successfully!');
// // // //     } catch (err) {
// // // //       console.error('❌ Assignment failed', err);
// // // //       setMessage('❌ Failed to assign exercises');
// // // //     }
// // // //   };

// // // //   const fetchSessionHistory = async (userId) => {
// // // //     try {
// // // //       const res = await axios.get(`http://localhost:5000/api/users/${userId}/session-history`);
// // // //       return res.data.history;
// // // //     } catch (err) {
// // // //       console.error('❌ Error fetching history', err);
// // // //       return [];
// // // //     }
// // // //   };

// // // //   const [historyMap, setHistoryMap] = useState({});

// // // //   useEffect(() => {
// // // //     const loadAllHistories = async () => {
// // // //       const map = {};
// // // //       for (const patient of patients) {
// // // //         const history = await fetchSessionHistory(patient._id);
// // // //         map[patient._id] = history;
// // // //       }
// // // //       setHistoryMap(map);
// // // //     };
// // // //     if (patients.length > 0) loadAllHistories();
// // // //   }, [patients]);

// // // //   return (
// // // //     <div className="p-8">
// // // //       <h1 className="text-2xl font-bold mb-6">Physiotherapist Dashboard</h1>

// // // //       <div className="mb-6">
// // // //         <button
// // // //           onClick={() => setActiveTab('assign')}
// // // //           className={`px-4 py-2 mr-2 rounded ${activeTab === 'assign' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
// // // //         >
// // // //           Assign Exercises
// // // //         </button>
// // // //         <button
// // // //           onClick={() => setActiveTab('patients')}
// // // //           className={`px-4 py-2 rounded ${activeTab === 'patients' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
// // // //         >
// // // //           View Patients
// // // //         </button>
// // // //         <button
// // // //           onClick={() => setActiveTab('exercises')}
// // // //           className={`px-4 py-2 ml-2 rounded ${activeTab === 'exercises' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
// // // //         >
// // // //           View Exercises
// // // //         </button>
// // // //       </div>

// // // //       {activeTab === 'assign' && (
// // // //         <div>
// // // //           <label className="block mb-2 font-medium">Select Patient:</label>
// // // //           <select
// // // //             value={selectedPatient}
// // // //             onChange={(e) => setSelectedPatient(e.target.value)}
// // // //             className="border px-4 py-2 rounded w-64 mb-4"
// // // //           >
// // // //             <option value="">-- Select --</option>
// // // //             {patients.map((p) => (
// // // //               <option key={p._id} value={p._id}>
// // // //                 {p.name} ({p.email})
// // // //               </option>
// // // //             ))}
// // // //           </select>

// // // //           <label className="block mb-2 font-medium">Select Exercises:</label>
// // // //           <select
// // // //             multiple
// // // //             value={selectedExercises}
// // // //             onChange={(e) =>
// // // //               setSelectedExercises(Array.from(e.target.selectedOptions, (opt) => opt.value))
// // // //             }
// // // //             className="border px-4 py-2 rounded w-64 h-32 mb-4"
// // // //           >
// // // //             {exercises.map((ex) => (
// // // //               <option key={ex._id} value={ex._id}>
// // // //                 {ex.title}
// // // //               </option>
// // // //             ))}
// // // //           </select>

// // // //           <br />
// // // //           <button
// // // //             onClick={handleAssign}
// // // //             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
// // // //           >
// // // //             Assign Exercises
// // // //           </button>

// // // //           {message && <p className="mt-4 text-lg font-semibold text-green-700">{message}</p>}
// // // //         </div>
// // // //       )}

// // // //       {activeTab === 'patients' && (
// // // //         <div>
// // // //           <h2 className="text-xl font-semibold mb-4">Registered Patients</h2>
// // // //           {patients.map((patient) => (
// // // //             <div key={patient._id} className="mb-4 p-4 border rounded shadow-sm">
// // // //               <p><strong>Name:</strong> {patient.name}</p>
// // // //               <p><strong>Email:</strong> {patient.email}</p>
// // // //               <p><strong>Condition:</strong> {patient.condition || 'N/A'}</p>
// // // //               <p className="mt-2 font-medium">Session History:</p>
// // // //               <ul className="list-disc list-inside">
// // // //                 {(historyMap[patient._id] || []).map((session, idx) => (
// // // //                   <li key={idx}>
// // // //                     <strong>Exercise:</strong> {session.exercise?.title || 'N/A'}, <strong>Score:</strong> {session.score}, <strong>Reps:</strong> {session.repetitionsDone}
// // // //                   </li>
// // // //                 ))}
// // // //               </ul>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}

// // // //       {activeTab === 'exercises' && (
// // // //         <div>
// // // //           <h2 className="text-xl font-semibold mb-4">All Exercises</h2>
// // // //           {exercises.map((ex) => (
// // // //             <div key={ex._id} className="mb-4 p-4 border rounded shadow-sm">
// // // //               <p><strong>Title:</strong> {ex.title}</p>
// // // //               <p><strong>Description:</strong> {ex.description}</p>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PhysioDashboard;










// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';

// // // const PhysioDashboard = () => {
// // //   const [patients, setPatients] = useState([]);
// // //   const [exercises, setExercises] = useState([]);
// // //   const [selectedPatient, setSelectedPatient] = useState('');
// // //   const [selectedExercises, setSelectedExercises] = useState([]);
// // //   const [message, setMessage] = useState('');
// // //   const [activeTab, setActiveTab] = useState('assign');
// // //   const [newPatient, setNewPatient] = useState({ name: '', email: '', phone: '', condition: '' });

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const usersRes = await axios.get('http://localhost:5000/api/users');
// // //         const exRes = await axios.get('http://localhost:5000/api/exercises');
// // //         setPatients(usersRes.data.users);
// // //         setExercises(exRes.data.exercises);
// // //       } catch (err) {
// // //         console.error('❌ Error fetching data', err);
// // //       }
// // //     };
// // //     fetchData();
// // //   }, []);

// // //   const handleAssign = async () => {
// // //     if (!selectedPatient || selectedExercises.length === 0) {
// // //       setMessage('Please select a patient and at least one exercise');
// // //       return;
// // //     }

// // //     try {
// // //       await axios.post(`http://localhost:5000/api/users/assign-exercise/${selectedPatient}`, {
// // //         exerciseIds: selectedExercises,
// // //       });
// // //       setMessage('✅ Exercises assigned successfully!');
// // //     } catch (err) {
// // //       console.error('❌ Assignment failed', err);
// // //       setMessage('❌ Failed to assign exercises');
// // //     }
// // //   };

// // //   const fetchSessionHistory = async (userId) => {
// // //     try {
// // //       const res = await axios.get(`http://localhost:5000/api/users/${userId}/session-history`);
// // //       return res.data.history;
// // //     } catch (err) {
// // //       console.error('❌ Error fetching history', err);
// // //       return [];
// // //     }
// // //   };

// // //   const [historyMap, setHistoryMap] = useState({});

// // //   useEffect(() => {
// // //     const loadAllHistories = async () => {
// // //       const map = {};
// // //       for (const patient of patients) {
// // //         const history = await fetchSessionHistory(patient._id);
// // //         map[patient._id] = history;
// // //       }
// // //       setHistoryMap(map);
// // //     };
// // //     if (patients.length > 0) loadAllHistories();
// // //   }, [patients]);

// // //   const handleNewPatientSubmit = async () => {
// // //     try {
// // //       const res = await axios.post('http://localhost:5000/api/users/register', {
// // //         ...newPatient,
// // //         role: 'patient',
// // //       });
// // //       setPatients([...patients, res.data.user]);
// // //       setNewPatient({ name: '', email: '', phone: '', condition: '' });
// // //       alert('✅ Patient added successfully!');
// // //     } catch (err) {
// // //       console.error('❌ Error adding patient', err);
// // //       alert('❌ Failed to add patient');
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-8">
// // //       <h1 className="text-2xl font-bold mb-6">Physiotherapist Dashboard</h1>

// // //       <div className="mb-6">
// // //         <button
// // //           onClick={() => setActiveTab('assign')}
// // //           className={`px-4 py-2 mr-2 rounded ${activeTab === 'assign' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
// // //         >
// // //           Assign Exercises
// // //         </button>
// // //         <button
// // //           onClick={() => setActiveTab('patients')}
// // //           className={`px-4 py-2 rounded ${activeTab === 'patients' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
// // //         >
// // //           View Patients
// // //         </button>
// // //         <button
// // //           onClick={() => setActiveTab('exercises')}
// // //           className={`px-4 py-2 ml-2 rounded ${activeTab === 'exercises' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
// // //         >
// // //           View Exercises
// // //         </button>
// // //       </div>

// // //       {activeTab === 'assign' && (
// // //         <div>
// // //           <label className="block mb-2 font-medium">Select Patient:</label>
// // //           <select
// // //             value={selectedPatient}
// // //             onChange={(e) => setSelectedPatient(e.target.value)}
// // //             className="border px-4 py-2 rounded w-64 mb-4"
// // //           >
// // //             <option value="">-- Select --</option>
// // //             {patients.map((p) => (
// // //               <option key={p._id} value={p._id}>
// // //                 {p.name} ({p.email})
// // //               </option>
// // //             ))}
// // //           </select>

// // //           <label className="block mb-2 font-medium">Select Exercises:</label>
// // //           <select
// // //             multiple
// // //             value={selectedExercises}
// // //             onChange={(e) =>
// // //               setSelectedExercises(Array.from(e.target.selectedOptions, (opt) => opt.value))
// // //             }
// // //             className="border px-4 py-2 rounded w-64 h-32 mb-4"
// // //           >
// // //             {exercises.map((ex) => (
// // //               <option key={ex._id} value={ex._id}>
// // //                 {ex.title}
// // //               </option>
// // //             ))}
// // //           </select>

// // //           <br />
// // //           <button
// // //             onClick={handleAssign}
// // //             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
// // //           >
// // //             Assign Exercises
// // //           </button>

// // //           {message && <p className="mt-4 text-lg font-semibold text-green-700">{message}</p>}
// // //         </div>
// // //       )}

// // //       {activeTab === 'patients' && (
// // //         <div>
// // //           <h2 className="text-xl font-semibold mb-4">Registered Patients</h2>

// // //           <div className="mb-6">
// // //             <h3 className="font-semibold mb-2">Add New Patient:</h3>
// // //             <input
// // //               type="text"
// // //               placeholder="Name"
// // //               value={newPatient.name}
// // //               onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
// // //               className="border px-3 py-2 mr-2 rounded"
// // //             />
// // //             <input
// // //               type="email"
// // //               placeholder="Email"
// // //               value={newPatient.email}
// // //               onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
// // //               className="border px-3 py-2 mr-2 rounded"
// // //             />
// // //             <input
// // //               type="text"
// // //               placeholder="Phone"
// // //               value={newPatient.phone}
// // //               onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
// // //               className="border px-3 py-2 mr-2 rounded"
// // //             />
// // //             <input
// // //               type="text"
// // //               placeholder="Condition"
// // //               value={newPatient.condition}
// // //               onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
// // //               className="border px-3 py-2 mr-2 rounded"
// // //             />
// // //             <button
// // //               onClick={handleNewPatientSubmit}
// // //               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
// // //             >
// // //               Add Patient
// // //             </button>
// // //           </div>

// // //           {patients.map((patient) => (
// // //             <div key={patient._id} className="mb-4 p-4 border rounded shadow-sm">
// // //               <p><strong>Name:</strong> {patient.name}</p>
// // //               <p><strong>Email:</strong> {patient.email}</p>
// // //               <p><strong>Phone:</strong> {patient.phone || 'N/A'}</p>
// // //               <p><strong>Condition:</strong> {patient.condition || 'N/A'}</p>
// // //               <p className="mt-2 font-medium">Session History:</p>
// // //               <ul className="list-disc list-inside">
// // //                 {(historyMap[patient._id] || []).map((session, idx) => (
// // //                   <li key={idx}>
// // //                     <strong>Exercise:</strong> {session.exercise?.title || 'N/A'}, <strong>Score:</strong> {session.score}, <strong>Reps:</strong> {session.repetitionsDone}
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {activeTab === 'exercises' && (
// // //         <div>
// // //           <h2 className="text-xl font-semibold mb-4">All Exercises</h2>
// // //           {exercises.map((ex) => (
// // //             <div key={ex._id} className="mb-4 p-4 border rounded shadow-sm">
// // //               <p><strong>Title:</strong> {ex.title}</p>
// // //               <p><strong>Description:</strong> {ex.description}</p>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default PhysioDashboard;








// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const PhysioDashboard = () => {
// //   const [patients, setPatients] = useState([]);
// //   const [exercises, setExercises] = useState([]);
// //   const [selectedPatient, setSelectedPatient] = useState('');
// //   const [selectedExercises, setSelectedExercises] = useState([]);
// //   const [message, setMessage] = useState('');
// //   const [activeTab, setActiveTab] = useState('assign');
// //   const [newPatient, setNewPatient] = useState({ name: '', email: '', phone: '', condition: '' });

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const usersRes = await axios.get('http://localhost:5000/api/users');
// //         const exRes = await axios.get('http://localhost:5000/api/exercises');
// //         setPatients(usersRes.data.users);
// //         setExercises(exRes.data.exercises);
// //       } catch (err) {
// //         console.error('❌ Error fetching data', err);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   const handleAssign = async () => {
// //     if (!selectedPatient || selectedExercises.length === 0) {
// //       setMessage('Please select a patient and at least one exercise');
// //       return;
// //     }

// //     try {
// //       await axios.post(`http://localhost:5000/api/users/assign-exercise/${selectedPatient}`, {
// //         exerciseIds: selectedExercises,
// //       });
// //       setMessage('✅ Exercises assigned successfully!');
// //     } catch (err) {
// //       console.error('❌ Assignment failed', err);
// //       setMessage('❌ Failed to assign exercises');
// //     }
// //   };

// //   const fetchSessionHistory = async (userId) => {
// //     try {
// //       const res = await axios.get(`http://localhost:5000/api/users/${userId}/session-history`);
// //       return res.data.history;
// //     } catch (err) {
// //       console.error('❌ Error fetching history', err);
// //       return [];
// //     }
// //   };

// //   const [historyMap, setHistoryMap] = useState({});

// //   useEffect(() => {
// //     const loadAllHistories = async () => {
// //       const map = {};
// //       for (const patient of patients) {
// //         const history = await fetchSessionHistory(patient._id);
// //         map[patient._id] = history;
// //       }
// //       setHistoryMap(map);
// //     };
// //     if (patients.length > 0) loadAllHistories();
// //   }, [patients]);

// //   const handleNewPatientSubmit = async () => {
// //     try {
// //       const res = await axios.post('http://localhost:5000/api/users/register', {
// //         ...newPatient,
// //         role: 'patient',
// //       });
// //       setPatients([...patients, res.data.user]);
// //       setNewPatient({ name: '', email: '', phone: '', condition: '' });
// //       alert('✅ Patient added successfully!');
// //     } catch (err) {
// //       console.error('❌ Error adding patient', err);
// //       alert('❌ Failed to add patient');
// //     }
// //   };

// //   const getAssignedExerciseTitles = (patient) => {
// //     return patient.assignedExercises?.map((exId) => {
// //       const exercise = exercises.find((e) => e._id === exId);
// //       return exercise ? exercise.title : 'Unknown';
// //     }) || [];
// //   };

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-2xl font-bold mb-6">Physiotherapist Dashboard</h1>

// //       <div className="mb-6">
// //         <button
// //           onClick={() => setActiveTab('assign')}
// //           className={`px-4 py-2 mr-2 rounded ${activeTab === 'assign' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
// //         >
// //           Assign Exercises
// //         </button>
// //         <button
// //           onClick={() => setActiveTab('patients')}
// //           className={`px-4 py-2 rounded ${activeTab === 'patients' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
// //         >
// //           View Patients
// //         </button>
// //         <button
// //           onClick={() => setActiveTab('exercises')}
// //           className={`px-4 py-2 ml-2 rounded ${activeTab === 'exercises' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
// //         >
// //           View Exercises
// //         </button>
// //       </div>

// //       {activeTab === 'assign' && (
// //         <div>
// //           <label className="block mb-2 font-medium">Select Patient:</label>
// //           <select
// //             value={selectedPatient}
// //             onChange={(e) => setSelectedPatient(e.target.value)}
// //             className="border px-4 py-2 rounded w-64 mb-4"
// //           >
// //             <option value="">-- Select --</option>
// //             {patients.map((p) => (
// //               <option key={p._id} value={p._id}>
// //                 {p.name} ({p.email})
// //               </option>
// //             ))}
// //           </select>

// //           <label className="block mb-2 font-medium">Select Exercises:</label>
// //           <select
// //             multiple
// //             value={selectedExercises}
// //             onChange={(e) =>
// //               setSelectedExercises(Array.from(e.target.selectedOptions, (opt) => opt.value))
// //             }
// //             className="border px-4 py-2 rounded w-64 h-32 mb-4"
// //           >
// //             {exercises.map((ex) => (
// //               <option key={ex._id} value={ex._id}>
// //                 {ex.title}
// //               </option>
// //             ))}
// //           </select>

// //           <br />
// //           <button
// //             onClick={handleAssign}
// //             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
// //           >
// //             Assign Exercises
// //           </button>

// //           {message && <p className="mt-4 text-lg font-semibold text-green-700">{message}</p>}
// //         </div>
// //       )}

// //       {activeTab === 'patients' && (
// //         <div>
// //           <h2 className="text-xl font-semibold mb-4">Registered Patients</h2>

// //           <div className="mb-6">
// //             <h3 className="font-semibold mb-2">Add New Patient:</h3>
// //             <input
// //               type="text"
// //               placeholder="Name"
// //               value={newPatient.name}
// //               onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
// //               className="border px-3 py-2 mr-2 rounded"
// //             />
// //             <input
// //               type="email"
// //               placeholder="Email"
// //               value={newPatient.email}
// //               onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
// //               className="border px-3 py-2 mr-2 rounded"
// //             />
// //             <input
// //               type="text"
// //               placeholder="Phone"
// //               value={newPatient.phone}
// //               onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
// //               className="border px-3 py-2 mr-2 rounded"
// //             />
// //             <input
// //               type="text"
// //               placeholder="Condition"
// //               value={newPatient.condition}
// //               onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
// //               className="border px-3 py-2 mr-2 rounded"
// //             />
// //             <button
// //               onClick={handleNewPatientSubmit}
// //               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
// //             >
// //               Add Patient
// //             </button>
// //           </div>

// //           {patients.map((patient) => (
// //             <div key={patient._id} className="mb-4 p-4 border rounded shadow-sm">
// //               <p><strong>Name:</strong> {patient.name}</p>
// //               <p><strong>Email:</strong> {patient.email}</p>
// //               <p><strong>Phone:</strong> {patient.phone || 'N/A'}</p>
// //               <p><strong>Condition:</strong> {patient.condition || 'N/A'}</p>
// //               <p><strong>Assigned Exercises:</strong> {getAssignedExerciseTitles(patient).join(', ') || 'None'}</p>
// //               <p className="mt-2 font-medium">Session History:</p>
// //               <ul className="list-disc list-inside">
// //                 {(historyMap[patient._id] || []).map((session, idx) => (
// //                   <li key={idx}>
// //                     <strong>Exercise:</strong> {session.exercise?.title || 'N/A'}, <strong>Score:</strong> {session.score}, <strong>Reps:</strong> {session.repetitionsDone}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {activeTab === 'exercises' && (
// //         <div>
// //           <h2 className="text-xl font-semibold mb-4">All Exercises</h2>
// //           {exercises.map((ex) => (
// //             <div key={ex._id} className="mb-4 p-4 border rounded shadow-sm">
// //               <p><strong>Title:</strong> {ex.title}</p>
// //               <p><strong>Description:</strong> {ex.description}</p>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PhysioDashboard;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TabButton = ({ label, active, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 shadow-sm ${
//       active ? 'bg-blue-700 text-white' : 'bg-gray-100 hover:bg-blue-100 text-blue-800'
//     }`}
//   >
//     {label}
//   </button>
// );

// const PhysioDashboard = () => {
//   const [patients, setPatients] = useState([]);
//   const [exercises, setExercises] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState('');
//   const [selectedExercises, setSelectedExercises] = useState([]);
//   const [message, setMessage] = useState('');
//   const [activeTab, setActiveTab] = useState('assign');
//   const [newPatient, setNewPatient] = useState({ name: '', email: '', phone: '', condition: '' });
//   const [historyMap, setHistoryMap] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const usersRes = await axios.get('http://localhost:5000/api/users');
//         const exRes = await axios.get('http://localhost:5000/api/exercises');
//         setPatients(usersRes.data.users);
//         setExercises(exRes.data.exercises);
//       } catch (err) {
//         console.error('❌ Error fetching data', err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAssign = async () => {
//     if (!selectedPatient || selectedExercises.length === 0) {
//       setMessage('Please select a patient and at least one exercise');
//       return;
//     }
//     try {
//       await axios.post(`http://localhost:5000/api/users/assign-exercise/${selectedPatient}`, {
//         exerciseIds: selectedExercises,
//       });
//       setMessage('✅ Exercises assigned successfully!');
//     } catch (err) {
//       console.error('❌ Assignment failed', err);
//       setMessage('❌ Failed to assign exercises');
//     }
//   };

//   const fetchSessionHistory = async (userId) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/users/${userId}/session-history`);
//       return res.data.history;
//     } catch (err) {
//       console.error('❌ Error fetching history', err);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const loadAllHistories = async () => {
//       const map = {};
//       for (const patient of patients) {
//         const history = await fetchSessionHistory(patient._id);
//         map[patient._id] = history;
//       }
//       setHistoryMap(map);
//     };
//     if (patients.length > 0) loadAllHistories();
//   }, [patients]);

//   const handleNewPatientSubmit = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/users/register', {
//         ...newPatient,
//         role: 'patient',
//       });
//       setPatients([...patients, res.data.user]);
//       setNewPatient({ name: '', email: '', phone: '', condition: '' });
//       alert('✅ Patient added successfully!');
//     } catch (err) {
//       console.error('❌ Error adding patient', err);
//       alert('❌ Failed to add patient');
//     }
//   };

//   const getAssignedExerciseTitles = (patient) => {
//     return patient.assignedExercises?.map((ex) => ex.title) || [];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white p-10 font-sans">
//       <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">🧑‍⚕️ Physiotherapist Dashboard</h1>

//       <div className="flex justify-center gap-4 mb-10">
//         <TabButton label="Assign Exercises" active={activeTab === 'assign'} onClick={() => setActiveTab('assign')} />
//         <TabButton label="View Patients" active={activeTab === 'patients'} onClick={() => setActiveTab('patients')} />
//         <TabButton label="View Exercises" active={activeTab === 'exercises'} onClick={() => setActiveTab('exercises')} />
//       </div>

//       {activeTab === 'assign' && (
//         <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
//           <label className="block mb-2 font-medium">Select Patient:</label>
//           <select
//             value={selectedPatient}
//             onChange={(e) => setSelectedPatient(e.target.value)}
//             className="w-full border rounded px-4 py-2 mb-4"
//           >
//             <option value="">-- Select --</option>
//             {patients.map((p) => (
//               <option key={p._id} value={p._id}>{p.name} ({p.email})</option>
//             ))}
//           </select>

//           <label className="block mb-2 font-medium">Select Exercises:</label>
//           <select
//             multiple
//             value={selectedExercises}
//             onChange={(e) => setSelectedExercises(Array.from(e.target.selectedOptions, (opt) => opt.value))}
//             className="w-full border rounded px-4 py-2 h-32 mb-4"
//           >
//             {exercises.map((ex) => (
//               <option key={ex._id} value={ex._id}>{ex.title}</option>
//             ))}
//           </select>

//           <button
//             onClick={handleAssign}
//             className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
//           >
//             Assign Exercises
//           </button>

//           {message && <p className="mt-4 text-green-700 font-semibold">{message}</p>}
//         </div>
//       )}

//       {activeTab === 'patients' && (
//         <div>
//           <h2 className="text-2xl font-semibold text-blue-800 mb-4">Registered Patients</h2>

//           <div className="bg-white p-6 mb-6 shadow rounded-lg">
//             <h3 className="font-semibold mb-2">➕ Add New Patient:</h3>
//             <div className="flex flex-wrap gap-3">
//               <input type="text" placeholder="Name" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} className="border px-3 py-2 rounded w-full md:w-48" />
//               <input type="email" placeholder="Email" value={newPatient.email} onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} className="border px-3 py-2 rounded w-full md:w-60" />
//               <input type="text" placeholder="Phone" value={newPatient.phone} onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })} className="border px-3 py-2 rounded w-full md:w-40" />
//               <input type="text" placeholder="Condition" value={newPatient.condition} onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })} className="border px-3 py-2 rounded w-full md:w-64" />
//               <button onClick={handleNewPatientSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
//             </div>
//           </div>

//           {patients.map((patient) => (
//             <div key={patient._id} className="mb-4 p-6 bg-white border rounded shadow">
//               <p><strong>Name:</strong> {patient.name}</p>
//               <p><strong>Email:</strong> {patient.email}</p>
//               <p><strong>Phone:</strong> {patient.phone || 'N/A'}</p>
//               <p><strong>Condition:</strong> {patient.condition || 'N/A'}</p>
//               <p><strong>Assigned Exercises:</strong> {getAssignedExerciseTitles(patient).join(', ') || 'None'}</p>
//               <p className="mt-2 font-medium text-gray-700">📊 Session History:</p>
//               <ul className="list-disc list-inside">
//                 {(historyMap[patient._id] || []).map((session, idx) => (
//                   <li key={idx} className="text-sm">
//                     <strong>{session.exercise?.title || 'N/A'}:</strong> {session.repetitionsDone} reps, Score: {session.score}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}

//       {activeTab === 'exercises' && (
//         <div>
//           <h2 className="text-2xl font-semibold text-blue-800 mb-4">📝 All Exercises</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {exercises.map((ex) => (
//               <div key={ex._id} className="bg-white p-5 rounded shadow border">
//                 <p><strong>Title:</strong> {ex.title}</p>
//                 <p><strong>Description:</strong> {ex.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PhysioDashboard;





import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 shadow-sm ${
      active ? 'bg-blue-700 text-white' : 'bg-gray-100 hover:bg-blue-100 text-blue-800'
    }`}
  >
    {label}
  </button>
);

const PhysioDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('assign');
  const [newPatient, setNewPatient] = useState({ name: '', email: '', phone: '', condition: '' });
  const [historyMap, setHistoryMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get('http://localhost:5000/api/users');
        const exRes = await axios.get('http://localhost:5000/api/exercises');
        setPatients(usersRes.data.users);
        setExercises(exRes.data.exercises);
      } catch (err) {
        console.error('❌ Error fetching data', err);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!selectedPatient || selectedExercises.length === 0) {
      setMessage('Please select a patient and at least one exercise');
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/users/assign-exercise/${selectedPatient}`, {
        exerciseIds: selectedExercises,
      });
      setMessage('✅ Exercises assigned successfully!');
    } catch (err) {
      console.error('❌ Assignment failed', err);
      setMessage('❌ Failed to assign exercises');
    }
  };

  const fetchSessionHistory = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}/session-history`);
      return res.data.history;
    } catch (err) {
      console.error('❌ Error fetching history', err);
      return [];
    }
  };

  useEffect(() => {
    const loadAllHistories = async () => {
      const map = {};
      for (const patient of patients) {
        const history = await fetchSessionHistory(patient._id);
        map[patient._id] = history;
      }
      setHistoryMap(map);
    };
    if (patients.length > 0) loadAllHistories();
  }, [patients]);

  const handleNewPatientSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        ...newPatient,
        role: 'patient',
      });
      setPatients([...patients, res.data.user]);
      setNewPatient({ name: '', email: '', phone: '', condition: '' });
      alert('✅ Patient added successfully!');
    } catch (err) {
      console.error('❌ Error adding patient', err);
      alert('❌ Failed to add patient');
    }
  };

  const getAssignedExerciseTitles = (patient) => {
    return patient.assignedExercises?.map((ex) => ex.title) || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white p-10 font-sans">
      <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">🧑‍⚕️ Physiotherapist Dashboard</h1>

      <div className="flex justify-center gap-4 mb-10">
        <TabButton label="Assign Exercises" active={activeTab === 'assign'} onClick={() => setActiveTab('assign')} />
        <TabButton label="View Patients" active={activeTab === 'patients'} onClick={() => setActiveTab('patients')} />
        <TabButton label="View Exercises" active={activeTab === 'exercises'} onClick={() => setActiveTab('exercises')} />
      </div>

      {activeTab === 'assign' && (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
          <label className="block mb-2 font-medium">Select Patient:</label>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full border rounded px-4 py-2 mb-4"
          >
            <option value="">-- Select --</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>{p.name} ({p.email})</option>
            ))}
          </select>

          <label className="block mb-2 font-medium">Select Exercises:</label>
          <select
            multiple
            value={selectedExercises}
            onChange={(e) => setSelectedExercises(Array.from(e.target.selectedOptions, (opt) => opt.value))}
            className="w-full border rounded px-4 py-2 h-32 mb-4"
          >
            {exercises.map((ex) => (
              <option key={ex._id} value={ex._id}>{ex.title}</option>
            ))}
          </select>

          <button
            onClick={handleAssign}
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
          >
            Assign Exercises
          </button>

          {message && <p className="mt-4 text-green-700 font-semibold">{message}</p>}
        </div>
      )}

      {activeTab === 'patients' && (
        <div>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Registered Patients</h2>

          <div className="bg-white p-6 mb-6 shadow rounded-lg">
            <h3 className="font-semibold mb-2">➕ Add New Patient:</h3>
            <div className="flex flex-wrap gap-3">
              <input type="text" placeholder="Name" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} className="border px-3 py-2 rounded w-full md:w-48" />
              <input type="email" placeholder="Email" value={newPatient.email} onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} className="border px-3 py-2 rounded w-full md:w-60" />
              <input type="text" placeholder="Phone" value={newPatient.phone} onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })} className="border px-3 py-2 rounded w-full md:w-40" />
              <input type="text" placeholder="Condition" value={newPatient.condition} onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })} className="border px-3 py-2 rounded w-full md:w-64" />
              <button onClick={handleNewPatientSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
            </div>
          </div>

          {patients.map((patient) => (
            <div key={patient._id} className="mb-4 p-6 bg-white border rounded shadow">
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Email:</strong> {patient.email}</p>
              <p><strong>Phone:</strong> {patient.phone || 'N/A'}</p>
              <p><strong>Condition:</strong> {patient.condition || 'N/A'}</p>
              <p><strong>Assigned Exercises:</strong> {getAssignedExerciseTitles(patient).join(', ') || 'None'}</p>
              <p className="mt-2 font-medium text-gray-700">📊 Session History:</p>
              <ul className="list-disc list-inside">
                {(historyMap[patient._id] || []).map((session, idx) => (
                  <li key={idx} className="text-sm">
                    <strong>{session.exercise?.title || 'N/A'}:</strong> {session.repetitionsDone} reps, Score: {session.score}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'exercises' && (
        <div>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">📝 All Exercises</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.map((ex) => (
              <div key={ex._id} className="bg-white p-5 rounded shadow border">
                <p><strong>Title:</strong> {ex.title}</p>
                <p><strong>Description:</strong> {ex.description}</p>
                {ex.image && <img src={ex.image} alt={ex.title} className="mt-2 rounded-md shadow max-h-48 object-contain" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysioDashboard;
