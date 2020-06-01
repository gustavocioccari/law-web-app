const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const ClientSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  cpf:{
    type: String,
    unique: true,
    required: true,
  },
  password:{
    type: String,
    required: true,
    select: false,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
  updatedAt:{
    type: Date,
    default: Date.now,
  },
});

ClientSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;