import { Link, useNavigate } from 'react-router-dom';
import './AppNav.css';



const AppNav = (props) => {

    const navigate = useNavigate();

    return (
        <nav className="mainNav">
            {!props.usersBase && <li>
                <Link to="/">Rejestracja</Link>
            </li>}
            {!props.usersBase && <li>
                <Link to="/login">Logowanie</Link>
            </li>}
            {props.usersBase && <li>
                <Link to="/clientlist">Lista Klientów</Link>
            </li>}
            {props.usersBase && <li>
                <Link onClick={() => {
                    props.setUsersBase(null);
                    window.localStorage.clear();
                    navigate("/login");
                }}>Wyloguj</Link>
            </li>}

        </nav>
    );

}
export default AppNav;