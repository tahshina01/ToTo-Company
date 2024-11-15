import BackgroundVideo from "./Components/BackgroundVideo";
import Carousel from "../components/Carousel";
import Explore from "./Components/explore";
import Footer from "./Components/Footer";

export default function Home() {
  return (
    <div className="bg-[#333]">
      <BackgroundVideo />
      <Carousel />
      <Explore />
      <Footer />
    </div>
  );
}
