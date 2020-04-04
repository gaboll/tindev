const connection = require('../../database/connection');

module.exports = {
  async store(request, response) {
    const { user } = request.headers;
    const { devId } = request.params;

    const [loggedDev] = await connection('devs').select('*').where('id', user);
    const [targetDev] = await connection('devs').select('*').where('id', devId);

    const dislikes = loggedDev.dislikes.find(dev => dev === targetDev.id)

    if (!targetDev || !loggedDev) {
      return response.status(400).json({ error: 'User not exists' });
    };

    if (!dislikes && targetDev.id !== loggedDev.id) {
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