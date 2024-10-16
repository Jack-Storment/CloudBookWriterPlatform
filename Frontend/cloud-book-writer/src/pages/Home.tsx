import React from 'react';
import { SectionList } from '../components/Section';
import { useHome } from '../hooks/useHome';
import styles from '../styles/Home.module.css';

export interface Section {
  id: string;
  name: string;
  subsections: Section[];
}

const Home: React.FC = () => {
  const {
    sections,
    newSectionName,
    setNewSectionName,
    error,
    handleAddSection,
    handleDeleteSection,
    logout,
    navigate,
  } = useHome();

  return (
    <div className={styles.container}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Sections</h2>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnDanger}`}
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}

      <form
        className={styles.addSectionForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleAddSection(null, newSectionName);
          setNewSectionName('');
        }}
      >
        <input
          className={styles.inputField}
          type="text"
          placeholder="New Section Name"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
        />
        <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">
          Create Section
        </button>
      </form>

      <SectionList
        sections={sections}
        onAddSection={handleAddSection}
        onDeleteSection={handleDeleteSection}
      />
    </div>
  );
};

export default Home;
