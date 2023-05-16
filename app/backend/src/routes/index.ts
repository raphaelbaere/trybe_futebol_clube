import { Router } from 'express';
import teamsRouter from './teams.route';
import loginRouter from './login.route';
import matchRouter from './matches.route';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);

export default router;
