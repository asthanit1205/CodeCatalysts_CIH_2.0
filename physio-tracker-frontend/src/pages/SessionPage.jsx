



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
          className="mt-4 bg-blue-600 text-Black px-4 py-2 rounded hover:bg-blue-700"
        >
          Finish Session
        </button>
      </div>
    </div>
  );
};

export default SessionPage;