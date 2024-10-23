'use client'
// app/components/Map.tsx
import React, {useState } from 'react'
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { LatLngExpression } from 'leaflet'
import styles from "./map.module.css"

interface MyMarker {
    latlng:LatLngExpression,
    text:string,
    originalText:string
}
// Locationmarker komponentti käyttää Reactin tilaa ja Leaflet kartan tapahtumien käsittelyä
// mahdollistaakeseen käyttäjän lisätä kartalle markereita hiiren klikkauksella
function LocationMarker() {
    // useState hookilla alustetaan tila, joka sisältää kaikki markkerit
    // Alkuarvo on tyhjä taulukko. Taulukkoon tallennetaan MyMarker tyyppisiä tietoja
    const [markers, setMarkers] = useState<MyMarker[]>([])

    useMapEvents({
        click(e) {
            // Kun karttaa klikataan, haetaan klikatun kohdan sijainti.
            const newMarker = {latlng:e.latlng,text:"",originalText:""}
            setMarkers([...markers,newMarker])
        }
    })

    // Päivittää markerin tekstiä sen indeksin perusteella.
    const updateMarkerText = (text:string,idx:number) => {
        const updatedMarkers = [...markers]
        updatedMarkers[idx].text = text
        setMarkers(updatedMarkers)
    }

    // Tallentaa markerin tekstia alkuperäiseksi tekstiin, kun käyttäjä painaa "Tallenna".
    const saveText = (idx:number) => {
        const updatedMarkers = [...markers]
        updatedMarkers[idx].originalText = updatedMarkers[idx].text
        setMarkers(updatedMarkers)
    }

    // Palauttaa markerin tekstin alkupreäiseksi, kun käyttäjä painaa "Kumoa".
    const undoText = (idx:number) => {
        const updatedMarkers = [...markers]
        updatedMarkers[idx].text = updatedMarkers[idx].originalText
        setMarkers(updatedMarkers)
    }

    // Renderöi kaikki markerit kartalle ja sisältää kunkin markerin popup ikkunan tekstin muokkaamista varten
    return (
        <>
        {markers.map((marker, idx) => (
            <Marker key={idx} position={marker.latlng}>
                <Popup className={styles.popup}>
                    <div className={styles.popup}>
                        <textarea value={marker.text} onChange={(e) => updateMarkerText(e.target.value,idx)} placeholder='Kirjoita jotain...' />
                        <div>
                            <button onClick={() => saveText(idx)}>Tallenna</button>
                            <button onClick={() => undoText(idx)}>Kumoa</button>
                        </div>
                    </div>
                </Popup>
            </Marker>
    ))}
    </>
    )
}
interface MapProps {
    position:LatLngExpression,
    zoom:number,
    style:object
}
// MapComponent-komponentti vastaa kartan renderöimisestä
export default function MyMap(props: MapProps) {
  return (
  /* MapContainer määrittelee kartan perustiedot, kuten kestkipisteen, zoom-tason ja tyylit, kuten korkeuden ja leveyden */
  <MapContainer center={props.position} zoom={props.zoom} style={props.style}>
    {/* TileLayer lataa ja näyttää karttatilejä OpenStreetMapista */}
    <TileLayer
      /* Kartan alareunassa näytetään tekijänoikeustiedot. */ 
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* LocationMarker-komponetti listätään kartalle, jotta markkereita voi listätä */ }
    <LocationMarker />
  </MapContainer>)
}