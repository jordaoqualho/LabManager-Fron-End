
document.addEventListener("DOMContentLoaded", function() { 
  // this function runs when the DOM is ready, i.e. when the document has been parsed  
  const button = document.querySelector('button');
  const input = document.querySelector('.input-lab');
  button.addEventListener('click', () => {
    getConteudo(input.value);
  })
});

async function getConteudo(value) {
    try {
        const response = await fetch('http://localhost:1234/');
        const data = await response.json();
        show(data, value);
    } catch (error) {
        console.log(error);
    }
}

function show(users, value) {
  let output = ''  
  for (let user of users) { 
    if (user.name===value) {
      output += 
      `<div class="lab">
      <div class="lab-title">
         <h1>${user.name}</h1>
         <p>bloco 10
            <br> 44 Computadores
         </p>
      </div>
      <div class="button-box">
         <button>Reservar</button>
      </div>`;
    }         
  }
  document.querySelector('.resultado').innerHTML = output;
}



