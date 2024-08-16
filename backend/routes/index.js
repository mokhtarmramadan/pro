import express from 'express';
import UsersController from '../controllers/UsersController';
import ResController from '../controllers/ResController';
import QNAController from '../controllers/QNAController';


function controllerRouting(app) {
  // App controller
  const router = express.Router();
  app.use('/', router);

  router.get('/status', (req, res) => {
    // returns true if redis and DB clients are up
    AppController.getStatus(req, res);
  });

  router.get('/stats', (req, res) => {
    // returns number of users and files in the DB
    AppController.getStats(req, res);
  });

  router.post('/users', (req, res) => {
    // Adds a new user
    UsersController.postNew(req, res);
  });

  router.post('/res', (req, res) => {
    ResController.reservation(req, res);
  });

  router.post('/qna', (req, res) => {
    QNAController.qna(req, res);
  });
}

export default controllerRouting;             
