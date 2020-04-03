const connection = require('../../database/connection');

module.exports = {
  async store(request, response) {
    const { user } = request.headers;
    const { devId } = request.params;

    const [loggedDev] = await connection('devs').select('*').where('id', user);
    const [targetDev] = await connection('devs').select('*').where('id', devId);

    console.log(targetDev.id)
    console.log(loggedDev)
    if (!targetDev) {
      return response.status(400).json({ error: 'User not exists' });
    };

    await connection('devs').where('devs.id',loggedDev.id).update({
      likes: targetDev.id
    })

    // await connection('likes').insert({
    //   userLike: devGetLike,
    //   devId: dev_set_like,
    // });

    // console.log({ devGetLike });
    // console.log({ dev_set_like });

    return response.json({ ok: 'asdasdasdas' });
  }
};