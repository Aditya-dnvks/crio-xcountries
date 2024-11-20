import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [countryData, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(countryData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          "https://restcountries.com/v3.1/all"
        );

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
      each.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
    console.log(e.target.value);
  };

  return (
    <div className="p-3">
      <div className="text-center">
        <input type="text" className="w-75 m-3" onChange={handleSearch} />
      </div>
      <div className="d-flex flex-wrap justify-content-center align-items-center text-center">
        {filteredData.length > 0
          ? filteredData.map((each) => {
              return (
                <div className="border border-secondary m-2 flag-div">
                  <img src={`${each.flags.png}`} alt={each.name.common} />
                  <h1 className="country-name">{each.name.common}</h1>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default App;
