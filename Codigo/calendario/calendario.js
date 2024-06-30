document.addEventListener('DOMContentLoaded', () => {
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    const monthYearElement = document.getElementById('month-year');
    const calendarDaysElement = document.getElementById('calendar-days');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const criarLembreteModal = new bootstrap.Modal(document.getElementById('criarLembreteModal'));

    function updateCalendar() {
        monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

        const daysContainer = document.createElement('div');
        daysContainer.classList.add('calendar-days-container');

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        // Adiciona dias em branco antes do primeiro dia do mês
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('empty');
            daysContainer.appendChild(emptyDiv);
        }

        // Adiciona os dias do mês atual
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            dayDiv.classList.add('calendar-day');

            // Verifica se há lembretes para este dia
            if (hasReminder(currentYear, currentMonth + 1, day)) {
                dayDiv.classList.add('has-reminder');
            }

            // Adiciona evento de clique para abrir o modal de criação de lembrete
            dayDiv.addEventListener('click', () => {
                const formattedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                openModal(formattedDate);
            });

            daysContainer.appendChild(dayDiv);
        }

        // Limpa e adiciona o novo conteúdo ao calendário
        calendarDaysElement.innerHTML = '';
        calendarDaysElement.appendChild(daysContainer);
    }

    // Verifica se há lembretes para uma data específica
    function hasReminder(year, month, day) {
        const lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
        const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        
        return lembretes.some(lembrete => {
            if (lembrete && lembrete.horario && typeof lembrete.horario === 'string') {
                return lembrete.horario.startsWith(dateStr);
            }
            return false;
        });
    }

    // Função para abrir o modal com os dados preenchidos
    function openModal(date) {
        // Limpar campos anteriores do formulário
        document.getElementById('titulo-lembrete').value = '';
        document.getElementById('local-lembrete').value = '';
        document.getElementById('horario-lembrete').value = '';
        document.getElementById('descricao-lembrete').value = '';
        document.getElementById('prioridadeEscolha1').checked = true;

        // Setar a data no campo de data do formulário
        document.getElementById('horario-lembrete').value = date;

        // Abrir o modal
        criarLembreteModal.show();
    }

    // Eventos para navegação entre os meses
    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    // Inicializa o calendário
    updateCalendar();

    // Evento de envio do formulário de lembrete
    const lembreteForm = document.getElementById('lembreteForm');
    lembreteForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Recuperar os valores do formulário
        const titulo = document.getElementById('titulo-lembrete').value;
        const local = document.getElementById('local-lembrete').value;
        const horario = document.getElementById('horario-lembrete').value;
        const descricao = document.getElementById('descricao-lembrete').value;
        const prioridade = document.querySelector('input[name="prioridade"]:checked').value;

        // Validar e salvar o lembrete
        const lembrete = {
            id: new Date().getTime(), // ID único
            titulo,
            local,
            horario,
            descricao,
            prioridade,
            concluida: false // Inicializa como não concluída
        };

        // Adicionar o lembrete ao armazenamento local
        let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
        lembretes.push(lembrete);
        localStorage.setItem("lembretes", JSON.stringify(lembretes));

        // Fechar o modal
        criarLembreteModal.hide();

        // Atualizar o calendário após salvar o lembrete
        updateCalendar();
        carregarTarefas(); // Atualiza a lista de tarefas
    });
});
