const express = require("express")
const Users = require("./users-model")
const adminRestrict = require("../middleware/restrict")

const router = express.Router()

router.get("/", adminRestrict(), async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch(err) {
        next(err)
    }
})

module.exports = router