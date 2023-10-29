import express from "express"
import { createUser, deleteUser, getUserById, getUsers, updateUser, loginUser } from "../controllers/userController.js"
import { verifyToken } from "../middleware/token/verifyToken.js"

const router=express.Router()
const url=process.env.URL_USER
router.get("/api/user/display",verifyToken,getUsers)
router.get("/api/user/display/:id",getUserById)
router.post("/api/user/create",createUser)
router.post("/api/user/login",loginUser)
router.put("/api/user/update/:id",updateUser)
router.delete("/api/user/delete/:id",deleteUser)

export default router