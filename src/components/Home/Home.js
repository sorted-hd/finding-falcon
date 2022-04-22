import Dashboard from '../Dashboard';
import Footer from '../Footer';
import Header from '../Header';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default Home;
