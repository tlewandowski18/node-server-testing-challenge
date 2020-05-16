const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post("/register", validateReqBody(), async (req, res, next) => {
    try {
        res.status(201).json(await Users.create(req.body))
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const {username, password} = req.body
        const user = await Users.findBy({username})
        const validPassword = await bcrypt.compare(password, user.password)
        if (!user || !validPassword){
            res.status(409).json({
                message: "You shall not pass!"
            })
        }
        const tokenPayload = {
            userId: user.id,
            userDepartment: user.department
        }
        res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET))
        res.json({
            message: `Welcome ${user.username}`
        })
    } catch(err) {
        next(err)
    }
})

function validateReqBody() {
    return async (req, res, next) => {
        const {username, password } = req.body
        if (!req.body.username || !req.body.password) {
            return res.status(401).json({
                message: "Please enter valid name and password!"
            })
        }
        const user = await Users.findBy({username})
        if (user) {
            return res.status(409).json({
                message: "Username is already taken."
            })
        }
        next()
    }
}

module.exports = router