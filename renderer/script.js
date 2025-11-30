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

//funcao calcular valor gasto

function calcularValor() {
  const valor = Number(document.getElementById("Valor").value);
  const lit = Number(document.getElementById("Lit").value);

  const ResultadoValorBox = document.getElementById("ResultadoValor");

  if (isNaN(valor) || isNaN(lit) || valor === 0 || lit === 0){
    ResultadoValorBox.style.display = "block";
    ResultadoValorBox.className = "alert alert-danger";
    ResultadoValorBox.innerText = "Preencha os Campos!";
    return;
  }
   const valorGasto = valor * lit;

  ResultadoValorBox.style.display = "block";
  ResultadoValorBox.className = "alert alert-success";
  ResultadoValorBox.innerText = "Valor gasto: " + valorGasto + " R$";

  valorSalvo(valorGasto, lit);
  mostrarValorHistorico();
}
function valorSalvo(valorGasto, lit) {
  let historicoValor = JSON.parse(localStorage.getItem("HistoricoValor")) || [];

  historicoValor.push({
    valor: valorGasto,
    litros: lit,
  })
   localStorage.setItem("historicoValor", JSON.stringify(historicoValor));
}
function mostrarValorHistorico() {
  let historicoValor = JSON.parse(localStorage.getItem("historicoValor")) || [];
  let area = document.getElementById("historicoValor");

  if (historicoValor.length === 0) {
    area.innerHTML = "<p>Nenhum historico salvo</p>";
    return;
  }

  area.innerHTML = historicoValor
    .map(
      (item) => `
    <p>
    Ultimo valor: <strong>${item.valor} R$</strong><br>
    Litros: <strong>${item.litros} litros</strong><br>
    
    </p>
    <hr>
    `
    )
    .join("");
}
window.onload = () => {
  mostrarHistorico();
  mostrarValorHistorico();
};
