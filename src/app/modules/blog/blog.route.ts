import { Router } from "express";
import { blogControllers } from "./blog.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router()

router.post('/create-blog', auth(USER_ROLE.user),blogControllers.createBlog)
router.patch('/:id', auth(USER_ROLE.user),blogControllers.updateBlog)
router.delete('/:id', auth(USER_ROLE.user),blogControllers.deleteBlog)

export const blogRoutes = router