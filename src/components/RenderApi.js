import React, { useState, useEffect } from "react";

const Card = ({ data }) => {
  const [like, setLike] = useState(0);

  const handleLike = () => {
    setLike(like + 1);
  };

  return (
    <div className="card border-primary text-secondary bg-transparent mt-5 " key={data.id}>
      <img src={`https://picsum.photos/200?random=${data.id}`} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">
          User ID: <span>{data.id}</span>
        </h5>
        <p className="card-text">Title : {data.title}</p>
        <p className="card-text">Likes : {like}</p>
      </div>
      <div className="card-footer bg-transparent">
        <div className="d-grid gap-2">
          <button onClick={handleLike} className="btn btn-outline-secondary rounded-pill" type="button">
            Like Post
          </button>
        </div>
      </div>
    </div>
  );
};

const RenderApi = () => {
  const [user, setUser] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_page=$%7Bpage%7D&_limit=20");
      setUser(await response.json());
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = user.filter((data) => {
    return data.title.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="col-auto">
          <input
            type="text"
            className="form-control rounded-pill bg-transparent text-light p-3"
            id="a"
            placeholder="Search by title..."
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <div className="wrapper row">
          {filteredData.map((data) => {
            return <Card data={data} />;
          })}
        </div>
      </div>
    </>
  );
};

export default RenderApi;


