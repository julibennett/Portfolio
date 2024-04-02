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
