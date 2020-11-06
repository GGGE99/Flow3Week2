const PersonsTable = (props) => {
  const { persons, editPerson, deletePerson } = props;

  return (
    <div>
        <h4>All Persons:</h4>

        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                </tr>
            </thead>
            <tbody>
                {persons.map(person => {
                    return(
                        <tr>
                            <td>{person.id}</td>
                            <td>{person.name}</td>
                            <td>
                                <a href="#" onClick={(e) => {e.preventDefault(); editPerson(person)}}>edit</a>
                                /
                                <a href="#" onClick={(e) => {e.preventDefault(); deletePerson(person.id)}}>delete</a>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
      {/* <ul>
          {persons.map(person => {
              return(
                  <li>{person}</li>
              )
          })}
      </ul> */}
    </div>
  );
};

export default PersonsTable
