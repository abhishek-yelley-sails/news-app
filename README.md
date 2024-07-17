# News-App

## Steps to Run:

1. Go to `/frontend` and run `npm install`
2. Go to `/backend` and run `npm install`
3. Create a `.env` in `/frontend` and paste `VITE_BACKEND_API="http://localhost:8080/"`
4. Create a `.env` in `/backend` and paste:
  ```
  PORT=8080
  JWT_KEY=<your-secret>
  API_KEY=<your-newapi.org-api-key>

  ```


- [x] 1. Create a new react project.
- [x] 2. Create a Login, SignUp, Home, and profile screen. Use react routing to navigate between screens.
  - [x] a. Home
  - [x] b. Routing
  - [x] c. Login/SignUp
    - [x] i. Create backend for user storage
    - [x] ii. JWT for session management 
  - [x] d. Profile 
- [x] 3. Store the user details in context and use them across the other screens
- [x] 4. Use Query client to call a news API to get the data 
- [x] 5. Show the data in Home as a card for each array index(left side image, right side Title, description, author at the end link URL to visit the site). User can scroll down to see more news. **(Pagination?)**
- [x] 6. Click on the card to open a modal with the details of the selected data index.
(Top full-length image, title below that, and all other details )
- [x] 7. The profile screen shows the user's details, allowing them to update their details.
- [x] 8. Log out to go back to the login screen and clear the context.
 
API to use

https://newsapi.org/v2/everything?q=tesla&from=2024-06-12&sortBy=publishedAt&apiKey=API_KEY
 
Note:

1. Be careful about the API key
2. Use typescript
3. Crete separate components to handle separately