import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const countryCenters = {
  georgia: { lat: 42.0, lng: 43.5 },
  singapore: { lat: 1.35, lng: 103.82 },
  russia: { lat: 61.5, lng: 40.0 },
  malta: { lat: 35.9, lng: 14.4 },
  uk: { lat: 55.4, lng: -3.4 },
  usa: { lat: 39.8, lng: -98.6 },
  canada: { lat: 56.1, lng: -106.3 },
  australia: { lat: -25.3, lng: 133.8 },
  germany: { lat: 51.2, lng: 10.4 },
  france: { lat: 46.6, lng: 2.2 },
  ireland: { lat: 53.4, lng: -8.2 },
  "new-zealand": { lat: -41.3, lng: 174.0 },
};

const universityMarkers = {
  georgia: [
    { lat: 41.72, lng: 44.78, name: "Tbilisi State University" },
    { lat: 41.71, lng: 44.79, name: "Caucasus University" },
    { lat: 41.71, lng: 44.76, name: "Georgian Technical University" },
    { lat: 41.72, lng: 44.77, name: "Ilia State University" },
  ],
  singapore: [
    { lat: 1.3, lng: 103.78, name: "National University of Singapore" },
    { lat: 1.35, lng: 103.68, name: "Nanyang Technological University" },
    { lat: 1.3, lng: 103.84, name: "Singapore Management University" },
  ],
  russia: [
    { lat: 55.7, lng: 37.53, name: "Moscow State University" },
    { lat: 59.94, lng: 30.3, name: "Saint Petersburg State University" },
    { lat: 55.76, lng: 37.68, name: "Bauman Moscow State Technical University" },
  ],
  malta: [
    { lat: 35.9, lng: 14.48, name: "University of Malta" },
    { lat: 35.87, lng: 14.52, name: "MCAST" },
  ],
  uk: [
    { lat: 51.75, lng: -1.25, name: "University of Oxford" },
    { lat: 52.2, lng: 0.12, name: "University of Cambridge" },
    { lat: 51.5, lng: -0.18, name: "Imperial College London" },
  ],
  usa: [
    { lat: 42.36, lng: -71.09, name: "MIT" },
    { lat: 37.42, lng: -122.17, name: "Stanford University" },
    { lat: 42.37, lng: -71.12, name: "Harvard University" },
  ],
  canada: [
    { lat: 43.66, lng: -79.4, name: "University of Toronto" },
    { lat: 49.26, lng: -123.25, name: "University of British Columbia" },
    { lat: 45.5, lng: -73.57, name: "McGill University" },
  ],
  australia: [
    { lat: -37.8, lng: 144.96, name: "University of Melbourne" },
    { lat: -33.89, lng: 151.19, name: "University of Sydney" },
    { lat: -33.92, lng: 151.23, name: "University of New South Wales" },
  ],
  germany: [
    { lat: 48.15, lng: 11.58, name: "LMU Munich" },
    { lat: 48.15, lng: 11.57, name: "Technical University of Munich" },
    { lat: 49.41, lng: 8.71, name: "Heidelberg University" },
  ],
  france: [
    { lat: 48.85, lng: 2.36, name: "Sorbonne University" },
    { lat: 48.76, lng: 2.07, name: "HEC Paris" },
    { lat: 48.71, lng: 2.21, name: "École Polytechnique" },
  ],
  ireland: [
    { lat: 53.34, lng: -6.26, name: "Trinity College Dublin" },
    { lat: 53.31, lng: -6.22, name: "University College Dublin" },
    { lat: 53.28, lng: -9.06, name: "University of Galway" },
  ],
  "new-zealand": [
    { lat: -36.85, lng: 174.77, name: "University of Auckland" },
    { lat: -45.87, lng: 170.51, name: "University of Otago" },
    { lat: -41.29, lng: 174.77, name: "Victoria University of Wellington" },
  ],
};

export default function MapComponent({ markers = [], center, zoom = 3, countrySlug, className = "" }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: center || [20, 0],
      zoom: zoom,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    const icon = L.divIcon({
      className: "",
      html: `<div style="
        width: 28px; height: 28px;
        background: linear-gradient(135deg, #22D3EE, #6366F1);
        border: 2px solid rgba(255,255,255,0.2);
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 12px rgba(34,211,238,0.4);
        font-size: 12px;
      "><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    });

    const allUniversityMarkers = Object.entries(universityMarkers).flatMap(([slug, unis]) =>
    unis.map((u) => ({ ...u, countrySlug: slug }))
  );

  const markersToRender = markers.length > 0
      ? markers.map((m) => ({
          lat: m.position?.lat || m.lat,
          lng: m.position?.lng || m.lng,
          name: m.title || m.name,
        }))
      : countrySlug
        ? universityMarkers[countrySlug] || []
        : allUniversityMarkers;

    const markerInstances = [];
    markersToRender.forEach((m) => {
      if (!m.lat || !m.lng) return;
      const marker = L.marker([m.lat, m.lng], { icon }).addTo(map);
      marker.bindPopup(`
        <div style="
          font-family: system-ui, sans-serif;
          padding: 4px 2px;
          min-width: 140px;
        ">
          <p style="
            font-weight: 700; font-size: 13px; margin: 0 0 4px;
            color: #0f172a;
          ">${m.name}</p>
          <p style="
            font-size: 11px; color: #64748b; margin: 0;
          ">${m.lat?.toFixed(2)}, ${m.lng?.toFixed(2)}</p>
        </div>
      `, { className: "custom-popup" });
      markerInstances.push(marker);
    });
    markersRef.current = markerInstances;

    if (markersToRender.length === 1) {
      map.setView([markersToRender[0].lat, markersToRender[0].lng], 14);
    } else if (markersToRender.length > 1) {
      const bounds = L.latLngBounds(markersToRender.map((m) => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [markers, center, zoom, countrySlug]);

  // Force a resize after mount to ensure full rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={mapContainerRef} className={`rounded-2xl overflow-hidden ${className}`} style={{ width: "100%", height: "400px", background: "#0f172a" }} />
  );
}

// Add global popup styles
const style = document.createElement("style");
style.textContent = `
  .custom-popup .leaflet-popup-content-wrapper {
    border-radius: 12px !important;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3) !important;
  }
  .custom-popup .leaflet-popup-tip {
    box-shadow: none !important;
  }
`;
document.head.appendChild(style);
