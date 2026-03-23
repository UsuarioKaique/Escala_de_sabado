const colaboradores = ["Cristian", "Kaique", "Renan"];

// ordem inicial
let ordemAtual = 0;

function getFerias(mes) {
  return {
    3: "Renan",   // Abril (0 = Jan)
    5: "Cristian",// Junho
    6: "Kaique"   // Julho
  }[mes] || null;
}

function gerarEscala() {
  const input = document.getElementById("mesSelecionado").value;
  if (!input) return alert("Selecione um mês!");

  const [ano, mes] = input.split("-").map(Number);
  const tabela = document.getElementById("tabelaEscala");

  tabela.innerHTML = "";

  let data = new Date(ano, mes - 1, 1);
  let ferias = getFerias(mes - 1);

  let index = ordemAtual;

  while (data.getMonth() === mes - 1) {
    if (data.getDay() === 6) { // sábado
      let disponiveis = colaboradores.filter(c => c !== ferias);

      let pessoa = disponiveis[index % disponiveis.length];

      let linha = `
        <tr>
          <td>${data.toLocaleDateString("pt-BR")}</td>
          <td>${pessoa}</td>
        </tr>
      `;

      tabela.innerHTML += linha;
      index++;
    }

    data.setDate(data.getDate() + 1);
  }
}