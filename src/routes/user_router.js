import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelDetails, getWatchHistory, logInUser, logOutUser, refreshAccessToken, registerUser, updateAvatar, updateCoverImage, updateUserDetails } from "../controllers/user_controller.js";
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

//secured
router.route('/logout').post(verifyJwt, logOutUser)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/change-password').post(verifyJwt, changeCurrentPassword)
router.route('/current-user').post(verifyJwt, getCurrentUser)
router.route('/update-details').patch(verifyJwt, updateUserDetails)
router.route('/avatar').patch(verifyJwt, upload.single("avatar"), updateAvatar)
router.route('/cover-image').patch(verifyJwt, upload.single('coverImage'), updateCoverImage)
router.route('/channel/:userName').get(verifyJwt, getUserChannelDetails)
router.route('/history').get(verifyJwt, getWatchHistory)


export default router