
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      setHistory(res.data.history);
    } catch (err) {
      console.error('Failed to fetch session history', err);
    }
  };

  const startSession = (exerciseId) => {
    navigate(`/session/${exerciseId}`);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Welcome, <strong>{user?.name}</strong></h2>

      <h4 className="mb-3">📋 Assigned Exercises</h4>
      <div className="row">
        {exercises.map((exercise) => (
          <div className="col-md-6" key={exercise._id}>
            <div className="card card-custom p-3 mb-4 shadow-sm rounded">
              <h5 className="card-title">💪 {exercise.title}</h5>
              {exercise.imageUrl && (
                <img
                  src={exercise.imageUrl}
                  alt={exercise.title}
                  className="img-fluid rounded mb-3"
                 style={{ height: '280px', width: '100%', objectFit: 'cover',  objectPosition: 'top', // shows upper body
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                />
              )}
              <p className="card-text">{exercise.description}</p>
              <button
                onClick={() => startSession(exercise._id)}
                className="btn btn-outline-success btn-start"
              >
                Start Exercise
              </button>
            </div>
          </div>
        ))}
      </div>

      <h4 className="mt-5 mb-3">📊 Session History</h4>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Exercise</th>
              <th>Score</th>
              <th>Repetitions</th>
              <th>Duration (s)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, idx) => (
              <tr key={idx}>
                <td>{h.exercise?.title || 'N/A'}</td>
                <td>{h.score}</td>
                <td>{h.repetitionsDone}</td>
                <td>{h.durationInSeconds}</td>
                <td>{new Date(h.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientDashboard;
