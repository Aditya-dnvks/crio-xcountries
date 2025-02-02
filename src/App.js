import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [countryData, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(countryData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");

        // https://xcountries-backend.azurewebsites.net/all
        const data = await resp.json();
        setData(data);
        setFilteredData(data);
      } catch (err) {
        console.error("Error fetching data: ", err.message);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const filtered = countryData.filter((each) =>
      each.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
    console.log(e.target.value);
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <input type="text" className="search-input" onChange={handleSearch} />
      </div>
      <div className="countries-container">
        {filteredData.length > 0
          ? filteredData.map((each) => {
              return (
                <div className="countryCard" key={each.cca3}>
                  <img src={`${each.png}`} alt={each.common} className="country-flag" />
                  <h2 className="country-name">{each.common}</h2>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default App;
