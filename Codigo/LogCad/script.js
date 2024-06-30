document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');

    // Event listener para alternar para o formulário de registro
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    // Event listener para alternar para o formulário de login
    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    // Event listener para o formulário de registro
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signUpName').value;
        const cpf = document.getElementById('signUpCPF').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;

        if (name && cpf && email && password) {
            const user = {
                name: name,
                cpf: cpf,
                email: email,
                password: password
            };

            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Verificar se o email ou CPF já está registrado
            const existingUser = users.find(u => u.email === email || u.cpf === cpf);
            if (existingUser) {
                alert('Email ou CPF já registrados');
                return;
            }

            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Usuário registrado com sucesso');
            signUpForm.reset();
            container.classList.remove("active");
        } else {
            alert('Por favor, preencha todos os campos');
        }
    });

    // Event listener para o formulário de login
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            alert('Login bem-sucedido');
            signInForm.reset();

            // Salvar o usuário logado no Local Storage
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            // Redirecionar para a página desejada após o login bem-sucedido
            window.location.href = '/usuario/user.html';
        } else {
            alert('Email ou senha inválidos');
        }
    });

    // Verifica se já existe algum usuário logado
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        // Se existir, redireciona para a página principal (user.html) ou outra página desejada
        window.location.href = '/usuario/user.html';
    }
});
