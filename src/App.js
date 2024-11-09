import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [countryData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          "https://xcountries-backend.azurewebsites.net/all"
        );

        const data = await resp.json();
        setData(data);
      } catch (err) {
        console.error("Error fetching data: ", err.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center text-center">
      {countryData.length > 0
        ? countryData.map((each) => {
            return (
              <div className="border border-secondary m-2 flag-div">
                <img src={`${each.flag}`} alt={each.name} />
                <h1 className="country-name">{each.name}</h1>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default App;
