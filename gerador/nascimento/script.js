const meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

    function numeroPorExtenso(n) {
      n = Number(n);
      if (isNaN(n)) return n;
      const unidades = ["zero","um","dois","três","quatro","cinco","seis","sete","oito","nove","dez","onze","doze","treze","quatorze","quinze","dezesseis","dezessete","dezoito","dezenove"];
      const dezenas = ["", "", "vinte","trinta","quarenta","cinquenta","sessenta","setenta","oitenta","noventa"];
      const centenas = ["", "cento","duzentos","trezentos","quatrocentos","quinhentos","seiscentos","setecentos","oitocentos","novecentos"];

      if (n < 20) return unidades[n];
      if (n < 100) return dezenas[Math.floor(n/10)] + (n%10 ? " e " + unidades[n%10] : "");
      if (n === 100) return "cem";
      if (n < 1000) return centenas[Math.floor(n/100)] + (n%100 ? " e " + numeroPorExtenso(n%100) : "");
      if (n < 2000) return "mil" + (n%1000 ? " " + numeroPorExtenso(n%1000) : "");
      if (n < 10000) return numeroPorExtenso(Math.floor(n/1000)) + " mil" + (n%1000 ? " " + numeroPorExtenso(n%1000) : "");
      return n;
    }

    function dataPorExtenso(dataStr) {
      if (!dataStr) return "____";
      const partes = dataStr.split('-');
      const d = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
      const dia = d.getDate().toString().padStart(2, '0');
      const mes = (d.getMonth() + 1).toString().padStart(2, '0');
      const ano = d.getFullYear();

      const diaExtenso = (Number(dia) === 1)
        ? `primeiro (01)`
        : `${numeroPorExtenso(Number(dia))} (${dia})`;

      return `${diaExtenso} dias do mês de ${meses[Number(mes) - 1]} (${mes}) do ano de ${numeroPorExtenso(ano)} (${ano})`;
    }


    function dataNascimentoExtenso(dataStr) {
      if (!dataStr) return "____";
      const partes = dataStr.split('-');
      const d = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
      const dia = d.getDate().toString().padStart(2, '0'); // mantém 01, 02, etc.
      const mes = (d.getMonth() + 1).toString().padStart(2, '0');
      const ano = d.getFullYear();
      return `${numeroPorExtenso(Number(dia))} (${dia}) do mês de ${meses[Number(mes) - 1]} (${mes}) do ano de ${numeroPorExtenso(ano)} (${ano})`;
    }


    document.getElementById('gerar').addEventListener('click', function(e){
      e.preventDefault();

      const dataTermo = dataPorExtenso(document.getElementById('dataTermo').value);
      const declarante = document.getElementById('declarante').value;
      const dataNascimento = dataNascimentoExtenso(document.getElementById('dataNascimento').value);
      const hospital = document.getElementById('hospital').value;
      const hora = document.getElementById('hora').value;
      const minuto = document.getElementById('minuto').value;
      const genero = document.getElementById('genero').value;
      const nomeCrianca = document.getElementById('nomeCrianca').value;
      const cpf = document.getElementById('cpf').value;
      
      const nomePai = document.getElementById('nomePai').value;
      const profissaoPai = document.getElementById('profissaoPai').value;
      const naturalPai = document.getElementById('naturalPai').value;
      const civilPai = document.getElementById('civilPai').value;

      const nomeMae = document.getElementById('nomeMae').value;
      const profissaoMae = document.getElementById('profissaoMae').value;
      const naturalMae = document.getElementById('naturalMae').value;
      const civilMae = document.getElementById('civilMae').value;

      const avos = document.getElementById('avos').value;
      const testemunhas = document.getElementById('testemunhas').value;

      const texto = `Aos ${dataTermo}, neste ofício, em SALVADOR-BA, ______________________________________, compareceu ${declarante}, e declarou que no dia ${dataNascimento}, às ${numeroPorExtenso(hora)} (${hora}) horas e ${numeroPorExtenso(minuto)} (${minuto}) minutos, no(a) ${hospital}, nasceu uma criança do gênero ${genero}, a qual recebeu o nome de ${nomeCrianca}, de CPF ${cpf}. Filho(a) de ${nomePai}, ${profissaoPai}, natural de(a) ${naturalPai}, ${civilPai} e de ${nomeMae}, ${profissaoMae}, ${civilMae}, natural de(a) ${naturalMae}. sendo avós: ${avos}. Foram testemunhas: ${testemunhas}. Nada mais declarou. Do que para constar, lavrei este termo, que lido e achado conforme, vai assinado pelo declarante ${declarante}. Eu, _______________, conferi, subscrevo e assino. Era o que continha o assento que foi transcrito em sua integralidade.`;

      document.getElementById('termo').value = texto;
    });

    document.getElementById('copiar').addEventListener('click', async () => {
      const texto = document.getElementById('termo').value;
      if (!texto) return alert('Gere o termo antes de copiar.');
      try {
        await navigator.clipboard.writeText(texto);
        alert('Texto copiado com sucesso!');
      } catch {
        alert('Erro ao copiar. Copie manualmente.');
      }
    });
    document.getElementById('limpar').addEventListener('click', () => {
      if (confirm('Deseja realmente limpar todos os campos?')) {
        document.getElementById('form').reset();
        document.getElementById('termo').value = '';
      }
    });