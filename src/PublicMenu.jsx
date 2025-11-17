// src/PublicMenu.jsx
import React from "react";
import { useParams } from "react-router-dom";

// Colores base (3 colores fuertes)
const PRIMARY_COLOR = "#FF6A00"; // títulos
const PRICE_COLOR = "#2E7D32";   // precio
const BG_RED = "#FF0000";        // fondo brillante rojo
const LINK_BLUE = "#007AFF";     // azul para dirección / teléfono / menú

// Datos de restaurantes demo
const RESTAURANTS = {
  "el-perico-market": {
    name: "El Perico Market",
    address: "10524 Garvey Ave, El Monte, CA",
    phone: "626-350-0686",
    primaryColor: PRIMARY_COLOR,
    // PDF del menú (archivo en /public/el-perico-menu.pdf)
    menuUrl: "/el-perico-menu.pdf",
    special: {
      title: "Combo Desayuno Ranchero",
      price: 8.99,
      description:
        "Huevos al gusto, frijoles, arroz y café de refill. Solo hoy.",
      validUntil: "2025-11-27",
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
          background: BG_RED,
          fontFamily: "Poppins, -apple-system, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            padding: 20,
            borderRadius: 16,
            background: "#FFFFFF",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            maxWidth: 380,
            textAlign: "center",
            border: "1px dashed rgba(0,0,0,0.18)",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.4rem" }}>CÓDIGO NO VÁLIDO</h1>
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
  const formattedValidUntil = special.validUntil
    ? new Date(special.validUntil).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // cupón más arriba, menos rojo arriba/abajo
        alignItems: "center",
        background: BG_RED,
        padding: "6px 8px 4px",
        fontFamily: "Poppins, -apple-system, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 440,
          width: "100%",
          background: "#FFFFFF",
          borderRadius: 22,
          padding: 18,
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
          border: "1px dashed rgba(0,0,0,0.25)",
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        {/* ENCABEZADO CENTRADO */}
        <header
          style={{
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          {/* Nombre negocio */}
          <h1
            style={{
              margin: 0,
              fontSize: "1.6rem",
              fontWeight: 800,
              color: restaurant.primaryColor || PRIMARY_COLOR,
            }}
          >
            {restaurant.name}
          </h1>

          {/* Dirección centrada (azul y clickeable) */}
          <p
            style={{
              margin: "3px 0 0 0",
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: LINK_BLUE, textDecoration: "none" }}
            >
              {restaurant.address}
            </a>
          </p>

          {/* Teléfono centrado con “Llámanos:” en azul y clickeable */}
          <p
            style={{
              margin: "2px 0 6px 0",
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            Llámanos:{" "}
            <a
              href={`tel:${cleanPhone}`}
              style={{ color: LINK_BLUE, textDecoration: "none" }}
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
              background: "rgba(0,0,0,0.08)",
            }}
          />

          {/* NUESTRAS ESPECIALES + fecha */}
          <p
            style={{
              margin: 0,
              fontSize: "0.92rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#333",
            }}
          >
            NUESTRAS ESPECIALES
          </p>

          {!isExpired && formattedValidUntil && (
            <p
              style={{
                margin: "2px 0 0 0",
                fontSize: "0.82rem",
                color: "#666",
              }}
            >
              (Válida hasta {formattedValidUntil})
            </p>
          )}

          {isExpired && (
            <p
              style={{
                marginTop: 4,
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
          <main style={{ textAlign: "center", marginBottom: 10 }}>
            <h2
              style={{
                margin: 0,
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#222",
              }}
            >
              {special.title}
            </h2>

            <p
              style={{
                margin: "4px 0 6px",
                fontSize: "1.65rem",
                fontWeight: 800,
                color: PRICE_COLOR,
              }}
            >
              ${special.price?.toFixed(2)}
            </p>

            <p
              style={{
                margin: 0,
                fontSize: "0.96rem",
                color: "#444",
                lineHeight: 1.4,
              }}
            >
              {special.description}
            </p>
          </main>
        ) : (
          <main style={{ marginBottom: 10, textAlign: "center" }}>
            <p
              style={{
                fontSize: "0.96rem",
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
            paddingTop: 10,
            fontSize: "0.9rem",
            color: "#555",
            textAlign: "center",
          }}
        >
          {/* Texto y teléfono en líneas separadas */}
          <p
            style={{
              margin: "2px 0 2px",
              fontSize: "0.9rem",
            }}
          >
            Llámanos para tomar tu orden:
          </p>
          <p
            style={{
              margin: "0 0 4px",
              fontSize: "0.9rem",
            }}
          >
            <a
              href={`tel:${cleanPhone}`}
              style={{ color: LINK_BLUE, textDecoration: "none" }}
            >
              {restaurant.phone}
            </a>
          </p>

          {/* Botón de menú (abre PDF) */}
          {restaurant.menuUrl && (
            <div style={{ marginBottom: 6 }}>
              <a
                href={restaurant.menuUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "7px 18px",
                  borderRadius: 999,
                  backgroundColor: LINK_BLUE,
                  color: "#FFFFFF",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                }}
              >
                Haz clic aquí para ver nuestro menú
              </a>
            </div>
          )}

          {/* Frase legal extra de precio válido */}
          <p
            style={{
              margin: "4px 0 1px",
              fontSize: "0.68rem",
              color: "#999",
              fontStyle: "italic",
              lineHeight: 1.3,
            }}
          >
            Precio válido mostrando esta pantalla en caja.
          </p>

          <p
            style={{
              margin: 0,
              fontSize: "0.68rem",
              color: "#999",
              fontStyle: "italic",
              lineHeight: 1.3,
            }}
          >
            Límite 1 especial por cliente por visita por día. Sujeto a
            disponibilidad y a cambios sin previo aviso. Impuestos adicionales
            donde apliquen. No válido con otras promociones ni descuentos. No se
            ofrecen rain checks.
          </p>
        </footer>
      </div>

      {/* Texto sobre el borde rojo inferior */}
      <div
        style={{
          marginBottom: 4,
          textAlign: "center",
          color: "#FFFFFF",
          fontSize: "0.68rem",
          fontStyle: "italic",
        }}
      >
        powered by especialesqr.com
      </div>
    </div>
  );
}
