const crypto = require('crypto');
const axios = require('axios');
const connection = require('../../database/connection');

module.exports = {
  async index(request, response) {
    const { user } = request.headers;

    console.log(user)

    const [loggedDev] = await connection('devs').select('*').where('id', user ? user : "");

    console.log(loggedDev.likes)

    const users = await connection('devs')
      .select('*')
      .whereNotIn('id', loggedDev.likes ? loggedDev.likes : [])
      .whereNotIn('id', loggedDev.dislikes ? loggedDev.dislikes : [])
      .andWhereNot('id', user)

    // const res = await connection('devs').select('*');

    return response.json(users);
  },

  async store(request, response) {
    const id = crypto.randomBytes(4).toString('HEX');
    const { username } = request.body;

    const userExists = await connection('devs').where('user', username).select('*').first();

    if (userExists) {
      return response.json(userExists);
    }

    const result = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar } = result.data;

    await connection('devs')
      .insert({
        id,
        name,
        user: username,
        bio,
        avatar,
      });

    return response.json({
      id,
      name,
      user: username,
      bio,
      avatar,
    });
  }
};