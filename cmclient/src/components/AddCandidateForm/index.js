import React, { useState } from "react";
import "./index.css";
import { BsXLg } from "react-icons/bs";

const AddCandidateForm = ({ onAdd, closeModel }) => {
    const [updateSkills, setUpdateSkills] = useState([]);
    const skillsList = [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "CSS",
        "HTML",
        "TypeScript",
        "Redux",
        "Next.js",
        "Vue.js",
        "Angular",
        "Java",
        "Spring Boot",
        "Express.js",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "Firebase",
        "Django",
        "Flask",
        "Git",
        "GitHub",
        "REST API",
        "GraphQL",
        "Tailwind CSS",
        "SASS",
        "Bootstrap",
        "jQuery",
        "AWS",
        "Docker",
    ];
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "Male",
        experience: "0 Year",
        skills: [],
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSkillsChange = (e) => {
        const selectedSkill = e.target.value;

        // Add skill only if it's not already in the array
        setFormData((prev) => {
            if (!prev.skills.includes(selectedSkill)) {
                return {
                    ...prev,
                    skills: [...prev.skills, selectedSkill],
                };
            }
            return prev;
        });
    };
    const removeSkill = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill !== skillToRemove),
        }));
    };
    const validateForm = (formData) => {
        // console.log(formData);
        if (!formData.name) {
            setError("Name is required");
            return false;
        }

        if (!formData.email) {
            setError("Email is required");
            return false;
        }

        if (!formData.phone) {
            setError("Phone number is required");
            return false;
        }

        if (!formData.experience) {
            setError("Experience is required");
            return false;
        }

        if (formData.skills.length === 0) {
            setError("Please select at least one skill");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // POST to backend
        if (!validateForm(formData)) {
            return;
        }
        try {
            const res = await fetch("http://localhost:5000/candidates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const newCandidate = await res.json();
            if (res.ok) {
                onAdd();
            } else {
                console.error("Failed to add candidate");
            }
            setFormData({
                name: "",
                email: "",
                phone: "",
                gender: "Male",
                experience: "0 Year",
                skills: [],
            });
        } catch (error) {
            setError(error.message || "Failed to add");
        }
    };

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <h3>Add New Candidate</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="phone"
                            type="number"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                        <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                        >
                            <option>0 Year</option>
                            <option>1 Year</option>
                            <option>2 Years</option>
                            <option>3 Years</option>
                            <option>4 Years</option>
                            <option>5+ Years</option>
                        </select>
                        <label>Skills:</label>
                        <select onChange={handleSkillsChange}>
                            {skillsList.map((skill) => (
                                <option key={skill} value={skill}>
                                    {skill}
                                </option>
                            ))}
                        </select>
                        <div>
                            {formData.skills.map((skill, index) => (
                                <span key={index} className="skill-badge">
                                    <span onClick={() => removeSkill(skill)}>
                                        <BsXLg className="remove-x" />
                                    </span>
                                    {skill}
                                </span>
                            ))}
                        </div>
                        {error && <p>{error}</p>}

                        <div className="form-actions">
                            <button type="submit">Save</button>
                            <button
                                type="button"
                                onClick={() => closeModel(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddCandidateForm;
