import "./App.css";
import {
  Route,
  Switch,
  NavLink,
  Prompt,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import React, { useState } from "react";

function App({ bookFacade }) {
  const [loginStatus, setLoginStatus] = useState(getLoginStatus());

  function changeLoginStatus() {
    setLoginStatus(!loginStatus);
    localStorage.setItem("login", loginStatus);
  }
  return (
    <div>
      <Header loginStatus={loginStatus}/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/Products">
          <Products bookFacade={bookFacade} />
        </Route>
        <Route path="/add-book" children={<AddBook />}>
          <AddBook bookFacade={bookFacade} />
        </Route>
        <Route path="/Find-book">
          <FindBook bookFacade={bookFacade} />
        </Route>
        <Route path="/Company">
          <Company />
        </Route>
        <Route path="/Login">
          <Login changeLoginStatus={changeLoginStatus} loginStatus={loginStatus}/>
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function getLoginStatus() {
  return Boolean(localStorage.getItem("login"));
}

function Login({changeLoginStatus, loginStatus}) {
  return (
    <div>
      <h2>Login</h2>
      <br />
      {console.log(loginStatus)}
      {loginStatus ? (
        <button onClick={changeLoginStatus}>Login</button>
      ) : (
        <button onClick={changeLoginStatus}>Logout</button>
      )}
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>No Match</h2>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function AddBook({ bookFacade }) {
  const emptyBook = { id: "", title: "", info: "" };
  let [isBlocking, setIsBlocking] = useState(false);

  const [book, setBook] = useState({ ...emptyBook });
  const handleChange = (evt) => {
    const target = evt.target;
    const id = target.id;
    const value = target.value;
    handleBlock();
    // console.log(evt)

    setBook({ ...book, [id]: value });
  };

  function handleBlock() {
    let val1 = document.getElementById("title").value.length;
    let val2 = document.getElementById("info").value.length;
    setIsBlocking(val1 > 0 || val2 > 0);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    bookFacade.addBook(book);
    setBook({ ...emptyBook });
    setIsBlocking(false);
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <Prompt
          when={isBlocking}
          message={(location) =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
        <input
          placeholder="Add title"
          id="title"
          value={book.title}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Add info"
          id="info"
          value={book.info}
          onChange={handleChange}
        />
        <br />
        <button>Save</button>
      </form>
    </div>
  );
}

function Products({ bookFacade }) {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {bookFacade.getBooks().map((book) => {
          return (
            <li key={book.id}>
              {book.title}
              <NavLink to={`${url}/${book.id}`}>details</NavLink>
            </li>
          );
        })}
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a book. {path}</h3>
        </Route>
        <Route path={`${path}/:Id`}>
          <Detail bookFacade={bookFacade} />
        </Route>
      </Switch>
    </div>
  );
}

function Detail({ bookFacade }) {
  let { Id } = useParams();
  const book = bookFacade.findBook(Id);
  if (book === undefined) {
    return (
      <div style={{ border: 1 + "px solid black" }}>
        <p>Id {Id} is bot a book</p>
      </div>
    );
  } else {
    return (
      <div style={{ border: 1 + "px solid black" }}>
        <p>{book.title}</p>
        <p>{book.id}</p>
        <p>{book.info}</p>
      </div>
    );
  }
}

function Company() {
  return (
    <div>
      <h2>Company</h2>
    </div>
  );
}

function FindBook({ bookFacade }) {
  const [bookId, setbookId] = useState("");
  const [book, setBook] = useState({ id: "", title: "", info: "" });
  const [fail, setFail] = useState(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setbookId(value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let tempBook = {};
    tempBook = bookFacade.findBook(bookId);
    if (tempBook !== undefined) {
      setBook(tempBook);
      setbookId("");
    } else {
      setFail(true);
    }
  };

  const deleteBook = () => {
    bookFacade.deleteBook(book.id);
    setBook({ id: "", title: "", info: "" });
  };

  const handleEditChange = (evt) => {
    const target = evt.target;
    const id = target.id;
    const value = target.value;

    setBook({ ...book, [id]: value });
  };

  const handleEditSubmit = (evt) => {
    evt.preventDefault();
    bookFacade.editBook(book);
    setBook({ id: "", title: "", info: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter book id"
          value={bookId}
          onChange={handleChange}
        />
        <button>Find book</button>
      </form>
      {book.title !== "" ? (
        <React.Fragment>
          <br />
          <form onSubmit={handleEditSubmit}>
            <input id="id" readOnly value={book.id} />
            <br />
            <input id="title" value={book.title} onChange={handleEditChange} />
            <br />
            <input id="info" value={book.info} onChange={handleEditChange} />
            <br />
            <button>Edit Book</button>
          </form>
          <button onClick={deleteBook}>Delete Book</button>
        </React.Fragment>
      ) : fail ? (
        <p>der blev ikke fundet en bog med id {bookId}</p>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
}

function Header({loginStatus}) {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/products">
          Products
        </NavLink>
      </li>
      {loginStatus ? (
        <React.Fragment>
          <li>
            <NavLink activeClassName="active" to="/add-book">
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/Find-book">
              Find Book
            </NavLink>
          </li>
        </React.Fragment>
      ) : (
        <React.Fragment />
      )}

      <li>
        <NavLink activeClassName="active" to="/company">
          Company
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/Login">
          Login
        </NavLink>
      </li>
    </ul>
  );
}

export default App;
