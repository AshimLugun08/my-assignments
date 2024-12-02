import express from "express"
import { CheckUser, login ,Logout,register} from "../controller/auth.js"
const AuthRoutes=express.Router()

AuthRoutes.post("/register",register)

AuthRoutes.post("/login",login)
AuthRoutes.post("/logout",Logout)

AuthRoutes.post("/checkuser",CheckUser)

export default AuthRoutes