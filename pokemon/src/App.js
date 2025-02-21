import React from "react";
import { Routes, Route } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";

function App() {
  const cookieConsent = Cookies.get("cookieConsent");

  const hasConsent = cookieConsent && cookieConsent !== "declined";

  return (
      <div>
        {!cookieConsent && (
            <CookieConsent
                location="bottom"
                buttonText="Прийняти"
                declineButtonText="Відмовитися"
                cookieName="cookieConsent"
                style={{ background: "#2B373B" }}
                buttonStyle={{
                  background: "#ff0033",
                  color: "#000",
                  fontSize: "13px",
                  borderRadius: "5px",
                }}
                declineButtonStyle={{
                  background: "#7f7f7f",
                  color: "#fff",
                  fontSize: "13px",
                  borderRadius: "5px",
                  marginLeft: "10px",
                }}
                onAccept={() => {
                  console.log("Cookie consent accepted");
                }}
                expires={150}
                enableDeclineButton
                onDecline={() => {
                  console.log("Cookie consent declined");
                  Cookies.set("cookieConsent", "declined", { expires: 150 });
                }}
            >
              Ми використовуємо cookie для покращення якості обслуговування та аналізу відвідуваності.
              <a
                  href="/PRIVACY_POLICY.html"
                  style={{ color: "#ff003b", textDecoration: "underline" }}
              >
                Дізнайтеся більше
              </a>
            </CookieConsent>
        )}
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </div>
  );
}

export default App;
