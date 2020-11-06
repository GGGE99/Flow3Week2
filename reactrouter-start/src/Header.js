import { NavLink } from "react-router-dom";
const Header = (props) => {
    return(
        <ul className="header">
        <li>
        <NavLink exact activeClassName="selected" to="/">Home</NavLink>
        </li>
        <li>
        <NavLink exact activeClassName="selected" to="/about">About</NavLink>
        </li>
        <li>
        <NavLink exact activeClassName="selected" to="/dashboard">Dashboard</NavLink>
        </li>
      </ul>
    )
}
export default Header;