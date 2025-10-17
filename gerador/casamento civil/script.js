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

      return `${diaExtenso} dias do mês de ${meses[Number(mes) - 1]} (${mes}) de ${numeroPorExtenso(ano)} (${ano})`;
    }


    function dataNascimento1Extenso(dataStr) {
      if (!dataStr) return "____";
      const partes = dataStr.split('-');
      const d = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
      const dia = d.getDate().toString().padStart(2, '0'); // mantém 01, 02, etc.
      const mes = (d.getMonth() + 1).toString().padStart(2, '0');
      const ano = d.getFullYear();
      return `${numeroPorExtenso(Number(dia))} (${dia}) do mês de ${meses[Number(mes) - 1]} (${mes}) do ano de ${numeroPorExtenso(ano)} (${ano})`;
    }
    
    function dataNascimento2Extenso(dataStr) {
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
      const nascimento1Ext = dataNascimento1Extenso(document.getElementById('dataNascimento1').value);
      const celebrante = document.getElementById('celebrante').value;
      const localdaCelebracao = document.getElementById('localdaCelebracao').value;
      const RegimedeBens = document.getElementById('RegimedeBens').value;
      const nomeCônjuge1 = document.getElementById('nomeCônjuge1').value;
      const nomeAtualCônjuge1 = document.getElementById('nomeAtualCônjuge1').value;
      const cpf1 = document.getElementById('cpf1').value;
      //const dataNascimento1 = document.getElementById('dataNascimento1').value;
      const profissao1 = document.getElementById('profissao1').value;
      const natural1 = document.getElementById('natural1').value;
      const nacionalidade1 = document.getElementById('nacionalidade1').value;
      const civil1 = document.getElementById('civil1').value;
      const endereco1 = document.getElementById('endereco1').value;
      const filiacao1 = document.getElementById('filiacao1').value;
      const genero1 = document.getElementById('genero1').value;

      const nascimento2Ext = dataNascimento2Extenso(document.getElementById('dataNascimento2').value);
      const nomeCônjuge2 = document.getElementById('nomeCônjuge2').value;
      const nomeAtualCônjuge2 = document.getElementById('nomeAtualCônjuge2').value;
      const cpf2 = document.getElementById('cpf2').value;
      //const dataNascimento2 = document.getElementById('dataNascimento2').value;
      const profissao2 = document.getElementById('profissao2').value;
      const natural2 = document.getElementById('natural2').value;
      const nacionalidade2 = document.getElementById('nacionalidade2').value;
      const civil2 = document.getElementById('civil2').value;
      const endereco2 = document.getElementById('endereco2').value;
      const filiacao2 = document.getElementById('filiacao2').value;
      const genero2 = document.getElementById('genero2').value;
      const testemunhas = document.getElementById('testemunhas').value;



      const texto = `Aos ${dataTermo}, neste ofício, NESTA CIDADE SALVADOR-BA, perante o(a) Dr(a) ${celebrante}, observada a prescrição do artigo 193 do Código Civil e sob o regime de ${RegimedeBens}, receberam-se em matrimônio os nubentes, ${nomeCônjuge1}, que passou a adotar o nome de ${nomeAtualCônjuge1} e ${nomeCônjuge2}, que passou a adotar o nome de ${nomeAtualCônjuge2}, comigo _______________,________________, SALVADOR-BA, ao fim nomeado e assinado, depois de legalmente habilitados. ${genero1} ${nomeCônjuge1}, de CPF: ${cpf1}, ${civil1}, ${profissao1}, NASCIDO ${natural1}, de NACIONALIDADE ${nacionalidade1}, EM ${nascimento1Ext}, residente e domiciliado ${endereco1}, Filho(a) de ${filiacao1}. ${genero2}  ${nomeCônjuge2}, de CPF: ${cpf2}, ${civil2}, ${profissao2}, NASCIDO ${natural2}, de NACIONALIDADE ${nacionalidade2}, EM ${nascimento2Ext}, residente e domiciliado ${endereco2}, Filho(a) de ${filiacao2}. Foram testemunhas: ${testemunhas}." Nada mais contém o dito termo donde fielmente foi extraída a presente certidão, depois de lhes ser lido por mim: ___________, que subscrevi e dou fé.`;

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
