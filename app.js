const express = require('./express')
const config = require('./lib/config')
const mongodb = require('./mongo_init')
const mongoose = require('./src/util/mongoose.util')
const checkRosConnectionSchedule = require('./src/schedule/checkRosConnection.schedule');

async function initDb (){
  await mongodb.connect();
  const db = await mongoose.connect();
  return express.init(db);
}
module.exports.init = async () => {
  config.init();
  const app = await initDb();
  checkRosConnectionSchedule.checkRosConnection();
  console.log('Server running in Port: 3001')
  app.listen(3001)
};
