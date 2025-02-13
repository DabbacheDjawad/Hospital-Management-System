const express = require("express");
const router = express.Router();
const {
    getAllAppointments,
    getAppointment,
    createappointment,
    UpdateAppointment,
    deleteAppointment
} = require("../controllers/appointments")

router.route("/").get(getAllAppointments).post(createappointment);
router.route("/:id").get(getAppointment).patch(UpdateAppointment).delete(deleteAppointment);

module.exports = router;