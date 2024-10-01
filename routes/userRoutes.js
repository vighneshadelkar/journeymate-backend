const express=require('express');
const router=express.Router();
const AuthRouter=require('../controllers/authContoller');

router.post('/auth/register', AuthRouter.register);
router.post('/auth/login', AuthRouter.login);


module.exports=router;
