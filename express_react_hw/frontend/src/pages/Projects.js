import { useState, useEffect } from "react";

const Projects = (props) => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const getProjectsData = async () => {
      try {
        const response = await fetch(props.URL + "projects");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
        console.log('Projects data:', data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    
    getProjectsData();
  }, [props.URL]);

  const loaded = () => {
    return projects.map((project, idx) => (
      <div key={idx} className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <h1 className="text-xl font-bold">{project.name}</h1>
        <img src={project.image} alt={`${project.name} project`} className="w-full h-auto"/>
        <div className="mt-4">
          <a href={project.git}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Github</button>
          </a>
          <a href={project.live} className="ml-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Live Site</button>
          </a>
        </div>
      </div>
    ));
  };

  return projects ? loaded() : <h1>Loading...</h1>;
}

export default Projects;
