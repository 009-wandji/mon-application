document.getElementById('quantitePlastique').addEventListener('input', berechnen);

function berechnen() {
  const qte = parseFloat(document.getElementById('quantitePlastique').value) || 0;

  // Ergebnisse Pyrolyse (in kg)
  const oelPyro = +(qte * 0.5).toFixed(2);
  const gas = +(qte * 0.2).toFixed(2);
  const rueckstaende = +(qte * 0.2).toFixed(2);
  const schweresOel = +(qte * 0.1).toFixed(2);

  // Ergebnisse Destillation (in L)
  const diesel = +(oelPyro * 0.4).toFixed(2);
  const benzin = +(oelPyro * 0.3).toFixed(2);
  const kerosin = +(oelPyro * 0.2).toFixed(2);
  const schweresOelDist = +(oelPyro * 0.1).toFixed(2);

  // Verkaufspreise (€/L)
  const preisDiesel = +(diesel * 1.2).toFixed(2);
  const preisBenzin = +(benzin * 1.5).toFixed(2);
  const preisKerosin = +(kerosin * 1.4).toFixed(2);
  const preisSchweresOelDist = +(schweresOelDist * 0.8).toFixed(2);

  const gesamtUmsatz = +(preisDiesel + preisBenzin + preisKerosin + preisSchweresOelDist).toFixed(2);

  // Ausgaben (€)
  const ausgArbeitskraft = +(qte * 0.3).toFixed(2);
  const ausgEinkauf = +(qte * 0.2).toFixed(2);
  const ausgTransport = +(qte * 0.1).toFixed(2);
  const ausgGesamt = +(ausgArbeitskraft + ausgEinkauf + ausgTransport).toFixed(2);

  // Gewinn
  const nettoGewinn = +(gesamtUmsatz - ausgGesamt).toFixed(2);

  // Anzeige
  document.getElementById('huilePyrolyse').textContent = oelPyro;
  document.getElementById('gaz').textContent = gas;
  document.getElementById('residus').textContent = rueckstaende;
  document.getElementById('huileLourde').textContent = schweresOel;

  document.getElementById('diesel').textContent = diesel;
  document.getElementById('essence').textContent = benzin;
  document.getElementById('kerosene').textContent = kerosin;
  document.getElementById('huileLourdeDist').textContent = schweresOelDist;

  document.getElementById('prixDiesel').textContent = preisDiesel + ' €';
  document.getElementById('prixEssence').textContent = preisBenzin + ' €';
  document.getElementById('prixKerosene').textContent = preisKerosin + ' €';
  document.getElementById('prixHuileLourdeDist').textContent = preisSchweresOelDist + ' €';

  document.getElementById('depMainOeuvre').textContent = ausgArbeitskraft + ' €';
  document.getElementById('depAchatDechets').textContent = ausgEinkauf + ' €';
  document.getElementById('depTransport').textContent = ausgTransport + ' €';
  document.getElementById('depTotal').textContent = ausgGesamt + ' €';

  document.getElementById('totalVentes').textContent = gesamtUmsatz + ' €';
  document.getElementById('beneficeNet').textContent = nettoGewinn + ' €';
}

// PDF export
document.addEventListener("DOMContentLoaded", () => {
  const exportBtn = document.createElement("button");
  exportBtn.id = "exportPdfBtn";
  exportBtn.textContent = "Als PDF exportieren";
  document.querySelector(".container").appendChild(exportBtn);

  exportBtn.addEventListener("click", () => {
    const element = document.querySelector(".container");

    // html2pdf dynamisch laden
    if (typeof html2pdf === "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js";
      script.onload = () => html2pdf().from(element).save("pyrolyse-ergebnisse.pdf");
      document.body.appendChild(script);
    } else {
      html2pdf().from(element).save("pyrolyse-ergebnisse.pdf");
    }
    });
  });