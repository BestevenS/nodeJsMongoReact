import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../../../context/AuthContext';
import axiosInstance, { baseURL } from '../../../axios/axiosConfig';
import { useParams, Link } from 'react-router-dom';
import './PropertyDetails.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faTwitter, faWhatsapp, faViber, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

function PropertyDetails() {
  const authContext = useContext(AuthContext);
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  
  const formatNumber = (number) => {
    return number.toLocaleString('de-DE');
  };

  const goToNextImage = useCallback(() => {
    if (currentImageIndex < property.photos.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  }, [currentImageIndex, property]);

  const goToPrevImage = useCallback(() => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  }, [currentImageIndex]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axiosInstance.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isModalOpen) {
        switch (event.key) {
          case 'ArrowRight':
            goToNextImage();
            break;
          case 'ArrowLeft':
            goToPrevImage();
            break;
          case 'Escape':
            closeModal();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, goToNextImage, goToPrevImage]);

  const openModal = (index) => {
    setIsModalOpen(true);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(null);
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  // with this counter we know if one or more of the features are true
  let featureCounter = 0;
  if (property.solarWaterHeater) featureCounter++;
  if (property.underfloorHeating) featureCounter++;
  if (property.elevator) featureCounter++;
  if (property.airConditioning) featureCounter++;
  if (property.furnished) featureCounter++;
  if (property.playroom) featureCounter++;
  if (property.storage) featureCounter++;
  if (property.attic) featureCounter++;
  if (property.screens) featureCounter++;
  if (property.fireplace) featureCounter++;

  return (
    <div className="property-details">
      <div className="property-photos">
        {property.photos && property.photos.map((photo, index) => (
          <img
            src={`${baseURL}/uploads/${photo}`}
            alt={`Property ${property.name}`}
            key={index}
            onClick={() => openModal(index)}
          />
        ))}
      </div>
      {isModalOpen && (
        <div className="image-modal">
          <span className="close" onClick={closeModal}>&times;</span>
          {currentImageIndex > 0 && <span className="prev" onClick={goToPrevImage}>&#10094;</span>}
          <img src={`${baseURL}/uploads/${property.photos[currentImageIndex]}`} alt={`Property ${property.name}`} />
          {currentImageIndex < property.photos.length - 1 && <span className="next" onClick={goToNextImage}>&#10095;</span>}
        </div>
      )}

        {/* <div className="social-share-buttons">
          <a href={encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href={encodeURI(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${property.title}`)} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href={encodeURI(`https://web.whatsapp://send?text=${property.title} - ${window.location.href}`)} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a href={encodeURI(`viber://forward?text=${property.title} - ${window.location.href}`)} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faViber} />
          </a>
          <a href={encodeURI(`fb-messenger://share?link=${window.location.href}&app_id=<YOUR_APP_ID>`)} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebookMessenger} />
          </a>
        </div> */}




      {property.youtubeLink && (
        <div className="youtube-video-container">
          <iframe
            src={`https://www.youtube.com/embed/${property.youtubeLink.split('v=')[1]}`}
            allowFullScreen
            title="Embedded youtube"
          ></iframe>
        </div>
      )}

      <h1>{property.title}</h1>
      <p className='price'>Tιμή: {formatNumber(property.price)}</p>
      <p>Τοποθεσία: {property.location}</p>
      <p>Περιγραφή: {property.description}</p>
      <p className='status'>Κατάσταση: {property.status}</p>
      <p>Τύπος Ακινήτου: {property.type}</p>
      <p className="with-edit-btn">
        Τετραγωνικά Μέτρα: {property.sqMeters}
        {authContext.isAdmin && (
          <Link className="edit-btn" to={`/properties/${property._id}/edit`}>Επεξεργασία</Link>
        )}
      </p>

      <p>Απόσταση από τη Θάλασσα: {property.distanceFromSea !== null ? `${property.distanceFromSea} μέτρα` : "Δεν υπάρχει πληροφορία"}</p>
      <p>Σύστημα Θέρμανσης: {property.heatingSystem || "Δεν υπάρχει πληροφορία"}</p>
      <p>Έτος Κατασκευής: {property.constructionYear !== null ? property.constructionYear : "Δεν υπάρχει πληροφορία"}</p>
      <p>Ενεργειακή Κλάση: {property.energyClass || "Δεν υπάρχει πληροφορία"}</p>
      <p>Κωδικός Ακινήτου: {property.propertyCode !== null ? property.propertyCode : "Δεν υπάρχει πληροφορία"}</p>
      <p>Υπνοδωμάτια: {property.bedrooms !== null ? property.bedrooms : "Δεν υπάρχει πληροφορία"}</p>
      <p>Όροφος: {property.floor !== null ? property.floor : "Δεν υπάρχει πληροφορία"}</p>
      <p>Κουζίνες: {property.kitchens !== null ? property.kitchens : "Δεν υπάρχει πληροφορία"}</p>
      <p>Σαλόνια: {property.livingRooms !== null ? property.livingRooms : "Δεν υπάρχει πληροφορία"}</p>
      <p>Μπάνια: {property.bathrooms !== null ? property.bathrooms : "Δεν υπάρχει πληροφορία"}</p>
      <p>WC: {property.wc !== null ? property.wc : "Δεν υπάρχει πληροφορία"}</p>
      {property.renovationStatus && <p>Κατάσταση Ανακαίνισης: {property.renovationStatus}</p>}
      {property.petsAllowed && <p>Επιτρέπονται Κατοικίδια</p>}
      {featureCounter > 0 && <><h2>Περιλαμβάνονται επίσης</h2></>}
      {property.solarWaterHeater && <p>Ηλιακός Θερμοσίφωνας</p>}
      {property.underfloorHeating && <p>Ενδοδαπέδια Θέρμανση</p>}
      {property.elevator && <p>Ανελκυστήρας</p>}
      {property.airConditioning && <p>Κλιματισμός</p>}
      {property.furnished && <p>Έπιπλα</p>}
      {property.playroom && <p>Playroom</p>}
      {property.storage && <p>Αποθήκη</p>}
      {property.attic && <p>Σοφίτα</p>}
      {property.screens && <p>Σίτες</p>}
      {property.fireplace && <p>Τζάκι</p>}
    </div>
  );
}

export default PropertyDetails;
