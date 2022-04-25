import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.header__brand}>Finding Falcone</span>
      <nav className={styles.header__nav}>
        <ul className={styles.header__navItems}>
          <li className={styles.header__navItem}>
            <NavLink to="/reset" className={styles.link}>
              <FontAwesomeIcon icon={faRefresh} className={styles.mobileIcon} />
              <span className={styles.actionItem__text}>Reset</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
