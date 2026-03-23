const colaboradores = ["Cristian", "Renan", "Kaique"];

const dataInicio = new Date(2026, 0, 3);

const ferias = {
  "Cristian": {
    inicio: new Date(2026, 5, 1), 
    fim: new Date(2026, 6, 30)    
  },
  "Renan": {
    inicio: new Date(2026, 3, 6), 
    fim: new Date(2026, 4, 5)     
  },
  "Kaique": {
    inicio: new Date(2026, 6, 1), 
    fim: new Date(2026, 6, 30)    
  }
};

function estaDeFerias(nome, data) {
  if (!ferias[nome]) return false;
  return data >= ferias[nome].inicio && data <= ferias[nome].fim;
}

function gerarEscala() {
  const input = document.getElementById("mesSelecionado").value;
  if (!input) return alert("Selecione um mês!");

  const [ano, mes] = input.split("-").map(Number);
  const tabela = document.getElementById("tabelaEscala");

  tabela.innerHTML = "";

  let data = new Date(ano, mes - 1, 1);
  
  let ultimoFolguista = null;

  while (data.getMonth() === mes - 1) {
    if (data.getDay() === 6) { 
      
      let diffDias = Math.floor((data - dataInicio) / (1000 * 60 * 60 * 24));
      let totalSabados = Math.floor(diffDias / 7);

      let pessoa = null;
      let tentativas = 0;
      let indiceRodizio = totalSabados % colaboradores.length;

      while (tentativas < colaboradores.length) {
        let candidato = colaboradores[indiceRodizio];

        
        indiceRodizio = (indiceRodizio + 1) % colaboradores.length;
        tentativas++;

        
        if (!estaDeFerias(candidato, data) && candidato !== ultimoFolguista) {
          pessoa = candidato;
          break;
        }
      }

      ultimoFolguista = pessoa; 

      let linha = `
        <tr>
          <td>${data.toLocaleDateString("pt-BR")}</td>
          <td>${pessoa || "Cristian"}</td>
        </tr>
      `;

      tabela.innerHTML += linha;
    }

    data.setDate(data.getDate() + 1);
  }
}
