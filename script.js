const colaboradores = ["Cristian", "Renan", "Kaique"];

const dataInicio = new Date(2026, 0, 3);

function getFerias(mes) {
  return {
    6: "Kaique",
    5: "Cristian",
    3: "Renan"   
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

  while (data.getMonth() === mes - 1) {
    if (data.getDay() === 6) { 

      
      let diffDias = Math.floor((data - dataInicio) / (1000 * 60 * 60 * 24));
      let totalSabados = Math.floor(diffDias / 7);

      let disponiveis = colaboradores.filter(c => c !== ferias);

      let pessoa = disponiveis[totalSabados % disponiveis.length];

      let linha = `
        <tr>
          <td>${data.toLocaleDateString("pt-BR")}</td>
          <td>${pessoa}</td>
        </tr>
      `;

      tabela.innerHTML += linha;
    }

    data.setDate(data.getDate() + 1);
  }
}
