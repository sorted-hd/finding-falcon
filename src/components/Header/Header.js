import { faHome, faRefresh } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.header__brand}>Finding Falcone</span>
      <nav className={styles.header__nav}>
        <ul className={styles.header__navItems}>
          <li className={styles.header__navItem}>
            <button>
              <FontAwesomeIcon icon={faRefresh} className={styles.mobileIcon} />
              <span className={styles.actionItem__text}>Reset</span>
            </button>
          </li>
          <li className={styles.header__navItem}>
            <button>
              <FontAwesomeIcon icon={faHome} className={styles.mobileIcon} />
              <span className={styles.actionItem__text}>GeekTrust Home</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
