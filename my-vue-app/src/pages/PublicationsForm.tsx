import { useState } from "react";
import { motion } from "framer-motion";

export default function PublicationsForm() {
  const [formData, setFormData] = useState({
    journalType: "",
    journalName: "",
    publisher: "",
    paperTitle: "",
    volNo: "",
    doi: "",
    publicationDate: "",
    impactFactor: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "journalType":
        if (!value) errorMsg = "Journal type is required.";
        break;
      case "journalName":
        if (value.length < 3) errorMsg = "Journal name must be at least 3 characters.";
        break;
      case "publisher":
        if (value.length < 3) errorMsg = "Publisher name must be at least 3 characters.";
        break;
      case "paperTitle":
        if (value.length < 5) errorMsg = "Paper title must be at least 5 characters.";
        break;
      case "volNo":
        if (!/^\d+$/.test(value)) errorMsg = "Volume number must be a number.";
        break;
      case "doi":
        if (!/^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i.test(value)) errorMsg = "Invalid DOI format.";
        break;
      case "publicationDate":
        if (!value) errorMsg = "Publication date is required.";
        break;
      case "impactFactor":
        if (!/^\d+(\.\d+)?$/.test(value)) errorMsg = "Impact factor must be a number.";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
      if (!formData[field]) isValid = false;
    });

    if (isValid) {
      alert("Form Submitted Successfully!");
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">Publications Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Journal Type */}
        <div>
          <label className="block font-semibold">Journal Type (SCI/Scopus)</label>
          <select
            name="journalType"
            value={formData.journalType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="SCI">SCI</option>
            <option value="Scopus">Scopus</option>
          </select>
          {errors.journalType && <p className="text-red-500 text-sm">{errors.journalType}</p>}
        </div>

        {/* Journal Name */}
        <div>
          <label className="block font-semibold">Journal Name</label>
          <input
            type="text"
            name="journalName"
            value={formData.journalName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.journalName && <p className="text-red-500 text-sm">{errors.journalName}</p>}
        </div>

        {/* Publisher */}
        <div>
          <label className="block font-semibold">Publisher</label>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.publisher && <p className="text-red-500 text-sm">{errors.publisher}</p>}
        </div>

        {/* Paper Title */}
        <div>
          <label className="block font-semibold">Paper Title</label>
          <input
            type="text"
            name="paperTitle"
            value={formData.paperTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.paperTitle && <p className="text-red-500 text-sm">{errors.paperTitle}</p>}
        </div>

        {/* Volume Number */}
        <div>
          <label className="block font-semibold">Volume Number</label>
          <input
            type="text"
            name="volNo"
            value={formData.volNo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.volNo && <p className="text-red-500 text-sm">{errors.volNo}</p>}
        </div>

        {/* DOI */}
        <div>
          <label className="block font-semibold">DOI</label>
          <input
            type="text"
            name="doi"
            value={formData.doi}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.doi && <p className="text-red-500 text-sm">{errors.doi}</p>}
        </div>

        {/* Publication Date */}
        <div>
          <label className="block font-semibold">Month & Year of Publication</label>
          <input
            type="month"
            name="publicationDate"
            value={formData.publicationDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.publicationDate && <p className="text-red-500 text-sm">{errors.publicationDate}</p>}
        </div>

        {/* Impact Factor */}
        <div>
          <label className="block font-semibold">Impact Factor</label>
          <input
            type="text"
            name="impactFactor"
            value={formData.impactFactor}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.impactFactor && <p className="text-red-500 text-sm">{errors.impactFactor}</p>}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
}
