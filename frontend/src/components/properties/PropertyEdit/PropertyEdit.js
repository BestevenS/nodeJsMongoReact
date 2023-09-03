import AuthContext                                from  '../../../context/AuthContext';
import axiosInstance, { baseURL }                 from  '../../../axios/axiosConfig';
import                                                  './PropertyEdit.css';
import { useParams, useNavigate }                 from  'react-router-dom';
import { FaTrashAlt }                             from  'react-icons/fa';
import { useDropzone }                            from  'react-dropzone';
import React, { useState, useEffect, useContext } from  'react';

function PropertyEdit() {

  const { isAuthenticated, isAdmin }                              = useContext(AuthContext)
  const [property, setProperty]                                   = useState(null);
  const [successMessage, setSuccessMessage]                       = useState(null);
  const navigate                                                  = useNavigate();
  const [selectedPhotosForDeletion, setSelectedPhotosForDeletion] = useState([]);
  const { id }                                                    = useParams();
  

  const onDrop = async (acceptedFiles) => {
    try {
      const data = new FormData();
      acceptedFiles.forEach((file) => {
        data.append('photo', file);
      });
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axiosInstance.post(`/api/properties/${id}/photos`, data, config);
      setProperty({ ...property, photos: [...property.photos, response.data.filename] });
      // console.log('Response data:', response.data.filename);
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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

  const handleInputChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProperty({ ...property, [name]: checked });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      // First, delete selected photos
      for (let photo of selectedPhotosForDeletion) {
        await axiosInstance.delete(`/api/properties/${id}/photos/${photo}`, config);
      }

      const propertyData = { ...property };
      propertyData.photos = propertyData.photos.filter(photo => !selectedPhotosForDeletion.includes(photo)); // Remove photos before sending data to server
      await axiosInstance.put(`/api/properties/${id}`, propertyData);
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePhotoDelete = (photo) => {
    setSelectedPhotosForDeletion([...selectedPhotosForDeletion, photo]);
  }

  const handleCancelPhotoDelete = (photo) => {
    setSelectedPhotosForDeletion(selectedPhotosForDeletion.filter(p => p !== photo));
  }

  if (!isAuthenticated || !isAdmin) {
    return <div>You do not have permission to edit this property.</div>;
  }

  if (!property) {
    return <div>Loading...</div>;
  }

  const handleDeleteProperty = async () => {
    const confirmDelete = window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το ακίνητο;');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        // Delete the property from the database +
        // Delete property photos from the server
        await axiosInstance.delete(`/api/properties/${id}`, config);

        // Set success message and redirect to properties page
        setSuccessMessage('Το ακίνητο διαγράφηκε επιτυχώς!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/properties');
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    }
  };


  return (
    <div className="property-edit-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="property-edit-header">
        <h1 className="property-edit-title">Επεξεργασία Ακινήτου</h1>
        <button className="delete-button" type="button" onClick={handleDeleteProperty}>
          <FaTrashAlt className="delete-icon" />
          Διαγραφή
        </button>
      </div>
      <form className="property-edit-form" onSubmit={handleFormSubmit}>

        {/* text */}
        <label className="property-edit-label">
          Τίτλος:
          <input className="property-edit-input" type="text" name="title" value={property.title} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Περιγραφή:
          <textarea className="property-edit-textarea" name="description" value={property.description} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Τιμή:
          <input className="property-edit-input" type="text" name="price" value={property.price} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Κατάσταση:
          <select className="property-edit-select" name="status" value={property.status} onChange={handleInputChange}>
            <option value="for sale">Για πώληση</option>
            <option value="for rent">Για ενοικίαση</option>
            <option value="sold">Πωλημένο</option>
            <option value="rented">Ενοικιασμένο</option>
          </select>
        </label>
        <label className="property-edit-label">
          Τοποθεσία:
          <input className="property-edit-input" type="text" name="location" value={property.location} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Τύπος Ακινήτου:
          <input className="property-edit-input" type="text" name="type" value={property.type} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Τετραγωνικά Μέτρα:
          <input className="property-edit-input" type="text" name="sqMeters" value={property.sqMeters} onChange={handleInputChange} />
        </label>

        <label className="property-edit-label">
          Ενεργειακή κλάση:
          <input className="property-edit-input" type="text" name="energyClass" value={property.energyClass} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Σύστημα θέρμανσης:
          <input className="property-edit-input" type="text" name="heatingSystem" value={property.heatingSystem} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Ανακαίνιση:
          <input className="property-edit-input" type="text" name="renovationStatus" value={property.renovationStatus} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Σύνδεσμος YouTube:
          <input className="property-edit-input" type="text" name="youtubeLink" value={property.youtubeLink} onChange={handleInputChange} />
        </label>

        {/* number */}
        <label className="property-edit-label">
          Όροφος:
          <input className="property-edit-input" type="number" name="floor" value={property.floor} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Υπνοδωμάτια:
          <input className="property-edit-input" type="number" name="bedrooms" value={property.bedrooms} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Κουζίνες:
          <input className="property-edit-input" type="number" name="kitchens" value={property.kitchens} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Μπάνια:
          <input className="property-edit-input" type="number" name="bathrooms" value={property.bathrooms} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Τουαλέτες:
          <input className="property-edit-input" type="number" name="wc" value={property.wc} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Σαλόνια:
          <input className="property-edit-input" type="number" name="livingRooms" value={property.livingRooms} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Έτος κατασκευής:
          <input className="property-edit-input" type="number" name="constructionYear" value={property.constructionYear} onChange={handleInputChange} />
        </label>
        <label className="property-edit-label">
          Απόσταση από τη θάλασσα(km):
          <input className="property-edit-input" type="number" name="distanceFromSea" value={property.distanceFromSea} onChange={handleInputChange} />
        </label>

        {/* true/false */}
        <label className="property-edit-label">
          Αποθήκη:
          <input className="property-edit-checkbox" type="checkbox" name="storage" checked={property.storage} onChange={handleCheckboxChange} />
        </label>
        <label className="property-edit-label">
          Σοφίτα:
          <input className="property-edit-checkbox" type="checkbox" name="attic" checked={property.attic} onChange={handleCheckboxChange} />
        </label>
        <label className="property-edit-label">
          Playroom:
          <input className="property-edit-checkbox" type="checkbox" name="playroom" checked={property.playroom} onChange={handleCheckboxChange} />
        </label>
        <label className="property-edit-label">
          Κλιματισμός:
          <input className="property-edit-checkbox" type="checkbox" name="airConditioning" checked={property.airConditioning} onChange={handleCheckboxChange} />
        </label>
        <label className="property-edit-label">
          Ηλιακός Θερμοσίφωνας:
          <input className="property-edit-checkbox" type="checkbox" name="solarWaterHeater" checked={property.solarWaterHeater} onChange={handleCheckboxChange} />
        </label>
        <label className="property-edit-label">
          Ενδοδαπέδια θέρμανση:
          <input className="property-edit-checkbox" type="checkbox" name="underfloorHeating" checked={property.underfloorHeating} onChange={handleCheckboxChange} />
        </label>
        <label className="property-edit-label">
          Ανελκυστήρας:
          <input className="property-edit-checkbox" type="checkbox" name="elevator" checked={property.elevator} onChange={handleCheckboxChange} />
        </label>
        <label className="property-edit-label">
          Επιπλομένο:
          <input className="property-edit-checkbox" type="checkbox" name="furnished" checked={property.furnished} onChange={handleCheckboxChange} />
        </label>
        <label className="property-edit-label">
          Κατοικίδια:
          <input className="property-edit-checkbox" type="checkbox" name="petsAllowed" checked={property.petsAllowed} onChange={handleCheckboxChange} />
        </label>
        <label className="property-edit-label">
          Σίτες:
          <input className="property-edit-checkbox" type="checkbox" name="screens" checked={property.screens} onChange={handleCheckboxChange} />
        </label>
        <label className="property-edit-label">
          Τζάκι:
          <input className="property-edit-checkbox" type="checkbox" name="fireplace" checked={property.fireplace} onChange={handleCheckboxChange} />
        </label>
        <label className="property-edit-label">
          Δημοσιοποίηση:
          <input className="property-edit-checkbox" type="checkbox" name="visibility" checked={property.visibility} onChange={handleCheckboxChange} />
        </label>

        <div className="property-dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Μπορείς να αφήσεις τη φωτογραφία για την προσθήκη της...</p> :
              <p>Σε αυτό το πλαίσιο σέρνεις και αφήνεις τις νέες φωτογραφίες</p>
          }
        </div>
        <div className=".property-photos-grid">
          {property.photos.map((photo, index) => (
            <div className="property-photo" key={index}>
              <img className="property-image" src={`${baseURL}/uploads/${photo}`} alt="Property" />
              {selectedPhotosForDeletion.includes(photo) ? (
                <button className="btn cancel-delete-btn" type="button" onClick={() => handleCancelPhotoDelete(photo)}>
                  Ακύρωση διαγραφής
                </button>
              ) : (
                <button className="btn delete-btn" type="button" onClick={() => handlePhotoDelete(photo)}>
                  <FaTrashAlt className="delete-icon" />
                  Διαγραφή
                </button>
              )}
            </div>
          ))}
        </div>
        <button className="btn submit-btn" type="submit">Αποθήκευση αλλαγών</button>
      </form>
    </div>
  );
}

export default PropertyEdit;