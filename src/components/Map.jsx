import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const Map = ({ coords, handleMapClick }) => {
    const { lat, lon } = coords
    return (
        <MapContainer
            center={[lat, lon]}
            zoom={5}
            style={{ width: "100wv", height: "500px" }}
        >
            <ClickMap handleMapClick={handleMapClick} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lon]}>
            </Marker>
        </MapContainer>
    )
}

function ClickMap({ handleMapClick }) {
    const map = useMap()
    map.on("click", (e) => {
        const { lat, lng } = e.latlng

        handleMapClick({
            lat: lat,
            lon: lng
        })
    })
    return null
}

export default Map