import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalForm from './PersonalForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import PublicationsForm from './PublicationsForm';
import NptelForm from './NptelForm';
import PhDForm from './PhDForm';

const tabs = ['Personal', 'Education', 'Experience', 'Publications', 'NPTEL', 'PHD'];

export default function ApplicationForm() {
  const [activeTab, setActiveTab] = useState('Personal');

  const renderForm = () => {
    switch (activeTab) {
      case 'Personal': return <PersonalForm />;
      case 'Education': return <EducationForm />;
      case 'Experience': return <ExperienceForm />;
      case 'Publications': return <PublicationsForm />;
      case 'NPTEL': return <NptelForm />;
      case 'PHD': return <PhDForm />;
      default: return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Application Form</h2>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 bg-white p-4 rounded-lg shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg transition-all duration-300 font-semibold 
              ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Animated Form Section */}
      <div className="w-full max-w-screen-lg bg-white p-6 mt-6 rounded-lg shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {renderForm()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
