const express = require("express");
const router = express.Router();
const {
    getAllDoctors,
    getDoctor,
    createDoctor,
    UpdateDoctor,
    deleteDoctor,
} = require("../controllers/doctors")

router.route("/").get(getAllDoctors).post(createDoctor);
router.route("/:id").get(getDoctor).patch(UpdateDoctor).delete(deleteDoctor);

module.exports = router;