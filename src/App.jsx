import Hero from "./sections/Hero/Hero";
import Navbar from "./components/navbar";
import Second from "./sections/second/Second";
import Third from "./sections/third/Third";
import Fourth from "./sections/fourth/Fourth";

function App() {
  return (
    <>
      <Navbar />

      <Hero />

      <Second id="second-section" />

      <Third id="third-section" />

      <Fourth id="fourth-section" />
    </>
  );
}

export default App;
