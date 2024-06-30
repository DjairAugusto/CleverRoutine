document.addEventListener('DOMContentLoaded', function() {
    carregarConquistas();
});

function verificarConquistas() {
    let tarefasConcluidas = Number(localStorage.getItem('tarefasConcluidas')) || 0;

    // Verificar cada conquista e atualizar conforme necessário
    atualizarConquista(5, tarefasConcluidas, '/conquistasEtarefas/Trpys/trpmadeira.png', 'Parabéns! Você adquiriu o troféu de Madeira', 'trofeu-5');
    atualizarConquista(10, tarefasConcluidas, '/conquistasEtarefas/Trpys/trpcobre.png', 'Parabéns! Você adquiriu o troféu de Bronze', 'trofeu-10');
    atualizarConquista(20, tarefasConcluidas, '/conquistasEtarefas/Trpys/trpbronze.png', 'Parabéns! Você adquiriu o troféu de Prata', 'trofeu-20');
    atualizarConquista(30, tarefasConcluidas, '/conquistasEtarefas/Trpys/trpprata.png', 'Parabéns! Você adquiriu o troféu de Ouro', 'trofeu-30');
    atualizarConquista(40, tarefasConcluidas, '/conquistasEtarefas/Trpys/trpouro.png', 'Parabéns! Você adquiriu o troféu de Platina', 'trofeu-40');
    atualizarConquista(50, tarefasConcluidas, '/conquistasEtarefas/Trpys/trpdiamante.png', 'Parabéns! Você adquiriu o troféu de Diamante', 'trofeu-50');
}

function atualizarConquista(numeroTarefas, tarefasConcluidas, imagem, mensagem, idElemento) {
    let conquistaElement = document.getElementById(idElemento);

    if (!conquistaElement) {
        console.error(`Elemento do troféu ${numeroTarefas} não encontrado.`);
        return;
    }

    let progresso = (tarefasConcluidas / numeroTarefas) * 100;

    if (tarefasConcluidas >= numeroTarefas) {
        conquistaElement.classList.remove('locked');
        conquistaElement.innerHTML = `
            <div class="trofeu-inner">
                <img src="${imagem}" alt="Troféu">
                <div class="progress bg-secondary">
                    <div class="progress-bar" style="width: ${progresso}%;" role="progressbar" aria-valuenow="${progresso}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        `;
    } else {
        conquistaElement.innerHTML = `
            <div class="trofeu-inner">
                <img src="${imagem}" alt="Troféu">
                <i class="bi bi-lock-fill lock-icon"></i>
                <div class="progress bg-secondary">
                    <div class="progress-bar" style="width: ${progresso}%;" role="progressbar" aria-valuenow="${progresso}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        `;
    }
}

function carregarConquistas() {
    // Chama a função para verificar as conquistas
    verificarConquistas();
}
