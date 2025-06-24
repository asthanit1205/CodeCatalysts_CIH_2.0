
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

      // if (user.role !== role && !(user.role === 'physio' && role === 'physiotherapist')) {
      //   setError(`You are not registered as a ${role}.`);
      //   return;
      // }

      if (user.role !== role) {
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
    <div style={styles.body}>
      <div style={styles.container}>
        <img src={welcomeImage} alt="Welcome" style={styles.image} />
        <h1 style={styles.title}>Welcome to PhysioTrack</h1>
        <p style={styles.subtitle}>Your journey to better health starts here.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <label style={styles.label}>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="patient">Patient</option>
            <option value="physiotherapist">Physiotherapist</option>
          </select>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    background: 'linear-gradient(to right, #e0f7fa, #fce4ec)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '450px',
    width: '90%',
    textAlign: 'center',
  },
  image: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    border: '3px solid #00796b',
  },
  title: {
    fontSize: '1.8rem',
    color: '#00796b',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#555',
    fontSize: '0.95rem',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  label: {
    textAlign: 'left',
    display: 'block',
    fontSize: '0.9rem',
    marginTop: '10px',
    color: '#444',
  },
  button: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    backgroundColor: '#00796b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
};

