## Blog Project
This backend project is designed to serve as the foundation of a blogging platform. Built with TypeScript, Express, and Mongoose, it enables users to easily create their blog and find other's content. Meanwhile, admins can efficiently block user and delete blog if needed. Built with advance filtering, sorting, and search features.

[Live Link](https://blog-assignment-3.vercel.app/)


## Table of Contents
1. Key Features
2. Technologies
3. Getting Started Locally
4. API Endpoints
  

## Key Features
**1. User Role**
</br>

***User***
   - Can register as user.
   - Can login as user.
   - Can create blog(only when logged in).
   - Can update their own blog(only when logged in).
   - Can delete their own blog(only when logged in).
   - Can find blogs.
</br>

***Admin***
   - Can block a user.
   - Can delete any blog.
</br>

**2. Authentication**
   - User and Admin must be logged in before perform any operation
   </br>

**3. Authorization**
   - User can create, update and delete their own blog only.
   - Admin can block any user and delete any blog. But can not update any blog
   </br>
   
**4. Validation**
   - Strong validation for request bodies using Zod
  

## Technologies
- Node.js
- Express.js.
- MongoDB
- Mongoose
- TypeScript


## Getting Started Locally
1. Clone this repository to your local machine:
```bash
git clone https://github.com/JoujonikiAsa2/Blog-Assignment-3.git
```
2. Move to the cloned directory
```bash
cd Blog-Assignment-3
```
3. Install Dependencies
```bash
npm i
```
4. Configure Environment Variables
```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.ghkhwep.mongodb.net/<database>?retryWrites=true&w=majority&appName=Cluster0;
BCRYPT_SALT_ROUNDS=16
JWT_ACCESS_SECRET=c374e3e2e0f72c0a5914ec3df85c1632jsgdt172dcabb378f329521763b47f03
JWT_ACCESS_EXPIRE_IN=1d
```
5. Start the local Server:
```bash
npm run dev
```
6. Test the API
[http://localhost:5000/](http://localhost:5000/)


## API Endpoints

### Authentication

<table>
   <thead>
      <tr>
         <th>HTTP Method</th>
         <th>EndPoints</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
     <tr>
         <td>POST</td>
         <td>/api/auth/register</td>
         <td>Allows user to register and save data in databse</td>
      </tr>
      <tr>
         <td>POST</td>
         <td>/api/auth/login</td>
         <td>Allows user to login</td>
      </tr>
   </tbody>
</table>

### Blog Management
<table>
   <thead>
      <tr>
         <th>HTTP Method</th>
         <th>EndPoints</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
     <tr>
         <td>POST</td>
         <td>/api/blogs</td>
         <td>Allows logged in user to create blog</td>
      </tr>
      <tr>
         <td>PATCH</td>
         <td>/api/blogs/:id</td>
         <td>Allows logged in user to update their own blog</td>
      </tr>
      <tr>
         <td>DELETE</td>
         <td>/api/blogs/:id</td>
         <td>Allows logged in user to delete their own blog</td>
      </tr>
      <tr>
         <td>GET</td>
         <td>/api/blogs</td>
         <td>Allows user to find any blog by filtering, sorting and searching</td>
      </tr>
   </tbody>
</table>

### Admin Actions
<table>
   <thead>
      <tr>
         <th>HTTP Method</th>
         <th>EndPoints</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
     <tr>
         <td>PATCH</td>
         <td>/api/admin/users/:userId/block</td>
         <td>Allows logged in admin to block any user</td>
      </tr>
      <tr>
         <td>DELETE</td>
         <td>/api/admin/blogs/:id</td>
         <td>Allows logged in admin to delete any blog</td>
      </tr>
   </tbody>
</table>
