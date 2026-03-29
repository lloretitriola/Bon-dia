// ============================================================
// CONFIGURACIÓ — edita aquí quan tinguis el canal de WhatsApp
// ============================================================
const CONFIG = {
  urlCanal: "",        // Posa aquí l'enllaç del teu canal de WhatsApp quan el tinguis
  urlWeb: "https://bondiacadadia.cat/"
};

// ============================================================
// CARREGAR DADES
// ============================================================
async function carregarDades() {
  try {
    const resposta = await fetch("data.json");
    if (!resposta.ok) throw new Error("No s'han pogut carregar les dades");
    return await resposta.json();
  } catch (error) {
    console.error("Error carregant data.json:", error);
    return null;
  }
}

// ============================================================
// OBTENIR DATA D'AVUI
// ============================================================
function dataAvui() {
  const ara = new Date();
  const any = ara.getFullYear();
  const mes = String(ara.getMonth() + 1).padStart(2, "0");
  const dia = String(ara.getDate()).padStart(2, "0");
  return `${any}-${mes}-${dia}`;
}

function formatDataCatala(dataStr) {
  const diesSetmana = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];
  const mesos = ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"];
  const [any, mes, dia] = dataStr.split("-").map(Number);
  const data = new Date(any, mes - 1, dia);
  return `${diesSetmana[data.getDay()]}, ${dia} de ${mesos[mes - 1]} de ${any}`;
}

// ============================================================
// MOSTRAR CONTINGUT DEL DIA
// ============================================================
function mostrarContingut(entrada, dataStr) {
  // Data
  const labelData = document.getElementById("data-label");
  if (labelData) labelData.textContent = formatDataCatala(dataStr);

  // Sant
  const santLine = document.getElementById("sant-line");
  if (santLine) santLine.textContent = `Avui és la festivitat de ${entrada.sant}`;

  // Imatge
  const img = document.getElementById("imatge-dia");
  const placeholder = document.getElementById("placeholder");
  if (img && placeholder) {
    const nomImatge = `imatges/${dataStr}.jpg`;
    img.src = nomImatge;
    img.alt = `Bon dia — ${entrada.sant}`;
    img.onload = function () {
      img.style.display = "block";
      placeholder.style.display = "none";
      // Actualitzar og:image per a la previsualització de WhatsApp
      const ogImage = document.getElementById("og-image");
      if (ogImage) {
        ogImage.content = CONFIG.urlWeb + nomImatge;
      }
    };
    img.onerror = function () {
      img.style.display = "none";
      placeholder.style.display = "flex";
    };
  }

  // Reflexió
  const reflexio = document.getElementById("reflexio");
  if (reflexio) reflexio.textContent = entrada.reflexio;

  // Banner canal (només si hi ha URL configurada)
  const banner = document.getElementById("banner-canal");
  const linkCanal = document.getElementById("link-canal");
  if (banner && linkCanal && CONFIG.urlCanal) {
    linkCanal.href = CONFIG.urlCanal;
    banner.style.display = "flex";
  }
}

// ============================================================
// COMPARTIR A WHATSAPP
// ============================================================
function compartirWhatsApp() {
  const reflexio = document.getElementById("reflexio");
  const santLine = document.getElementById("sant-line");
  const labelData = document.getElementById("data-label");

  const text = [
    labelData ? labelData.textContent : "",
    santLine ? santLine.textContent : "",
    "",
    reflexio ? reflexio.textContent : "",
    "",
    CONFIG.urlWeb
  ].join("\n");

  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

// ============================================================
// INICI
// ============================================================
document.addEventListener("DOMContentLoaded", async function () {
  const dades = await carregarDades();
  if (!dades) return;

  const avui = dataAvui();
  const entrada = dades[avui];

  if (entrada) {
    mostrarContingut(entrada, avui);
  } else {
    // Si no hi ha entrada per avui (any diferent), mostrar l'última disponible
    const claus = Object.keys(dades).sort();
    const ultima = claus[claus.length - 1];
    mostrarContingut(dades[ultima], ultima);
    console.warn(`No hi ha entrada per a ${avui}. Mostrant ${ultima}.`);
  }
});
