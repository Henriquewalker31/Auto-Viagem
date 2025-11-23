function calcular() {
  const consumo = Number(document.getElementById("Consumo").value);
  const litros = Number(document.getElementById("Litros").value);

  const resultadoBox = document.getElementById("resultado");

  if (!consumo || !litros) {
    resultadoBox.style.display = "block";
    resultadoBox.className = "alert alert-danger";
    resultadoBox.innerText = "Preencha todos os campos!";
    return;
  }

  const autonomia = consumo * litros;

  resultadoBox.style.display = "block";
  resultadoBox.className = "alert alert-success";
  resultadoBox.innerText = "Autonomia: " + autonomia + " km";

  autonomiaSalva(autonomia, litros);
  mostrarHistorico();
}

function autonomiaSalva(autonomia, litros) {
  let historico = JSON.parse(localStorage.getItem("HistoricoAuto")) || [];

  historico.push({
    autonomia: autonomia,
    litros: litros,
  });

  localStorage.setItem("historicoAuto", JSON.stringify(historico));
}

function mostrarHistorico() {
  let historico = JSON.parse(localStorage.getItem("historicoAuto")) || [];
  let area = document.getElementById("historico");

  if (historico.length === 0) {
    area.innerHTML = "<p>Nenhum historico salvo</p>";
    return;
  }

  area.innerHTML = historico
    .map(
      (item) => `
    <p>
    Ultima autonomia: <strong>${item.autonomia} km</strong><br>
    Litros usados: <strong>${item.litros} litros</strong><br>
    
    </p>
    <hr>
    `
    )
    .join("");
}
window.onload = () => {
  mostrarHistorico();
};
