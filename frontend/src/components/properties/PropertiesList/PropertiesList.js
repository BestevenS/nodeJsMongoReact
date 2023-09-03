import React, { useEffect, useState, useContext } from "react";
import PropertyCard from "./PropertyCard";
import { useLocation, Link } from "react-router-dom";
import "./PropertiesList.css";
import axiosInstance from "../../../axios/axiosConfig";
import AuthContext from "../../../context/AuthContext";

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const authContext = useContext(AuthContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);

        const propertyType = searchParams.get('type');
        const status = searchParams.get('status');
        const locationQuery = searchParams.get('location');

        const priceTo = parseInt(searchParams.get('priceTo'));
        const priceFrom = parseInt(searchParams.get('priceFrom'));

        const sqMetersTo = parseInt(searchParams.get('sqMetersTo'));
        const sqMetersFrom = parseInt(searchParams.get('sqMetersFrom'));

        const response = await axiosInstance.get("/api/properties");

        // Αν ο χρήστης είναι διαχειριστής, προβάλλουμε όλα τα ακίνητα.
        // Διαφορετικά, προβάλλουμε μόνο τα ακίνητα με visibility === true
        let filteredProperties = authContext.isAdmin
          ? response.data
          : response.data.filter(property => property.visibility === true);

        if (status) {
          filteredProperties = filteredProperties.filter(property => property.status === status);
        }
        if (propertyType) {
          if (propertyType === "Λοιπά") { // Αν το propertyType είναι "Λοιπά"
            filteredProperties = filteredProperties.filter(
              property => !["Κατοικία", "Επαγγελματικό", "Γη"].includes(property.type)
            );
          } else {
            filteredProperties = filteredProperties.filter(property => property.type === propertyType);
          }
        }
        if (locationQuery) {
          filteredProperties = filteredProperties.filter(property => property.location === locationQuery);
        }

        if (priceTo) {
          filteredProperties = filteredProperties.filter(property => property.price <= priceTo);
        }
        if (priceFrom) {
          filteredProperties = filteredProperties.filter(property => property.price >= priceFrom);
        }

        if (sqMetersTo) {
          filteredProperties = filteredProperties.filter(property => property.sqMeters <= sqMetersTo);
        }
        if (sqMetersFrom) {
          filteredProperties = filteredProperties.filter(property => property.sqMeters >= sqMetersFrom);
        }

        setProperties(filteredProperties);
      } catch (err) {
        console.error("Error fetching properties: ", err);
      }
    };

    fetchData();
  }, [location, authContext.isAdmin]);


  return (
    <div className="container-properties">
      {authContext.isAdmin && (
        <Link to="/add-property">
          <button className="add-property-btn"><i className="fa fa-plus"></i> Προσθήκη νέου</button>
        </Link>
      )}

      {properties.length === 0 ? (
        <p>Δεν βρέθηκαν ακίνητα με τα δεδομένα κριτήρια. Παρακαλώ αλλάξτε τα φίλτρα σας!</p>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <Link to={`/properties/${property._id}`} key={property._id} className="property-link">
              <PropertyCard property={property} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertiesList;
