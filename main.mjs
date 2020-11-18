import axios from 'axios';

class Api {

  static async getEndereço (cep) {
    const resposta = new Endereço((await axios.get(`https://viacep.com.br/ws/${cep}/json/`)).data);
    console.log(resposta);
  }  
}

class Endereço {
  constructor ({logradouro, bairro, localidade}){
    this.logradouro = logradouro,
    this.bairro = bairro,
    this.localidade = localidade
  }
}

Api.getEndereço(87030460);