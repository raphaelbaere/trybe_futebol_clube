import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.getHomeLeaderboard);
router.get('/away', leaderboardController.getHomeLeaderboard);

export default router;
