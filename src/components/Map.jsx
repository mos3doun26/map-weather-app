import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk'
const API_KEY = import.meta.env.VITE_API_KEY
const VITE_MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY


const Map = ({ coords, handleMapClick, mapType }) => {
    const { lat, lon } = coords
    return (
        <MapContainer
            // key={`${coords.lat},${coords.lon}`}
            center={[lat, lon]}
            zoom={5}
            style={{ width: "100wv", height: "500px" }}
        >
            <ClickMap handleMapClick={handleMapClick} coords={coords} />
            <MapTileLayer />
            <TileLayer
                opacity={0.7}
                url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
            />
            <Marker position={[lat, lon]}>
            </Marker>
        </MapContainer>
    )
}

function ClickMap({ handleMapClick, coords }) {
    const map = useMap()
    map.panTo([coords.lat, coords.lon])

    map.on("click", (e) => {
        const { lat, lng } = e.latlng
        handleMapClick({ lat: lat, lon: lng })
    })
    return null
}


function MapTileLayer() {
    const map = useMap()

    useEffect(() => {
        const tileLayer = new MaptilerLayer({
            style: 'basic-dark',
            apiKey: VITE_MAPTILER_API_KEY
        })

        tileLayer.addTo(map)
        return () => { map.removeLayer(tileLayer) }
    }, [map])
}

export default Map