import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const useRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Author');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        role,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (err) {
      setError('Error registering user');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    error,
    handleSubmit,
    navigate,
  };
};
