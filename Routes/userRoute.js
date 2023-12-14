import express from 'express';
import { activeAccount, forgot, login, register, reset} from '../Controllers/userControllers.js';
const router = express.Router();

router.post('/signup',register);
router.get('/activate/:activeToken',activeAccount);
router.post('/reset',forgot);
router.put('/reset/:resetToken',reset);
router.post('/signin',login);




export default router;
