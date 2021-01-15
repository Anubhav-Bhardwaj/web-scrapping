import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
import Footer from "./Footer";

const App = () => {
  const [array, setArray] = useState();
  const [loading, setLoading] = useState(true);

  const getNews = async () => {
    const res = await Axios.get("/scrap");
    console.log(res.data);

    setArray(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <div className="news-wrapper">
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {array.map((news) => {
              return (
                <div className="news-card">
                  <div className="news-title">{news.title}</div>
                  <div className="news-content">{news.content}</div>
                </div>
              );
            })}
          </Fragment>
        )}
      </div>
      <Footer />
    </Fragment>
  );
};

export default App;
