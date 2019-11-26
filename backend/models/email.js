const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
  id:      { type: String },
  from:    { type: String },
  to:      { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  archive: { type: Boolean },
  enviada: { type: Boolean },
});

// primeiro parametro é o nome do objecto que vc está criando
// segundo parametro é o nome do schema.
module.exports = mongoose.model('Email',emailSchema);
