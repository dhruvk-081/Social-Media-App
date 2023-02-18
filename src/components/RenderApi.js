import React, { useState, useEffect } from "react";
import CardData from "./CardData";

// import { uuid } from 'uuidv4';
// import { v4 as uuidv4 } from 'uuid';

const RenderApi = () => {
  const [user, setUser] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`);
      setUser(await response.json());
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handlePage = () => {
    setPage(page + 1);
    console.log(setPage);
  };

  const filteredData = user.filter((data) => {
    return data.title.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="text-center">
          <input type="text" className="form-control rounded-pill bg-transparent text-light p-3" id="a" placeholder="Search..." value={searchText} onChange={handleSearch} />{" "}
        </div>

        <div className="wrapper row">
          {filteredData.map((data) => {
            return <CardData e={data} key={data.id} />;
          })}
        </div>
      </div>

      <div className="text-center">
        <button onClick={handlePage} className="btn btn-light rounded-pill m-5 px-5" type="button">
          Load More Posts
        </button>
      </div>
    </>
  );
};

export default RenderApi;
