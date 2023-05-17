import { Router } from 'express';
import teamsRouter from './teams.route';
import loginRouter from './login.route';
import matchRouter from './matches.route';
import leaderRouter from './leaderboard.route';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderRouter);

export default router;
