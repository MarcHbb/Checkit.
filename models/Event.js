const mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  eventName : {type: String},
  category: {type: String}
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
