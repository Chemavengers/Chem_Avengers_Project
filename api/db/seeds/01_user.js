/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {id: 1, username: "misterjoe", email:"joeygaitan707@gmail.com", password: "$2b$10$ZntEbhwd9ETwoKFZBTnGEOiS8bJmT3XqHtKKghriDyqadQsjF0W.y", age: 20 },
    {id: 2, username: "admin", email:"admin@admin.com", password: "$2b$10$ZntEbhwd9ETwoKFZBTnGEOiS8bJmT3XqHtKKghriDyqadQsjF0W.y", age: 18 },
    {id: 3, username: "admin1234", email:"admin@email.com", password: "$2b$10$ZntEbhwd9ETwoKFZBTnGEOiS8bJmT3XqHtKKghriDyqadQsjF0W.y", age: 25 },
  ]);
};
