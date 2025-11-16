import React from "react";
import { useParams } from "react-router-dom";

function PublicMenu() {
  // Por ahora solo usamos el slug para el futuro
  const { slug } = useParams();

  // DATOS DE DEMO (puedes cambiarlos cuando quieras)
  const restaurant = {
    name: "Taquería El Güero",
    address: "123 Main St, Los Ángeles, CA",
    phone: "(555) 123-4567",
    primary_color: "#e65100",
    logo_url: ""
  };

  const special = {
    name: "Especial de Tacos 3×2",
    price: 9.99,
    currency: "USD",
    description:
      "3 tacos al gusto y 1 refresco incluido. Solo hoy, mostrando este código.",
    image_url: ""
  };

  const date = new Date();

  const primaryColor = restaurant.primary_color || "#222";

  return (
    <BaseLayout>
      <Card>
        <header style={styles.header}>
          {restaurant.logo_url && (
            <img
              src={restaurant.logo_url}
              alt={restaurant.name}
              style={styles.logo}
            />
          )}
          <div>
            <h1 style={{ ...styles.title, color: primaryColor }}>
              {restaurant.name}
            </h1>
            <p style={styles.subTitle}>
              Especial del día •{" "}
              {date.toLocaleDateString("es-MX", {
                weekday: "long",
                day: "numeric",
                month: "short"
              })}
            </p>
            <p style={{ ...styles.subTitle, marginTop: 4 }}>
              Código: {slug}
            </p>
          </div>
        </header>

        <section style={styles.specialSection}>
          {special.image_url && (
            <img
              src={special.image_url}
              alt={special.name}
              style={styles.specialImage}
            />
          )}

          <h2 style={styles.specialTitle}>{special.name}</h2>

          <p style={styles.specialPrice}>
            {special.currency === "USD" ? "$" : ""}
            {special.price.toFixed(2)}
          </p>

          <p style={styles.specialDescription}>{special.description}</p>

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

          <p style={styles.footerNote}>
            Muestra esta pantalla en caja para recibir la promoción.
          </p>
        </section>
      </Card>
    </BaseLayout>
  );
}

function BaseLayout({ children }) {
  return <div style={styles.page}>{children}</div>;
}

function Card({ children }) {
  return <div style={styles.card}>{children}</div>;
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
  specialSection: {
    textAlign: "center"
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
  },
  loadingText: {
    textAlign: "center",
    fontSize: "16px",
    color: "#555",
    margin: 0
  }
};

export default PublicMenu;
