import { Router } from "express";
import { logInUser, registerUser } from "../controllers/user_controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/register').post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: 'coverImage',
        maxCount: 1
    }
]), registerUser)

router.route('/login').post(logInUser)


router.route('/logout').post(verifyJwt,logInUser)

export default router