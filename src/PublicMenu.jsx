import React from "react";
import { useParams } from "react-router-dom";

// 🎯 Catálogo de restaurantes y sus especiales
const RESTAURANTS = {
  "taqueria-el-guero": {
    name: "Taquería El Güero",
    address: "123 Main St, Los Ángeles, CA",
    phone: "(555) 123-4567",
    primary_color: "#e65100",
    special: {
      name: "Especial de Tacos 3×2",
      price: 9.99,
      currency: "USD",
      description:
        "3 tacos al gusto y 1 refresco incluido. Solo hoy, mostrando este código."
    }
  },
  "tacos-la-esquina": {
    name: "Tacos La Esquina",
    address: "456 Elm St, Los Ángeles, CA",
    phone: "(555) 555-9876",
    primary_color: "#2e7d32",
    special: {
      name: "Quesabirria + Consomé",
      price: 11.5,
      currency: "USD",
      description:
        "Orden de quesabirria con consomé y cebolla/cilantro. Promoción válida solo en mostrador."
    }
  },
  "mariscos-don-paco": {
    name: "Mariscos Don Paco",
    address: "789 Ocean Ave, Los Ángeles, CA",
    phone: "(555) 888-2222",
    primary_color: "#0277bd",
    special: {
      name: "Coctel de Camarón + Agua Fresca",
      price: 13.99,
      currency: "USD",
      description:
        "Coctel chico de camarón y agua fresca a elegir. Disponible solo al mostrar este código."
    }
  }
};

function PublicMenu() {
  const { slug } = useParams();
  const config = RESTAURANTS[slug];

  // Si el slug no existe en el catálogo
  if (!config) {
    return (
      <BaseLayout>
        <Card>
          <h1 style={styles.title}>Código no válido</h1>
          <p style={styles.specialDescription}>
            Este código ya no está activo o fue escrito incorrectamente.
          </p>
          <p style={styles.specialDescription}>
            Pide en el negocio un QR actualizado o revisa la dirección del
            enlace.
          </p>
        </Card>
      </BaseLayout>
    );
  }

  const { name, address, phone, primary_color, special } = config;
  const date = new Date();
  const primaryColor = primary_color || "#222";

  return (
    <BaseLayout>
      <Card>
        <header style={styles.header}>
          <div>
            <h1 style={{ ...styles.title, color: primaryColor }}>{name}</h1>
            <p style={styles.subTitle}>
              Especial Del Día •{" "}
              {date.toLocaleDateString("es-MX", {
                weekday: "long",
                day: "numeric",
                month: "short"
              })}
            </p>
            <p style={{ ...styles.subTitle, marginTop: 4 }}>
              Código: {slug.replace(/-/g, "-")}
            </p>
          </div>
        </header>

        <section style={styles.specialSection}>
          <h2 style={styles.specialTitle}>{special.name}</h2>

          <p style={styles.specialPrice}>
            {special.currency === "USD" ? "$" : ""}
            {special.price.toFixed(2)}
          </p>

          <p style={styles.specialDescription}>{special.description}</p>

          <div style={styles.infoBox}>
            {address && <p style={styles.infoLine}>{address}</p>}
            {phone && (
              <p style={styles.infoLine}>
                Tel:{" "}
                <a href={`tel:${phone}`} style={styles.link}>
                  {phone}
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
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px"
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
  }
};

export default PublicMenu;
