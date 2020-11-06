import React, { useState, useEffect } from "react";
import facade from "./apiFacade";

export default function Jokes() {
  const [jokes, setJokes] = useState({
    joke1: "",
    joke1Reference: "",
    joke2: "",
    joke2Reference: "",
  });
  const [noErr, setErr] = useState(false);

  useEffect(() => {
    setErr(false)
    facade.fetchAny(
        "http://localhost:8080/jpareststarter/api/jokes",
        (data) => {
          setJokes(data);
          console.log(data)
          setErr(true);
        },
        true
      )
      
  }, []);

  if (noErr) {
    return (
      <div>
        {Object.entries(jokes).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}
