function loading(){
  $("#preloader .progress").fadeIn();
  $("#preloader").fadeIn().css({
    height: "4px",
  });
  $("#preloader").delay(500).fadeOut("slow");
};

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("button");
  const input = document.querySelector(".input-lab");
  const inputData = document.querySelector("#input-data2");
  const check = document.querySelector("#myonoffswitch");
  const select = document.querySelector("#select-date");
  let reserva = false;
  button.addEventListener("click", () => {
    loading();
    getConteudo(input.value);
  });
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.querySelector("button").click();
    }
  });
  check.addEventListener("click", () => {
    if (!reserva) {
      inputData.classList.add("hide");
      select.classList.add("show");
      reserva = true;
    } else {
      inputData.classList.remove("hide");
      select.classList.remove("show");
      reserva = false;
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
    document.querySelector(
      ".resultado"
    ).innerHTML = `<h4><br> ${users.err}</h4>`;
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
  `;
  const exit = document.querySelector(".reserva-header i");
  let reservaOpen = true;
  exit.addEventListener("click", () => {
    if (reservaOpen) {
      document.querySelector(".reserva").innerHTML = ``;
    }
  });
}

getConteudo("");

window.onload = function () {
  crear_select();
};

function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

var li = new Array();

function crear_select() {
  var div_cont_select = document.querySelectorAll(
    "[data-mate-select='active']"
  );
  var select_ = "";
  for (var e = 0; e < div_cont_select.length; e++) {
    div_cont_select[e].setAttribute("data-indx-select", e);
    div_cont_select[e].setAttribute("data-selec-open", "false");
    var ul_cont = document.querySelectorAll(
      "[data-indx-select='" + e + "'] > .cont_list_select_mate > ul"
    );
    select_ = document.querySelectorAll(
      "[data-indx-select='" + e + "'] >select"
    )[0];
    if (isMobileDevice()) {
      select_.addEventListener("change", function () {
        _select_option(select_.selectedIndex, e);
      });
    }
    var select_optiones = select_.options;
    document
      .querySelectorAll(
        "[data-indx-select='" + e + "']  > .selecionado_opcion "
      )[0]
      .setAttribute("data-n-select", e);
    document
      .querySelectorAll(
        "[data-indx-select='" + e + "']  > .icon_select_mate "
      )[0]
      .setAttribute("data-n-select", e);
    for (var i = 0; i < select_optiones.length; i++) {
      li[i] = document.createElement("li");
      if (
        select_optiones[i].selected == true ||
        select_.value == select_optiones[i].innerHTML
      ) {
        li[i].className = "active";
        document.querySelector(
          "[data-indx-select='" + e + "']  > .selecionado_opcion "
        ).innerHTML = select_optiones[i].innerHTML;
      }
      li[i].setAttribute("data-index", i);
      li[i].setAttribute("data-selec-index", e);
      // funcion click al selecionar
      li[i].addEventListener("click", function () {
        _select_option(
          this.getAttribute("data-index"),
          this.getAttribute("data-selec-index")
        );
      });
      li[i].innerHTML = select_optiones[i].innerHTML;
      ul_cont[0].appendChild(li[i]);
    }
  }
}

var cont_slc = 0;

function open_select(idx) {
  var idx1 = idx.getAttribute("data-n-select");
  var ul_cont_li = document.querySelectorAll(
    "[data-indx-select='" + idx1 + "'] .cont_select_int > li"
  );
  var hg = 0;
  var slect_open = document
    .querySelectorAll("[data-indx-select='" + idx1 + "']")[0]
    .getAttribute("data-selec-open");
  var slect_element_open = document.querySelectorAll(
    "[data-indx-select='" + idx1 + "'] select"
  )[0];
  if (isMobileDevice()) {
    if (window.document.createEvent) {
      // All
      var evt = window.document.createEvent("MouseEvents");
      evt.initMouseEvent(
        "mousedown",
        false,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      slect_element_open.dispatchEvent(evt);
    } else if (slect_element_open.fireEvent) {
      // IE
      slect_element_open.fireEvent("onmousedown");
    } else {
      slect_element_open.click();
    }
  } else {
    for (var i = 0; i < ul_cont_li.length; i++) {
      hg += ul_cont_li[i].offsetHeight;
    }
    if (slect_open == "false") {
      document
        .querySelectorAll("[data-indx-select='" + idx1 + "']")[0]
        .setAttribute("data-selec-open", "true");
      document.querySelectorAll(
        "[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul"
      )[0].style.height = hg + "px";
      document.querySelectorAll(
        "[data-indx-select='" + idx1 + "'] > .icon_select_mate"
      )[0].style.transform = "rotate(180deg)";
    } else {
      document
        .querySelectorAll("[data-indx-select='" + idx1 + "']")[0]
        .setAttribute("data-selec-open", "false");
      document.querySelectorAll(
        "[data-indx-select='" + idx1 + "'] > .icon_select_mate"
      )[0].style.transform = "rotate(0deg)";
      document.querySelectorAll(
        "[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul"
      )[0].style.height = "0px";
    }
  }
}

function salir_select(indx) {
  var select_ = document.querySelectorAll(
    "[data-indx-select='" + indx + "'] > select"
  )[0];
  document.querySelectorAll(
    "[data-indx-select='" + indx + "'] > .cont_list_select_mate > ul"
  )[0].style.height = "0px";
  document.querySelector(
    "[data-indx-select='" + indx + "'] > .icon_select_mate"
  ).style.transform = "rotate(0deg)";
  document
    .querySelectorAll("[data-indx-select='" + indx + "']")[0]
    .setAttribute("data-selec-open", "false");
}

function _select_option(indx, selc) {
  if (isMobileDevice()) {
    selc = selc - 1;
  }
  var select_ = document.querySelectorAll(
    "[data-indx-select='" + selc + "'] > select"
  )[0];
  var li_s = document.querySelectorAll(
    "[data-indx-select='" + selc + "'] .cont_select_int > li"
  );
  var p_act = (document.querySelectorAll(
    "[data-indx-select='" + selc + "'] > .selecionado_opcion"
  )[0].innerHTML = li_s[indx].innerHTML);
  var select_optiones = document.querySelectorAll(
    "[data-indx-select='" + selc + "'] > select > option"
  );
  for (var i = 0; i < li_s.length; i++) {
    if (li_s[i].className == "active") {
      li_s[i].className = "";
    }
    li_s[indx].className = "active";
  }
  select_optiones[indx].selected = true;
  select_.selectedIndex = indx;
  select_.onchange();
  salir_select(selc);
}

