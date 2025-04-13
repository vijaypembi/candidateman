const mongoose = require("mongoose");

const Candidate = require("./model");

// GET

const searchBy = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: "Search query is required" });
    }

    try {
        const regex = new RegExp(q, "i"); // case-insensitive search
        const results = await Candidate.find({
            $or: [{ name: regex }, { phone: regex }, { email: regex }],
        });

        res.status(200).json({ candidates: results });
    } catch (error) {
        console.error("Error searching candidates:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const retrieveAll = async (req, res) => {
    try {
        const {
            search = "",
            gender,
            experience,
            skills,
            page = 1,
            limit = 10,
        } = req.query;

        const query = {};

        // Search by name, email, or phone
        if (search) {
            const regex = new RegExp(search, "i");
            query.$or = [{ name: regex }, { email: regex }, { phone: regex }];
        }

        // Filter by gender
        if (gender) {
            query.gender = gender;
        }

        // Filter by experience
        if (experience) {
            query.experience = Number(experience);
        }

        // Filter by skills (comma-separated)
        if (skills) {
            const skillArray = skills.split(",");
            query.skills = { $all: skillArray };
        }

        const skip = (Number(page) - 1) * Number(limit);

        const [candidates, total] = await Promise.all([
            Candidate.find(query).skip(skip).limit(Number(limit)),
            Candidate.countDocuments(query),
        ]);

        res.status(200).json({
            candidates,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error("Error fetching candidates:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET /api/candidates/:id
const retrieveASpecificCandidate = async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid candidate ID" });
    }

    try {
        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).json({ error: "Candidate not found" });
        }
        res.status(200).json(candidate);
    } catch (error) {
        console.error("Error getting candidate:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST /api/candidates
const createCandidate = async (req, res) => {
    try {
        const { name, email, phone, gender, experience, skills } = req.body;

        if (!name || !email || !phone || !gender || !experience || !skills) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const candidate = await Candidate.create({
            name,
            email,
            phone,
            gender,
            experience,
            skills,
        });

        res.status(201).json(candidate);
    } catch (error) {
        console.error("Error creating candidate:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// PUT /api/candidates/:id
const updateCandidate = async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid candidate ID" });
    }

    try {
        const updatedCandidate = await Candidate.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedCandidate) {
            return res.status(404).json({ error: "Candidate not found" });
        }

        res.status(200).json(updatedCandidate);
    } catch (error) {
        console.error("Error updating candidate:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE /api/candidates/:id
const deleteCandidate = async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid candidate ID" });
    }

    try {
        const deletedCandidate = await Candidate.findByIdAndDelete(id);

        if (!deletedCandidate) {
            return res.status(404).json({ error: "Candidate not found" });
        }

        res.status(200).json({ message: "Candidate deleted successfully" });
    } catch (error) {
        console.error("Error deleting candidate:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    searchBy,
    retrieveAll,
    retrieveASpecificCandidate,
    createCandidate,
    updateCandidate,
    deleteCandidate,
};
