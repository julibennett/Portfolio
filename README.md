# Express and React

During this lab/deliverable we will be creating a full stack portfolio page using Express and React to see how you can create a full stack project using a simple API build with express and a frontend application with React.

**NOTE** The frontend and backend project MUST be in separate repos, follow the direction carefully regarding where repos are created and deployment **(deployment optional)**. You do NOT need to deploy for this deliverable, its a fun optional goal. If you do decide to deploy these, your /backend folder should have its own `git remote` repository (its own repo) and the /frontend folder needs to also have its own, separete `git remote` (a different repo!). If you need help adding remotes, start by Googling `how to add git remote from github` and there should be many, many results that can help you through it.

**ANOTHER NOTE** This is **not your actual portfolio**, so don't worry about making it perfect. Use this as an exercise to practice the skills we've learned in the class so far. You are welcome to try changing this fake portfolio to be your "real" portfolio. (see challenges at the end for ideas!)

**THE MOST IMPORTANT NOTE OF ALL** DO NOT COPY/PASTE! Typing every line by hand is what helps you learn the syntax and develop a deeper understanding of code and how to read it!

## Setup

- Fork and Clone down this homework

- Once inside this repo, create an empty folder to house this project `express_react_hw`.

- Inside this folder create a folder for our backend app called `backend` this will house our express application

- Generate a react project for a our frontend, using this command should do the trick (make sure you're in the right folder! `/express_react_hw`)...

  - `npx create-react-app frontend`

- The end result should be the following folder structure:

```
- /express_react_hw
  > /backend
  > /frontend
```

## Express app setup

- Open up your terminal inside the backend folder

- create a new npm project with the command `npm init -y`

- install the following
  - `npm install express cors`
  - `npm install --save-dev nodemon` (use this in case you need to install nodemon again)

#### What we installed

1. express: The backend web framework for generating a web server

2. cors: middleware to make sure we don't get cors errors when our react app makes a request to our express app

3. nodemon: development tool to auto restart our server whenever

- update the package.json with the following scripts (don't forget your commas!)

```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
```

#### Our Data

Instead of using a database we will use JSON files to store the data for our project for now.

Run the following command in the `backend` folder to create our files

- `touch server.js projects.json about.json`

#### projects.json

In this file you should use the below example but replace it with your projects from the previous units. (json files don't need to be exported, node knows how to read them).

Essentially this file is an array of objects that represent your projects.

```json
[
  {
    "name": "project1",
    "live": "https://app.herokuapp.com/whatever",
    "git": "http://www.github.com/username/reponame",
    "image": "http://www.imgur.com/pictureofproject.png"
  },
  {
    "name": "project2",
    "live": "https://app.netlify.app/whatever",
    "git": "http://www.github.com/username/reponame",
    "image": "http://www.imgur.com/pictureofproject.png"
  }
]
```

#### about.json

This file will be one big option with information about you to use in your portfolio.

```json
{
  "name": "Bob Smith",
  "email": "Bob@BobSmith.dev",
  "headshot": "http://www.imgur.com/pictureofproject.png",
  "bio": "Bob Smith graduated from General Assembly in 2024. Afterwords, he went to work for XYZ Technologies where he maintained a full stack application using Meteor and Ember. He also recently started started learning Prolog, cause why not waste time."
}
```

#### server.js

Now we can make our server, here is the overview of what we will do.

- import our dependencies and json files
- create our app object
- add our cors middleware
- create a home route to test our app
- create a `/projects` route to retrieve our projects
- create a `/about` route to retrieve our about info
- setup our server listener

```js
// Import Dependencies
const express = require("express");
const cors = require("cors");

// Import JSON files
const projects = require("./projects.json");
const about = require("./about.json");

// Create our app object
const app = express();

// set up middleware
app.use(cors());

//home route for testing our app
app.get("/", (req, res) => {
  res.send("Hello World");
});

// route for retrieving projects
app.get("/projects", (req, res) => {
  // send projects via JSON
  res.json(projects);
});

// route for retrieving about info
app.get("/about", (req, res) => {
  // send projects via JSON
  res.json(about);
});

//declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
```

- run your server `npm run dev`and test these routes in Postman

- get request to `localhost:4000` and make sure you see "hello world"

- get request to `localhost:4000/projects` and make sure you see your projects as JSON

- get request to `localhost:4000/about` and make sure you see your about info as json

## Building the Frontend

Make sure to create and keep your Heroku url handy, if you are deploying your frontend (optional).

- open your terminal to the `frontend` folder

- install react router `npm install react-router-dom`

## Setting up React Router

first get rid of any files and assets you won't be using (the template logos, favicons, webvitals, etc)
**NOTE** if you are deploying this, make sure to keep your robots.txt and manifest.json never delete those!


open up `src/index.js` and make the following changes

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import router
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);
```

## Getting things scoped out

- create a `src/components` folder and `src/pages` folder

- in components create `Header.js` and `Footer.js`

`src/components/Header.js`

```jsx
const Header = () => {
    return <h1>Header</h1>
}

export default Header
```

`src/components/Footer.js`

```jsx
const Footer = () => {
    return <h1>Footer</h1>
}

export default Footer
```

- In `src/pages` create `Home.js`, `About.js` and `Projects.js`

`src/pages/Home.js`

```jsx
const Home = () => {
    return <h1>Home</h1>
}

export default Home
```

`src/pages/About.js`

```jsx
const About = () => {
    return <h1>About</h1>
}

export default About
```

`src/pages/Projects.js`

```jsx
const Projects = () => {
    return <h1>Projects</h1>
}

export default Projects
```

## App.js

Here is the plan

- import all our components
- import the Route and Routes component from Router
- Setup our routes
- create a variable called URL with our heroku url (DEPLOYMENT OPTIONAL)
- pass the URL as a prop to about and projects so they can make a call to our API

`src/App.js`

```jsx
import "./App.css";

// IMPORT COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
// IMPORT PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";

function App() {
  // URL should have YOUR HEROKU URL for your backend, make sure you include the trailing slash "/" (deployment OPTIONAL)
  const URL = "http://localhost:4000/";

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/projects" element={<Projects URL={URL}/>}/>
        <Route exact path="/about" element={<About URL={URL}/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
```

## The Navigation

Right now we can't switch between our routes with Link components, so let's build our navigation so we can switch between pages. Our navigation should be in our header.

`src/components/Header.js`

```jsx
import { Link } from "react-router-dom";


const Header = () => {
  //inline style for the nav tag
  const navStyle = {
      display: "flex",
      justifyContent: "space-around",
      border: "3px solid black",
      padding: "8px",
      width: "90%",
      margin: "auto",
  };
  return(
      <header>
          <h1>My Portfolio Page</h1>
          <nav style={navStyle}>
          <Link to="/">
              <div>HOME</div>
          </Link>
          <Link to="/about">
              <div>ABOUT</div>
          </Link>
          <Link to="/projects">
              <div>PROJECTS</div>
          </Link>
          </nav>
      </header>
  )
}

export default Header
```

You should be able to navigate between our pages but they are only one word at the moment. Let's populate our projects and about pages.

## About Page

We will do the following...

- create a state variable to hold the about data
- create a function to make the api call and update state
- call the function within a useEffect to avoid an infinite loop
- Use a ternary to render one thing if we have the data from the api and something else if we don't

`src/pages/About.js`

```jsx
import { useState, useEffect } from "react";

const About = (props) => {
  // create state to hold about data
  const [about, setAbout] = useState(null);
  
   const getAboutData = async () => {
        // make api call and get response
        const response = await fetch(props.URL + "about");
        // turn response into javascript object
        const data = await response.json();
        // set the about state to the data
        setAbout(data);
    }

  // make an initial call for the data inside a useEffect, so it only happens once on component load
  useEffect(() => {
    getAboutData()
}, []);

  // define a function that will return the JSX needed once we get the data
  const loaded = () => (
    <div>
      <h2>{about.name}</h2>
      <h3>{about.email}</h3>
      <p>{about.bio}</p>
    </div>
  );

  // if data arrives return the result of loaded, if not, an h1 that says loading
  return about ? loaded() : <h1>Loading...</h1>;
}

export default About;
```

## Projects

We will use the same pattern for our projects

- create a state variable to hold the projects data
- create a function to make the api call and update state
- call the function within a useEffect to avoid an infinite loop
- Use a ternary to render one thing if we have the data from the api and something else if we don't
- our loaded function will map over the array of projects and return the jsx for project

`src/pages/Projects.js`

```jsx
import { useState, useEffect } from "react";

const Projects = (props) => {

  // create state to hold projects
  const [projects, setProjects] = useState(null);

  // make an initial call for the data inside a useEffect, so it only happens once on component load
  useEffect(() => {
    //create function to make api call
    const getProjectsData = async () => {
      //make api call and get response
      const response = await fetch(props.URL + "projects");
      // turn response into javascript object
      const data = await response.json();
      // set the projects state to the data
      setProjects(data);
    };
    
    getProjectsData()
}, []);

  // define a function that will return the JSX needed once we get the data
  const loaded = () => {
    return projects.map((project, idx) => (
      <div key={idx}>
        <h1>{project.name}</h1>
        <img src={project.image} />
        <a href={project.git}>
          <button>Github</button>
        </a>
        {/* you can leave the live link commented out if you aren't deploying it */}
        {/* <a href={project.live}>
          <button>live site</button>
        </a> */}
      </div>
    ));
  };

  return projects ? loaded() : <h1>Loading...</h1>;
}

export default Projects
```

## Deploy Frontend (BONUS, BONUS, BONUS!!)

This is completely **OPTIONAL**! If you want to try it out and play around with a hosting service that isn't Heroku, try out Netlify!

Once everything seems working, do the following.

- go to your package.json and replace the "build" script with this: `"build": "CI= react-scripts build",`

- add all files to staging `git add .`

- commit `git commit -m "frontend complete"`

- push your work to github and make sure your app is ready to go

- go to netlify.com and create an account with your personal github account

- on your netlify dashboard click `add new site` > `import from a project` > `deploy with github`

- after you allow access and select the repo you want to deploy and select the main branch to deploy from

- enter the build settings with the data in the image ![image of netlify deployment settings](https://i.imgur.com/ZZwW6FQ.png)

- if you have environmental variables, you can enter them now or add them later on

- make sure to deploy BOTH your front and back ends (make sure your localhost urls are now your netlify urls)

- You've deployed your portfolio!!!

## SUBMISSION INSTRUCTIONS
- open a pull request on this repo with your working code in it and you're good to go!
**NOTE** if you deployed, include the live link in your pull request

## What Now?

- Add some content to the home page
- Spend some time styling your frontend
- Add content to the footer

## Hungry For More

#### Styling Challenges (choose 1)

- Style using the Styled Components Library `npm install styled-components`
- Style using sass `npm install sass` (after install change the extension on your css files scss)
- Try using `bulma-react-components` a [library of components pre-made using Bulma](https://www.npmjs.com/package/react-bulma-components)

#### Express Challenges

- Try adding a form to your React project and a post route on your express app to go with it
- Pull your actual real project data from Github's API!
- Use the above challenge to make a route for contacting you (email, social media, whatever you want)
- Convert from JSON files to using a mongo database for your project (not really necessary for the about info)
  - make sure to hide your secrets in an .env (add those to your heroku deployed site too if you deployed!)
