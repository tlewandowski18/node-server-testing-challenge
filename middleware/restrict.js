const jwt = require("jsonwebtoken")

function adminRestrict() {
    return async (req, res, next) =>{
        const authError = {
            message: "Invalid credentials"
        }
        try {
            const token = req.cookies.token
            if(!token) {
                return res.status(401).json(authError)
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
                if (err || decodedPayload.userDepartment !== "admin") {
                    res.status(401).json(authError)
                }
                req.token = decodedPayload

                next()
            })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = adminRestrict