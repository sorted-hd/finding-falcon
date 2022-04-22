import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <span className={styles.header__text}>Finding Falcone!</span>
      <div className={styles.header__action}>
        <button className={styles.header__actionBtn}>
          <span>Reset</span>
        </button>
        <span>|</span>
        <button className={styles.header__actionBtn}>
          <span>GeekTrust Home</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
