const mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  eventName : {type: String},
  category: {type: String},
  desc: {type: String},
  versus: {type: String},
  user: {type: String}
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;

module.exports.createEvent = (newEvent, callback) => {
  newEvent.save(callback);
}

module.exports.getEventById = (id, callback) => {
  Event.findById(id, callback);
}

module.exports.getEventByUser = (username, callback) => {
  var query = {user : username};
  User.findOne(query, callback);
}

module.exports.getEvents = (callback) => {
  Event.find({}, (error, results) => {
    if(error) throw error;
      callback(results);
    });
}
