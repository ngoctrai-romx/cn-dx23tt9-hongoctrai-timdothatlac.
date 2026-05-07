"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Cấu hình lại đường dẫn icon cho Leaflet vì Next.js không tự nhận diện được ảnh mặc định
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function MapPicker({ position, setPosition }) {
  // Tọa độ mặc định: Đại học Trà Vinh (9.9234, 106.3413)
  const defaultCenter = [9.9234, 106.3413];

  return (
    <div style={{ height: "400px", width: "100%", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border-color)", zIndex: 1 }}>
      <MapContainer center={defaultCenter} zoom={14} scrollWheelZoom={true} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}
