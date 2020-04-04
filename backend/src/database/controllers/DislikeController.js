const connection = require('../../database/connection');

module.exports = {
  async store(request, response) {
    const { user } = request.headers;
    const { devId } = request.params;

    const [loggedDev] = await connection('devs').select('*').where('id', user);
    const [targetDev] = await connection('devs').select('*').where('id', devId);
    const [dislikes] = await connection('dislikes')
      .select('*')
      .where({
        userDislike: targetDev.id,
        devId: loggedDev.id
      });

    if (!targetDev || !loggedDev) {
      return response.status(400).json({ error: 'User not exists' });
    };

    if (!dislikes && targetDev.id !== loggedDev.id) {
      await connection('dislikes').insert({
        userDislike: targetDev.id,
        devId: loggedDev.id,
      });

      loggedDev.dislikes.push(targetDev.id);
      await connection('devs').where('id', loggedDev.id).update({ dislikes: loggedDev.dislikes });

      return response.json({ dislike: targetDev.id });
    };

    if (dislikes) {
      return response.json({ dislike: targetDev.id });
    }

    return response.status(400).json({ error: 'Algo deu errado tente novamente!' })
  }
};