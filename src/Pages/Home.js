import { Container } from 'react-bootstrap';
import Hero from '../Sections/Home/Hero';
import Latesttrailers from '../Sections/Home/LatestTrailer/Latesttrailers';
import PopularSection from '../Sections/Home/PopularSection';
import Trending from '../Sections/Home/Trending';
const Home = () => {


  return (
    <Container
      fluid
      className="p-0 hero-wrapper"
    >
      <Hero />
      <Container>
        <PopularSection />
        <Latesttrailers />
        <Trending />
      </Container>
    </Container >
  );
};

export default Home;