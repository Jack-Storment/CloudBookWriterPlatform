import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Section } from '../pages/Home';

export const useHome = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [newSectionName, setNewSectionName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchSections = useCallback(async () => {
    try {
      const response = await api.get('/sections');
      setSections(response.data);
    } catch (err) {
      setError('Error fetching sections');
    }
  }, []);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleAddSection = async (
    parentSectionId: string | null,
    name: string,
  ) => {
    try {
      const response = await api.post(
        parentSectionId
          ? `/sections/${parentSectionId}/subsections`
          : '/sections',
        { name },
      );

      const updatedSections = parentSectionId
        ? sections.map((section) => (section.id === parentSectionId
          ? { ...section, subsections: [...section.subsections, response.data] }
          : section))
        : [...sections, response.data];

      setSections(updatedSections);
      localStorage.setItem('sections', JSON.stringify(updatedSections));
    } catch (err) {
      setError('Error creating section');
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    try {
      await api.delete(`/sections/${sectionId}`);
      const updatedSections = sections.filter((section) => section.id !== sectionId);
      setSections(updatedSections);
      localStorage.setItem('sections', JSON.stringify(updatedSections));
    } catch (err) {
      setError('Error deleting section');
    }
  };

  return {
    sections,
    newSectionName,
    error,
    setNewSectionName,
    handleAddSection,
    handleDeleteSection,
    fetchSections,
    logout,
    navigate,
  };
};
