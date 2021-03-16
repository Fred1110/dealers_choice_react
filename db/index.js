const  Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4, BOOLEAN } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/nintendo_new_db')
;

const Console = conn.define('console', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: STRING,
});
const Game = conn.define('game', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: STRING,
});

const Exclusives = conn.define('exclusives', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  isExclusive: {
    type: BOOLEAN,
    defaultValue: false
  }
})

Console.hasMany(Game);
Game.belongsTo(Console);
Exclusives.belongsTo(Console);
Exclusives.belongsTo(Game)

const syncAndSeed = async() => {
  await conn.sync({ force: true });
  const [ps4, xboxone, nsswitch] = await Promise.all(
    ['ps4', 'xboxone', 'nsswitch'].map( name => Console.create({ name }))
  );
  const [godOfWar, halo, superMario] = await Promise.all(
    ['godOfWar', 'halo', 'superMario'].map( name => Game.create({ name }))
  );
  const exclusives = await Promise.all([
    Exclusives.create({ consoleId: ps4.id, gameId: godOfWar.id}),
    Exclusives.create({ consoleId: nsswitch.id, gameId: superMario.id}),
    Exclusives.create({ consoleId: xboxone.id, gameId: halo.id})
  ])
};

module.exports = {
  models: {
    Console,
    Game,
    Exclusives
  },
  conn,
  syncAndSeed
}
