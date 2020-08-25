const mongoose = require('mongoose');


const exampleSchema = new mongoose.Schema({
  name: {
    String,
  },
  email: String,
  avatar: String,
  githubId: String
}, {
  timestamp: true
});

module.exports = mongoose.model('Example', exampleSchema);