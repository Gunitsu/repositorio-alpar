const inputs = document.querySelectorAll('.input');
const button = document.querySelector('.login__button');
const checkbox = document.querySelector('.input--checkbox');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

//Função para verificar se ambos os campos de usuário e senha estão preenchidos
function checkInputs() {
  const usernameValue = usernameInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (usernameValue !== '' && passwordValue !== '' && passwordValue.length >= 4) {
    loginBtn.removeAttribute('disabled');
  } else {
    loginBtn.setAttribute('disabled', true);
  }
}

//Adiciona eventos de entrada aos campos de usuário e senha
usernameInput.addEventListener('input', checkInputs);
passwordInput.addEventListener('input', checkInputs);

//Adiciona evento de clique ao botão de login para redirecionar para outra página
loginBtn.addEventListener('click', function() {
  const usernameValue = usernameInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  //Verifica se ambos os campos de usuário e senha estão preenchidos antes de redirecionar
  if (usernameValue !== '' && passwordValue !== '') {
    //Redireciona para a página desejada
    window.location.href = "site/site.html";

    //Verifica se a opção "manter login" está marcada
    if (checkbox.checked) {
      //Salva os dados de login
      localStorage.setItem('username', usernameValue);
      localStorage.setItem('password', passwordValue);
    } else {
      //Se "manter login" não estiver marcado, limpa os dados
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  }
});

//Verifica se há dados de login salvos
document.addEventListener('DOMContentLoaded', function() {
  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem('password');

  //Se houver dados de login salvos, preencha os campos de login
  if (savedUsername && savedPassword) {
    usernameInput.value = savedUsername;
    passwordInput.value = savedPassword;
    checkbox.checked = true;
    checkInputs();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var audio = document.getElementById('audio');
  audio.volume = 0.1;
});