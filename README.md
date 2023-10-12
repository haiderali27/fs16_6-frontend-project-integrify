# Front-end Project

- [Project structure](#structure)
- [Assignment Tasks](#assignment-tasks)
- [Instruction to start the project](#Instruction-to-start-the-project)
- [Deployed Url](#deployed-url)



## Structure

```
.
├── package-lock.json
├── package.json
├── README.md
├── src
|  ├── components/*.tsx
|  ├── constants/constants.ts
|  ├── pages/*.tsx
|  ├── servers/*.tsx
|  ├── shared/*.tsx
|  ├── store/*.tsx
|  ├── test
|         ├──data/*.ts
|         ├──servers/*.tsx  
|         └──store/*.test.ts  
|  ├── types 
|  ├── index.css
|  ├── setUpTest.ts
|  ├── index.tsx
|  └── App.tsx
|
├── package.json
├── README.md
└── tsconfig.json
```


## Assignment Tasks
- [x] Create at lease 4 pages (can be more if you want): Page for all products, product page, profile page (only available if user logins), and cart page (cart page could be a page or a modal)
- [x] Create Redux store for following features:
product reducer: get all products, find a single products, filter products by categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp)
user reducer: register and login
cart reducer: add product to cart, remove products, update products's quantity in cart
- [x] When adding routers to your application, programatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.
- [x] Deploy the application and rewrite README file.
- [ ] Implement unit testing for the reducers



## Deployed URL
https://6527fd739943a30008941c91--majestic-kitten-e0fcda.netlify.app/

## Instruction to start the project

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Use
git clone git@github.com:haiderali27/fs16_6-frontend-project.git
to clone the project to your computer directory. 
Navigate to folder "fs16_6-frontend-project"


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
