
const pagoSelect = document.getElementById("pago");
const efectivoCampo = document.getElementById("efectivoCampo");
const transferenciaCampo = document.getElementById("transferenciaCampo");
const comprobanteInput = document.getElementById("comprobanteImg");
const previewImg = document.getElementById("preview");

pagoSelect.addEventListener("change", () => {
  if (pagoSelect.value === "Efectivo") {
    efectivoCampo.classList.remove("hidden");
    transferenciaCampo.classList.add("hidden");
  } else if (pagoSelect.value === "Transferencia") {
    transferenciaCampo.classList.remove("hidden");
    efectivoCampo.classList.add("hidden");
  } else {
    efectivoCampo.classList.add("hidden");
    transferenciaCampo.classList.add("hidden");
  }
});

comprobanteInput.addEventListener("change", () => {
  const file = comprobanteInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      previewImg.src = e.target.result;
      previewImg.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("pedidoForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const direccion = document.getElementById("direccion").value;
  const referencia = document.getElementById("referencia").value;
  const pago = pagoSelect.value;
  const pagoCon = document.getElementById("pagoCon").value;
  const digitos = document.getElementById("digitos").value;

  let mensaje = `Hola, soy ${nombre}. Quiero realizar un pedido.\n`;
  mensaje += `📍 Dirección: ${direccion}\n`;
  mensaje += `📌 Referencia: ${referencia}\n`;
  mensaje += `💳 Forma de pago: ${pago}\n`;

  if (pago === "Efectivo") {
    mensaje += `💵 Pago con: ${pagoCon}\n`;
  } else if (pago === "Transferencia") {
    mensaje += `📲 Transferencia desde cuenta terminación: ${digitos}\n`;
    mensaje += `🔢 Número de cuenta: 1234 5678 9012 3456 (Nelsy Bote)\n`;
    mensaje += `🧾 Comprobante: imagen adjunta en siguiente mensaje\n`;
  }

  const numero = "9992236981";
  const url = `https://wa.me/52${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  alert("Si subiste el comprobante, envíalo como imagen en el siguiente mensaje por WhatsApp.");
});
