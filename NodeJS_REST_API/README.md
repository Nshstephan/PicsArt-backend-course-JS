# USER REGISTRATION AND THEIR POST"S CREATION USING REST API
Node js rest api, using JWT auth, express, mongoDB (mongoose)

Connect to DB then run index.js.

## GuestUser Endpoints (without authorization)
JS
**GET**
1. Get all user posts - /api/v1/posts/guest

## User Endpoints (with authorization)
JS
**POST**
1. Create user / Sign up - /api/v1/users
2. Sign in - /api/v1/users/login
3. Sign out - /api/v1/users/logout
4. Sign out from all devices - /api/v1/users/logoutAll
5. Upload profile picture - /api/v1/users/me/avatar
   JS
   **GET**
1. Get info of user - /api/v1/users/me
2. Get user by email - /api/v1/users/:email
   JS
   **DELETE**
1. Delete user profile picture - /api/v1/users/me
2. Delete user profile - /api/v1/users/me/avatar
   JS
   **PATCH**
1. Update user info - /api/v1/users/me
## Post Endpoints (with authorization)
JS
**GET**
1. Get user's all posts - /api/v1/posts
   Also if one want, he/she can write following queries to manipulate posts.
   // GET /api/v1/posts?completed=true -- returns all posts with completed descriptions
   // GET /api/v1/posts?limit=10&skip=0 -- (limit=?) limits max returning post count and (skip=?) skips how many posts user wants to be skipped.
   // GET /api/v1/posts?sortBy=createdAt:desc -- sorts by created at in ascending or descending order.   
2. Get user recently posts giving days interval - /api/v1/posts/recently/:id
3. Get user post a specific photo - /api/v1/posts/photo/:id/:photoId
4. Get user post all photos - /api/v1/posts//photos/:id
5. Get specific post of the user  - /api/v1/posts/:id
6. Get user posts by their description - /api/v1/posts/find/։desc

   JS
   **PATCH**
1. Update user post - /api/v1/posts/:id
2. Update users post's photo - /api/v1/posts/:id/photo/:index
   JS
   **POST**
1. Create post - /api/v1/posts
   JS
   **DELETE**
1. Delete post- /api/v1/posts/:id
2. Delete specific post's specific photo - /api/v1/posts/:id/photo/:index
