import express from "express";
import { signUp } from "../controllers/userController";
import { login } from "../controllers/userController";
import { logout } from "../controllers/userController";
import { getUserById } from "../controllers/userController";
import { updateUser } from "../controllers/userController";
import {middleware} from '../middleware';
import { getAllUsers } from "../controllers/userController";


export const router=express.Router()


router.post('/signUp', signUp)
router.post('/login', login)
router.post('/logout',middleware, logout)

router.get('/CurrentUser',middleware, getUserById)
router.put('/updateUser',middleware, updateUser)
router.get('/getUsers',middleware, getAllUsers)



