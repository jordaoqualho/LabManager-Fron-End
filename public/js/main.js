$(window).on('load', function() {
  $('#preloader .progress').delay(1000).fadeOut();
  $('#preloader').delay(1000).fadeOut('slow');
  $('body').delay(1000).css({
      'overflow': 'visible'
  });
})


document.addEventListener("DOMContentLoaded", function() {
  // this function runs when the DOM is ready, i.e. when the document has been parsed  
  const button = document.querySelector('button');
  const input = document.querySelector('.input-lab');
  const menu = document.querySelector('.burger-menu');
  const sidebar = document.querySelector('.menu-mobile');
  const sidebarOption = document.querySelector('.menu-mobile');
  let menuOpen = false;
  button.addEventListener('click', () => {
      /*-----loadingAnimation on searh click-----*/
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

  menu.addEventListener('click', () => {
      if (!menuOpen) {
          menu.classList.add('open');
          sidebar.classList.add('ativo');
          menuOpen = true;
      } else {
          menu.classList.remove('open');
          sidebar.classList.remove('ativo');
          menuOpen = false;
      }
  })
  sidebarOption.addEventListener('click', () => {
      if (menuOpen) {
          menu.classList.remove('open');
          sidebar.classList.remove('ativo');
          menuOpen = false;
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
          <button>Reservar</button>
        </div>
      </div>`;
  }
  document.querySelector('.resultado').innerHTML = output;
}

getConteudo('');