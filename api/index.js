const router = require('express').Router();
const {models: {Console, Game, Exclusives}} = require('../db')

router.get('/consoles', async(req, res, next) => {
  try {
    res.send(await Console.findAll())
  } catch (error) {
    next(error)
  }
});

router.get('/games', async(req, res, next) => {
  try {
    res.send(await Game.findAll())
  } catch (error) {
    next(error)
  }
});

router.get('/consoles/:id/exclusives', async(req, res, next) => {
  try {
    res.send( await Exclusives.findAll({
      where: {
        consoleId: req.params.id
      },
      include: [
        Game
      ]
    }))
  } catch (error) {
    next(error)
  }
})

router.post('/consoles/:id/exclusives', async(req, res, next) => {
  try {
    let exclusives = await Exclusives.create({...req.body, consoleId: req.params.id});
    exclusives = await Exclusives.findByPk(exclusives.id, {
      include: [Game]
    })
    res.send(exclusives);
  } catch (error) {
    next(error)
  }
})


module.exports = router;
