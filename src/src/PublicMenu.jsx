import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PublicMenu() {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [special, setSpecial] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/.netlify/functions/public-menu?slug=${encodeURIComponent(slug)}`
        );

        if (!res.ok) {
          throw new Error("SERVER_ERROR");
        }

        const data = await res.json();

        if (!data.ok) {
          setError(data.error || "RESTAURANT_NOT_FOUND");
          setLoading(false);
          return;
        }

        setRestaurant(data.restaurant || null);
        setSpecial(data.special_today || null);
        setDate(data.date || null);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("NETWORK_ERROR");
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  const primaryColor = restaurant?.primary_color || "#222";

  if (loading) {
    return (
      <BaseLayout>
        <Card>
          <p style={styles.loadingText}>Cargando especial del día...</p>
        </Card>
      </BaseLayout>
    );
  }

  if (error === "RESTAURANT_NOT_FOUND") {
    return (
      <BaseLayout>
        <Card>
          <h1 style={styles.title}>Código no válido</h1>
          <p style={styles.text}>
            Este código ya no está activo. Pregunta en el restaurante por sus
            especiales actuales.
          </p>
        </Card>
      </BaseLayout>
    );
  }

  if (error === "NETWORK_ERROR") {
    return (
      <BaseLayout>
        <Card>
          <h1 style={styles.title}>Ups, algo salió mal</h1>
          <p style={styles.text}>
            No pudimos cargar la información. Verifica tu conexión e intenta de
            nuevo.
          </p>
        </Card>
      </BaseLayout>
    );
  }

  const hasSpecial = !!special;

  return (
    <BaseLayout>
      <Card>
        <header style={styles.header}>
          {restaurant?.logo_url && (
            <img
              src={restaurant.logo_url}
              alt={restaurant.name}
              style={styles.logo}
            />
          )}
          <div>
            <h1 style={{ ...styles.title, color: primaryColor }}>
              {restaurant?.name || "Restaurante"}
            </h1>
            {date && (
              <p style={styles.subTitle}>
                Especial del día •{" "}
                {new Date(date).toLocaleDateString("es-MX", {
                  weekday: "long",
                  day: "numeric",
                  month: "short"
                })}
              </p>
            )}
          </div>
        </header>

        {hasSpecial ? (
          <section style={styles.specialSection}>
            {special.image_url && (
              <img
                src={special.image_url}
                alt={special.name}
                style={styles.specialImage}
              />
            )}

            <h2 style={styles.specialTitle}>{special.name}</h2>

            {special.price != null && (
              <p style={styles.specialPrice}>
                {special.currency === "USD" ? "$" : ""}
                {Number(special.price).toFixed(2)}
              </p>
            )}

            {special.description && (
              <p style={styles.specialDescription}>{special.description}</p>
            )}

            {(restaurant?.address || restaurant?.phone) && (
              <div style={styles.infoBox}>
                {restaurant.address && (
                  <p style={styles.infoLine}>{restaurant.address}</p>
                )}
                {restaurant.phone && (
                  <p style={styles.infoLine}>
                    Tel:{" "}
                    <a href={`tel:${restaurant.phone}`} style={styles.link}>
                      {restaurant.phone}
                    </a>
                  </p>
                )}
              </div>
            )}

            <p style={styles.footerNote}>
              Muestra esta pantalla en caja para más detalles.
            </p>
          </section>
        ) : (
          <section style={styles.specialSection}>
            <h2 style={styles.specialTitle}>Sin especial configurado hoy</h2>
            <p style={styles.specialDescription}>
              Este restaurante aún no ha configurado su especial del día.
              Pregunta en caja por las promociones disponibles.
            </p>
            {(restaurant?.address || restaurant?.phone) && (
              <div style={styles.infoBox}>
                {restaurant.address && (
                  <p style={styles.infoLine}>{restaurant.address}</p>
                )}
                {restaurant.phone && (
                  <p style={styles.infoLine}>
                    Tel:{" "}
                    <a href={`tel:${restaurant.phone}`} style={styles.link}>
                      {restaurant.phone}
                    </a>
                  </p>
                )}
              </div>
            )}
          </section>
        )}
      </Card>
    </BaseLayout>
  );
}

function BaseLayout({ children }) {
  return (
    <div style={styles.page}>
      {children}
    </div>
  );
}

function Card({ children }) {
  return (
    <div style={styles.card}>
      {children}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px"
  },
  logo: {
    width: "56px",
    height: "56px",
    objectFit: "contain",
    borderRadius: "12px",
    border: "1px solid #eee"
  },
  title: {
    fontSize: "20px",
    margin: 0,
    fontWeight: "700"
  },
  subTitle: {
    fontSize: "13px",
    margin: "4px 0 0",
    color: "#777",
    textTransform: "capitalize"
  },
  loadingText: {
    textAlign: "center",
    fontSize: "16px",
    color: "#555",
    margin: 0
  },
  text: {
    fontSize: "15px",
    color: "#555",
    marginTop: "8px"
  },
  specialSection: {
    textAlign: "center"
  },
  specialImage: {
    width: "100%",
    maxHeight: "260px",
    objectFit: "cover",
    borderRadius: "14px",
    marginBottom: "16px"
  },
  specialTitle: {
    fontSize: "22px",
    margin: "4px 0",
    fontWeight: "700"
  },
  specialPrice: {
    fontSize: "20px",
    margin: "4px 0 8px",
    fontWeight: "700",
    color: "#4caf50"
  },
  specialDescription: {
    fontSize: "15px",
    margin: "8px 0 16px",
    color: "#555",
    lineHeight: 1.4
  },
  infoBox: {
    marginTop: "8px",
    padding: "10px 12px",
    borderRadius: "12px",
    backgroundColor: "#fafafa",
    textAlign: "left"
  },
  infoLine: {
    margin: "2px 0",
    fontSize: "14px",
    color: "#555"
  },
  link: {
    color: "#1976d2",
    textDecoration: "none"
  },
  footerNote: {
    marginTop: "14px",
    fontSize: "13px",
    color: "#888"
  }
};

export default PublicMenu;
