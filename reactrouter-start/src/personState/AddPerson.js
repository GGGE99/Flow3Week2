import React, { useState, useEffect } from "react";

export default function AddPerson(props) {
  
  const [person, setPerson] = useState({...props.newPerson});

  const handleSubmit = (evt) => {
    if(person.name === "") return
    evt.preventDefault();
    props.addPerson(person);
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    person.name = value
    setPerson({ ...person});
  };

  useEffect(() => setPerson({ ...props.newPerson }), [props.newPerson]);

  return (
    <form onSubmit={handleSubmit} >
      <input className="form-control" id="id" placeholder="id" readOnly value={props.newPerson.id}/>
      <br />
      <input className="form-control" id="name" placeholder="Enter Name" value={person.name} onChange={handleChange}/>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <p>{person.name}</p>
    </form>
  );
}
