import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import PublicMenu from "./PublicMenu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/r/:slug" element={<PublicMenu />} />
        <Route
          path="/"
          element={
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "system-ui, sans-serif"
              }}
            >
              <div style={{ textAlign: "center", padding: 16 }}>
                <h1 style={{ marginBottom: 8 }}>QR Specials – Módulo 01</h1>
                <p style={{ maxWidth: 360 }}>
                  Esta es la versión de prueba para la pantalla pública.
                  Escanea un QR o entra a una URL del tipo:
                  <br />
                  <code>/r/taqueria-el-guero</code>
                </p>
              </div>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
