import React, { useState, useEffect } from 'react';
import './PhDForm.css';

interface FormData {
  university: string;
  title: string;
  guideName: string;
  college: string;
  status: string;
  registrationYear: string;
  completionYear: string;
  publicationsDuringPhD: string;
  publicationsPostPhD: string;
  postPhDExperience: string;
}

interface FormErrors {
  [key: string]: string;
}

const PhDForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    university: '',
    title: '',
    guideName: '',
    college: '',
    status: '',
    registrationYear: '',
    completionYear: '',
    publicationsDuringPhD: '',
    publicationsPostPhD: '',
    postPhDExperience: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    // Show form with delay for entrance animation
    setTimeout(() => setFormVisible(true), 300);
  }, []);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'university':
      case 'title':
      case 'guideName':
      case 'college':
        return value.trim() === '' ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : '';
      case 'status':
        return value.trim() === '' ? 'Status is required' : '';
      case 'registrationYear':
      case 'completionYear':
        const yearRegex = /^\d{4}$/;
        if (value.trim() === '') return `${name === 'registrationYear' ? 'Registration' : 'Completion'} year is required`;
        if (!yearRegex.test(value)) return 'Please enter a valid 4-digit year';
        const year = parseInt(value, 10);
        if (year < 1900 || year > new Date().getFullYear()) return 'Please enter a valid year';
        return '';
      case 'publicationsDuringPhD':
      case 'publicationsPostPhD':
        const numRegex = /^\d+$/;
        if (value.trim() === '') return `Number of publications ${name === 'publicationsDuringPhD' ? 'during' : 'post'} PhD is required`;
        if (!numRegex.test(value)) return 'Please enter a valid number';
        return '';
      case 'postPhDExperience':
        return value.trim() === '' ? 'Post PhD experience is required' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const errorMessage = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
  };

  const handleFocus = (name: string) => {
    setFocused(name);
  };

  const handleBlur = () => {
    setFocused(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const errorMessage = validateField(key, value);
      if (errorMessage) {
        newErrors[key] = errorMessage;
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
    } else {
      // Animate error fields
      document.querySelectorAll('.error').forEach(el => {
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 500);
      });
    }
  };

  const statusOptions = [
    'Pursuing',
    'Thesis submitted',
    'Viva voce completed',
    'Degree Awarded'
  ];

  if (submitted) {
    return (
      <div className="form-container success-container">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>PhD Information Submitted Successfully!</h2>
          <p>Thank you for providing your PhD details.</p>
          <button onClick={() => {
            setSubmitted(false);
            setFormData({
              university: '',
              title: '',
              guideName: '',
              college: '',
              status: '',
              registrationYear: '',
              completionYear: '',
              publicationsDuringPhD: '',
              publicationsPostPhD: '',
              postPhDExperience: '',
            });
          }}>Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`form-container ${formVisible ? 'visible' : ''}`}>
      <div className="form-header">
        <h1>PhD Information</h1>
        <p>Please provide your PhD details below</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className={`form-group ${focused === 'university' ? 'focused' : ''} ${errors.university ? 'error' : ''}`}>
            <label htmlFor="university">University</label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              onFocus={() => handleFocus('university')}
              onBlur={handleBlur}
              placeholder="Enter your university name"
            />
            {errors.university && <div className="error-message">{errors.university}</div>}
          </div>
          
          <div className={`form-group ${focused === 'title' ? 'focused' : ''} ${errors.title ? 'error' : ''}`}>
            <label htmlFor="title">Title of PhD</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onFocus={() => handleFocus('title')}
              onBlur={handleBlur}
              placeholder="Enter your PhD title"
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>
          
          <div className={`form-group ${focused === 'guideName' ? 'focused' : ''} ${errors.guideName ? 'error' : ''}`}>
            <label htmlFor="guideName">Guide Name</label>
            <input
              type="text"
              id="guideName"
              name="guideName"
              value={formData.guideName}
              onChange={handleChange}
              onFocus={() => handleFocus('guideName')}
              onBlur={handleBlur}
              placeholder="Enter your guide's name"
            />
            {errors.guideName && <div className="error-message">{errors.guideName}</div>}
          </div>
          
          <div className={`form-group ${focused === 'college' ? 'focused' : ''} ${errors.college ? 'error' : ''}`}>
            <label htmlFor="college">College</label>
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              onFocus={() => handleFocus('college')}
              onBlur={handleBlur}
              placeholder="Enter your college name"
            />
            {errors.college && <div className="error-message">{errors.college}</div>}
          </div>
          
          <div className={`form-group ${focused === 'status' ? 'focused' : ''} ${errors.status ? 'error' : ''}`}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              onFocus={() => handleFocus('status')}
              onBlur={handleBlur}
            >
              <option value="">Select Status</option>
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.status && <div className="error-message">{errors.status}</div>}
          </div>
          
          <div className={`form-group ${focused === 'registrationYear' ? 'focused' : ''} ${errors.registrationYear ? 'error' : ''}`}>
            <label htmlFor="registrationYear">Year of Registration</label>
            <input
              type="text"
              id="registrationYear"
              name="registrationYear"
              value={formData.registrationYear}
              onChange={handleChange}
              onFocus={() => handleFocus('registrationYear')}
              onBlur={handleBlur}
              placeholder="YYYY"
              maxLength={4}
            />
            {errors.registrationYear && <div className="error-message">{errors.registrationYear}</div>}
          </div>
          
          <div className={`form-group ${focused === 'completionYear' ? 'focused' : ''} ${errors.completionYear ? 'error' : ''}`}>
            <label htmlFor="completionYear">Year of Completion</label>
            <input
              type="text"
              id="completionYear"
              name="completionYear"
              value={formData.completionYear}
              onChange={handleChange}
              onFocus={() => handleFocus('completionYear')}
              onBlur={handleBlur}
              placeholder="YYYY"
              maxLength={4}
            />
            {errors.completionYear && <div className="error-message">{errors.completionYear}</div>}
          </div>
          
          <div className={`form-group ${focused === 'publicationsDuringPhD' ? 'focused' : ''} ${errors.publicationsDuringPhD ? 'error' : ''}`}>
            <label htmlFor="publicationsDuringPhD">Publications During PhD</label>
            <input
              type="text"
              id="publicationsDuringPhD"
              name="publicationsDuringPhD"
              value={formData.publicationsDuringPhD}
              onChange={handleChange}
              onFocus={() => handleFocus('publicationsDuringPhD')}
              onBlur={handleBlur}
              placeholder="Number of publications"
            />
            {errors.publicationsDuringPhD && <div className="error-message">{errors.publicationsDuringPhD}</div>}
          </div>
          
          <div className={`form-group ${focused === 'publicationsPostPhD' ? 'focused' : ''} ${errors.publicationsPostPhD ? 'error' : ''}`}>
            <label htmlFor="publicationsPostPhD">Publications Post PhD</label>
            <input
              type="text"
              id="publicationsPostPhD"
              name="publicationsPostPhD"
              value={formData.publicationsPostPhD}
              onChange={handleChange}
              onFocus={() => handleFocus('publicationsPostPhD')}
              onBlur={handleBlur}
              placeholder="Number of publications"
            />
            {errors.publicationsPostPhD && <div className="error-message">{errors.publicationsPostPhD}</div>}
          </div>
          
          <div className={`form-group full-width ${focused === 'postPhDExperience' ? 'focused' : ''} ${errors.postPhDExperience ? 'error' : ''}`}>
            <label htmlFor="postPhDExperience">Post PhD Experience</label>
            <textarea
              id="postPhDExperience"
              name="postPhDExperience"
              value={formData.postPhDExperience}
              onChange={handleChange}
              onFocus={() => handleFocus('postPhDExperience')}
              onBlur={handleBlur}
              placeholder="Describe your post PhD experience"
              rows={4}
            />
            {errors.postPhDExperience && <div className="error-message">{errors.postPhDExperience}</div>}
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="reset-btn" onClick={() => {
            setFormData({
              university: '',
              title: '',
              guideName: '',
              college: '',
              status: '',
              registrationYear: '',
              completionYear: '',
              publicationsDuringPhD: '',
              publicationsPostPhD: '',
              postPhDExperience: '',
            });
            setErrors({});
          }}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default PhDForm;