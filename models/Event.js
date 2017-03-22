const mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  eventName : {type: String},
  category: {type: String},
  desc: {type: String},
  versus: {type: String},
  idUser: {type: Number}
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;

module.exports.createEvent = (newEvent, callback) => {
  newEvent.save(callback);
}

module.exports.getEvent = (callback) => {
  Event.find({}, (error, results) => {
    if(error) throw error;
      callback(results);
    });
}

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
