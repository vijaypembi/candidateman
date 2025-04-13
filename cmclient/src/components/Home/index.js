import "./index.css";
import { FaSearch } from "react-icons/fa";

import { CiFilter } from "react-icons/ci";
import { AiOutlineBars } from "react-icons/ai";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { useEffect, useState } from "react";
import AddCandidateForm from "../AddCandidateForm";
import { RiDeleteBin6Line } from "react-icons/ri";

const Home = () => {
    const dummyCandidates = [
        {
            name: "Aisha Khan",
            email: "aisha.khan@example.com",
            phone: "9876543210",
            gender: "Female",
            experience: "2 Years",
            skills: ["JavaScript", "React", "Node.js"],
        },
        {
            name: "Ravi Patel",
            email: "ravi.patel@example.com",
            phone: "9123456789",
            gender: "Male",
            experience: "3 Years",
            skills: ["Python", "Django", "PostgreSQL"],
        },
        {
            name: "Sarah Joseph",
            email: "sarah.j@example.com",
            phone: "9988776655",
            gender: "Female",
            experience: "1 Year",
            skills: ["HTML", "CSS", "JavaScript"],
        },
        {
            name: "Akshay Mehra",
            email: "akshay.m@example.com",
            phone: "9871234567",
            gender: "Male",
            experience: "4 Years",
            skills: ["Java", "Spring Boot", "MySQL"],
        },
        {
            name: "Devika Sharma",
            email: "devika.s@example.com",
            phone: "9012345678",
            gender: "Other",
            experience: "2 Years",
            skills: ["MongoDB", "Express", "React", "Node"],
        },
    ];

    const [currentpage, setCurrentpage] = useState(1);
    const [totalpages, setTotalpages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [candidates, setCandidates] = useState([]);

    const handleGenderChange = async (id, newGender) => {
        try {
            await fetch(`http://localhost:5000/candidates/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gender: newGender }),
            });
            getCandidateData();
        } catch (error) {
            console.error("Error updating gender:", error);
        }
    };

    const handleExperienceChange = async (id, newExperience) => {
        try {
            await fetch(`http://localhost:5000/candidates/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ experience: newExperience }),
            });
            getCandidateData();
        } catch (error) {
            console.error("Error updating experience:", error);
        }
    };
    const handleDelet = async (id) => {
        try {
            await fetch(`http://localhost:5000/candidates/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            getCandidateData();
        } catch (error) {
            console.error("Error DELETE experience:", error);
        }
    };
    const searchCandidate = async (searchValue) => {
        setSearchTerm(searchValue);
        if (!searchValue) {
            return;
        }
        try {
            const url = `http://localhost:5000/candidates/search?q=${searchValue}`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.ok) {
                // console.log(data);

                setCandidates(data.candidates);
                setTotalpages(data.totalPages);
            }
            // setCandidates(data);
            // console.log(data);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };
    // const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     phone: "",
    //     gender: "Male",
    //     experience: "0 Year",
    //     skills: [],
    // });
    useEffect(() => {
        getCandidateData();
    }, []);
    const getCandidateData = async () => {
        try {
            const url2 = `http://localhost:5000/candidates`;
            const res = await fetch(url2);
            const data = await res.json();
            if (res.ok) {
                // console.log(data);

                setCandidates(data.candidates);
                setTotalpages(data.totalPages);
            }
            // setCandidates(data);
            // console.log(data);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    const onAdd = () => {
        setShowModal(false);
        getCandidateData();
    };
    const table = () => {
        return (
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr className="table-row">
                            <th className="table-shell">Candidate Name</th>
                            <th className="table-shell">Email</th>
                            <th className="table-shell">Phone</th>
                            <th className="table-shell">Gender</th>
                            <th className="table-shell">Current Experience</th>
                            <th className="table-shell">Skills/Technology</th>
                            <th className="table-shell">Delet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((c) => (
                            <tr key={c._id} className="table-row">
                                <td className="table-shell">{c.name}</td>
                                <td className="table-shell">{c.email}</td>
                                <td className="table-shell">{c.phone}</td>
                                <td className="table-shell">
                                    <select
                                        value={c.gender}
                                        onChange={(e) =>
                                            handleGenderChange(
                                                c._id,
                                                e.target.value
                                            )
                                        }
                                        className="gender-select"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </td>
                                <td className="table-shell">
                                    <select
                                        value={c.experience}
                                        onChange={(e) =>
                                            handleExperienceChange(
                                                c._id,
                                                e.target.value
                                            )
                                        }
                                        className="experience-select"
                                    >
                                        <option value="0 Year">0 Year</option>
                                        <option value="1 Year">1 Year</option>
                                        <option value="2 Years">2 Years</option>
                                        <option value="3 Years">3 Years</option>
                                        <option value="4 Years">4 Years</option>
                                        <option value="5+ Years">
                                            5+ Years
                                        </option>
                                    </select>
                                </td>

                                <td className="table-shell">
                                    {c.skills.join(", ")}
                                </td>
                                <td
                                    onClick={() => handleDelet(c._id)}
                                    className="table-shell"
                                >
                                    <span className="delet-btn">
                                        <RiDeleteBin6Line /> Delet
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    return (
        <div className="Home">
            <div className="header-add-btn">
                <h1 className="candidates-name">Candidates</h1>
                <button
                    className="add-btn"
                    onClick={() => setShowModal((prev) => !prev)}
                >
                    Add
                </button>
            </div>
            <div className="search-top-container">
                <div className="filter-icons-container">
                    <AiOutlineBars className="filter-icon" />
                    <HiMiniSquaresPlus className="filter-icon" />
                </div>
                <div className="search-right-container">
                    <div className="search-wrapper">
                        <span className="search-icon">
                            <FaSearch />
                        </span>
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search by name, phone or email"
                            value={searchTerm}
                            onChange={(e) => searchCandidate(e.target.value)}
                        />
                    </div>
                    <div className="arrow-buttons-container">
                        <span className="span-ele">{`${currentpage}/${totalpages}`}</span>
                        <span className="span-ele">{"<"}</span>
                        <span className="span-ele">{">"}</span>
                        <span className="span-ele">
                            <CiFilter />
                        </span>
                    </div>
                </div>
            </div>
            {table()}
            {showModal && (
                <AddCandidateForm
                    onAdd={onAdd}
                    closeModel={(e) => setShowModal(e)}
                />
            )}
        </div>
    );
};

export default Home;
