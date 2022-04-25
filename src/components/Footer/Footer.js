import config from '../../config';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>
        Coding problem from <a href={config.GEEKTRUST_URL}>GeekTrust</a>
      </span>
    </footer>
  );
};

export default Footer;
