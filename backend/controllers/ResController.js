import dbClient from '../utils/db';

class ResController {

  static async reservation(req, res) {
    const job = req.body.job;
    const date = req.body.date;
    const time = req.body.time;
    const payment = req.body.payment;

    const resCollection = dbClient.db.collection('res');
    const reservation = {
    job,
    time,
    date,
    payment,
    }
    await resCollection.insertOne(reservation);
    return res.status(201).json(reservation);
  }
}

export default ResController;
