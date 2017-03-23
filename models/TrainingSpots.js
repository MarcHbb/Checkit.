const mongoose = require('mongoose');

var TrainingSpotsSchema = mongoose.Schema({
  addresse : {type: String}
});

var TrainingSpots = mongoose.model('TrainingSpots', TrainingSpotsSchema);
module.exports = TrainingSpots;


/*
module.exports.editEvent = (id, callback) => {
  Event.findOneAndUpdate({ _id:req.params.id},
    { $set: { eventName: req.body.eventName }},(err, newEvent) => {
    if(err) throw err;
    callback(newEvent);
  });
}

module.exports.deleteEvent = (id, callback) => {
  Event.findOneAndRemove({ _id:req.params.id},(err, r_event) => {
    if(err) throw err;
  });
}
*/
