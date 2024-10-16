import React, { useState } from 'react';
import styles from '../styles/CreateBookForm.module.css';

interface CreateBookFormProps {
  onCreateBook: (title: string) => void;
}

const CreateBookForm: React.FC<CreateBookFormProps> = ({ onCreateBook }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreateBook(title.trim());
      setTitle('');
    }
  };

  return (
    <form className={styles.createBookForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter book title"
        className={styles.inputField}
      />
      <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
        Create Book
      </button>
    </form>
  );
};

export default CreateBookForm;
