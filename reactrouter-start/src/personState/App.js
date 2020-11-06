import react, { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonsTable from "./personsTable";
import AddPerson from "./AddPerson";
import { v1 as uuid } from "uuid";

function App() {
  const intArray = [
    { name: "Marc", id: uuid() },
    { name: "Mads", id: uuid() },
  ];

  const [persons, setPersons] = useState(intArray);
  const [newPerson, setNewPerson] = useState({ name: "", id: "" });

  const editPerson = (person) => {
    setNewPerson({ ...person });
  };
  const deletePerson = (id) => {
    let personToDelete = persons.find((p) => p.id === id);
    console.log(personToDelete)
    let index = persons.indexOf(personToDelete)
    if(index > -1) persons.splice(index,1)
    setPersons([...persons])
  };

  const addPerson = (person) => {
    console.log(person)
    if (person.id === "") {
      // id=-1 Indicates a new object
      person.id = uuid();
      persons.push(person);
    } else {
      //if id != "", it's an existing todo. Find it and add changes
      let personToEdit = persons.find((p) => p.id === person.id);
      console.log(personToEdit);
      personToEdit.name = person.name;
    }
    setPersons([...persons]);
    setNewPerson({ name: "", id: "" });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: 25 }}>
        Props and Lifting State Demo
      </h2>

      <h3>Total Persons: {persons.length}</h3>

      <div className="row">
        <div className="col-6 allTodos">
          <PersonsTable
            persons={persons}
            editPerson={editPerson}
            deletePerson={deletePerson}
          />
        </div>
        <div className="col-5 new-todo">
          <AddPerson addPerson={addPerson} newPerson={newPerson} />
        </div>
      </div>
    </div>
  );
}

export default App;
