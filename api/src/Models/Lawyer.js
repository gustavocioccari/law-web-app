const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const LawyerSchema = new mongoose.Schema({
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

LawyerSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const Lawyer = mongoose.model('Lawyer', LawyerSchema);

module.exports = Lawyer;