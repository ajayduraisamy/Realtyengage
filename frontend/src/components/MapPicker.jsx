import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Default marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MapPicker({ onSelectLocation, selectedLocation }) {
    const [position, setPosition] = useState(selectedLocation || null);

    function LocationMarker() {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                onSelectLocation({ lat, lng });
            },
        });

        return position ? <Marker position={position}></Marker> : null;
    }

    useEffect(() => {
        if (!position) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                    onSelectLocation({ lat: latitude, lng: longitude });
                },
                () => {
                    // Default fallback: Chennai
                    setPosition([13.0827, 80.2707]);
                    onSelectLocation({ lat: 13.0827, lng: 80.2707 });
                }
            );
        }
    }, []);

    return (
        <div className="h-64 rounded-xl overflow-hidden shadow-lg border border-blue-200">
            <MapContainer
                center={position || [13.0827, 80.2707]}
                zoom={13}
                scrollWheelZoom={true}
                className="h-full w-full z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </div>
    );
}
