import { loginVerify, CreateSession} from "../controllers/user.controller.js";
import {Router} from 'express'

const router = Router()

router.post("/login", loginVerify)
router.get("/session",CreateSession)

export default router