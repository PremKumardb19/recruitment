import { useState } from 'react';
import PersonalForm from './PersonalForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import PublicationsForm from './PublicationsForm';
import NptelForm from './NptelForm';

const tabs = ['Personal', 'Education', 'Experience', 'Publications', 'NPTEL'];

export default function ApplicationForm() {
  const [activeTab, setActiveTab] = useState('Personal');

  const renderForm = () => {
    switch (activeTab) {
      case 'Personal': return <PersonalForm />;
      case 'Education': return <EducationForm />;
      case 'Experience': return <ExperienceForm />;
      case 'Publications': return <PublicationsForm />;
      case 'NPTEL': return <NptelForm />;
      default: return null;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Application Form</h2>
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="border p-4 rounded shadow bg-white">
        {renderForm()}
      </div>
    </div>
  );
}
