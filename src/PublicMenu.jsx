// src/PublicMenu.jsx
import React, { useEffect, useState } from "react";
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
    menuUrl: "https://especialesqr.com", // aquí puedes poner el menú real cuando lo tengas
    special: {
      title: "Combo Desayuno Ranchero",
      price: 8.99,
      description:
        "Huevos al gusto, frijoles, arroz y café de refill. Solo hoy mostrando esta pantalla en caja.",
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

  // Estado para "redimido" en este dispositivo
  const [redeemed, setRedeemed] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const key = `especial_redeemed_${slug}`;
    const stored = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (stored === "true") {
      setRedeemed(true);
    }
  }, [slug]);

  const handleRedeem = () => {
    if (!slug) return;
    const key = `especial_redeemed_${slug}`;
    try {
      localStorage.setItem(key, "true");
    } catch (e) {
      // si falla localStorage no pasa nada, solo usamos el estado
    }
    setRedeemed(true);
  };

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
            padding: 24,
            borderRadius: 16,
            background: "#FFFFFF",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            maxWidth: 400,
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
        justifyContent: "center",
        alignItems: "center",
        background: BG_RED,
        padding: 16,
        fontFamily: "Poppins, -apple-system, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          background: "#FFFFFF",
          borderRadius: 24,
          padding: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
          border: "1px dashed rgba(0,0,0,0.25)",
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

          {/* Dirección centrada (azul y clickeable) */}
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
              style={{ color: LINK_BLUE, textDecoration: "none" }}
            >
              {restaurant.address}
            </a>
          </p>

          {/* Teléfono centrado con “Llámanos:” en azul y clickeable */}
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
              margin: "4px 0 10px",
              background: "rgba(0,0,0,0.08)",
            }}
          />

          {/* NUESTRAS ESPECIALES + fecha */}
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#333",
            }}
          >
            NUESTRAS ESPECIALES
          </p>

          {!isExpired && formattedValidUntil && (
            <p
              style={{
                margin: "2px 0 0 0",
                fontSize: "0.85rem",
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
          <main style={{ textAlign: "center", marginBottom: 16 }}>
            {!redeemed ? (
              <>
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
                    fontSize: "1.7rem",
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

                {/* Botón para marcar como redimido */}
                <button
                  type="button"
                  onClick={handleRedeem}
                  style={{
                    marginTop: 12,
                    padding: "8px 16px",
                    borderRadius: 999,
                    border: "none",
                    backgroundColor: "#444",
                    color: "#FFFFFF",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Marcar como redimido en este dispositivo
                </button>
              </>
            ) : (
              <>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#222",
                  }}
                >
                  Especial redimido
                </h2>
                <p
                  style={{
                    marginTop: 8,
                    fontSize: "0.98rem",
                    color: "#555",
                  }}
                >
                  Este especial ya fue marcado como redimido en este dispositivo.
                  Pide en caja por el <strong>especial del día</strong> o muestra
                  otra oferta válida.
                </p>
              </>
            )}
          </main>
        ) : (
          <main style={{ marginBottom: 16, textAlign: "center" }}>
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
          {/* Teléfono en formato nuevo */}
          <p style={{ margin: "2px 0 4px" }}>
            Llámanos para tomar tu orden:{" "}
            <a
              href={`tel:${cleanPhone}`}
              style={{ color: LINK_BLUE, textDecoration: "none" }}
            >
              {restaurant.phone}
            </a>
          </p>

          {/* Bloque de menú con efecto de botón */}
          {restaurant.menuUrl && (
            <div style={{ marginBottom: 8 }}>
              <p style={{ margin: "4px 0 6px" }}>Mira nuestro menú</p>
              <a
                href={restaurant.menuUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "8px 18px",
                  borderRadius: 999,
                  backgroundColor: LINK_BLUE,
                  color: "#FFFFFF",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                }}
              >
                Presiona aquí
              </a>
            </div>
          )}

          {/* Frase legal extra de precio válido */}
          <p
            style={{
              margin: "0 0 2px",
              fontSize: "0.78rem",
              color: "#999",
              fontStyle: "italic",
            }}
          >
            Precio válido mostrando esta pantalla en caja.
          </p>

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
