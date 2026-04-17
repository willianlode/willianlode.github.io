const API_URL = 'https://https://willianlode.pythonanywhere.com'; 

// Função para buscar o histórico da API
async function carregarHistorico() {
    try {
        const resposta = await fetch(`${API_URL}/historico`);
        const dados = await resposta.json();
        
        const tabela = document.getElementById('tabelaHistorico');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher
        
        dados.forEach(item => {
            const linha = `<tr>
                <td>${item.tipo_cliente}</td>
                <td>R$ ${item.valor.toFixed(2)}</td>
                <td>${item.cashback.toFixed(2)}</td>
            </tr>`;
            tabela.innerHTML += linha;
        });
    } catch (erro) {
        console.error("Erro ao carregar histórico:", erro);
    }
}

// Função para enviar os dados do formulário para a API
document.getElementById('meuFormulario').addEventListener('submit', async (evento) => {
    evento.preventDefault(); // Evita que a página recarregue
    const valor = document.getElementById('valor').value;
    const tipo_cliente = document.getElementById('tipo_cliente').value;
    try {
        await fetch(`${API_URL}/adicionar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ valor, tipo_cliente })
        });

        // Limpa o formulário
        document.getElementById('meuFormulario').reset();
        
        // Recarrega a tabela para mostrar o novo item adicionado
        carregarHistorico();
    } catch (erro) {
        console.error("Erro ao salvar consulta:", erro);
        alert("Falha ao salvar no servidor.");
    }
});

// Carrega o histórico automaticamente assim que a página é aberta
carregarHistorico();
