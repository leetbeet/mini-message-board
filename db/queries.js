const pool = require("./pool");

async function getAllMessages() {
  return await pool.query("SELECT * FROM messages");
}

async function addMessage(author, message) {
  const query = `INSERT INTO messages (text, "user", added) VALUES ($1, $2, NOW())`;
  const values = [message, author];
  await pool.query(query, values);
}

async function findMessage(id) {
  return await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
}

module.exports = {
  getAllMessages,
  addMessage,
  findMessage,
};
