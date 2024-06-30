document.addEventListener('DOMContentLoaded', function() {
    const userInfoContainer = document.getElementById('userInfo');

    // Função para carregar e exibir as informações do usuário
    function displayUserInfo(user) {
        userInfoContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h2>Informações do Usuário</h2>
                    <p><i class="fa fa-user"></i> <strong>Nome:</strong> <span id="userName">${user.name}</span></p>
                    <p><i class="fa fa-id-card"></i> <strong>CPF:</strong> <span id="userCPF">${user.cpf}</span></p>
                    <p><i class="fa fa-envelope"></i> <strong>Email:</strong> <span id="userEmail">${user.email}</span></p>
                    <button id="editButton" class="btn btn-primary">Editar</button>
                    <button id="saveButton" class="btn btn-success" style="display:none;">Salvar</button>
                    <button id="deleteButton" class="btn btn-danger">Deletar</button>
                </div>
            </div>
        `;

        document.getElementById('editButton').addEventListener('click', () => {
            enableEdit(user);
        });

        document.getElementById('saveButton').addEventListener('click', () => {
            saveEdit(user);
        });

        document.getElementById('deleteButton').addEventListener('click', () => {
            deleteUser(user);
        });
    }

    // Função para habilitar a edição dos dados do usuário
    function enableEdit(user) {
        document.getElementById('userName').innerHTML = `<input type="text" id="editName" value="${user.name}" class="form-control">`;
        document.getElementById('userCPF').innerHTML = `<input type="text" id="editCPF" value="${user.cpf}" class="form-control">`;
        document.getElementById('userEmail').innerHTML = `<input type="email" id="editEmail" value="${user.email}" class="form-control">`;

        document.getElementById('editButton').style.display = 'none';
        document.getElementById('saveButton').style.display = 'inline';
    }

    // Função para salvar as alterações dos dados do usuário
    function saveEdit(user) {
        const newName = document.getElementById('editName').value;
        const newCPF = document.getElementById('editCPF').value;
        const newEmail = document.getElementById('editEmail').value;

        if (newName && newCPF && newEmail) {
            user.name = newName;
            user.cpf = newCPF;
            user.email = newEmail;

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.email === user.email);
            if (userIndex > -1) {
                users[userIndex] = user;
            } else {
                users.push(user);
            }

            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            alert('Informações atualizadas com sucesso');
            displayUserInfo(user);
        } else {
            alert('Por favor, preencha todos os campos');
        }
    }

    // Função para deletar o usuário
    function deleteUser(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(u => u.email !== user.email);
        localStorage.setItem('users', JSON.stringify(users));

        localStorage.removeItem('loggedInUser');
        alert('Usuário deletado com sucesso');
        window.location.href = '/LogCad/logcad.html';
    }

    // Verificar se há um usuário logado no Local Storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Exibir as informações do usuário logado
        displayUserInfo(loggedInUser);
    } else {
        // Se não há usuário logado, redirecionar para a página de login
        window.location.href = '/LogCad/logcad.html';
    }
});
