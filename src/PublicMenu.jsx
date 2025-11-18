// src/PublicMenu.jsx
import React from "react";
import { useParams } from "react-router-dom";

// Paleta base
const PRIMARY_COLOR = "#FF6A00"; // títulos
const PRICE_COLOR = "#2E7D32";   // precio
const BG_GRADIENT =
  "linear-gradient(135deg, #FF1744 0%, #FF6A00 45%, #FF9100 100%)";
const LINK_BLUE = "#007AFF"; // links (dirección / teléfono / menú)

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

  // Vista de código no válido
  if (!restaurant) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: BG_GRADIENT,
          fontFamily: "Poppins, -apple-system, system-ui, sans-serif",
          padding: 16,
        }}
      >
        <div
          style={{
            padding: 20,
            borderRadius: 18,
            background: "#FFFFFF",
            boxShadow: "0 18px 45px rgba(0,0,0,0.25)",
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
        justifyContent: "center",
        alignItems: "center",
        background: BG_GRADIENT,
        padding: "10px 10px",
        fontFamily: "Poppins, -apple-system, system-ui, sans-serif",
      }}
    >
      {/* CUPÓN */}
      <div
        style={{
          maxWidth: 440,
          width: "100%",
          background: "#FFFFFF",
          borderRadius: 26,
          padding: 20,
          boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.8)",
          position: "relative",
        }}
      >
        {/* Línea punteada tipo cupón */}
        <div
          style={{
            position: "absolute",
            left: 18,
            right: 18,
            top: 72,
            borderTop: "1px dashed rgba(0,0,0,0.12)",
          }}
        />

        {/* ENCABEZADO */}
        <header
          style={{
            marginBottom: 14,
            textAlign: "center",
          }}
        >
          {/* Nombre negocio */}
          <h1
            style={{
              margin: "0 0 4px",
              fontSize: "1.7rem",
              fontWeight: 800,
              color: restaurant.primaryColor || PRIMARY_COLOR,
            }}
          >
            {restaurant.name}
          </h1>

          {/* Dirección */}
          <p
            style={{
              margin: "0 0 2px",
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            <span style={{ marginRight: 4 }}>📍</span>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: LINK_BLUE, textDecoration: "none" }}
            >
              {restaurant.address}
            </a>
          </p>

          {/* Teléfono superior */}
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            <span style={{ marginRight: 4 }}>📞</span>
            Llámanos:{" "}
            <a
              href={`tel:${cleanPhone}`}
              style={{ color: LINK_BLUE, textDecoration: "none" }}
            >
              {restaurant.phone}
            </a>
          </p>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <section style={{ marginTop: 18, textAlign: "center" }}>
          {/* Etiqueta especial del día */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "4px 10px",
              borderRadius: 999,
              background:
                "linear-gradient(135deg, rgba(255,106,0,0.12), rgba(255,23,68,0.12))",
              border: "1px solid rgba(255,106,0,0.6)",
              marginBottom: 6,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#444",
            }}
          >
            ⭐ Especial del día
          </div>

          {/* Título sección */}
          <p
            style={{
              margin: "2px 0 0",
              fontSize: "0.86rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#333",
            }}
          >
            NUESTRAS ESPECIALES
          </p>

          {!isExpired && formattedValidUntil && (
            <p
              style={{
                margin: "4px 0 10px",
                fontSize: "0.82rem",
                color: "#666",
              }}
            >
              Válida hasta{" "}
              <span style={{ fontWeight: 600 }}>{formattedValidUntil}</span>
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

          {!isExpired ? (
            <>
              {/* Nombre especial */}
              <h2
                style={{
                  margin: "4px 0 6px",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#222",
                }}
              >
                {special.title}
              </h2>

              {/* Precio como chip verde */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px 16px",
                  borderRadius: 999,
                  background: "rgba(46,125,50,0.08)",
                  border: "1px solid rgba(46,125,50,0.6)",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: 800,
                    color: PRICE_COLOR,
                  }}
                >
                  ${special.price?.toFixed(2)}
                </span>
              </div>

              {/* Descripción */}
              <p
                style={{
                  margin: 0,
                  fontSize: "0.96rem",
                  color: "#444",
                  lineHeight: 1.45,
                }}
              >
                {special.description}
              </p>
            </>
          ) : (
            <p
              style={{
                fontSize: "0.96rem",
                color: "#444",
              }}
            >
              Esta promoción ya no está vigente. Pregunta en caja por el{" "}
              <strong>especial del día</strong>.
            </p>
          )}
        </section>

        {/* FOOTER: TEL + BOTÓN + LEGAL */}
        <footer
          style={{
            borderTop: "1px dashed rgba(0,0,0,0.12)",
            marginTop: 16,
            paddingTop: 10,
            fontSize: "0.9rem",
            color: "#555",
            textAlign: "center",
          }}
        >
          {/* Teléfono para ordenar */}
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
              margin: "0 0 8px",
              fontSize: "0.95rem",
              fontWeight: 600,
            }}
          >
            <a
              href={`tel:${cleanPhone}`}
              style={{ color: LINK_BLUE, textDecoration: "none" }}
            >
              {restaurant.phone}
            </a>
          </p>

          {/* Botón menú */}
          {restaurant.menuUrl && (
            <div style={{ marginBottom: 10 }}>
              <a
                href={restaurant.menuUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  width: "100%",
                  maxWidth: 320,
                  padding: "9px 18px",
                  borderRadius: 999,
                  background:
                    "linear-gradient(135deg, #007AFF, #0051C6 70%, #003F9E)",
                  color: "#FFFFFF",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.22)",
                }}
              >
                Haz clic aquí para ver nuestro menú
              </a>
            </div>
          )}

          {/* Legal */}
          <p
            style={{
              margin: "4px 0 2px",
              fontSize: "0.68rem",
              color: "#999",
              fontStyle: "italic",
              lineHeight: 1.35,
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
              lineHeight: 1.35,
            }}
          >
            Límite 1 especial por cliente por visita por día. Sujeto a
            disponibilidad y a cambios sin previo aviso. Impuestos adicionales
            donde apliquen. No válido con otras promociones ni descuentos. No se
            ofrecen rain checks.
          </p>
        </footer>
      </div>

      {/* powered by abajo en el rojo */}
      <div
        style={{
          marginTop: 6,
          width: "100%",
          maxWidth: 440,
          textAlign: "right",
          color: "#FFFFFF",
          fontSize: "0.7rem",
          fontWeight: 700,
        }}
      >
        powered by especialesqr.com
      </div>
    </div>
  );
}
