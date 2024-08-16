import dbClient from '../utils/db';


class QNAController {

  static async qna(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const topic = req.body.topic;
    const message = req.body.message;

    if (!name) {
      return res.status(400).json({'error':'Missing name'});
    }
    if (!email) {
      return res.status(400).json({'error':'Missing email'});
    }
    if (!topic) {
      return res.status(400).json({'error':'Missing topic'});
    }
    if (!message) {
      return res.status(400).json({'error':'Missing message'});
    }

    const question = {
      name,
      email,
      topic,
      message,
    };
    const questionsCollection = await dbClient.db.collection('question');
    await questionsCollection.insertOne(question);
    return res.status(201).json(question);
  }
}
export default QNAController;
