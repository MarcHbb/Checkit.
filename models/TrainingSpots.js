const mongoose = require('mongoose');

var TrainingSpotsSchema = mongoose.Schema({
  addresse : {type: String},
  name: {type:String}
});

var TrainingSpots = mongoose.model('trainingspots', TrainingSpotsSchema);
module.exports = TrainingSpots;

module.exports.createSpot = (newSpot, callback) => {
  newSpot.save(callback);
}

module.exports.getSpots = (callback) => {
  TrainingSpots.find({}, (error, results) => {
    if(error) throw error;
      callback(results);
    });
}