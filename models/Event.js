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
  Event.find({}).toArray((error, results) => {
    if(error) throw error;

    results.forEach((i, obj) => {
      callback(obj);
    });
  });
};
