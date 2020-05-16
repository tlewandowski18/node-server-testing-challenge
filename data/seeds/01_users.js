
exports.seed = async function(knex) {
  await knex("users").truncate()
  await knex("users").insert([
    { username: "fakeuser1", password: "fakepassword1", department: "admin" },
    { username: "fakeuser2", password: "fakepassword2" },
  ])
};
