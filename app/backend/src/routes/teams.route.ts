import { Router } from 'express';
import TeamController from '../controllers/Teams.controller';

const router = Router();
const teamController = new TeamController();

router.get('/', teamController.findAllTeams);
router.get('/:id', teamController.getTeamById);

export default router;
