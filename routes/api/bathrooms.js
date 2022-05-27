const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "This is the bathrooms route" }));

module.exports = router;