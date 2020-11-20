document.addEventListener("DOMContentLoaded", function() {
  const button = document.querySelector('button');
  const input = document.querySelector('.input-lab');  
  button.addEventListener('click', () => {
      $('#preloader .progress').fadeIn();
      $('#preloader').fadeIn().css({
          'height': '4px'
      });
      $('#preloader').delay(500).fadeOut('slow');
      getConteudo(input.value);
  })
  input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
          event.preventDefault();
          document.querySelector('button').click();
      }
  })  
});

async function getConteudo(value) {
  let endereco = `https://lab-manager.herokuapp.com/laboratorio/getByNome/${value}`;
  if (value == undefined || value == '') {
      endereco = "https://lab-manager.herokuapp.com/laboratorios"
  }
  try {
      const response = await fetch(endereco);
      const data = await response.json();
      show(data);
  } catch (error) {
      console.log(error);
  }
}

function show(users) {
  if (users.err || users.length == 0) {
      console.log("entrou");
      document.querySelector('.resultado').innerHTML = `<h4><br> ${users.err}</h4>`;
      return;
  }
  let output = ''
  for (let user of users) {
      output +=
          `<div class="lab">
        <div class="lab-title">
          <h1>${user.nome}</h1>
          <p>${user.descricao}
            <br> 
            ${user.capacidade} Computadores
          </p>
        </div>
        <div class="button-box">
          <button onclick="openReserva(${user.id})">Reservar</button>
        </div>
      </div>`;
  }
  document.querySelector('.resultado').innerHTML = output;
}

function openReserva(id){
  //let endereco = `https://lab-manager.herokuapp.com/laboratorio/${id}`;
  //const response = await fetch(endereco);
  console.log(id);
}

getConteudo('');



