import { loginVerify, CreateSession, Logout, RegisterUser} from "../controllers/user.controller.js";
import {Router} from 'express'

const router = Router()

router.post("/login", loginVerify)
router.get("/session",CreateSession)
router.post("/logout",Logout)
router.post("/register", RegisterUser)


export default router