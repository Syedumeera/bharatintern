import express from 'express';
import { connect, Schema, model } from 'mongoose';
import { json } from 'body-parser';

const app = express();
const port = 3000;

// Connect to MongoDB
connect('mongodb://localhost:27017/userRegistration', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a user schema
const userSchema = new Schema({
  username: String,
  email: String,
  password: String
});
