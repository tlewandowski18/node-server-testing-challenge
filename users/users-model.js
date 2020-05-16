const bcrypt = require("bcryptjs")
const db = require("../data/config")

function findById(id) {
    return db("users")
        .select("id", "username", "department")
        .where({id})
        .first()
}

function findBy(filter) {
    return db("users")
        .where(filter)
        .first()
}
async function create(user) {
    user.password = await bcrypt.hash(user.password, 13)
    const [id] = await db("users").insert(user)
    return findById(id)
}

function find() {
    return db("users").select("id", "username", "department")
}

module.exports = {
    findById,
    create,
    findBy, 
    find
}