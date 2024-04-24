import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/apiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
    // get user detail

    const { fullName, email, username, password } = req.body

    // validation -> empty

    if ([fullName, email, username, password]
        .some((field) => field?.trim() === '')) {
        throw new ApiError(400, 'All field are required')
    }

    // check ,already exist

    const existUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existUser) {
        throw new ApiError(409, 'Already register with username or password')
    }

    // check for avatar

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar is required')
    }

    //upload on cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, 'avatar is required')
    }

    //create object and entry in db

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || '',
        email,
        password,
        username: username.toLowerCase()
    })


    // remove password and refersh token field from response

    const createdUser = User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, 'Something wrong while registering the user')
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, 'user registartion successfully')
    )

})

export { registerUser }