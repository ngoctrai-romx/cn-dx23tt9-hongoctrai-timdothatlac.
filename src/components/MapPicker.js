"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
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

// Component điều khiển Bản đồ (bay tới tọa độ mới)
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function MapPicker({ position, setPosition }) {
  const defaultCenter = [9.9234, 106.3413]; // Đại học Trà Vinh
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Gọi API miễn phí của OpenStreetMap để tìm tọa độ
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1&countrycodes=vn`);
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setMapCenter([lat, lon]);
      } else {
        alert("Không tìm thấy địa điểm này. Vui lòng nhập rõ hơn (VD: Quận 1, TP.HCM)!");
      }
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
      alert("Đã xảy ra lỗi khi tìm kiếm địa điểm.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Khung tìm kiếm địa chỉ */}
      <div style={{ display: "flex", gap: "8px" }}>
        <input 
          type="text" 
          className="input" 
          placeholder="Tìm tỉnh/thành, đường... (VD: Cần Thơ)" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1 }}
          onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleSearch(e); } }}
        />
        <button 
          type="button" 
          className="btn btn-primary btn-sm" 
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? "Đang tìm..." : "🔍 Tìm nhanh"}
        </button>
      </div>

      <div style={{ height: "400px", width: "100%", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border-color)", zIndex: 1, position: "relative" }}>
        <MapContainer center={mapCenter} zoom={14} scrollWheelZoom={true} style={{ height: "100%", width: "100%", zIndex: 1 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
          <MapController center={mapCenter} />
        </MapContainer>
      </div>
    </div>
  );
}
