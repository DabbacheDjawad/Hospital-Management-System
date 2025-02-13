const express = require("express");
const router = express.Router();
const {
    getAllPatients,
    getPatient,
    createPatient,
    UpdatePatient,
    deletePatient
} = require("../controllers/patients")

router.route("/").get(getAllPatients).post(createPatient);
router.route("/:id").get(getPatient).patch(UpdatePatient).delete(deletePatient);

module.exports = router;