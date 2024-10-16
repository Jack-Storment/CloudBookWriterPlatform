import React from 'react';
import { useRegister } from '../hooks/useRegister';
import styles from '../styles/Register.module.css';

const Register: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    error,
    handleSubmit,
  } = useRegister();

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="register-email">
            Email
            <input
              id="register-email"
              type="email"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="register-password">
            Password
            <input
              id="register-password"
              type="password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="register-role">
            Role
            <select
              id="register-role"
              className={styles.selectField}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Author">Author</option>
              <option value="Collaborator">Collaborator</option>
            </select>
          </label>
        </div>
        <button type="submit" className={styles.btn}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
