import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

interface Section {
  id: string;
  name: string;
  subsections: Section[]; 
}
        
export const SectionList: React.FC<{
  sections: Section[];
  onAddSection: (parentSectionId: string | null, name: string) => void;
  onDeleteSection: (sectionId: string) => void;
}> = ({ sections, onAddSection, onDeleteSection }) => {
  const [newSubsectionName, setNewSubsectionName] = useState<{
    [key: string]: string;
  }>({});

  return (
    <ul className={styles.sectionList}>
      {sections.map((section) => (
        <li key={section.id} className={styles.sectionItem}>
          <div className={styles.sectionHeader}>
            <h3>{section.name}</h3>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnDanger}`}
              onClick={() => onDeleteSection(section.id)}
            >
              Delete
            </button>
          </div>

          <form
            className={styles.addSubsectionForm}
            onSubmit={(e) => {
              e.preventDefault();
              onAddSection(section.id, newSubsectionName[section.id] || '');
              setNewSubsectionName({ ...newSubsectionName, [section.id]: '' });
            }}
          >
            <input
              className={styles.inputField}
              type="text"
              placeholder="New Subsection Name"
              value={newSubsectionName[section.id] || ''}
              onChange={(e) => setNewSubsectionName({
                ...newSubsectionName,
                [section.id]: e.target.value,
              })}
            />
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              type="submit"
            >
              Add Subsection
            </button>
          </form>

          {section.subsections.length > 0 && (
            <SectionList
              sections={section.subsections}
              onAddSection={onAddSection}
              onDeleteSection={onDeleteSection}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
