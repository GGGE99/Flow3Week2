import React, { useState, useEffect } from "react";
import facede from "./apiFacade";

export default function Scrape() {
  const [scrape, setScrape] = useState([]);

  useEffect(() => {
    facede.fetchAny(
      "http://localhost:8080/jpareststarter/api/scrape/parallel",
      (data) => setScrape(data),
      true
    );
  }, []);

  if (scrape.tags !== undefined) {
    return (
      <div className="scrape__div">  
        <p>Time: {scrape.timeSpent}</p>
        {scrape.tags.map((element) => (
          <div key={element.url} className="site__div">
            {Object.entries(element).map(([key, value]) => (
              <p key={key + value}>
                {key}: {value}
              </p>
            ))}
          </div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}
