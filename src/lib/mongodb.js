// lib/mongodb.js
import { MongoClient } from 'mongodb';

let client;
let clientPromise;

const uri = process.env.MONGODB_URI; 
if (!process.env.MONGODB_URI) {
  throw new Error('Add MongoDB URI to .env.local');
}

client = new MongoClient(uri);
clientPromise = client.connect();

export default clientPromise;
