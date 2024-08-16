import dbClient from '../utils/db';
import sha1 from 'sha1';
import { ObjectId } from 'mongodb';



class UsersController {
  /**
   * postNew - creates a new user record in the users collection
   * @reqeust: request sent by router
   * @response: JSON object with the feedback
   * returns: the JSON object along with 201 created
   */
  static async postNew(request, response) {
    const password = request.body.password;
    const email = request.body.email;
    const userName = request.body.userName;
    const city = request.body.city;
    const account = request.body.account;
    const job = request.body.job;
    const userCollection = await dbClient.db.collection('users');

    if (!email) {
      return response.status(400).send({"error":"Missing email"});
    }
    if (!password) {
      return response.status(400).send({"error":"Missing password"});
    }

    const user = await userCollection.findOne({ email: email });
    if (user) {
      return response.status(400).send({"error":"Already exist"});
    }
    
    const hashedPassword = sha1(password);

    try {
      const newUser = await userCollection.insertOne({
        email: email,
	password: hashedPassword,
	userName,
	city,
	account,
	job,
      });

      const createdUser = {
        id: newUser.insertedId,
        email,
      }

      return response.status(201).send(createdUser);
    } catch(err) {
      console.error('Erorr creating a user', err);
    }
  }

  static async getMe(req, res) {
    const userCollection = await dbClient.db.collection('users');
    const email = req.body.email;
    const password = req.body.password;
    const account = req.body.account;

    if (account === "1") {
      const job = req.body.job;
      const city = req.body.city;

      if (!job) {
        return res.status(400).json({'error':'Missing job'});
      }
      if (!city) {
        return res.status(400).json({'error':'Missing city'});
      }
      const user = await userCollection.findOne({'city': city, 'job': job});
      if (!user) {
        return res.status(400).json({'error':'Not found'});
      }
      return res.status(200).json({'userName': user.userName, 'useJob': user.job, 'userCity': user.city});
    }
    if (!email) {
      return response.status(400).json({"error":"Missing email"});
    }
    if (!password) {
      return response.status(400).json({"error":"Missing password"});
    }
    const hashedPassword = sha1(password);
    const user = await userCollection.findOne({"email": email, "password": hashedPassword});
    if (!user) {
      return res.status(401).json({'error':'Unauthorized'});
    }
    return res.status(200).json({"id":user._id,"email":user.email});
  }

}

export default UsersController;
