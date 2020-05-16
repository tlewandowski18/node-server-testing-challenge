const express = require("express")
const authRouter = require("./auth/auth-router")
const usersRouter = require("./users/users-router")
const cookieParser = require("cookie-parser")

const server = express()

const port = process.env.PORT || 4040

server.use(express.json())
server.use(cookieParser())
server.use("/auth", authRouter)
server.use("/users", usersRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "something went wrong"
    })
})

if (!module.parent) {
    server.listen(port, () => {
       console.log(`listening on http://localhost:${port}`)
    })
}

