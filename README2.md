# Bon dia cada dia

Web que mostra cada dia una imatge de bon dia i el santoral català.

## Estructura de fitxers

```
bon-dia/
├── index.html        ← Pàgina principal
├── about.html        ← Pàgina "Sobre aquest lloc"
├── estils.css        ← Disseny
├── app.js            ← Lògica
├── data.json         ← Totes les entrades de l'any (sant + reflexió)
└── imatges/
    ├── 2026-01-01.jpg
    ├── 2026-01-02.jpg
    └── ...           ← Una imatge per dia, nomenada amb la data
```

## Com afegir imatges

Posa les imatges dins la carpeta `imatges/` amb el format:
`YYYY-MM-DD.jpg` (exemple: `2026-03-23.jpg` per Sant Jordi)

Format recomanat: JPG, amplada mínima 800px.

## Com configurar el canal de WhatsApp

Quan tinguis el canal creat, obre `app.js` i edita la línia:
```javascript
urlCanal: "",  // Posa aquí l'enllaç del teu canal
```

## Com actualitzar les dades per a un any nou

1. Modifica l'Excel `bon_dia_cada_dia_2026.xlsx`
2. Executa el script de conversió o genera un nou `data.json`
3. Puja el nou `data.json` al repositori

## GitHub Pages

Activat des de: Settings → Pages → Branch: main → / (root)

URL: https://lloretitriola.github.io/bon-dia/
