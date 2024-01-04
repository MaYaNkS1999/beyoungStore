import heroBanner1 from "../assets/hero-baner-1.jpg";
import heroBanner2 from "../assets/hero-baner-2.jpg";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";

const HeroComponent= ()=>{
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <div>
            <Slider {...settings} className="mb-10">
                <img  src={heroBanner1} alt="hero-banner" />
                <img  src={heroBanner2} alt="hero-banner" />
            </Slider>
        </div>
    )
}

export default HeroComponent;