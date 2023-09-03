import './Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import TipsImage from '../../assets/tips.jpg';
import ChairsImage from '../../assets/keys.jpg';
import AboutUsImage from '../../assets/about-us.jpg';
import { useState, useEffect, useCallback } from 'react';

const Home = () => {
  const { register, getValues } = useForm();
  const [statusFilter, setStatusFilter] = useState('');
  const [searchLink, setSearchLink] = useState('/properties');
  const [selectedButton, setSelectedButton] = useState('');

  const buildLink = useCallback((status) => {
    const data = getValues();
    let queryParams = new URLSearchParams();

    for (let key in data) {
      if (data[key] && data[key] !== "") {
        queryParams.append(key, data[key]);
      }
    }

    if (statusFilter) {
      queryParams.append("status", statusFilter);
    }

    return `/properties?${queryParams.toString()}`;
  }, [getValues, statusFilter]);

  const handleForSaleClick = () => {
    setStatusFilter('for sale');
    setSelectedButton('for sale');
  };

  const handleForRentClick = () => {
    setStatusFilter('for rent');
    setSelectedButton('for rent');
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    setSearchLink(buildLink());
  }, [buildLink]);

  return (
    <>
      <div className='home-page'>
        <img className="hero-image" src={ChairsImage} alt="Chairs" />
        <div className='content'>
          <h1>AndraxEstate</h1>

          <form className="filters-form" onChange={() => setSearchLink(buildLink())}>
            <div className="filters">
              <select defaultValue="" {...register("type")}>
                <option value="" disabled>      Επιλογή κατηγορίας  </option>
                <option value="Κατοικία">       Κατοικία            </option>
                <option value="Επαγγελματικό">  Επαγγελματικό       </option>
                <option value="Γη">             Γη                  </option>
                <option value="Λοιπά">          Λοιπά ακίνητα       </option>
              </select>
              <input type="text" placeholder="Περιοχή"                 {...register("location")} />
              <input type="number" placeholder="Τιμή από"                {...register("priceFrom")} />
              <input type="number" placeholder="Τιμή εώς"                {...register("priceTo")} />
              <input type="number" placeholder="Εμβαδόν από (m&#178;)"   {...register("sqMetersFrom")} />
              <input type="number" placeholder="Εμβαδόν εώς (m&#178;)"   {...register("sqMetersTo")} />
            </div>
          </form>

          <div className='actions'>
            <button type="button"
              className={`btn ${selectedButton === 'for sale' ? 'btn-selected' : 'btn-primary'}`}
              onClick={handleForSaleClick}>Αγορά</button>
            <button type="button"
              className={`btn ${selectedButton === 'for rent' ? 'btn-selected' : 'btn-primary'}`}
              onClick={handleForRentClick}>Ενοικίαση</button>
          </div>
          <div className="search-button">
            <Link to={searchLink} className='btn'>Αναζήτηση</Link>
          </div>
        </div>
      </div>
      <div className='about-us' data-aos='fade-up'>
        <img className='about-us-image' src={AboutUsImage} alt='About Us' />
        <div className='about-us-content'>
          <h2>Σχετικά με εμάς</h2>
          <p>
            Η AndraxEstate είναι μια πρωτοπόρος εταιρεία στον χώρο των ακινήτων
            που προσφέρει ολοκληρωμένες υπηρεσίες. Βασιζόμαστε στην εμπειρία, την
            τεχνογνωσία και την προσωπική εξυπηρέτηση για να προσφέρουμε τις καλύτερες
            λύσεις στους πελάτες μας.
          </p>
        </div>
      </div>
      <div id='tips' className='about-us' data-aos='fade-right'>
        <div className='about-us-content'>
          <h2>Σύμβουλος Ακινήτων</h2>
          <p>
            Προσφέρουμε εξατομικευμένες συμβουλευτικές υπηρεσίες στον τομέα της ακίνητης περιουσίας,
            βοηθώντας σας να βρείτε την καλύτερη λύση για τις ανάγκες σας.
          </p>
        </div>
        <img src={TipsImage} className='tips-image' alt='About Us' />
      </div>

      <Footer />
    </>
  );
};

export default Home;
