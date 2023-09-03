// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  tokens: [{
    token: {
        type: String,
        required: true
    }
  }]

});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
      return next();
  }

  bcryptjs.hash(this.password, 10, (err, passwordHash) => {
      if (err) {
          return next(err);
      }

      this.password = passwordHash;
      next();
  });
});

UserSchema.methods.comparePassword = function(password, cb) {
    bcryptjs.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        } else {
            return cb(null, isMatch);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);
