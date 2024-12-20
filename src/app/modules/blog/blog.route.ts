import { Router } from "express";
import { blogControllers } from "./blog.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidation } from "./blog.validation";

const router = Router()

//blog routes
router.post('/', auth(USER_ROLE.user), validateRequest(blogValidation.blogSchemaValidation),blogControllers.createBlog)
router.get('/', blogControllers.findAllBlogs) //public route
router.patch('/:id', auth(USER_ROLE.user),blogControllers.updateBlog) 
router.delete('/:id', auth(USER_ROLE.user),blogControllers.deleteBlog) 

export const blogRoutes = router