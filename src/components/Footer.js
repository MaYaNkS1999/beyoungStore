import {Link, useNavigate} from "react-router-dom";
import { Divider} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Footer = () => {
  
  return (
    <div className="bg-black text-white w-full py-5 px-4">
      <div className="flex justify-around flex-wrap w-10/12 m-auto">
        <div className="flex flex-col gap-2 m-4">
          <h4 className="text-yellow-400 text-xl font-bold">NEED HELP</h4>
          <Link to="/error">Contact Us</Link>
          <Link to="/error">Track Order</Link>
          <Link to="/error">Returns & Refunds</Link>
          <Link to="/error">FAQ's</Link>
          <Link to="/error">Career</Link>
        </div>
        <div className="flex flex-col gap-2 m-4">
          <h4 className="text-yellow-400 text-xl font-bold">COMPANY</h4>
          <Link to="/error">About Us</Link>
          <Link to="/error">Beyoung Blog</Link>
          <Link to="/error">Beyoungistan</Link>
          <Link to="/error">Collabration</Link>
          <Link to="/error">Media</Link>
        </div>
        <div className="flex flex-col gap-2 m-4">
          <h4 className="text-yellow-400 text-xl font-bold">MORE INFO</h4>
          <Link to="/error">Term and Condition</Link>
          <Link to="/error">Privacy Policy</Link>
          <Link to="/error">Shipping Policy</Link>
          <Link to="/error">Sitemap</Link>
        </div>
        <div className="flex flex-col gap-2 m-4">
          <h4 className="text-yellow-400 text-xl font-bold">LOCATION</h4>
          <p>support@beyoung.in</p>
          <p>Eklingpura Chouraha, Ahmedabad Main Road</p>
          <p>(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</p>
        </div>
      </div>
      <div className="pt-2">
        <Divider style={{width:"80%",margin:"auto",backgroundColor:"white"}}/>
        <Accordion style={{ backgroundColor: "transparent", color: "white",width:"80%", margin:"auto"}}>
          <AccordionSummary aria-controls="panel1a-content"
            id="panel1a-header" expandIcon={<ExpandMoreIcon style={{ color: "#F8EA49" }}/>} style={{ margin: 0, padding: 0,color:"#F8EA49",fontWeight:"bold",fontSize:"25px" }}><h4>WHY CHOOSE US?</h4></AccordionSummary>
          <AccordionDetails className="bg-black text-white">
            <p>Online Shopping Site <br />
              India's Best Online Shopping Site for Fashion and Lifestyle <br />
              Started in 2018, Beyoung is the Best Site for online shopping in
              India when it comes to a vast collection of men's and women's
              fashion. The latest trends and styles are showcased here, yes at
              your favorite online fashion store. Well, if fashion is medicine,
              then Be Young is the chemist shop where you can do your online
              shopping for fashion with ease. Nothing to brag about, but we are
              the classic blend of 'Creativity' and 'Style'. Get The Young Out
              with Beyoung, our slogan says a lot about us. Our website is
              filled with the cool outfits that you always crave. Indeed, online
              shopping for women and men at Beyoung is hassle-free that in just
              a few clicks, one can purchase whatever he/she wants. A one-stop
              destination for all your shopping needs, Beyoung caters to each
              taste and need of every personality. The premium quality,
              affordable style, and trending graphics go into the making of our
              vast collection of men's and Women's Clothing. So, go ahead and
              indulge with India's best online shopping website for fashion. To
              know more about us, scroll below!</p>
          </AccordionDetails>
        </Accordion>
        <Divider style={{width:"80%",margin:"auto",backgroundColor:"white"}}/>
        <Accordion style={{ backgroundColor: "transparent", color: "white",width:"80%", margin:"auto"}}>
          <AccordionSummary aria-controls="panel1a-content"
            id="panel1a-header" expandIcon={<ExpandMoreIcon style={{ color: "#F8EA49" }}/>} style={{ margin: 0, padding: 0,color:"#F8EA49",fontWeight:"bold",fontSize:"25px" }}><h4>POPULAR CATEGORIES</h4></AccordionSummary>
          <AccordionDetails className="bg-black text-white">
          <p>
              Topwear: Half Sleeve T-Shirts | Full Sleeve T-Shirts | Men's
              Shirts | Printed T-Shirts | Plain T-Shirts | Polo T-Shirts | Plus
              Size T-Shirts | Combos <br />
              Theme Based T Shirts: Ipl T Shirts | Men's Travel T-shirts | Gym T
              Shirts | Quotes T Shirt | Cartoon T Shirt | Entrepreneur T-Shirts
              | Student T Shirts | Funky T Shirts <br />
              Winter Collection: Hoodies for Men | Sweatshirts for Men | Jackets
              for Men
            </p>
          </AccordionDetails>
        </Accordion>
        <Divider style={{width:"80%",margin:"auto",backgroundColor:"white"}}/>
       

      </div>
      <div className="text-center my-5">
        <p>Copyright © 2023 Beyoung Folks Pvt Ltd. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
