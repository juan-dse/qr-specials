// src/PublicMenu.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Colores base (solo 3 colores fuertes)
const PRIMARY_COLOR = "#FF6A00"; // títulos / marca
const PRICE_COLOR = "#2E7D32";   // precio
const LINK_COLOR = "#007AFF";    // enlaces (dirección, teléfono)

// Datos de restaurantes demo
const RESTAURANTS = {
  "el-perico-market": {
    name: "El Perico Market",
    address: "10524 Garvey Ave, El Monte, CA",
    phone: "626-350-0686",
    primaryColor: PRIMARY_COLOR,
    logoUrl: "/logos/el-perico-logo.png", // asegúrate de tener este archivo en public/logos/
    special: {
      title: "Combo Desayuno Ranchero",
      price: 8.99,
      description:
        "Huevos al gusto, frijoles, arroz y café de refill. Solo hoy mostrando este código.",
      validUntil: "2025-11-30",
    },
  },

  "paloma-meat-market": {
    name: "Paloma Meat Market",
    address: "6531 Rita Ave, Huntington Park, CA 90255",
    phone: "(323) 312-0135",
    primaryColor: PRIMARY_COLOR,
    // logoUrl: "/logos/paloma-logo.png",
    special: {
      title: "Especial Paloma",
      price: 7.99,
      description: "Ejemplo de especial para Paloma Meat Market.",
      validUntil: "2025-11-30",
    },
  },

  "mi-mercadito": {
    name: "Mi Mercadito",
    address: "10500 S Prairie Ave, Inglewood, CA 90303",
    phone: "(310) 419-8127",
    primaryColor: PRIMARY_COLOR,
    // logoUrl: "/logos/mi-mercadito-logo.png",
    special: {
      title: "Especial Mi Mercadito",
      price: 6.99,
      description: "Ejemplo de especial para Mi Mercadito.",
      validUntil: "2025-11-30",
    },
  },
};

export default function PublicMenu() {
  const { slug } = useParams();
  const restaurant = RESTAURANTS[slug];

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!restaurant) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#F5F5F7",
          fontFamily: "-apple-system, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            padding: 24,
            borderRadius: 16,
            background: "#FFFFFF",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.4rem" }}>Código no válido</h1>
          <p style={{ marginTop: 8, color: "#555" }}>
            El código escaneado no corresponde a un negocio activo en
            EspecialesQR.
          </p>
        </div>
      </div>
    );
  }

  const special = restaurant.special || {};
  let isExpired = false;

  if (special.validUntil) {
    const validUntilDate = new Date(special.validUntil + "T23:59:59");
    isExpired = now > validUntilDate;
  }

  const mapsUrl =
    restaurant.mapsUrl ||
    `https://www.google.com/maps?q=${encodeURIComponent(restaurant.address)}`;

  const cleanPhone = restaurant.phone.replace(/[^\d+]/g, "");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F5F5F7",
        padding: 16,
        fontFamily: "-apple-system, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          background: "#FFFFFF",
          borderRadius: 24,
          padding: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          position: "relative",
        }}
      >
        {/* Reloj pequeño arriba a la derecha */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 16,
            fontSize: "0.8rem",
            color: "#666",
            textAlign: "right",
          }}
        >
          <div>
            🕒{" "}
            {now.toLocaleTimeString("es-MX", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
          <div>
            {now.toLocaleDateString("es-MX", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>

        {/* ENCABEZADO */}
        <header
          style={{
            marginBottom: 16,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                margin: 0,
                fontSize: "1.8rem",
                fontWeight: 800,
                color: restaurant.primaryColor || PRIMARY_COLOR,
              }}
            >
              {restaurant.name}
            </h1>

            <p
              style={{
                margin: "4px 0 0 0",
                fontSize: "0.9rem",
                color: "#555",
              }}
            >
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: LINK_COLOR, textDecoration: "none" }}
              >
                {restaurant.address}
              </a>
            </p>

            <p
              style={{
                margin: "2px 0 8px 0",
                fontSize: "0.9rem",
                color: "#555",
              }}
            >
              Tel:{" "}
              <a
                href={`tel:${cleanPhone}`}
                style={{ color: LINK_COLOR, textDecoration: "none" }}
              >
                {restaurant.phone}
              </a>
            </p>

            {!isExpired && special.validUntil && (
              <p
                style={{
                  margin: "2px 0 0 0",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                Especial del día • Válido hasta:{" "}
                <strong>
                  {new Date(special.validUntil).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
              </p>
            )}

            <p
              style={{
                margin: "2px 0 0 0",
                fontSize: "0.85rem",
                color: "#777",
              }}
            >
              Código de promoción: <strong>El-Perico-Market</strong>
            </p>

            {isExpired && (
              <p
                style={{
                  marginTop: 8,
                  fontSize: "0.9rem",
                  color: "#C62828",
                  fontWeight: 600,
                }}
              >
                Promoción expirada
              </p>
            )}
          </div>

          {restaurant.logoUrl && (
            <div
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: 10,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F1F1F5",
              }}
            >
              <img
                src={restaurant.logoUrl}
                alt={`Logo de ${restaurant.name}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          )}
        </header>

        {/* CONTENIDO */}
        {!isExpired ? (
          <main style={{ textAlign: "center", marginBottom: 16 }}>
            <h2
              style={{
                margin: 0,
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#222",
              }}
            >
              {special.title}
            </h2>

            <p
              style={{
                margin: "4px 0 8px",
                fontSize: "1.6rem",
                fontWeight: 800,
                color: PRICE_COLOR,
              }}
            >
              ${special.price?.toFixed(2)}
            </p>

            <p
              style={{
                margin: 0,
                fontSize: "0.98rem",
                color: "#444",
                lineHeight: 1.4,
              }}
            >
              {special.description}
            </p>

            <p
              style={{
                marginTop: 8,
                fontSize: "0.8rem",
                color: "#777",
                fontStyle: "italic",
              }}
            >
              Precio válido mostrando esta pantalla en caja.
            </p>
          </main>
        ) : (
          <main style={{ marginBottom: 16 }}>
            <p
              style={{
                fontSize: "0.98rem",
                color: "#444",
              }}
            >
              Esta promoción ya no está vigente. Pregunta en caja por el{" "}
              <strong>especial del día</strong>.
            </p>
          </main>
        )}

        {/* FOOTER */}
        <footer
          style={{
            borderTop: "1px solid #EEE",
            paddingTop: 12,
            fontSize: "0.9rem",
            color: "#555",
          }}
        >
          <p style={{ margin: 0 }}>{restaurant.address}</p>
          <p style={{ margin: "2px 0 6px" }}>Tel: {restaurant.phone}</p>
          <p
            style={{
              margin: 0,
              fontSize: "0.78rem",
              color: "#999",
              fontStyle: "italic",
            }}
          >
            Límite 1 especial por cliente por visita por día. Sujeto a
            disponibilidad y a cambios sin previo aviso. Impuestos adicionales
            donde apliquen. No válido con otras promociones ni descuentos. No se
            ofrecen rain checks.
          </p>
        </footer>
      </div>
    </div>
  );
}
