import { Router } from 'express';
import MatchController from '../controllers/Matches.controller';
import auth from '../middlewares/auth';
import validateNewMatch from '../middlewares/validateNewMatch';

const router = Router();
const matchController = new MatchController();

router.get('/', matchController.findAllMatches);
router.patch('/:id', auth, matchController.updateMatch);
router.patch('/:id/finish', auth, matchController.endMatch);
router.post('/', auth, validateNewMatch, matchController.createMatch);

export default router;
