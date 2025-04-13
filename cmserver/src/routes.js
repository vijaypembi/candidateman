const express = require("express");

const router = express.Router();
const {
    retrieveAll,
    retrieveASpecificCandidate,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    searchBy,
} = require("./controller");
// GET /candidates - Retrieve all candidates
//  GET /candidates/:id - Retrieve a specific candidate by ID
// POST /candidates - Create a new candidate
//  PUT  - Update an existing candidate
//  DELETE /candidates/:id - Delete a candidate
//http://localhost:5000/candidates/search?q=sai
router.get("/candidates/search", searchBy);
router.get("/candidates", retrieveAll);
router.get("/candidates/:id", retrieveASpecificCandidate);
router.post("/candidates", createCandidate);
router.put("/candidates/:id", updateCandidate);
router.delete("/candidates/:id", deleteCandidate);

module.exports = router;
