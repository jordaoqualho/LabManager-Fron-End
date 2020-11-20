document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("button");
  const input = document.querySelector(".input-lab");
  button.addEventListener("click", () => {
    $("#preloader .progress").fadeIn();
    $("#preloader").fadeIn().css({
      height: "4px",
    });
    $("#preloader").delay(500).fadeOut("slow");
    getConteudo(input.value);
  });
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.querySelector("button").click();
    }
  });
});

async function getConteudo(value) {
  let endereco = `https://lab-manager.herokuapp.com/laboratorio/getByNome/${value}`;
  if (value == undefined || value == "") {
    endereco = "https://lab-manager.herokuapp.com/laboratorios";
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
    document.querySelector(".resultado").innerHTML = `<h4><br> ${users.err}</h4>`;
    return;
  }
  let output = "";
  for (let user of users) {
    output += `<div class="lab">
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
  document.querySelector(".resultado").innerHTML = output;
}

async function openReserva(id) {
  let endereco = `https://lab-manager.herokuapp.com/laboratorio/${id}`;
  const response = await fetch(endereco);
  const user = await response.json();
  document.querySelector(".reserva").innerHTML = `
      <div class="reserva-container">
      <div class="reserva-header">
        <h1>${user[0].nome}</h1>
        <p>${user[0].descricao} / ${user[0].capacidade} computadores</p>
        <i class="far fa-times-circle"></i>
      </div>
      <section class="reserva"></section>
      <div class="reserva-inputs">                  
        <div class="onoffswitch">
            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" checked>
            <label class="onoffswitch-label" for="myonoffswitch">
                <span class="onoffswitch-inner"></span>
                <span class="onoffswitch-switch"></span>
            </label>
        </div>            
        <div class="input-containers data-container"  style="max-width: 100% !important;">
            <div class="icon">
              <i class="far fa-calendar-alt"></i>
            </div>   
            <input id="input-data2" class="input-data" value="0"   
              type="text" data-lang="pt" data-large-mode="true" 
              data-large-default="true" data-lock="from" 
              data-translate-mode="true" data-theme="my-style" 
              data-format="d/m/Y" data-max-year="2050" data-min-year="2000"/>                 
              <div class="select_mate" data-mate-select="active" id="select-date">
                  <select onclick="return false;" onchange="" onclick="return false;" id="">
                    <option value="0">Domingo</option>
                    <option value="1">Segunda</option>
                    <option value="2">Terça</option>
                    <option value="3">Quarta</option>
                    <option value="4">Quinta</option>
                    <option value="5">Sexta</option>
                    <option value="6">Sabado</option>                           
                  </select>
                  <p class="selecionado_opcion" onclick="open_select(this)"></p>
                  <span onclick="open_select(this)" class="icon_select_mate">
                    <svg fill="#FF9F2E" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                        <path d="M0-.75h24v24H0z" fill="none" />
                    </svg>
                  </span>
                  <div class="cont_list_select_mate">
                    <ul class="cont_select_int"> </ul>
                  </div>
              </div>
        </div>
        <div class="input-containers horario-container" style="max-width: 100% !important;">
            <div class="icon">
              <i class="far fa-clock"></i>
            </div>
            <div class="select_mate" data-mate-select="active" >
              <select onclick="return false;" onchange="" onclick="return false;" id="">
                  <option value="0">01:00</option>
                  <option value="1">02:00</option>
                  <option value="2">03:00</option>
                  <option value="3">04:00</option>
                  <option value="4">05:00</option>
                  <option value="5">06:00</option>
                  <option value="6">07:00</option>
                  <option value="7">08:00</option>
                  <option value="8">09:00</option>
                  <option value="9">10:00</option>
              </select>
              <p class="selecionado_opcion" onclick="open_select(this)"></p>
              <span onclick="open_select(this)" class="icon_select_mate">
                  <svg fill="#FF9F2E" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
                    <path d="M0-.75h24v24H0z" fill="none" />
                  </svg>
              </span>
              <div class="cont_list_select_mate">
                  <ul class="cont_select_int"> </ul>
              </div>
            </div>
        </div>               
      </div>            
      <div class="buttons">
        <button>Reservar</button>
      </div>                        
    </div>    
    
  `    
  const exit = document.querySelector(".reserva-header i");
  let reservaOpen = true;
  exit.addEventListener("click", () => {
    if (reservaOpen) {
      document.querySelector(".reserva").innerHTML = ``;
    } 
  });  
}

getConteudo("");
