import React from 'react';
import { useLogin } from '../hooks/useLogin';
import styles from '../styles/Login.module.css';

const Login: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    navigate,
  } = useLogin();

  return (
    <div className={styles.container}>
      <h2>☁️Cloud Book Writer Platform☁️</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className={styles.btn}>
          Login
        </button>
        <button type="button" className={styles.btn} onClick={() => navigate('/register')}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
