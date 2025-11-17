// src/PublicMenu.jsx
import React from "react";
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
    special: {
      title: "Combo Desayuno Ranchero",
      price: 8.99,
      description:
        "Huevos al gusto, frijoles, arroz y café de refill. Solo hoy mostrando este código.",
      validUntil: "2025-11-29",
    },
  },

  "paloma-meat-market": {
    name: "Paloma Meat Market",
    address: "6531 Rita Ave, Huntington Park, CA 90255",
    phone: "(323) 312-0135",
    primaryColor: PRIMARY_COLOR,
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
  const now = new Date();
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
        }}
      >
        {/* ENCABEZADO CENTRADO */}
        <header
          style={{
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          {/* Nombre negocio */}
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

          {/* Dirección centrada */}
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

          {/* Teléfono centrado con “Llámanos:” */}
          <p
            style={{
              margin: "2px 0 8px 0",
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            Llámanos:{" "}
            <a
              href={`tel:${cleanPhone}`}
              style={{ color: LINK_COLOR, textDecoration: "none" }}
            >
              {restaurant.phone}
            </a>
          </p>

          {/* Línea divisoria semitransparente */}
          <div
            style={{
              height: 1,
              width: "100%",
              margin: "4px 0 8px",
              background: "rgba(0,0,0,0.06)",
            }}
          />

          {/* Vigencia del especial */}
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

          {/* Mensaje si está expirada */}
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
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0 }}>{restaurant.address}</p>
          <p style={{ margin: "2px 0 6px" }}>Llámanos: {restaurant.phone}</p>
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
