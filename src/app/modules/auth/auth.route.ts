import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userSchemaValidation } from "../user/user.validation";

const router = Router()

//authentication routes
router.post('/register', validateRequest(userSchemaValidation.createUserSchemaValidation), authController.registerUser)
router.post('/login', validateRequest(userSchemaValidation.loginUserSchemaValidation), authController.loginUser)

export const authRoutes = router