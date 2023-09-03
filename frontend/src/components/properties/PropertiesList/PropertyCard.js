import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { baseURL } from '../../../axios/axiosConfig';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CameraIcon from '@mui/icons-material/Camera';
import './PropertyCard.css';

function PropertyCard({ property }) {
    const imageUrl = property.photos && property.photos[0]
        ? `${baseURL}/uploads/${property.photos[0]}`
        : "path_to_default_image_if_needed";

    const photoCount = property.photos ? property.photos.length : 0;

    const formatNumber = (number) => {
        return number.toLocaleString('de-DE');
    };

    return (
        <Card className="card-root">
            <CardMedia
                component="div"
                style={{ backgroundImage: `url(${imageUrl})` }}
                className="card-media-root"
            >
                <div className="photo-overlay">
                    <CameraIcon className="camera-icon" />
                    <span>{photoCount}</span>
                </div>
            </CardMedia>
            <CardContent className="card-content-root">
                <Typography component="div" className="card-title">
                    {property.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="card-description">
                    {property.description}
                </Typography>
                <Typography variant="body2" className="card-type">
                    Τύπος ακινήτου: {formatNumber(property.type)}
                </Typography>
                <Typography variant="body2" className="card-price">
                    Τιμή: {formatNumber(property.price)}
                </Typography>
                <Typography variant="body2" className="card-location">
                    Τοποθεσία: {property.location}
                </Typography>
                <Typography variant="body2" className="card-area">
                    Τετραγωνικά Μέτρα: {property.sqMeters} m²
                </Typography>
                <Typography variant="body2" className="card-status">
                    Κατάσταση: {property.status}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default PropertyCard;
