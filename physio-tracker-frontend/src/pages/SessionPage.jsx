// // // // // // // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // // // // // // // import * as poseDetection from '@mediapipe/pose';
// // // // // // // // // // // // // // import * as cam from '@mediapipe/camera_utils';
// // // // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';

// // // // // // // // // // // // // // const SessionPage = () => {
// // // // // // // // // // // // // //   const { exerciseId } = useParams();
// // // // // // // // // // // // // //   const [exercise, setExercise] = useState(null);
// // // // // // // // // // // // // //   const [reps, setReps] = useState(0);
// // // // // // // // // // // // // //   const [score, setScore] = useState(0);
// // // // // // // // // // // // // //   const [startTime, setStartTime] = useState(null);
// // // // // // // // // // // // // //   const [isSessionActive, setIsSessionActive] = useState(false);
// // // // // // // // // // // // // //   const webcamRef = useRef(null);
// // // // // // // // // // // // // //   const canvasRef = useRef(null);
// // // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     const fetchExercise = async () => {
// // // // // // // // // // // // // //       const res = await axios.get(`http://localhost:5000/api/exercises/${exerciseId}`);
// // // // // // // // // // // // // //       setExercise(res.data.exercise);
// // // // // // // // // // // // // //     };
// // // // // // // // // // // // // //     fetchExercise();
// // // // // // // // // // // // // //   }, [exerciseId]);

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     if (!exercise || !webcamRef.current) return;

// // // // // // // // // // // // // //     const pose = new poseDetection.Pose({
// // // // // // // // // // // // // //       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     pose.setOptions({
// // // // // // // // // // // // // //       modelComplexity: 1,
// // // // // // // // // // // // // //       smoothLandmarks: true,
// // // // // // // // // // // // // //       enableSegmentation: false,
// // // // // // // // // // // // // //       smoothSegmentation: false,
// // // // // // // // // // // // // //       minDetectionConfidence: 0.5,
// // // // // // // // // // // // // //       minTrackingConfidence: 0.5,
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     pose.onResults(onResults);

// // // // // // // // // // // // // //     const camera = new cam.Camera(webcamRef.current.video, {
// // // // // // // // // // // // // //       onFrame: async () => {
// // // // // // // // // // // // // //         await pose.send({ image: webcamRef.current.video });
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //       width: 640,
// // // // // // // // // // // // // //       height: 480,
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     camera.start();
// // // // // // // // // // // // // //     setStartTime(Date.now());
// // // // // // // // // // // // // //     setIsSessionActive(true);

// // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // //       camera.stop();
// // // // // // // // // // // // // //       setIsSessionActive(false);
// // // // // // // // // // // // // //     };
// // // // // // // // // // // // // //   }, [exercise]);

// // // // // // // // // // // // // //   const onResults = (results) => {
// // // // // // // // // // // // // //     if (!results.poseLandmarks) return;

// // // // // // // // // // // // // //     const lm = results.poseLandmarks;
// // // // // // // // // // // // // //     const ctx = canvasRef.current.getContext('2d');
// // // // // // // // // // // // // //     canvasRef.current.width = 640;
// // // // // // // // // // // // // //     canvasRef.current.height = 480;

// // // // // // // // // // // // // //     ctx.clearRect(0, 0, 640, 480);

// // // // // // // // // // // // // //     // Sample logic for Arm Raise
// // // // // // // // // // // // // //     if (exercise.title === 'Arm Raise') {
// // // // // // // // // // // // // //       if (lm[15].y < lm[0].y && lm[16].y < lm[0].y) {
// // // // // // // // // // // // // //         setReps((prev) => prev + 1);
// // // // // // // // // // // // // //         setScore((prev) => prev + 10);
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //     // Add similar logic for other exercises here
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const finishSession = async () => {
// // // // // // // // // // // // // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // // // // // // // // // // // // //     await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // // // // // // // // // // // // //       exerciseId,
// // // // // // // // // // // // // //       score,
// // // // // // // // // // // // // //       repetitionsDone: reps,
// // // // // // // // // // // // // //       durationInSeconds,
// // // // // // // // // // // // // //     });
// // // // // // // // // // // // // //     navigate('/patient-dashboard');
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div className="p-6">
// // // // // // // // // // // // // //       <h1 className="text-2xl font-bold mb-4">{exercise?.title}</h1>
// // // // // // // // // // // // // //       <div className="flex justify-center">
// // // // // // // // // // // // // //         <Webcam ref={webcamRef} className="rounded" width={640} height={480} />
// // // // // // // // // // // // // //         <canvas ref={canvasRef} className="absolute top-0 left-0" />
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //       <div className="mt-4">
// // // // // // // // // // // // // //         <p>Repetitions: {reps}</p>
// // // // // // // // // // // // // //         <p>Score: {score}</p>
// // // // // // // // // // // // // //         <button
// // // // // // // // // // // // // //           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // // // //           onClick={finishSession}
// // // // // // // // // // // // // //         >
// // // // // // // // // // // // // //           Finish Session
// // // // // // // // // // // // // //         </button>
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export default SessionPage;



// // // // // // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // // // // // // import * as poseDetection from '@mediapipe/pose';
// // // // // // // // // // // // // import * as cam from '@mediapipe/camera_utils';
// // // // // // // // // // // // // import * as drawingUtils from '@mediapipe/drawing_utils';
// // // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';

// // // // // // // // // // // // // const SessionPage = () => {
// // // // // // // // // // // // //   const { exerciseId } = useParams();
// // // // // // // // // // // // //   const [exercise, setExercise] = useState(null);
// // // // // // // // // // // // //   const [reps, setReps] = useState(0);
// // // // // // // // // // // // //   const [score, setScore] = useState(0);
// // // // // // // // // // // // //   const [startTime, setStartTime] = useState(null);
// // // // // // // // // // // // //   const webcamRef = useRef(null);
// // // // // // // // // // // // //   const canvasRef = useRef(null);
// // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // // // // // // // // // //   // Fetch exercise from DB
// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     const fetchExercise = async () => {
// // // // // // // // // // // // //       const res = await axios.get(`http://localhost:5000/api/exercises/${exerciseId}`);
// // // // // // // // // // // // //       setExercise(res.data.exercise);
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //     fetchExercise();
// // // // // // // // // // // // //   }, [exerciseId]);

// // // // // // // // // // // // //   // Start MediaPipe camera and pose
// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     if (!exercise || !webcamRef.current) return;

// // // // // // // // // // // // //     const pose = new poseDetection.Pose({
// // // // // // // // // // // // //       locateFile: (file) =>
// // // // // // // // // // // // //         `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     pose.setOptions({
// // // // // // // // // // // // //       modelComplexity: 1,
// // // // // // // // // // // // //       smoothLandmarks: true,
// // // // // // // // // // // // //       enableSegmentation: false,
// // // // // // // // // // // // //       smoothSegmentation: false,
// // // // // // // // // // // // //       minDetectionConfidence: 0.5,
// // // // // // // // // // // // //       minTrackingConfidence: 0.5,
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     pose.onResults(onResults);

// // // // // // // // // // // // //     const camera = new cam.Camera(webcamRef.current.video, {
// // // // // // // // // // // // //       onFrame: async () => {
// // // // // // // // // // // // //         await pose.send({ image: webcamRef.current.video });
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       width: 640,
// // // // // // // // // // // // //       height: 480,
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     camera.start();
// // // // // // // // // // // // //     setStartTime(Date.now());

// // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // //       camera.stop();
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //   }, [exercise]);

// // // // // // // // // // // // //   const onResults = (results) => {
// // // // // // // // // // // // //     const canvasElement = canvasRef.current;
// // // // // // // // // // // // //     const canvasCtx = canvasElement.getContext('2d');

// // // // // // // // // // // // //     canvasElement.width = 640;
// // // // // // // // // // // // //     canvasElement.height = 480;
// // // // // // // // // // // // //     canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

// // // // // // // // // // // // //     if (results.poseLandmarks) {
// // // // // // // // // // // // //       drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, poseDetection.POSE_CONNECTIONS, {
// // // // // // // // // // // // //         color: '#00FF00',
// // // // // // // // // // // // //         lineWidth: 4,
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       drawingUtils.drawLandmarks(canvasCtx, results.poseLandmarks, {
// // // // // // // // // // // // //         color: '#FF0000',
// // // // // // // // // // // // //         lineWidth: 2,
// // // // // // // // // // // // //       });

// // // // // // // // // // // // //       // Sample logic: Arm Raise
// // // // // // // // // // // // //       if (exercise?.title === 'Arm Raise') {
// // // // // // // // // // // // //         const leftWristY = results.poseLandmarks[15].y;
// // // // // // // // // // // // //         const rightWristY = results.poseLandmarks[16].y;
// // // // // // // // // // // // //         const noseY = results.poseLandmarks[0].y;

// // // // // // // // // // // // //         if (leftWristY < noseY && rightWristY < noseY) {
// // // // // // // // // // // // //           setReps((prev) => prev + 1);
// // // // // // // // // // // // //           setScore((prev) => prev + 10);
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       }

// // // // // // // // // // // // //       // Add logic for other exercises similarly
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const finishSession = async () => {
// // // // // // // // // // // // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // // // // // // // // // // // //         exerciseId,
// // // // // // // // // // // // //         score,
// // // // // // // // // // // // //         repetitionsDone: reps,
// // // // // // // // // // // // //         durationInSeconds,
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //       navigate('/patient-dashboard');
// // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // //       console.error('Error submitting session:', err);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="p-6">
// // // // // // // // // // // // //       <h1 className="text-2xl font-bold mb-4">{exercise?.title}</h1>

// // // // // // // // // // // // //       <div className="flex justify-center mb-4">
// // // // // // // // // // // // //         <div className="relative w-[640px] h-[480px]">
// // // // // // // // // // // // //           <Webcam ref={webcamRef} className="rounded w-full h-full" />
// // // // // // // // // // // // //           <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>

// // // // // // // // // // // // //       <div className="text-center">
// // // // // // // // // // // // //         <p>Repetitions: {reps}</p>
// // // // // // // // // // // // //         <p>Score: {score}</p>
// // // // // // // // // // // // //         <button
// // // // // // // // // // // // //           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // // // // // // // // // // // //           onClick={finishSession}
// // // // // // // // // // // // //         >
// // // // // // // // // // // // //           Finish Session
// // // // // // // // // // // // //         </button>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default SessionPage;




// // // // // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // // // // // import * as cam from '@mediapipe/camera_utils';
// // // // // // // // // // // // import { Pose } from '@mediapipe/pose';
// // // // // // // // // // // // import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
// // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';

// // // // // // // // // // // // const SessionPage = () => {
// // // // // // // // // // // //   const { exerciseId } = useParams();
// // // // // // // // // // // //   const webcamRef = useRef(null);
// // // // // // // // // // // //   const canvasRef = useRef(null);
// // // // // // // // // // // //   const [exercise, setExercise] = useState(null);
// // // // // // // // // // // //   const [reps, setReps] = useState(0);
// // // // // // // // // // // //   const [score, setScore] = useState(0);
// // // // // // // // // // // //   const [startTime, setStartTime] = useState(null);
// // // // // // // // // // // //   const [pose, setPose] = useState(null);
// // // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     axios.get(`http://localhost:5000/api/exercises/${exerciseId}`).then((res) => {
// // // // // // // // // // // //       setExercise(res.data.exercise);
// // // // // // // // // // // //     });
// // // // // // // // // // // //   }, [exerciseId]);

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (!exercise) return;

// // // // // // // // // // // //     const poseInstance = new Pose({
// // // // // // // // // // // //       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // // // // // // // // // // //     });

// // // // // // // // // // // //     poseInstance.setOptions({
// // // // // // // // // // // //       modelComplexity: 1,
// // // // // // // // // // // //       smoothLandmarks: true,
// // // // // // // // // // // //       enableSegmentation: false,
// // // // // // // // // // // //       smoothSegmentation: false,
// // // // // // // // // // // //       minDetectionConfidence: 0.5,
// // // // // // // // // // // //       minTrackingConfidence: 0.5,
// // // // // // // // // // // //     });

// // // // // // // // // // // //     poseInstance.onResults(onResults);
// // // // // // // // // // // //     setPose(poseInstance);
// // // // // // // // // // // //   }, [exercise]);

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (!pose || !webcamRef.current) return;

// // // // // // // // // // // //     const camera = new cam.Camera(webcamRef.current.video, {
// // // // // // // // // // // //       onFrame: async () => {
// // // // // // // // // // // //         await pose.send({ image: webcamRef.current.video });
// // // // // // // // // // // //       },
// // // // // // // // // // // //       width: 640,
// // // // // // // // // // // //       height: 480,
// // // // // // // // // // // //     });

// // // // // // // // // // // //     camera.start();
// // // // // // // // // // // //     setStartTime(Date.now());

// // // // // // // // // // // //     return () => {
// // // // // // // // // // // //       camera.stop();
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, [pose]);

// // // // // // // // // // // //   const onResults = (results) => {
// // // // // // // // // // // //     if (!results.poseLandmarks || !canvasRef.current) return;

// // // // // // // // // // // //     const ctx = canvasRef.current.getContext('2d');
// // // // // // // // // // // //     canvasRef.current.width = 640;
// // // // // // // // // // // //     canvasRef.current.height = 480;

// // // // // // // // // // // //     ctx.clearRect(0, 0, 640, 480);
// // // // // // // // // // // //     drawConnectors(ctx, results.poseLandmarks, Pose.POSE_CONNECTIONS, {
// // // // // // // // // // // //       color: '#00FF00',
// // // // // // // // // // // //       lineWidth: 2,
// // // // // // // // // // // //     });
// // // // // // // // // // // //     drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 1 });

// // // // // // // // // // // //     detectReps(results.poseLandmarks);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const getAngle = (a, b, c) => {
// // // // // // // // // // // //     const radians =
// // // // // // // // // // // //       Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
// // // // // // // // // // // //     let angle = Math.abs((radians * 180.0) / Math.PI);
// // // // // // // // // // // //     if (angle > 180) angle = 360 - angle;
// // // // // // // // // // // //     return angle;
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const detectReps = (lm) => {
// // // // // // // // // // // //     if (exercise.title === 'Arm Raise') {
// // // // // // // // // // // //       const angle = getAngle(lm[12], lm[14], lm[16]); // Right shoulder, elbow, wrist
// // // // // // // // // // // //       if (angle > 150) {
// // // // // // // // // // // //         setReps((prev) => prev + 1);
// // // // // // // // // // // //         setScore((prev) => prev + 10);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     } else if (exercise.title === 'Back Extension') {
// // // // // // // // // // // //       const angle = getAngle(lm[24], lm[26], lm[28]); // Right hip, knee, ankle
// // // // // // // // // // // //       if (angle < 120) {
// // // // // // // // // // // //         setReps((prev) => prev + 1);
// // // // // // // // // // // //         setScore((prev) => prev + 10);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     }
// // // // // // // // // // // //     // Add more exercises as needed
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const finishSession = async () => {
// // // // // // // // // // // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // // // // // // // // // // //     await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // // // // // // // // // // //       exerciseId,
// // // // // // // // // // // //       score,
// // // // // // // // // // // //       repetitionsDone: reps,
// // // // // // // // // // // //       durationInSeconds,
// // // // // // // // // // // //     });
// // // // // // // // // // // //     navigate('/patient-dashboard');
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="p-6">
// // // // // // // // // // // //       <h1 className="text-2xl font-bold mb-4">{exercise?.title}</h1>
// // // // // // // // // // // //       <div className="relative w-fit mx-auto">
// // // // // // // // // // // //         <Webcam ref={webcamRef} width={640} height={480} className="rounded" />
// // // // // // // // // // // //         <canvas
// // // // // // // // // // // //           ref={canvasRef}
// // // // // // // // // // // //           className="absolute top-0 left-0"
// // // // // // // // // // // //           width={640}
// // // // // // // // // // // //           height={480}
// // // // // // // // // // // //         />
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //       <div className="mt-4 text-center">
// // // // // // // // // // // //         <p>Repetitions: {reps}</p>
// // // // // // // // // // // //         <p>Score: {score}</p>
// // // // // // // // // // // //         <button
// // // // // // // // // // // //           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
// // // // // // // // // // // //           onClick={finishSession}
// // // // // // // // // // // //         >
// // // // // // // // // // // //           Finish Session
// // // // // // // // // // // //         </button>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default SessionPage;




// // // // // // // // // // // // src/pages/SessionPage.jsx
// // // // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // // // // import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
// // // // // // // // // // // import * as cam from '@mediapipe/camera_utils';
// // // // // // // // // // // import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
// // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';

// // // // // // // // // // // const SessionPage = () => {
// // // // // // // // // // //   const { exerciseId } = useParams();
// // // // // // // // // // //   const [exercise, setExercise] = useState(null);
// // // // // // // // // // //   const [reps, setReps] = useState(0);
// // // // // // // // // // //   const [score, setScore] = useState(0);
// // // // // // // // // // //   const [startTime, setStartTime] = useState(null);
// // // // // // // // // // //   const [isSessionActive, setIsSessionActive] = useState(false);
// // // // // // // // // // //   const webcamRef = useRef(null);
// // // // // // // // // // //   const canvasRef = useRef(null);
// // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const fetchExercise = async () => {
// // // // // // // // // // //       const res = await axios.get(`http://localhost:5000/api/exercises/${exerciseId}`);
// // // // // // // // // // //       setExercise(res.data.exercise);
// // // // // // // // // // //     };
// // // // // // // // // // //     fetchExercise();
// // // // // // // // // // //   }, [exerciseId]);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (!exercise || !webcamRef.current) return;

// // // // // // // // // // //     const pose = new Pose({
// // // // // // // // // // //       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // // // // // // // // // //     });

// // // // // // // // // // //     pose.setOptions({
// // // // // // // // // // //       modelComplexity: 1,
// // // // // // // // // // //       smoothLandmarks: true,
// // // // // // // // // // //       enableSegmentation: false,
// // // // // // // // // // //       smoothSegmentation: false,
// // // // // // // // // // //       minDetectionConfidence: 0.5,
// // // // // // // // // // //       minTrackingConfidence: 0.5,
// // // // // // // // // // //     });

// // // // // // // // // // //     pose.onResults(onResults);

// // // // // // // // // // //     const camera = new cam.Camera(webcamRef.current.video, {
// // // // // // // // // // //       onFrame: async () => {
// // // // // // // // // // //         await pose.send({ image: webcamRef.current.video });
// // // // // // // // // // //       },
// // // // // // // // // // //       width: 640,
// // // // // // // // // // //       height: 480,
// // // // // // // // // // //     });

// // // // // // // // // // //     camera.start();
// // // // // // // // // // //     setStartTime(Date.now());
// // // // // // // // // // //     setIsSessionActive(true);

// // // // // // // // // // //     return () => {
// // // // // // // // // // //       camera.stop();
// // // // // // // // // // //       setIsSessionActive(false);
// // // // // // // // // // //     };
// // // // // // // // // // //   }, [exercise]);

// // // // // // // // // // //   const onResults = (results) => {
// // // // // // // // // // //     if (!results.poseLandmarks) return;

// // // // // // // // // // //     const canvas = canvasRef.current;
// // // // // // // // // // //     const ctx = canvas.getContext('2d');
// // // // // // // // // // //     canvas.width = 640;
// // // // // // // // // // //     canvas.height = 480;

// // // // // // // // // // //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // // // // // // //     drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
// // // // // // // // // // //     drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 2 });

// // // // // // // // // // //     // Sample pose check: Arm Raise
// // // // // // // // // // //     if (exercise?.title === 'Arm Raise') {
// // // // // // // // // // //       if (results.poseLandmarks[15].y < results.poseLandmarks[11].y && results.poseLandmarks[16].y < results.poseLandmarks[12].y) {
// // // // // // // // // // //         setReps((prev) => prev + 1);
// // // // // // // // // // //         setScore((prev) => prev + 10);
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const finishSession = async () => {
// // // // // // // // // // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // // // // // // // // // //     await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // // // // // // // // // //       exerciseId,
// // // // // // // // // // //       score,
// // // // // // // // // // //       repetitionsDone: reps,
// // // // // // // // // // //       durationInSeconds,
// // // // // // // // // // //     });
// // // // // // // // // // //     navigate('/patient-dashboard');
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="p-6 relative">
// // // // // // // // // // //       <h1 className="text-2xl font-bold mb-4">{exercise?.title}</h1>
// // // // // // // // // // //       <div className="relative w-fit">
// // // // // // // // // // //         <Webcam ref={webcamRef} className="rounded" width={640} height={480} style={{ position: 'absolute' }} />
// // // // // // // // // // //         <canvas ref={canvasRef} className="rounded" style={{ position: 'absolute' }} />
// // // // // // // // // // //       </div>
// // // // // // // // // // //       <div className="mt-4">
// // // // // // // // // // //         <p>Repetitions: {reps}</p>
// // // // // // // // // // //         <p>Score: {score}</p>
// // // // // // // // // // //         <button
// // // // // // // // // // //           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
// // // // // // // // // // //           onClick={finishSession}
// // // // // // // // // // //         >
// // // // // // // // // // //           Finish Session
// // // // // // // // // // //         </button>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default SessionPage;






// // // // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // // // // import * as pose from '@mediapipe/pose';
// // // // // // // // // // // import * as cam from '@mediapipe/camera_utils';
// // // // // // // // // // // import * as drawingUtils from '@mediapipe/drawing_utils';
// // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';

// // // // // // // // // // // const SessionPage = () => {
// // // // // // // // // // //   const { exerciseId } = useParams();
// // // // // // // // // // //   const webcamRef = useRef(null);
// // // // // // // // // // //   const canvasRef = useRef(null);
// // // // // // // // // // //   const [reps, setReps] = useState(0);
// // // // // // // // // // //   const [score, setScore] = useState(0);
// // // // // // // // // // //   const [startTime, setStartTime] = useState(null);
// // // // // // // // // // //   const [exercise, setExercise] = useState(null);
// // // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // // // // // // // //   // Fetch exercise details
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const fetchExercise = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         const res = await axios.get(`http://localhost:5000/api/exercises/${exerciseId}`);
// // // // // // // // // // //         setExercise(res.data.exercise);
// // // // // // // // // // //       } catch (err) {
// // // // // // // // // // //         console.error('Failed to fetch exercise', err);
// // // // // // // // // // //       }
// // // // // // // // // // //     };
// // // // // // // // // // //     fetchExercise();
// // // // // // // // // // //   }, [exerciseId]);

// // // // // // // // // // //   // Pose Detection Setup
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (!exercise || !webcamRef.current) return;

// // // // // // // // // // //     const poseDetector = new pose.Pose({
// // // // // // // // // // //       locateFile: (file) =>
// // // // // // // // // // //         `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // // // // // // // // // //     });

// // // // // // // // // // //     poseDetector.setOptions({
// // // // // // // // // // //       modelComplexity: 1,
// // // // // // // // // // //       smoothLandmarks: true,
// // // // // // // // // // //       enableSegmentation: false,
// // // // // // // // // // //       minDetectionConfidence: 0.5,
// // // // // // // // // // //       minTrackingConfidence: 0.5,
// // // // // // // // // // //     });

// // // // // // // // // // //     poseDetector.onResults((results) => {
// // // // // // // // // // //       if (!results.poseLandmarks) return;

// // // // // // // // // // //       const canvas = canvasRef.current;
// // // // // // // // // // //       const ctx = canvas.getContext('2d');

// // // // // // // // // // //       canvas.width = webcamRef.current.video.videoWidth;
// // // // // // // // // // //       canvas.height = webcamRef.current.video.videoHeight;

// // // // // // // // // // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // // // // // // //       ctx.save();

// // // // // // // // // // //       drawingUtils.drawConnectors(ctx, results.poseLandmarks, pose.POSE_CONNECTIONS, {
// // // // // // // // // // //         color: '#00FF00',
// // // // // // // // // // //         lineWidth: 4,
// // // // // // // // // // //       });
// // // // // // // // // // //       drawingUtils.drawLandmarks(ctx, results.poseLandmarks, {
// // // // // // // // // // //         color: '#FF0000',
// // // // // // // // // // //         radius: 5,
// // // // // // // // // // //       });

// // // // // // // // // // //       ctx.restore();

// // // // // // // // // // //       handleRepsLogic(results.poseLandmarks);
// // // // // // // // // // //     });

// // // // // // // // // // //     let mpCamera = new cam.Camera(webcamRef.current.video, {
// // // // // // // // // // //       onFrame: async () => {
// // // // // // // // // // //         await poseDetector.send({ image: webcamRef.current.video });
// // // // // // // // // // //       },
// // // // // // // // // // //       width: 640,
// // // // // // // // // // //       height: 480,
// // // // // // // // // // //     });

// // // // // // // // // // //     mpCamera.start();
// // // // // // // // // // //     setStartTime(Date.now());

// // // // // // // // // // //     return () => mpCamera.stop();
// // // // // // // // // // //   }, [exercise]);

// // // // // // // // // // //   // Logic for counting reps (basic sample for Arm Raise)
// // // // // // // // // // //   const handleRepsLogic = (lm) => {
// // // // // // // // // // //     if (exercise?.title === 'Arm Raise') {
// // // // // // // // // // //       // Left and Right wrist higher than nose
// // // // // // // // // // //       if (lm[15].y < lm[0].y && lm[16].y < lm[0].y) {
// // // // // // // // // // //         setReps((r) => r + 1);
// // // // // // // // // // //         setScore((s) => s + 10);
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const finishSession = async () => {
// // // // // // // // // // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // // // // // // // // // //     await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // // // // // // // // // //       exerciseId,
// // // // // // // // // // //       score,
// // // // // // // // // // //       repetitionsDone: reps,
// // // // // // // // // // //       durationInSeconds,
// // // // // // // // // // //     });
// // // // // // // // // // //     navigate('/patient-dashboard');
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="relative w-[640px] h-[480px] mx-auto mt-8">
// // // // // // // // // // //       <Webcam
// // // // // // // // // // //         ref={webcamRef}
// // // // // // // // // // //         className="absolute top-0 left-0 rounded"
// // // // // // // // // // //         width={640}
// // // // // // // // // // //         height={480}
// // // // // // // // // // //         mirrored
// // // // // // // // // // //       />
// // // // // // // // // // //       <canvas
// // // // // // // // // // //         ref={canvasRef}
// // // // // // // // // // //         className="absolute top-0 left-0 pointer-events-none"
// // // // // // // // // // //       />
// // // // // // // // // // //       <div className="mt-4 text-center">
// // // // // // // // // // //         <h1 className="text-xl font-bold">{exercise?.title}</h1>
// // // // // // // // // // //         <p>Repetitions: {reps}</p>
// // // // // // // // // // //         <p>Score: {score}</p>
// // // // // // // // // // //         <button
// // // // // // // // // // //           onClick={finishSession}
// // // // // // // // // // //           className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
// // // // // // // // // // //         >
// // // // // // // // // // //           Finish Session
// // // // // // // // // // //         </button>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default SessionPage;



// // // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // // // import * as pose from '@mediapipe/pose';
// // // // // // // // // // import * as cam from '@mediapipe/camera_utils';
// // // // // // // // // // import * as drawingUtils from '@mediapipe/drawing_utils';
// // // // // // // // // // import axios from 'axios';
// // // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';

// // // // // // // // // // const SessionPage = () => {
// // // // // // // // // //   const { exerciseId } = useParams();
// // // // // // // // // //   const webcamRef = useRef(null);
// // // // // // // // // //   const canvasRef = useRef(null);
// // // // // // // // // //   const [reps, setReps] = useState(0);
// // // // // // // // // //   const [score, setScore] = useState(0);
// // // // // // // // // //   const [startTime, setStartTime] = useState(null);
// // // // // // // // // //   const [exercise, setExercise] = useState(null);
// // // // // // // // // //   const navigate = useNavigate();
// // // // // // // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // // // // // // // //   // Fetch exercise details
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const fetchExercise = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         // const res = await axios.get(`http://localhost:5000/api/exercises/${exerciseId}`);
// // // // // // // // // // //         // console.log("Exercise fetched:", res.data.exercise); // 🔍
// // // // // // // // // // //         // setExercise(res.data.exercise);
// // // // // // // // // // //          const fetchExercise = async () => {
// // // // // // // // // // //   setExercise({ title: 'Arm Raise' }); // Temporary fallback
// // // // // // // // // // // };


        
// // // // // // // // // // //       } catch (err) {
// // // // // // // // // // //         console.error('❌ Failed to fetch exercise', err);
// // // // // // // // // // //       }
// // // // // // // // // // //     };
// // // // // // // // // // //     fetchExercise();
// // // // // // // // // // //   }, [exerciseId]);



// // // // // // // // // // useEffect(() => {
// // // // // // // // // //   const fetchExercise = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       // 🛠️ TEMP: hardcoded fallback for debugging
// // // // // // // // // //       setExercise({ title: 'Arm Raise' });
// // // // // // // // // //       console.log("✅ Using fallback exercise: Arm Raise");
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error('❌ Failed to fetch exercise', err);
// // // // // // // // // //     }
// // // // // // // // // //   };
// // // // // // // // // //   fetchExercise();
// // // // // // // // // // }, [exerciseId]);


// // // // // // // // // //   // Pose Detection Setup
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (!exercise || !webcamRef.current) {
// // // // // // // // // //       console.warn("⏳ Waiting for exercise or webcam to load...");
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     const poseDetector = new pose.Pose({
// // // // // // // // // //       locateFile: (file) =>
// // // // // // // // // //         `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // // // // // // // // //     });

// // // // // // // // // //     poseDetector.setOptions({
// // // // // // // // // //       modelComplexity: 1,
// // // // // // // // // //       smoothLandmarks: true,
// // // // // // // // // //       enableSegmentation: false,
// // // // // // // // // //       minDetectionConfidence: 0.5,
// // // // // // // // // //       minTrackingConfidence: 0.5,
// // // // // // // // // //     });

// // // // // // // // // //     poseDetector.onResults((results) => {
// // // // // // // // // //       if (!results.poseLandmarks) {
// // // // // // // // // //         console.warn("⚠️ No landmarks detected");
// // // // // // // // // //         return;
// // // // // // // // // //       }

// // // // // // // // // //       console.log("✅ Pose landmarks detected"); // 🔍
// // // // // // // // // //       const canvas = canvasRef.current;
// // // // // // // // // //       const ctx = canvas.getContext('2d');

// // // // // // // // // //       canvas.width = webcamRef.current.video.videoWidth;
// // // // // // // // // //       canvas.height = webcamRef.current.video.videoHeight;

// // // // // // // // // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // // // // // //       ctx.save();

// // // // // // // // // //       drawingUtils.drawConnectors(ctx, results.poseLandmarks, pose.POSE_CONNECTIONS, {
// // // // // // // // // //         color: '#00FF00',
// // // // // // // // // //         lineWidth: 4,
// // // // // // // // // //       });
// // // // // // // // // //       drawingUtils.drawLandmarks(ctx, results.poseLandmarks, {
// // // // // // // // // //         color: '#FF0000',
// // // // // // // // // //         radius: 5,
// // // // // // // // // //       });

// // // // // // // // // //       ctx.restore();

// // // // // // // // // //       handleRepsLogic(results.poseLandmarks);
// // // // // // // // // //     });

// // // // // // // // // //     let mpCamera = new cam.Camera(webcamRef.current.video, {
// // // // // // // // // //       onFrame: async () => {
// // // // // // // // // //         if (webcamRef.current?.video?.readyState === 4) {
// // // // // // // // // //           await poseDetector.send({ image: webcamRef.current.video });
// // // // // // // // // //         }
// // // // // // // // // //       },
// // // // // // // // // //       width: 640,
// // // // // // // // // //       height: 480,
// // // // // // // // // //     });

// // // // // // // // // //     mpCamera.start();
// // // // // // // // // //     console.log("🎥 Camera started"); // 🔍
// // // // // // // // // //     setStartTime(Date.now());

// // // // // // // // // //     return () => {
// // // // // // // // // //       mpCamera.stop();
// // // // // // // // // //       console.log("🛑 Camera stopped"); // 🔍
// // // // // // // // // //     };
// // // // // // // // // //   }, [exercise]);

// // // // // // // // // //   // Logic for counting reps (basic sample for Arm Raise)
// // // // // // // // // //   const handleRepsLogic = (lm) => {
// // // // // // // // // //     if (exercise?.title === 'Arm Raise') {
// // // // // // // // // //       console.log("🧠 Checking arm raise logic..."); // 🔍
// // // // // // // // // //       if (lm[15].y < lm[0].y && lm[16].y < lm[0].y) {
// // // // // // // // // //         setReps((r) => r + 1);
// // // // // // // // // //         setScore((s) => s + 10);
// // // // // // // // // //         console.log("💪 Arm Raise counted!"); // 🔍
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const finishSession = async () => {
// // // // // // // // // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // // // // // // // // //     try {
// // // // // // // // // //       await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // // // // // // // // //         exerciseId,
// // // // // // // // // //         score,
// // // // // // // // // //         repetitionsDone: reps,
// // // // // // // // // //         durationInSeconds,
// // // // // // // // // //       });
// // // // // // // // // //       console.log("✅ Session data submitted"); // 🔍
// // // // // // // // // //       navigate('/patient-dashboard');
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error("❌ Failed to submit session data", err);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="relative w-[640px] h-[480px] mx-auto mt-8">
// // // // // // // // // //       <Webcam
// // // // // // // // // //         ref={webcamRef}
// // // // // // // // // //         className="absolute top-0 left-0 rounded"
// // // // // // // // // //         width={640}
// // // // // // // // // //         height={480}
// // // // // // // // // //         mirrored
// // // // // // // // // //       />
// // // // // // // // // //       <canvas
// // // // // // // // // //         ref={canvasRef}
// // // // // // // // // //         className="absolute top-0 left-0 pointer-events-none"
// // // // // // // // // //       />
// // // // // // // // // //       <div className="mt-4 text-center">
// // // // // // // // // //         <h1 className="text-xl font-bold">{exercise?.title}</h1>
// // // // // // // // // //         <p>Repetitions: {reps}</p>
// // // // // // // // // //         <p>Score: {score}</p>
// // // // // // // // // //         <button
// // // // // // // // // //           onClick={finishSession}
// // // // // // // // // //           className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
// // // // // // // // // //         >
// // // // // // // // // //           Finish Session
// // // // // // // // // //         </button>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default SessionPage;





// // // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // // import * as pose from '@mediapipe/pose';
// // // // // // // // // import * as cam from '@mediapipe/camera_utils';
// // // // // // // // // import * as drawingUtils from '@mediapipe/drawing_utils';
// // // // // // // // // import axios from 'axios';
// // // // // // // // // import { useParams, useNavigate } from 'react-router-dom';

// // // // // // // // // const SessionPage = () => {
// // // // // // // // //   const { exerciseId } = useParams();
// // // // // // // // //   const webcamRef = useRef(null);
// // // // // // // // //   const canvasRef = useRef(null);
// // // // // // // // //   const [reps, setReps] = useState(0);
// // // // // // // // //   const [score, setScore] = useState(0);
// // // // // // // // //   const [startTime, setStartTime] = useState(null);
// // // // // // // // //   const [exercise, setExercise] = useState(null);
// // // // // // // // //   const navigate = useNavigate();
// // // // // // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // // // // // //   // ✅ Fallback Exercise Loader
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchExercise = async () => {
// // // // // // // // //       try {
// // // // // // // // //         // Use hardcoded for now
// // // // // // // // //         setExercise({ title: 'Arm Raise' });
// // // // // // // // //         console.log("✅ Using fallback exercise: Arm Raise");
// // // // // // // // //       } catch (err) {
// // // // // // // // //         console.error('❌ Failed to fetch exercise', err);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     fetchExercise();
// // // // // // // // //   }, [exerciseId]);

// // // // // // // // //   // ✅ Pose Detection Setup
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!exercise || !webcamRef.current) {
// // // // // // // // //       console.warn("⏳ Waiting for exercise or webcam to load...");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     const poseDetector = new pose.Pose({
// // // // // // // // //       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // // // // // // // //     });

// // // // // // // // //     poseDetector.setOptions({
// // // // // // // // //       modelComplexity: 1,
// // // // // // // // //       smoothLandmarks: true,
// // // // // // // // //       enableSegmentation: false,
// // // // // // // // //       minDetectionConfidence: 0.5,
// // // // // // // // //       minTrackingConfidence: 0.5,
// // // // // // // // //     });

// // // // // // // // //     poseDetector.onResults((results) => {
// // // // // // // // //       if (!results.poseLandmarks) {
// // // // // // // // //         console.warn("⚠️ No landmarks detected");
// // // // // // // // //         return;
// // // // // // // // //       }

// // // // // // // // //       console.log("✅ Pose landmarks detected");
// // // // // // // // //       const canvas = canvasRef.current;
// // // // // // // // //       const ctx = canvas.getContext('2d');
// // // // // // // // //       canvas.width = webcamRef.current.video.videoWidth;
// // // // // // // // //       canvas.height = webcamRef.current.video.videoHeight;

// // // // // // // // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // // // // //       ctx.save();

// // // // // // // // //       drawingUtils.drawConnectors(ctx, results.poseLandmarks, pose.POSE_CONNECTIONS, {
// // // // // // // // //         color: '#00FF00',
// // // // // // // // //         lineWidth: 4,
// // // // // // // // //       });
// // // // // // // // //       drawingUtils.drawLandmarks(ctx, results.poseLandmarks, {
// // // // // // // // //         color: '#FF0000',
// // // // // // // // //         radius: 5,
// // // // // // // // //       });

// // // // // // // // //       ctx.restore();

// // // // // // // // //       handleRepsLogic(results.poseLandmarks);
// // // // // // // // //     });

// // // // // // // // //     const mpCamera = new cam.Camera(webcamRef.current.video, {
// // // // // // // // //       onFrame: async () => {
// // // // // // // // //         if (webcamRef.current?.video?.readyState === 4) {
// // // // // // // // //           await poseDetector.send({ image: webcamRef.current.video });
// // // // // // // // //         }
// // // // // // // // //       },
// // // // // // // // //       width: 640,
// // // // // // // // //       height: 480,
// // // // // // // // //     });

// // // // // // // // //     mpCamera.start();
// // // // // // // // //     console.log("🎥 Camera started");
// // // // // // // // //     setStartTime(Date.now());

// // // // // // // // //     return () => {
// // // // // // // // //       mpCamera.stop();
// // // // // // // // //       console.log("🛑 Camera stopped");
// // // // // // // // //     };
// // // // // // // // //   }, [exercise]);

// // // // // // // // //   // ✅ Repetition Detection Logic
// // // // // // // // //   const handleRepsLogic = (lm) => {
// // // // // // // // //     if (exercise?.title === 'Arm Raise') {
// // // // // // // // //       console.log("🧠 Checking arm raise logic...");
// // // // // // // // //       if (lm[15].y < lm[0].y && lm[16].y < lm[0].y) {
// // // // // // // // //         setReps((r) => r + 1);
// // // // // // // // //         setScore((s) => s + 10);
// // // // // // // // //         console.log("💪 Arm Raise counted!");
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ✅ Submit Results
// // // // // // // // //   const finishSession = async () => {
// // // // // // // // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // // // // // // // //     try {
// // // // // // // // //       await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // // // // // // // //         exerciseId,
// // // // // // // // //         score,
// // // // // // // // //         repetitionsDone: reps,
// // // // // // // // //         durationInSeconds,
// // // // // // // // //       });
// // // // // // // // //       console.log("✅ Session data submitted");
// // // // // // // // //       navigate('/patient-dashboard');
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error("❌ Failed to submit session data", err);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ✅ UI
// // // // // // // // // //   return (
// // // // // // // // // //     <div className="relative w-[640px] h-[480px] mx-auto mt-8">
// // // // // // // // // //       <Webcam
// // // // // // // // // //         ref={webcamRef}
// // // // // // // // // //         className="absolute top-0 left-0 rounded"
// // // // // // // // // //         width={640}
// // // // // // // // // //         height={480}
// // // // // // // // // //         mirrored
// // // // // // // // // //       />
// // // // // // // // // //       <canvas
// // // // // // // // // //         ref={canvasRef}
// // // // // // // // // //         className="absolute top-0 left-0 pointer-events-none"
// // // // // // // // // //       />
// // // // // // // // // //       <div className="mt-4 text-center">
// // // // // // // // // //         <h1 className="text-xl font-bold">{exercise?.title}</h1>
// // // // // // // // // //         <p>Repetitions: {reps}</p>
// // // // // // // // // //         <p>Score: {score}</p>
// // // // // // // // // //         <button
// // // // // // // // // //           onClick={finishSession}
// // // // // // // // // //           className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
// // // // // // // // // //         >
// // // // // // // // // //           Finish Session
// // // // // // // // // //         </button>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };




// // // // // // // // // return (
// // // // // // // // //   <div className="flex flex-col items-center mt-8">
// // // // // // // // //     {/* Video + Pose Overlay */}
// // // // // // // // //     <div className="relative w-[640px] h-[480px]">
// // // // // // // // //       <Webcam
// // // // // // // // //         ref={webcamRef}
// // // // // // // // //         className="absolute top-0 left-0 rounded z-10"
// // // // // // // // //         width={640}
// // // // // // // // //         height={480}
// // // // // // // // //         mirrored
// // // // // // // // //       />
// // // // // // // // //       <canvas
// // // // // // // // //         ref={canvasRef}
// // // // // // // // //         className="absolute top-0 left-0 pointer-events-none z-20"
// // // // // // // // //         width={640}
// // // // // // // // //         height={480}
// // // // // // // // //       />
// // // // // // // // //     </div>

// // // // // // // // //     {/* Score and Info */}
// // // // // // // // //     <div className="mt-6 text-center space-y-2">
// // // // // // // // //       <h1 className="text-xl font-bold">{exercise?.title}</h1>
// // // // // // // // //       <p className="text-lg">Repetitions: <strong>{reps}</strong></p>
// // // // // // // // //       <p className="text-lg">Score: <strong>{score}</strong></p>
// // // // // // // // //       <button
// // // // // // // // //         onClick={finishSession}
// // // // // // // // //         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // // // // // // // //       >
// // // // // // // // //         Finish Session
// // // // // // // // //       </button>
// // // // // // // // //     </div>
// // // // // // // // //   </div>
// // // // // // // // // );

// // // // // // // // // export default SessionPage;




// // // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // import * as pose from '@mediapipe/pose';
// // // // // // // // import * as cam from '@mediapipe/camera_utils';
// // // // // // // // import * as drawingUtils from '@mediapipe/drawing_utils';
// // // // // // // // import axios from 'axios';
// // // // // // // // import { useParams, useNavigate } from 'react-router-dom';

// // // // // // // // const SessionPage = () => {
// // // // // // // //   const { exerciseId } = useParams();
// // // // // // // //   const webcamRef = useRef(null);
// // // // // // // //   const canvasRef = useRef(null);
// // // // // // // //   const [reps, setReps] = useState(0);
// // // // // // // //   const [score, setScore] = useState(0);
// // // // // // // //   const [startTime, setStartTime] = useState(null);
// // // // // // // //   const [exercise, setExercise] = useState(null);
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // // // // //   useEffect(() => {
// // // // // // // //     const fetchExercise = async () => {
// // // // // // // //       try {
// // // // // // // //         setExercise({ title: 'Arm Raise' }); // for debug
// // // // // // // //         console.log("✅ Using fallback exercise: Arm Raise");
// // // // // // // //       } catch (err) {
// // // // // // // //         console.error('❌ Failed to fetch exercise', err);
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //     fetchExercise();
// // // // // // // //   }, [exerciseId]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!exercise || !webcamRef.current) return;

// // // // // // // //     const poseDetector = new pose.Pose({
// // // // // // // //       locateFile: (file) =>
// // // // // // // //         `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // // // // // // //     });

// // // // // // // //     poseDetector.setOptions({
// // // // // // // //       modelComplexity: 1,
// // // // // // // //       smoothLandmarks: true,
// // // // // // // //       enableSegmentation: false,
// // // // // // // //       minDetectionConfidence: 0.5,
// // // // // // // //       minTrackingConfidence: 0.5,
// // // // // // // //     });

// // // // // // // //     poseDetector.onResults((results) => {
// // // // // // // //       if (!results.poseLandmarks) return;

// // // // // // // //       const canvas = canvasRef.current;
// // // // // // // //       const ctx = canvas.getContext('2d');

// // // // // // // //       canvas.width = webcamRef.current.video.videoWidth;
// // // // // // // //       canvas.height = webcamRef.current.video.videoHeight;

// // // // // // // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // // // //       ctx.save();

// // // // // // // //       drawingUtils.drawConnectors(ctx, results.poseLandmarks, pose.POSE_CONNECTIONS, {
// // // // // // // //         color: '#00FF00',
// // // // // // // //         lineWidth: 4,
// // // // // // // //       });
// // // // // // // //       drawingUtils.drawLandmarks(ctx, results.poseLandmarks, {
// // // // // // // //         color: '#FF0000',
// // // // // // // //         radius: 5,
// // // // // // // //       });

// // // // // // // //       ctx.restore();

// // // // // // // //       handleRepsLogic(results.poseLandmarks);
// // // // // // // //     });

// // // // // // // //     let mpCamera = new cam.Camera(webcamRef.current.video, {
// // // // // // // //       onFrame: async () => {
// // // // // // // //         if (webcamRef.current?.video?.readyState === 4) {
// // // // // // // //           await poseDetector.send({ image: webcamRef.current.video });
// // // // // // // //         }
// // // // // // // //       },
// // // // // // // //       width: 640,
// // // // // // // //       height: 480,
// // // // // // // //     });

// // // // // // // //     mpCamera.start();
// // // // // // // //     setStartTime(Date.now());

// // // // // // // //     return () => {
// // // // // // // //       mpCamera.stop();
// // // // // // // //     };
// // // // // // // //   }, [exercise]);

// // // // // // // //   const handleRepsLogic = (lm) => {
// // // // // // // //     if (exercise?.title === 'Arm Raise') {
// // // // // // // //       if (lm[15].y < lm[0].y && lm[16].y < lm[0].y) {
// // // // // // // //         setReps((r) => r + 1);
// // // // // // // //         setScore((s) => s + 10);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const finishSession = async () => {
// // // // // // // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // // // // // // //     try {
// // // // // // // //       await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // // // // // // //         exerciseId,
// // // // // // // //         score,
// // // // // // // //         repetitionsDone: reps,
// // // // // // // //         durationInSeconds,
// // // // // // // //       });
// // // // // // // //       navigate('/patient-dashboard');
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error("❌ Failed to submit session data", err);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ✅ FINAL JSX RETURN BLOCK
// // // // // // // //   return (
// // // // // // // //     <div className="flex flex-col items-center mt-8">
// // // // // // // //       <div className="relative w-[640px] h-[480px]">
// // // // // // // //         <Webcam
// // // // // // // //           ref={webcamRef}
// // // // // // // //           className="absolute top-0 left-0 rounded z-10"
// // // // // // // //           width={640}
// // // // // // // //           height={480}
// // // // // // // //           mirrored={false}
// // // // // // // //         />
// // // // // // // //         <canvas
// // // // // // // //           ref={canvasRef}
// // // // // // // //           className="absolute top-0 left-0 pointer-events-none z-20"
// // // // // // // //           width={640}
// // // // // // // //           height={480}
// // // // // // // //         />
// // // // // // // //       </div>

// // // // // // // //       <div className="mt-6 text-center space-y-2">
// // // // // // // //         <h1 className="text-xl font-bold">{exercise?.title}</h1>
// // // // // // // //         <p className="text-lg">Repetitions: <strong>{reps}</strong></p>
// // // // // // // //         <p className="text-lg">Score: <strong>{score}</strong></p>
// // // // // // // //         <button
// // // // // // // //           onClick={finishSession}
// // // // // // // //           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // // // // // // //         >
// // // // // // // //           Finish Session
// // // // // // // //         </button>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default SessionPage;




// // // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // // import Webcam from 'react-webcam';
// // // // // // // import * as pose from '@mediapipe/pose';
// // // // // // // import * as cam from '@mediapipe/camera_utils';
// // // // // // // import * as drawingUtils from '@mediapipe/drawing_utils';
// // // // // // // import axios from 'axios';
// // // // // // // import { useParams, useNavigate } from 'react-router-dom';

// // // // // // // const SessionPage = () => {
// // // // // // //   const { exerciseId } = useParams();
// // // // // // //   const webcamRef = useRef(null);
// // // // // // //   const canvasRef = useRef(null);
// // // // // // //   const [reps, setReps] = useState(0);
// // // // // // //   const [score, setScore] = useState(0);
// // // // // // //   const [startTime, setStartTime] = useState(null);
// // // // // // //   const [exercise, setExercise] = useState(null);
// // // // // // //   const [armUp, setArmUp] = useState(false); // ✅ Track up/down cycle
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // // // //   // ✅ Fetch exercise (temporarily hardcoded for testing)
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchExercise = async () => {
// // // // // // //       setExercise({ title: 'Arm Raise' }); // fallback
// // // // // // //       console.log("✅ Using fallback exercise: Arm Raise");
// // // // // // //     };
// // // // // // //     fetchExercise();
// // // // // // //   }, [exerciseId]);

// // // // // // //   // ✅ Setup MediaPipe Pose and Webcam
// // // // // // //   useEffect(() => {
// // // // // // //     if (!exercise || !webcamRef.current) return;

// // // // // // //     const poseDetector = new pose.Pose({
// // // // // // //       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // // // // // //     });

// // // // // // //     poseDetector.setOptions({
// // // // // // //       modelComplexity: 1,
// // // // // // //       smoothLandmarks: true,
// // // // // // //       enableSegmentation: false,
// // // // // // //       minDetectionConfidence: 0.5,
// // // // // // //       minTrackingConfidence: 0.5,
// // // // // // //     });

// // // // // // //     poseDetector.onResults((results) => {
// // // // // // //       if (!results.poseLandmarks) return;

// // // // // // //       const canvas = canvasRef.current;
// // // // // // //       const ctx = canvas.getContext('2d');

// // // // // // //       canvas.width = webcamRef.current.video.videoWidth;
// // // // // // //       canvas.height = webcamRef.current.video.videoHeight;

// // // // // // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // // //       ctx.save();

// // // // // // //       drawingUtils.drawConnectors(ctx, results.poseLandmarks, pose.POSE_CONNECTIONS, {
// // // // // // //         color: '#00FF00',
// // // // // // //         lineWidth: 4,
// // // // // // //       });
// // // // // // //       drawingUtils.drawLandmarks(ctx, results.poseLandmarks, {
// // // // // // //         color: '#FF0000',
// // // // // // //         radius: 5,
// // // // // // //       });

// // // // // // //       ctx.restore();

// // // // // // //       handleRepsLogic(results.poseLandmarks);
// // // // // // //     });

// // // // // // //     const mpCamera = new cam.Camera(webcamRef.current.video, {
// // // // // // //       onFrame: async () => {
// // // // // // //         if (webcamRef.current?.video?.readyState === 4) {
// // // // // // //           await poseDetector.send({ image: webcamRef.current.video });
// // // // // // //         }
// // // // // // //       },
// // // // // // //       width: 640,
// // // // // // //       height: 480,
// // // // // // //     });

// // // // // // //     mpCamera.start();
// // // // // // //     setStartTime(Date.now());

// // // // // // //     return () => {
// // // // // // //       mpCamera.stop();
// // // // // // //     };
// // // // // // //   }, [exercise]);

// // // // // // //   // ✅ Arm Raise Logic (Full up-down cycle)
// // // // // // //   const handleRepsLogic = (lm) => {
// // // // // // //     if (exercise?.title === 'Arm Raise') {
// // // // // // //       const leftWristY = lm[15].y;
// // // // // // //       const rightWristY = lm[16].y;
// // // // // // //       const noseY = lm[0].y;

// // // // // // //       // Arm went up
// // // // // // //       if (!armUp && leftWristY < noseY && rightWristY < noseY) {
// // // // // // //         setArmUp(true);
// // // // // // //       }

// // // // // // //       // Arm came down
// // // // // // //       if (armUp && leftWristY > noseY && rightWristY > noseY) {
// // // // // // //         setArmUp(false);
// // // // // // //         setReps((r) => r + 1);
// // // // // // //         setScore((s) => s + 10);
// // // // // // //         console.log("💪 Full Arm Raise completed");
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ✅ Submit session score
// // // // // // //   const finishSession = async () => {
// // // // // // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // // // // // //     try {
// // // // // // //       await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // // // // // //         exerciseId,
// // // // // // //         score,
// // // // // // //         repetitionsDone: reps,
// // // // // // //         durationInSeconds,
// // // // // // //       });
// // // // // // //       console.log("✅ Session data submitted");
// // // // // // //       navigate('/patient-dashboard');
// // // // // // //     } catch (err) {
// // // // // // //       console.error("❌ Failed to submit session data", err);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // ✅ Render
// // // // // // //   return (
// // // // // // //     <div className="flex flex-col items-center mt-8">
// // // // // // //       {/* Video + Canvas */}
// // // // // // //       <div className="relative w-[640px] h-[480px]">
// // // // // // //         <Webcam
// // // // // // //           ref={webcamRef}
// // // // // // //           className="absolute top-0 left-0 rounded z-10"
// // // // // // //           width={640}
// // // // // // //           height={480}
// // // // // // //           mirrored={false} // ✅ no mirror
// // // // // // //         />
// // // // // // //         <canvas
// // // // // // //           ref={canvasRef}
// // // // // // //           className="absolute top-0 left-0 pointer-events-none z-20"
// // // // // // //           width={640}
// // // // // // //           height={480}
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       {/* Stats */}
// // // // // // //       <div className="mt-6 text-center space-y-2">
// // // // // // //         <h1 className="text-xl font-bold">{exercise?.title}</h1>
// // // // // // //         <p className="text-lg">Repetitions: <strong>{reps}</strong></p>
// // // // // // //         <p className="text-lg">Score: <strong>{score}</strong></p>
// // // // // // //         <button
// // // // // // //           onClick={finishSession}
// // // // // // //           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // // // // // //         >
// // // // // // //           Finish Session
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default SessionPage;




// // // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // // import Webcam from 'react-webcam';
// // // // // // import * as pose from '@mediapipe/pose';
// // // // // // import * as cam from '@mediapipe/camera_utils';
// // // // // // import * as drawingUtils from '@mediapipe/drawing_utils';
// // // // // // import axios from 'axios';
// // // // // // import { useParams, useNavigate } from 'react-router-dom';

// // // // // // const SessionPage = () => {
// // // // // //   const { exerciseId } = useParams();
// // // // // //   const webcamRef = useRef(null);
// // // // // //   const canvasRef = useRef(null);
// // // // // //   const [reps, setReps] = useState(0);
// // // // // //   const [score, setScore] = useState(0);
// // // // // //   const [startTime, setStartTime] = useState(null);
// // // // // //   const [exercise, setExercise] = useState(null);
// // // // // //   const navigate = useNavigate();
// // // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // // //   const [armUp, setArmUp] = useState(false); // 👈 to track pose state

// // // // // //   useEffect(() => {
// // // // // //     const fetchExercise = async () => {
// // // // // //       try {
// // // // // //         setExercise({ title: 'Arm Raise' }); // fallback exercise
// // // // // //       } catch (err) {
// // // // // //         console.error('❌ Failed to fetch exercise', err);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchExercise();
// // // // // //   }, [exerciseId]);

// // // // // //   useEffect(() => {
// // // // // //     if (!exercise || !webcamRef.current) return;

// // // // // //     const poseDetector = new pose.Pose({
// // // // // //       locateFile: (file) =>
// // // // // //         `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // // // // //     });

// // // // // //     poseDetector.setOptions({
// // // // // //       modelComplexity: 1,
// // // // // //       smoothLandmarks: true,
// // // // // //       enableSegmentation: false,
// // // // // //       minDetectionConfidence: 0.5,
// // // // // //       minTrackingConfidence: 0.5,
// // // // // //     });

// // // // // //     poseDetector.onResults((results) => {
// // // // // //       if (!results.poseLandmarks) return;

// // // // // //       const canvas = canvasRef.current;
// // // // // //       const ctx = canvas.getContext('2d');
// // // // // //       canvas.width = webcamRef.current.video.videoWidth;
// // // // // //       canvas.height = webcamRef.current.video.videoHeight;

// // // // // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // // //       ctx.save();
// // // // // //       drawingUtils.drawConnectors(ctx, results.poseLandmarks, pose.POSE_CONNECTIONS, {
// // // // // //         color: '#00FF00',
// // // // // //         lineWidth: 4,
// // // // // //       });
// // // // // //       drawingUtils.drawLandmarks(ctx, results.poseLandmarks, {
// // // // // //         color: '#FF0000',
// // // // // //         radius: 5,
// // // // // //       });
// // // // // //       ctx.restore();

// // // // // //       handleRepsLogic(results.poseLandmarks);
// // // // // //     });

// // // // // //     let mpCamera = new cam.Camera(webcamRef.current.video, {
// // // // // //       onFrame: async () => {
// // // // // //         if (webcamRef.current?.video?.readyState === 4) {
// // // // // //           await poseDetector.send({ image: webcamRef.current.video });
// // // // // //         }
// // // // // //       },
// // // // // //       width: 640,
// // // // // //       height: 480,
// // // // // //     });

// // // // // //     mpCamera.start();
// // // // // //     setStartTime(Date.now());

// // // // // //     return () => {
// // // // // //       mpCamera.stop();
// // // // // //     };
// // // // // //   }, [exercise]);

// // // // // //   // ✅ Improved Repetition Logic
// // // // // //   const handleRepsLogic = (lm) => {
// // // // // //     const noseY = lm[0].y;
// // // // // //     const leftWristY = lm[15].y;
// // // // // //     const rightWristY = lm[16].y;

// // // // // //     if (exercise?.title === 'Arm Raise') {
// // // // // //       const bothArmsUp = leftWristY < noseY && rightWristY < noseY;

// // // // // //       if (bothArmsUp && !armUp) {
// // // // // //         setArmUp(true); // Arm is now up
// // // // // //       }

// // // // // //       if (!bothArmsUp && armUp) {
// // // // // //         // Arm was up, now down — count 1 rep
// // // // // //         setReps((r) => r + 1);
// // // // // //         setScore((s) => s + 10);
// // // // // //         setArmUp(false);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const finishSession = async () => {
// // // // // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // // // // //     try {
// // // // // //       await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // // // // //         exerciseId,
// // // // // //         score,
// // // // // //         repetitionsDone: reps,
// // // // // //         durationInSeconds,
// // // // // //       });
// // // // // //       navigate('/patient-dashboard');
// // // // // //     } catch (err) {
// // // // // //       console.error("❌ Failed to submit session data", err);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="flex flex-col items-center mt-8">
// // // // // //       <div className="relative w-[640px] h-[480px]">
// // // // // //         <Webcam
// // // // // //           ref={webcamRef}
// // // // // //           className="absolute top-0 left-0 rounded z-10"
// // // // // //           width={640}
// // // // // //           height={480}
// // // // // //           mirrored={false} // 👈 mirror off
// // // // // //         />
// // // // // //         <canvas
// // // // // //           ref={canvasRef}
// // // // // //           className="absolute top-0 left-0 pointer-events-none z-20"
// // // // // //           width={640}
// // // // // //           height={480}
// // // // // //         />
// // // // // //       </div>

// // // // // //       <div className="mt-6 text-center space-y-2">
// // // // // //         <h1 className="text-xl font-bold">{exercise?.title}</h1>
// // // // // //         <p className="text-lg">Repetitions: <strong>{reps}</strong></p>
// // // // // //         <p className="text-lg">Score: <strong>{score}</strong></p>
// // // // // //         <button
// // // // // //           onClick={finishSession}
// // // // // //           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // // // // //         >
// // // // // //           Finish Session
// // // // // //         </button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default SessionPage;


// // // // // import React, { useEffect, useRef, useState } from 'react';
// // // // // import Webcam from 'react-webcam';
// // // // // import * as pose from '@mediapipe/pose';
// // // // // import * as cam from '@mediapipe/camera_utils';
// // // // // import * as drawingUtils from '@mediapipe/drawing_utils';
// // // // // import axios from 'axios';
// // // // // import { useParams, useNavigate } from 'react-router-dom';

// // // // // const SessionPage = () => {
// // // // //   const { exerciseId } = useParams();
// // // // //   const webcamRef = useRef(null);
// // // // //   const canvasRef = useRef(null);
// // // // //   const [reps, setReps] = useState(0);
// // // // //   const [score, setScore] = useState(0);
// // // // //   const [startTime, setStartTime] = useState(null);
// // // // //   const [exercise, setExercise] = useState(null);
// // // // //   const [armUp, setArmUp] = useState(false); // for rep logic
// // // // //   const navigate = useNavigate();
// // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // //   useEffect(() => {
// // // // //     const fetchExercise = async () => {
// // // // //       try {
// // // // //         setExercise({ title: 'Arm Raise' }); // TEMP fallback
// // // // //         console.log("✅ Using fallback exercise: Arm Raise");
// // // // //       } catch (err) {
// // // // //         console.error('❌ Failed to fetch exercise', err);
// // // // //       }
// // // // //     };
// // // // //     fetchExercise();
// // // // //   }, [exerciseId]);

// // // // //   useEffect(() => {
// // // // //     if (!exercise || !webcamRef.current) return;

// // // // //     const poseDetector = new pose.Pose({
// // // // //       locateFile: (file) =>
// // // // //         `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // // // //     });

// // // // //     poseDetector.setOptions({
// // // // //       modelComplexity: 1,
// // // // //       smoothLandmarks: true,
// // // // //       enableSegmentation: false,
// // // // //       minDetectionConfidence: 0.5,
// // // // //       minTrackingConfidence: 0.5,
// // // // //     });

// // // // //     poseDetector.onResults((results) => {
// // // // //       if (!results.poseLandmarks) {
// // // // //         console.warn("⚠️ No landmarks detected");
// // // // //         return;
// // // // //       }

// // // // //       const canvas = canvasRef.current;
// // // // //       const ctx = canvas.getContext('2d');
// // // // //       canvas.width = webcamRef.current.video.videoWidth;
// // // // //       canvas.height = webcamRef.current.video.videoHeight;

// // // // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // // //       ctx.save();

// // // // //       drawingUtils.drawConnectors(ctx, results.poseLandmarks, pose.POSE_CONNECTIONS, {
// // // // //         color: '#00FF00',
// // // // //         lineWidth: 4,
// // // // //       });
// // // // //       drawingUtils.drawLandmarks(ctx, results.poseLandmarks, {
// // // // //         color: '#FF0000',
// // // // //         radius: 5,
// // // // //       });

// // // // //       ctx.restore();

// // // // //       handleRepsLogic(results.poseLandmarks);
// // // // //     });

// // // // //     const mpCamera = new cam.Camera(webcamRef.current.video, {
// // // // //       onFrame: async () => {
// // // // //         if (webcamRef.current?.video?.readyState === 4) {
// // // // //           await poseDetector.send({ image: webcamRef.current.video });
// // // // //         }
// // // // //       },
// // // // //       width: 640,
// // // // //       height: 480,
// // // // //     });

// // // // //     mpCamera.start();
// // // // //     console.log("🎥 Camera started");
// // // // //     setStartTime(Date.now());

// // // // //     return () => {
// // // // //       mpCamera.stop();
// // // // //       console.log("🛑 Camera stopped");
// // // // //     };
// // // // //   }, [exercise]);

// // // // //   // ✅ Correct full-cycle logic for Arm Raise
// // // // //   const handleRepsLogic = (lm) => {
// // // // //     if (exercise?.title === 'Arm Raise') {
// // // // //       const leftWrist = lm[15];
// // // // //       const rightWrist = lm[16];
// // // // //       const nose = lm[0];

// // // // //       const armsAreUp = leftWrist.y < nose.y && rightWrist.y < nose.y;

// // // // //       if (armsAreUp && !armUp) {
// // // // //         setArmUp(true); // arm is up
// // // // //       }

// // // // //       if (!armsAreUp && armUp) {
// // // // //         // Arm was up and now down → one rep
// // // // //         setReps((prev) => prev + 1);
// // // // //         setScore((prev) => prev + 10);
// // // // //         setArmUp(false);
// // // // //         console.log("💪 Rep Counted!");
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const finishSession = async () => {
// // // // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // // // //     try {
// // // // //       await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // // // //         exerciseId,
// // // // //         score,
// // // // //         repetitionsDone: reps,
// // // // //         durationInSeconds,
// // // // //       });
// // // // //       console.log("✅ Session submitted");
// // // // //       navigate('/patient-dashboard');
// // // // //     } catch (err) {
// // // // //       console.error("❌ Failed to submit session", err);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="flex flex-col items-center mt-8">
// // // // //       <div className="relative w-[640px] h-[480px]">
// // // // //         <Webcam
// // // // //           ref={webcamRef}
// // // // //           className="absolute top-0 left-0 rounded z-10"
// // // // //           width={640}
// // // // //           height={480}
// // // // //           mirrored={false} // ✅ Fix mirror effect
// // // // //         />
// // // // //         <canvas
// // // // //           ref={canvasRef}
// // // // //           className="absolute top-0 left-0 pointer-events-none z-20"
// // // // //           width={640}
// // // // //           height={480}
// // // // //         />
// // // // //       </div>

// // // // //       <div className="mt-6 text-center space-y-2">
// // // // //         <h1 className="text-xl font-bold">{exercise?.title}</h1>
// // // // //         <p className="text-lg">Repetitions: <strong>{reps}</strong></p>
// // // // //         <p className="text-lg">Score: <strong>{score}</strong></p>
// // // // //         <button
// // // // //           onClick={finishSession}
// // // // //           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // // // //         >
// // // // //           Finish Session
// // // // //         </button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SessionPage;



// // // // import React, { useEffect, useRef, useState } from 'react';
// // // // import Webcam from 'react-webcam';
// // // // import * as pose from '@mediapipe/pose';
// // // // import * as cam from '@mediapipe/camera_utils';
// // // // import * as drawingUtils from '@mediapipe/drawing_utils';
// // // // import axios from 'axios';
// // // // import { useParams, useNavigate } from 'react-router-dom';

// // // // const SessionPage = () => {
// // // //   const { exerciseId } = useParams();
// // // //   const webcamRef = useRef(null);
// // // //   const canvasRef = useRef(null);
// // // //   const [reps, setReps] = useState(0);
// // // //   const [score, setScore] = useState(0);
// // // //   const [startTime, setStartTime] = useState(null);
// // // //   const [exercise, setExercise] = useState(null);
// // // //   const [poseDetected, setPoseDetected] = useState(false);
// // // //   const [armUp, setArmUp] = useState(false);
// // // //   const navigate = useNavigate();
// // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // //   useEffect(() => {
// // // //     const fetchExercise = async () => {
// // // //       try {
// // // //         setExercise({ title: 'Arm Raise' });
// // // //         console.log("✅ Using fallback exercise: Arm Raise");
// // // //       } catch (err) {
// // // //         console.error('❌ Failed to fetch exercise', err);
// // // //       }
// // // //     };
// // // //     fetchExercise();
// // // //   }, [exerciseId]);

// // // //   useEffect(() => {
// // // //     if (!exercise || !webcamRef.current) return;

// // // //     const poseDetector = new pose.Pose({
// // // //       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // // //     });

// // // //     poseDetector.setOptions({
// // // //       modelComplexity: 1,
// // // //       smoothLandmarks: true,
// // // //       enableSegmentation: false,
// // // //       minDetectionConfidence: 0.5,
// // // //       minTrackingConfidence: 0.5,
// // // //     });

// // // //     poseDetector.onResults((results) => {
// // // //       if (!results.poseLandmarks) {
// // // //         console.warn("⚠️ No landmarks detected");
// // // //         return;
// // // //       }

// // // //       setPoseDetected(true);
// // // //       const canvas = canvasRef.current;
// // // //       const ctx = canvas.getContext('2d');
// // // //       canvas.width = webcamRef.current.video.videoWidth;
// // // //       canvas.height = webcamRef.current.video.videoHeight;
// // // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // //       ctx.save();
// // // //       drawingUtils.drawConnectors(ctx, results.poseLandmarks, pose.POSE_CONNECTIONS, {
// // // //         color: '#00FF00',
// // // //         lineWidth: 4,
// // // //       });
// // // //       drawingUtils.drawLandmarks(ctx, results.poseLandmarks, {
// // // //         color: '#FF0000',
// // // //         radius: 5,
// // // //       });
// // // //       ctx.restore();

// // // //       handleRepsLogic(results.poseLandmarks);
// // // //     });

// // // //     let mpCamera = new cam.Camera(webcamRef.current.video, {
// // // //       onFrame: async () => {
// // // //         if (webcamRef.current?.video?.readyState === 4) {
// // // //           await poseDetector.send({ image: webcamRef.current.video });
// // // //         }
// // // //       },
// // // //       width: 640,
// // // //       height: 480,
// // // //     });

// // // //     mpCamera.start();
// // // //     setStartTime(Date.now());

// // // //     return () => {
// // // //       mpCamera.stop();
// // // //       console.log("🛑 Camera stopped");
// // // //     };
// // // //   }, [exercise]);

// // // //   const handleRepsLogic = (lm) => {
// // // //     if (exercise?.title === 'Arm Raise') {
// // // //       const leftWrist = lm[15].y;
// // // //       const rightWrist = lm[16].y;
// // // //       const nose = lm[0].y;

// // // //       const isUp = leftWrist < nose && rightWrist < nose;

// // // //       if (isUp && !armUp) {
// // // //         setArmUp(true);
// // // //       }

// // // //       if (!isUp && armUp) {
// // // //         setArmUp(false);
// // // //         setReps((prev) => prev + 1);
// // // //         setScore((prev) => prev + 10);
// // // //         console.log("💪 Arm Raise counted!");
// // // //       }
// // // //     }
// // // //   };

// // // //   const finishSession = async () => {
// // // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // // //     if (reps === 0) {
// // // //       alert("Please complete at least one repetition.");
// // // //       return;
// // // //     }
// // // //     try {
// // // //       await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // // //         exerciseId,
// // // //         score,
// // // //         repetitionsDone: reps,
// // // //         durationInSeconds,
// // // //       });
// // // //       console.log("✅ Session submitted");
// // // //       navigate('/patient-dashboard');
// // // //     } catch (err) {
// // // //       console.error("❌ Failed to submit session data", err);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-col items-center mt-8">
// // // //       <div className="relative w-[640px] h-[480px]">
// // // //         <Webcam
// // // //           ref={webcamRef}
// // // //           className="absolute top-0 left-0 rounded z-10"
// // // //           width={640}
// // // //           height={480}
// // // //           mirrored={false} // ✅ No mirror
// // // //         />
// // // //         <canvas
// // // //           ref={canvasRef}
// // // //           className="absolute top-0 left-0 pointer-events-none z-20"
// // // //           width={640}
// // // //           height={480}
// // // //         />
// // // //       </div>

// // // //       <div className="mt-6 text-center space-y-2">
// // // //         <h1 className="text-xl font-bold">{exercise?.title}</h1>
// // // //         <p className="text-lg">Repetitions: <strong>{reps}</strong></p>
// // // //         <p className="text-lg">Score: <strong>{score}</strong></p>
// // // //         <button
// // // //           onClick={finishSession}
// // // //           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // // //           disabled={!poseDetected} // ✅ Prevent early submit
// // // //         >
// // // //           Finish Session
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SessionPage;









// // // import React, { useEffect, useRef, useState } from 'react';
// // // import Webcam from 'react-webcam';
// // // import * as pose from '@mediapipe/pose';
// // // import * as cam from '@mediapipe/camera_utils';
// // // import * as drawingUtils from '@mediapipe/drawing_utils';
// // // import axios from 'axios';
// // // import { useParams, useNavigate } from 'react-router-dom';

// // // const SessionPage = () => {
// // //   const { exerciseId } = useParams();
// // //   const webcamRef = useRef(null);
// // //   const canvasRef = useRef(null);
// // //   const [reps, setReps] = useState(0);
// // //   const [score, setScore] = useState(0);
// // //   const [startTime, setStartTime] = useState(null);
// // //   const [exercise, setExercise] = useState(null);
// // //   const navigate = useNavigate();
// // //   const user = JSON.parse(localStorage.getItem('user'));

// // //   const [armRaised, setArmRaised] = useState(false); // track state

// // //   useEffect(() => {
// // //     const fetchExercise = async () => {
// // //       // Temporarily hardcoded for testing
// // //       setExercise({ title: 'Arm Raise' });
// // //     };
// // //     fetchExercise();
// // //   }, [exerciseId]);

// // //   useEffect(() => {
// // //     if (!exercise || !webcamRef.current) return;

// // //     const poseDetector = new pose.Pose({
// // //       locateFile: (file) =>
// // //         `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// // //     });

// // //     poseDetector.setOptions({
// // //       modelComplexity: 1,
// // //       smoothLandmarks: true,
// // //       enableSegmentation: false,
// // //       minDetectionConfidence: 0.5,
// // //       minTrackingConfidence: 0.5,
// // //     });

// // //     poseDetector.onResults((results) => {
// // //       if (!results.poseLandmarks) {
// // //         console.warn("⚠️ No landmarks detected");
// // //         return;
// // //       }

// // //       const canvas = canvasRef.current;
// // //       const ctx = canvas.getContext('2d');
// // //       canvas.width = webcamRef.current.video.videoWidth;
// // //       canvas.height = webcamRef.current.video.videoHeight;
// // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // //       ctx.save();

// // //       drawingUtils.drawConnectors(ctx, results.poseLandmarks, pose.POSE_CONNECTIONS, {
// // //         color: '#00FF00',
// // //         lineWidth: 4,
// // //       });
// // //       drawingUtils.drawLandmarks(ctx, results.poseLandmarks, {
// // //         color: '#FF0000',
// // //         radius: 5,
// // //       });
// // //       ctx.restore();

// // //       handleRepsLogic(results.poseLandmarks);
// // //     });

// // //     let mpCamera = new cam.Camera(webcamRef.current.video, {
// // //       onFrame: async () => {
// // //         if (webcamRef.current.video.readyState === 4) {
// // //           await poseDetector.send({ image: webcamRef.current.video });
// // //         }
// // //       },
// // //       width: 640,
// // //       height: 480,
// // //     });

// // //     mpCamera.start();
// // //     setStartTime(Date.now());

// // //     return () => mpCamera.stop();
// // //   }, [exercise]);

// // //   const handleRepsLogic = (lm) => {
// // //     if (exercise?.title !== 'Arm Raise') return;

// // //     const leftWristY = lm[15].y;
// // //     const rightWristY = lm[16].y;
// // //     const noseY = lm[0].y;

// // //     const isBothArmsUp = leftWristY < noseY && rightWristY < noseY;
// // //     const isBothArmsDown = leftWristY > noseY && rightWristY > noseY;

// // //     if (isBothArmsUp && !armRaised) {
// // //       setArmRaised(true); // going up
// // //       console.log("🟢 Arms up");
// // //     } else if (isBothArmsDown && armRaised) {
// // //       setReps((prev) => prev + 1);
// // //       setScore((prev) => prev + 10);
// // //       setArmRaised(false); // complete rep
// // //       console.log("✅ Arm Raise counted!");
// // //     }
// // //   };

// // //   const finishSession = async () => {
// // //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// // //     try {
// // //       await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// // //         exerciseId,
// // //         score,
// // //         repetitionsDone: reps,
// // //         durationInSeconds,
// // //       });
// // //       navigate('/patient-dashboard');
// // //     } catch (err) {
// // //       console.error("❌ Failed to submit session data", err);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex flex-col items-center mt-8">
// // //       <div className="relative w-[640px] h-[480px]">
// // //         <Webcam
// // //           ref={webcamRef}
// // //           className="absolute top-0 left-0 rounded z-10"
// // //           width={640}
// // //           height={480}
// // //           mirrored={false} // ✅ disables mirror effect
// // //         />
// // //         <canvas
// // //           ref={canvasRef}
// // //           className="absolute top-0 left-0 pointer-events-none z-20"
// // //           width={640}
// // //           height={480}
// // //         />
// // //       </div>

// // //       <div className="mt-6 text-center space-y-2">
// // //         <h1 className="text-xl font-bold">{exercise?.title}</h1>
// // //         <p className="text-lg">Repetitions: <strong>{reps}</strong></p>
// // //         <p className="text-lg">Score: <strong>{score}</strong></p>
// // //         <button
// // //           onClick={finishSession}
// // //           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // //         >
// // //           Finish Session
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default SessionPage;



// // import React, { useEffect, useRef, useState } from 'react';
// // import Webcam from 'react-webcam';
// // import * as pose from '@mediapipe/pose';
// // import * as cam from '@mediapipe/camera_utils';
// // import * as drawingUtils from '@mediapipe/drawing_utils';
// // import axios from 'axios';
// // import { useParams, useNavigate } from 'react-router-dom';

// // const SessionPage = () => {
// //   const { exerciseId } = useParams();
// //   const webcamRef = useRef(null);
// //   const canvasRef = useRef(null);
// //   const [reps, setReps] = useState(0);
// //   const [score, setScore] = useState(0);
// //   const [startTime, setStartTime] = useState(null);
// //   const [exercise, setExercise] = useState(null);
// //   const navigate = useNavigate();
// //   const user = JSON.parse(localStorage.getItem('user'));

// //   let direction = useRef(null); // up or down
// //   let lastLandmarks = useRef(null);

// //   useEffect(() => {
// //     const fetchExercise = async () => {
// //       setExercise({ title: 'Arm Raise' }); // fallback
// //     };
// //     fetchExercise();
// //   }, [exerciseId]);

// //   useEffect(() => {
// //     if (!exercise || !webcamRef.current) return;

// //     const poseDetector = new pose.Pose({
// //       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
// //     });

// //     poseDetector.setOptions({
// //       modelComplexity: 1,
// //       smoothLandmarks: true,
// //       enableSegmentation: false,
// //       minDetectionConfidence: 0.3,
// //       minTrackingConfidence: 0.3,
// //     });

// //     poseDetector.onResults((results) => {
// //       const landmarks = results.poseLandmarks;
// //       if (!landmarks) {
// //         console.warn("⚠️ No landmarks detected");
// //         if (lastLandmarks.current) {
// //           handleRepsLogic(lastLandmarks.current);
// //         }
// //         return;
// //       }
// //       lastLandmarks.current = landmarks;

// //       const canvas = canvasRef.current;
// //       const ctx = canvas.getContext('2d');
// //       canvas.width = webcamRef.current.video.videoWidth;
// //       canvas.height = webcamRef.current.video.videoHeight;
// //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// //       ctx.save();
// //       drawingUtils.drawConnectors(ctx, landmarks, pose.POSE_CONNECTIONS, {
// //         color: '#00FF00', lineWidth: 4,
// //       });
// //       drawingUtils.drawLandmarks(ctx, landmarks, {
// //         color: '#FF0000', radius: 5,
// //       });
// //       ctx.restore();

// //       handleRepsLogic(landmarks);
// //     });

// //     const mpCamera = new cam.Camera(webcamRef.current.video, {
// //       onFrame: async () => {
// //         await poseDetector.send({ image: webcamRef.current.video });
// //       },
// //       width: 640,
// //       height: 480,
// //     });

// //     mpCamera.start();
// //     setStartTime(Date.now());

// //     return () => mpCamera.stop();
// //   }, [exercise]);

// //   const handleRepsLogic = (lm) => {
// //     if (exercise?.title === 'Arm Raise') {
// //       const noseY = lm[0].y;
// //       const leftWristY = lm[15].y;
// //       const rightWristY = lm[16].y;

// //       const bothArmsUp = leftWristY < noseY && rightWristY < noseY;
// //       const bothArmsDown = leftWristY > noseY && rightWristY > noseY;

// //       if (bothArmsUp && direction.current !== 'up') {
// //         direction.current = 'up';
// //         console.log('⬆️ Arms Up');
// //       }
// //       if (bothArmsDown && direction.current === 'up') {
// //         setReps((prev) => prev + 1);
// //         setScore((prev) => prev + 10);
// //         direction.current = 'down';
// //         console.log('✅ Rep counted!');
// //       }
// //     }
// //   };

// //   const finishSession = async () => {
// //     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
// //     try {
// //       await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
// //         exerciseId,
// //         score,
// //         repetitionsDone: reps,
// //         durationInSeconds,
// //       });
// //       navigate('/patient-dashboard');
// //     } catch (err) {
// //       console.error("❌ Failed to submit session data", err);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center mt-8">
// //       <div className="relative w-[640px] h-[480px]">
// //         <Webcam
// //           ref={webcamRef}
// //           className="absolute top-0 left-0 rounded z-10"
// //           width={640}
// //           height={480}
// //           mirrored={false} // ✅ mirror removed
// //         />
// //         <canvas
// //           ref={canvasRef}
// //           className="absolute top-0 left-0 pointer-events-none z-20"
// //           width={640}
// //           height={480}
// //         />
// //       </div>

// //       <div className="mt-6 text-center space-y-2">
// //         <h1 className="text-xl font-bold">{exercise?.title}</h1>
// //         <p className="text-lg">Repetitions: <strong>{reps}</strong></p>
// //         <p className="text-lg">Score: <strong>{score}</strong></p>
// //         <button
// //           onClick={finishSession}
// //           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //         >
// //           Finish Session
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SessionPage;




// import React, { useEffect, useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import * as pose from '@mediapipe/pose';
// import * as cam from '@mediapipe/camera_utils';
// import * as drawingUtils from '@mediapipe/drawing_utils';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const SessionPage = () => {
//   const { exerciseId } = useParams();
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [reps, setReps] = useState(0);
//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState('Get Ready!');
//   const [startTime, setStartTime] = useState(null);
//   const [exercise, setExercise] = useState(null);
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));
//   const direction = useRef(null);
//   const lastLandmarks = useRef(null);
//   const synthRef = useRef(window.speechSynthesis);

//   useEffect(() => {
//     const fetchExercise = async () => {
//       setExercise({ title: 'Arm Raise' });
//     };
//     fetchExercise();
//   }, [exerciseId]);

//   useEffect(() => {
//     if (!exercise || !webcamRef.current) return;

//     const poseDetector = new pose.Pose({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
//     });

//     poseDetector.setOptions({
//       modelComplexity: 1,
//       smoothLandmarks: true,
//       enableSegmentation: false,
//       minDetectionConfidence: 0.3,
//       minTrackingConfidence: 0.3,
//     });

//     poseDetector.onResults((results) => {
//       const landmarks = results.poseLandmarks;
//       if (!landmarks) {
//         setFeedback("No body detected");
//         speak("Please come in front of the camera");
//         return;
//       }

//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       canvas.width = webcamRef.current.video.videoWidth;
//       canvas.height = webcamRef.current.video.videoHeight;
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.save();
//       drawingUtils.drawConnectors(ctx, landmarks, pose.POSE_CONNECTIONS, {
//         color: '#00FF00', lineWidth: 4,
//       });
//       drawingUtils.drawLandmarks(ctx, landmarks, {
//         color: '#FF0000', radius: 5,
//       });
//       ctx.restore();

//       handleRepsLogic(landmarks);
//     });

//     const mpCamera = new cam.Camera(webcamRef.current.video, {
//       onFrame: async () => {
//         await poseDetector.send({ image: webcamRef.current.video });
//       },
//       width: 640,
//       height: 480,
//     });

//     mpCamera.start();
//     setStartTime(Date.now());

//     return () => mpCamera.stop();
//   }, [exercise]);

//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     synthRef.current.speak(utterance);
//   };

//   const handleRepsLogic = (lm) => {
//     if (exercise?.title === 'Arm Raise') {
//       const noseY = lm[0].y;
//       const leftWristY = lm[15].y;
//       const rightWristY = lm[16].y;

//       const bothArmsUp = leftWristY < noseY && rightWristY < noseY;
//       const bothArmsDown = leftWristY > noseY && rightWristY > noseY;

//       if (bothArmsUp && direction.current !== 'up') {
//         direction.current = 'up';
//         setFeedback('Arms Up - Good!');
//         speak('Arms up');
//       } else if (bothArmsDown && direction.current === 'up') {
//         setReps((prev) => prev + 1);
//         setScore((prev) => prev + 10);
//         direction.current = 'down';
//         setFeedback('Great! Rep counted');
//         speak('Great. One rep complete');
//       } else if (!bothArmsUp && !bothArmsDown) {
//         setFeedback('Raise your arms higher');
//         speak('Raise your arms higher');
//       }
//     }
//   };

//   const finishSession = async () => {
//     const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
//     try {
//       await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
//         exerciseId,
//         score,
//         repetitionsDone: reps,
//         durationInSeconds,
//       });
//       navigate('/patient-dashboard');
//     } catch (err) {
//       console.error("❌ Failed to submit session data", err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-8">
//       <div className="relative w-[640px] h-[480px]">
//         <Webcam
//           ref={webcamRef}
//           className="absolute top-0 left-0 rounded z-10"
//           width={640}
//           height={480}
//           mirrored={false}
//         />
//         <canvas
//           ref={canvasRef}
//           className="absolute top-0 left-0 pointer-events-none z-20"
//           width={640}
//           height={480}
//         />
//       </div>

//       <div className="mt-4 text-center space-y-2">
//         <h1 className="text-xl font-bold">{exercise?.title}</h1>
//         <p className="text-lg">Repetitions: <strong>{reps}</strong></p>
//         <p className="text-lg">Score: <strong>{score}</strong></p>
//         <p className="text-red-600 text-sm italic">{feedback}</p>
//         <button
//           onClick={finishSession}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Finish Session
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SessionPage;




import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as pose from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';
import * as drawingUtils from '@mediapipe/drawing_utils';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SessionPage = () => {
  const { exerciseId } = useParams();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [reps, setReps] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('Get Ready!');
  const [startTime, setStartTime] = useState(null);
  const [exercise, setExercise] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const direction = useRef(null);
  const lastSpeechTime = useRef(0);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    const fetchExercise = async () => {
      setExercise({ title: 'Arm Raise' });
    };
    fetchExercise();
  }, [exerciseId]);

  useEffect(() => {
    if (!exercise || !webcamRef.current) return;

    const poseDetector = new pose.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    poseDetector.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.3,
      minTrackingConfidence: 0.3,
    });

    poseDetector.onResults((results) => {
      const landmarks = results.poseLandmarks;
      if (!landmarks) {
        setFeedback("No body detected");
        speakOnce("Please come in front of the camera");
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = webcamRef.current.video.videoWidth;
      canvas.height = webcamRef.current.video.videoHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      drawingUtils.drawConnectors(ctx, landmarks, pose.POSE_CONNECTIONS, {
        color: '#00FF00', lineWidth: 4,
      });
      drawingUtils.drawLandmarks(ctx, landmarks, {
        color: '#FF0000', radius: 5,
      });
      ctx.restore();

      handleRepsLogic(landmarks);
    });

    const mpCamera = new cam.Camera(webcamRef.current.video, {
      onFrame: async () => {
        await poseDetector.send({ image: webcamRef.current.video });
      },
      width: 640,
      height: 480,
    });

    mpCamera.start();
    setStartTime(Date.now());

    return () => mpCamera.stop();
  }, [exercise]);

  const speakOnce = (text) => {
    const now = Date.now();
    if (now - lastSpeechTime.current < 3000) return; // prevent spam
    lastSpeechTime.current = now;
    const utterance = new SpeechSynthesisUtterance(text);
    synthRef.current.speak(utterance);
  };

  // const handleRepsLogic = (lm) => {
  //   if (exercise?.title === 'Arm Raise') {
  //     const noseY = lm[0].y;
  //     const leftWristY = lm[15].y;
  //     const rightWristY = lm[16].y;

  //     const bothArmsUp = leftWristY < noseY && rightWristY < noseY;
  //     const bothArmsDown = leftWristY > noseY && rightWristY > noseY;

  //     if (bothArmsUp && direction.current !== 'up') {
  //       direction.current = 'up';
  //       setFeedback('Arms Up - Good!');
  //       speakOnce('Arms up');
  //     } else if (bothArmsDown && direction.current === 'up') {
  //       setReps((prev) => prev + 1);
  //       setScore((prev) => prev + 10);
  //       direction.current = 'down';
  //       setFeedback('Great! Rep counted');
  //       speakOnce('Great. One rep complete');
  //     } else if (!bothArmsUp && direction.current !== 'down') {
  //       setFeedback('Raise your arms higher');
  //       speakOnce('Raise your arms higher');
  //     }
  //   }
  // };

const handleRepsLogic = (lm) => {
  if (exercise?.title === 'Arm Raise') {
    const noseY = lm[0].y;
    const leftWristY = lm[15].y;
    const rightWristY = lm[16].y;

    const leftUp = leftWristY < noseY;
    const rightUp = rightWristY < noseY;
    const leftDown = leftWristY > noseY;
    const rightDown = rightWristY > noseY;

    const bothArmsUp = leftUp && rightUp;
    const bothArmsDown = leftDown && rightDown;
    const oneArmUp = (leftUp && rightDown) || (rightUp && leftDown);

    if (bothArmsUp && direction.current !== 'up') {
      direction.current = 'up';
      setFeedback('Arms Up - Good!');
      speakOnce('Arms up');
    } else if (bothArmsDown && direction.current === 'up') {
      direction.current = 'down';
      setReps((prev) => prev + 1);
      setScore((prev) => prev + 10);
      setFeedback('✅ Great! One rep complete');
      speakOnce('Great job. One rep complete');
    } else if (oneArmUp) {
      setFeedback('⚠️ Raise both arms evenly');
      speakOnce('Raise both arms evenly');
    } else if (!bothArmsUp && direction.current !== 'down') {
      setFeedback('⬆️ Raise your arms higher');
      speakOnce('Raise your arms higher');
    }
  }
};



  const finishSession = async () => {
    const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);
    try {
      await axios.post(`http://localhost:5000/api/users/${user._id}/submit-score`, {
        exerciseId,
        score,
        repetitionsDone: reps,
        durationInSeconds,
      });
      synthRef.current.cancel();
      navigate('/patient-dashboard');
    } catch (err) {
      console.error("❌ Failed to submit session data", err);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="relative w-[640px] h-[480px]">
        <Webcam
          ref={webcamRef}
          className="absolute top-0 left-0 rounded z-10"
          width={640}
          height={480}
          mirrored={false}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 pointer-events-none z-20"
          width={640}
          height={480}
        />
      </div>

      <div className="mt-4 text-center space-y-2">
        <h1 className="text-xl font-bold">{exercise?.title}</h1>
        <p className="text-lg">Repetitions: <strong>{reps}</strong></p>
        <p className="text-lg">Score: <strong>{score}</strong></p>
        <p className="text-red-600 text-sm italic">{feedback}</p>
        <button
          onClick={finishSession}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Finish Session
        </button>
      </div>
    </div>
  );
};

export default SessionPage;
