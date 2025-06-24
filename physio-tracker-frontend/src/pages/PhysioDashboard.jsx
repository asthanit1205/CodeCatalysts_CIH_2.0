

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        console.error('Error fetching data', err);
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
      setMessage('Exercises assigned successfully!');
    } catch (err) {
      console.error('Assignment failed', err);
      setMessage('Failed to assign exercises');
    }
  };

  const fetchSessionHistory = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}/session-history`);
      return res.data.history;
    } catch (err) {
      console.error('Error fetching history', err);
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
      alert('Patient added successfully!');
    } catch (err) {
      console.error('Error adding patient', err);
      alert('Failed to add patient');
    }
  };

  const getAssignedExerciseTitles = (patient) => {
    return patient.assignedExercises?.map((ex) => ex.title) || [];
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center gap-2 mb-4">
        <img src="https://img.icons8.com/emoji/48/physiotherapist.png" alt="Icon" height="40" />
        <h2 className="m-0">Physiotherapist Dashboard</h2>
      </div>

      {/* Dashboard Stats */}
      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="card p-3 border border-primary shadow-sm">
            <h6>Total Patients</h6>
            <h4>{patients.length}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 border border-success shadow-sm">
            <h6>Exercises Assigned</h6>
            <h4>{patients.reduce((sum, p) => sum + (p.assignedExercises?.length || 0), 0)}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 border border-warning shadow-sm">
            <h6>Sessions Today</h6>
            <h4>{Object.values(historyMap).flat().filter(s => new Date(s.timestamp).toDateString() === new Date().toDateString()).length}</h4>
          </div>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="btn-group mb-4">
        <button className={`btn ${activeTab === 'assign' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setActiveTab('assign')}>
          Assign Exercise
        </button>
        <button className={`btn ${activeTab === 'patients' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setActiveTab('patients')}>
          View Patients
        </button>
        <button className={`btn ${activeTab === 'exercises' ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setActiveTab('exercises')}>
          View Exercises
        </button>
      </div>

      {/* Existing Tabs */}
      {activeTab === 'assign' && (
        <div className="bg-white p-4 rounded border border-primary shadow">
          <label className="form-label">Select Patient:</label>
          <select className="form-select mb-3" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
            <option value="">-- Select --</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>{p.name} ({p.email})</option>
            ))}
          </select>

          <label className="form-label">Select Exercises:</label>
          <select
            className="form-select mb-3"
            multiple
            value={selectedExercises}
            onChange={(e) => setSelectedExercises(Array.from(e.target.selectedOptions, opt => opt.value))}
          >
            {exercises.map((ex) => (
              <option key={ex._id} value={ex._id}>{ex.title}</option>
            ))}
          </select>

          <button className="btn btn-primary" onClick={handleAssign}>Assign Exercises</button>
          {message && <div className="mt-3 text-success fw-semibold">{message}</div>}
        </div>
      )}

      {activeTab === 'patients' && (
        <div>
          <h5 className="mt-4">Add New Patient</h5>
          <div className="row g-2 mb-4">
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Name" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input type="email" className="form-control" placeholder="Email" value={newPatient.email} onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="Phone" value={newPatient.phone} onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" placeholder="Condition" value={newPatient.condition} onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })} />
            </div>
            <div className="col-md-1">
              <button className="btn btn-success w-100" onClick={handleNewPatientSubmit}>Add</button>
            </div>
          </div>

          {patients.map((p) => (
            <div className="card mb-3 border border-info" key={p._id}>
              <div className="card-body">
                <h6 className="card-title mb-1">{p.name}</h6>
                <p className="mb-1"><strong>Email:</strong> {p.email}</p>
                <p className="mb-1"><strong>Phone:</strong> {p.phone || 'N/A'}</p>
                <p className="mb-1"><strong>Condition:</strong> {p.condition || 'N/A'}</p>
                <p className="mb-1"><strong>Assigned:</strong> {getAssignedExerciseTitles(p).join(', ') || 'None'}</p>
                <p className="mb-1"><strong>Session History:</strong></p>
                <ul>
                  {(historyMap[p._id] || []).map((s, idx) => (
                    <li key={idx}>{s.exercise?.title || 'N/A'} - {s.repetitionsDone} reps - Score: {s.score}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'exercises' && (
        <div className="row">
          {exercises.map((ex) => (
            <div className="col-md-6" key={ex._id}>
              <div className="card mb-3 border border-dark">
                <div className="card-body">
                  <h6 className="card-title">{ex.title}</h6>
                  <p className="card-text">{ex.description}</p>
                  {ex.imageUrl && (
                    <img src={ex.imageUrl} alt={ex.title} className="img-fluid rounded mt-2" style={{ maxHeight: '200px', objectFit: 'cover' }} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhysioDashboard;


