const connection = require('../../database/connection');

module.exports = {
  async store(request, response) {
    const { user } = request.headers;
    const { devId } = request.params;

    const [loggedDev] = await connection('devs').select('*').where('id', user);
    const [targetDev] = await connection('devs').select('*').where('id', devId);

    const likes = loggedDev.likes.find(dev => dev === targetDev.id)

    if (!targetDev || !loggedDev) {
      return response.status(400).json({ error: 'User not exists' });
    };

    if (!likes && targetDev.id !== loggedDev.id) {
      loggedDev.likes.push(targetDev.id);
      
      await connection('devs').where('id', loggedDev.id).update({ likes: loggedDev.likes });

      if (targetDev.likes.includes(loggedDev.id)) {
        console.log('Deu MATCH!')
      }

      return response.json({ like: targetDev.id });
    };

    if (likes) {
      return response.json({ like: targetDev.id });
    }

    return response.status(400).json({ error: 'Algo deu errado tente novamente!' })
  }
};