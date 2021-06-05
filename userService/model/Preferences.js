const mongoose = require('mongoose');
const preferencesSchema = mongoose.Schema({
  themes: [
    {
      name: String,
      icon: String,
    },
  ],
  difficulties: [
    {
      name: String,
      icon: String,
    },
  ],
  phobies: [
    {
      name: String,
      icon: String,
    },
  ],
});

module.exports = Preferences = mongoose.model('preferences', preferencesSchema);
