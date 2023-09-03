import React, { useState, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import { useDropzone } from 'react-dropzone';
import axiosInstance from '../../../axios/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './AddProperty.css';

function AddProperty() {
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin } = useContext(AuthContext);

    const [newProperty, setNewProperty] = useState({
        title: '',
        description: '',
        price: '',
        status: 'for sale',
        location: '',
        type: '',
        sqMeters: '',
        photos: [],
        videos: [],

        floor: null,
        bedrooms: null,
        kitchens: null,
        bathrooms: null,
        wc: null,
        livingRooms: null,
        storage: false,
        attic: false,
        playroom: false,
        energyClass: "",
        heatingSystem: "",
        airConditioning: false,
        solarWaterHeater: false,
        underfloorHeating: false,
        elevator: false,
        renovationStatus: "",
        furnished: false,
        petsAllowed: false,
        screens: false,
        fireplace: false,
        constructionYear: null,
        distanceFromSea: null,
        propertyCode: null,
        youtubeLink: "",
        visibility: true
    });

    const [filesToUpload, setFilesToUpload] = useState([]);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFilesToUpload([acceptedFiles[acceptedFiles.length - 1]]);
        }
    };


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleInputChange = (e) => {
        setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
    };

    const handleDelete = (indexToDelete) => {
        setFilesToUpload(files => files.filter((_, index) => index !== indexToDelete));
    };

    const handleCheckboxChange = (e) => {
        setNewProperty({ ...newProperty, [e.target.name]: e.target.checked });
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

            const response = await axiosInstance.post(`/api/properties`, newProperty, config);
            const newPropertyId = response.data._id;

            const photoData = new FormData();
            filesToUpload.forEach((file) => {
                photoData.append('photo', file);
            });

            const photoConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            await axiosInstance.post(`/api/properties/${newPropertyId}/photos`, photoData, photoConfig);

            navigate(-1);
        } catch (err) {
            console.error(err);
        }
    };

    if (!isAuthenticated || !isAdmin) {
        return <div>You do not have permission to add a property.</div>;
    }

    return (
        <div className='property-add-container'>
            <h1 className="property-add-title">Προσθήκη Ακινήτου</h1>
            <form className="property-add-form" onSubmit={handleFormSubmit}>
                <label className="property-edit-label">
                    Τίτλος:
                    <input className="property-edit-input" type="text" name="title" value={newProperty.title} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Περιγραφή:
                    <textarea className="property-edit-textarea" name="description" value={newProperty.description} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Τιμή:
                    <input className="property-edit-input" type="number" name="price" value={newProperty.price} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Τρέχουσα Κατάσταση:
                    <select className="property-edit-select" name="status" value={newProperty.status} onChange={handleInputChange}>
                        <option value="for sale">Για πώληση</option>
                        <option value="for rent">Για ενοικίαση</option>
                        <option value="sold">Πωλημένο</option>
                        <option value="rented">Ενοικιασμένο</option>
                    </select>
                </label>
                <label className="property-edit-label">
                    Τοποθεσία:
                    <input className="property-edit-input" type="text" name="location" value={newProperty.location} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Τύπος Ακινήτου:
                    <input className="property-edit-input" type="text" name="type" value={newProperty.type} onChange={handleInputChange} />
                </label>
                {/* Numbers */}
                <label className="property-edit-label">
                    Τετραγωνικά Μέτρα:
                    <input className="property-edit-input" type="number" name="sqMeters" value={newProperty.sqMeters} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Έτος κατασκευής:
                    <input className="property-edit-input" type="number" name="constructionYear" value={newProperty.constructionYear === null ? '' : newProperty.constructionYear} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Απόσταση από τη θάλασσα σε χιλιόμετρα(km):
                    <input className="property-edit-input" type="number" name="distanceFromSea" value={newProperty.distanceFromSea === null ? '' : newProperty.distanceFromSea} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Κωδικός Ακινήτου:
                    <input className="property-edit-input" type="number" name="propertyCode" value={newProperty.propertyCode === null ? '' : newProperty.propertyCode} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Όροφος:
                    <input className="property-edit-input" type="number" name="floor" value={newProperty.floor === null ? '' : newProperty.floor} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Υπνοδωμάτια:
                    <input className="property-edit-input" type="number" name="bedrooms" value={newProperty.bedrooms === null ? '' : newProperty.bedrooms} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Κουζίνες:
                    <input className="property-edit-input" type="number" name="kitchens" value={newProperty.kitchens === null ? '' : newProperty.kitchens} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Μπάνια:
                    <input className="property-edit-input" type="number" name="bathrooms" value={newProperty.bathrooms === null ? '' : newProperty.bathrooms} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Τουαλέτες:
                    <input className="property-edit-input" type="number" name="wc" value={newProperty.wc === null ? '' : newProperty.wc} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Σαλόνια:
                    <input className="property-edit-input" type="number" name="livingRooms" value={newProperty.livingRooms === null ? '' : newProperty.livingRooms} onChange={handleInputChange} />
                </label>

                <label className="property-edit-label">
                    Ενεργειακή κλάση:
                    <input className="property-edit-input" type="text" name="energyClass" value={newProperty.energyClass} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Σύστημα θέρμανσης:
                    <input className="property-edit-input" type="text" name="heatingSystem" value={newProperty.heatingSystem} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Ανακαίνιση:
                    <input className="property-edit-input" type="text" name="renovationStatus" value={newProperty.renovationStatus} onChange={handleInputChange} />
                </label>
                <label className="property-edit-label">
                    Youtube Video:
                    <input className="property-edit-input" type="text" name="youtubeLink" value={newProperty.youtubeLink} onChange={handleInputChange} />
                </label>

                <label className="property-edit-label">
                    Αποθήκη:
                    <input type="checkbox" name="storage" checked={newProperty.storage} onChange={handleCheckboxChange} />
                </label>
                <label className="property-edit-label">
                    Σοφίτα:
                    <input type="checkbox" name="attic" checked={newProperty.attic} onChange={handleCheckboxChange} />
                </label>
                <label className="property-edit-label">
                    Playroom:
                    <input type="checkbox" name="playroom" checked={newProperty.playroom} onChange={handleCheckboxChange} />
                </label>
                <label className="property-edit-label">
                    Κλιματισμός:
                    <input type="checkbox" name="airConditioning" checked={newProperty.airConditioning} onChange={handleCheckboxChange} />
                </label>
                <label className="property-edit-label">
                    Ηλιακός Θερμοσίφωνας:
                    <input type="checkbox" name="solarWaterHeater" checked={newProperty.solarWaterHeater} onChange={handleCheckboxChange} />
                </label>
                <label className="property-edit-label">
                    Ενδοδαπέδια θέρμανση:
                    <input type="checkbox" name="underfloorHeating" checked={newProperty.underfloorHeating} onChange={handleCheckboxChange} />
                </label>
                <label className="property-edit-label">
                    Ασανσέρ:
                    <input type="checkbox" name="elevator" checked={newProperty.elevator} onChange={handleCheckboxChange} />
                </label>
                <label className="property-edit-label">
                    Επιπλομένο:
                    <input type="checkbox" name="furnished" checked={newProperty.furnished} onChange={handleCheckboxChange} />
                </label>
                <label className="property-edit-label">
                    Κατοικίδια:
                    <input type="checkbox" name="petsAllowed" checked={newProperty.petsAllowed} onChange={handleCheckboxChange} />
                </label>
                <label className="property-edit-label">
                    Σίτες:
                    <input type="checkbox" name="screens" checked={newProperty.screens} onChange={handleCheckboxChange} />
                </label>
                <label className="property-edit-label">
                    Τζάκι:
                    <input type="checkbox" name="fireplace" checked={newProperty.fireplace} onChange={handleCheckboxChange} />
                </label>
                <label className="property-edit-label">
                    Δημοσιοποίηση:
                    <input type="checkbox" name="visibility" checked={newProperty.visibility} onChange={handleCheckboxChange} />
                </label>
                {filesToUpload.length === 0 ? (
                    <div {...getRootProps()} className="property-dropzone">
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>Μπορείς να αφήσεις τη φωτογραφία για την προσθήκη της...</p> :
                                <p>Σε αυτό το πλαίσιο σέρνεις και αφήνεις τη νέα φωτογραφία</p>
                        }
                    </div>
                ) : (
                    <div>
                        <p>Στη σελίδα δημιουργίας μπορείται να ανεβάσετε μόνο τη βασική φωτογραφία,
                            αφού τελειώσετε με τη δημιουργία μπορείτε να πάτε στη σελίδα τροποποίησης
                            για να προσθέσετε όσες θέλετε</p>
                    </div>
                )}

                {filesToUpload.map((file, index) => (
                    <div key={index} className="property-photo">
                        <img className="property-image" src={URL.createObjectURL(file)} alt="To be uploaded" />
                        <button className="btn delete-btn" onClick={() => handleDelete(index)}>Διαγραφή</button>
                    </div>
                ))}
                <button className="btn submit-btn" type="submit">Αποθήκευση</button>
            </form>

        </div>
    );
}

export default AddProperty;
