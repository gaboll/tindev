const crypto = require('crypto');
const axios = require('axios');
const connection = require('../../database/connection');

module.exports = {
  async index(request, response) {
    const teste = await connection('likes').select('userLike').where('devId', 'ea8d141c')

    // console.log(teste)

    const res = await connection('devs')
      // .innerJoin('likes', 'likes.devId', '=', 'devs.id')
      .select([
        'devs.*',
        // 'likes.userLike AS likes'
      ]);

    return response.json(res);
  },

  async store(request, response) {
    const id = crypto.randomBytes(4).toString('HEX');
    const { username } = request.body;

    const userExists = await connection('devs').where('user', username).select('*').first();

    if (userExists) {
      return response.json(userExists);
    }

    const gitHubResponse = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar } = gitHubResponse.data;

    await connection('devs')
      .insert({
        id,
        name,
        user: username,
        bio,
        avatar,
        created_at: Date.now(),
        updated_at: Date.now(),
      });

    return response.json({
      id,
      name,
      user: username,
      bio,
      avatar,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  }
};