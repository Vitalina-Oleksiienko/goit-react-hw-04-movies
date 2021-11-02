import { NavLink } from 'react-router-dom';
import s from './navigation.module.css';

export default function Navigation() { 
    return (
    <nav>
      <ul className={s.navList}>
        <li className={s.navItem}>
          <NavLink
            exact
            to="/"
            className={s.navLink}
            activeClassName={s.activeNavLink}
          >
            Home
          </NavLink>
        </li>
        <li className={s.navItem}>
          <NavLink
            to="/movies"
            className={s.navLink}
            activeClassName={s.activeNavLink}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}