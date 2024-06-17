import { useState, useEffect } from "react";

const About = (props) => {
  const [about, setAbout] = useState(null);

  const getAboutData = async () => {
    try {
      const response = await fetch(props.URL + "about");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAbout(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    getAboutData();
  }, [props.URL]);

  const loaded = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md flex items-center">
      <img src={about.headshot} alt={`${about.name}`} className="w-1/3 h-auto rounded-lg mr-6" />
      <div>
        <h2 className="text-2xl font-bold mb-2 galactic">{about.name}</h2>
        <h3 className="text-xl text-gray-700 mb-4">{about.email}</h3>
        <a href={about.linkedin} target="_blank" rel="noopener noreferrer">
          <button className="text-xl text-white bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded mb-4">
            LinkedIn Profile
          </button>
        </a>
        <p className="text-gray-600">{about.bio}</p>
      </div>
    </div>
  );

  return about ? loaded() : <h1 className="text-center text-2xl font-bold mt-20">Loading...</h1>;
}

export default About;
