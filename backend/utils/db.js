// eslint-disable-next-line
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.ready = false;
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'haref';

    this.url = `mongodb://${this.host}:${this.port}`;
    this.connect();
  }

  async connect() {
    try {
      const client = await MongoClient.connect(this.url);
      this.db = client.db(this.database);
      this.ready = true;
      this.usersCollection = this.db.collection('users');
      this.harefCollection = this.db.collection('harefDB');
    } catch (err) {
      this.ready = false;
      console.error('MongoDB connection error:', err);
    }
  }

  isAlive() {
    return this.ready;
  }

}
const dbClient = new DBClient();
export default dbClient;
