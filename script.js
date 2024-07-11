const formulario = document.querySelector('.js-form');
const campoNome = document.querySelectorAll('.js-field')[0];
const campoData = document.querySelectorAll('.js-field')[1];
const tbody = document.querySelector('.js-tbody');
const trNenhuma = document.querySelector('.js-nenhuma');

const tamanhoMinimoNome = 3;
const tamanhoMaximoNome = 120;

let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

campoNome.setAttribute('minlength', tamanhoMinimoNome);
campoNome.setAttribute('maxlength', tamanhoMaximoNome);
campoData.setAttribute('max', new Date().toISOString().split('T')[0]);

const criarElemento = (pessoa) => {
    const tr = document.createElement('tr');
    const tdNome = document.createElement('td');
    tdNome.textContent = pessoa.nome;
    const tdDataNascimento = document.createElement('td');
    tdDataNascimento.textContent = pessoa.dataNascimento;
    tr.appendChild(tdNome);
    tr.appendChild(tdDataNascimento);
    return tr;
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = campoNome.value;
    let dataNascimento = campoData.value.split('-');
    dataNascimento = `${dataNascimento[2]}/${dataNascimento[1]}/${dataNascimento[0]}`;

    const pessoa = { nome, dataNascimento };
    pessoas.push(pessoa);
    localStorage.setItem("pessoas", JSON.stringify(pessoas));

    trNenhuma.remove();
    const elemento = criarElemento(pessoa);
    tbody.appendChild(elemento);

    campoNome.value = '';
    campoData.value = '';
});

campoNome.oninvalid = () => {
    campoNome.setCustomValidity("");
    if(!campoNome.validity.valid && campoNome.value.length < tamanhoMinimoNome){
        campoNome.setCustomValidity(`O nome precisa ter no mínimo ${tamanhoMinimoNome} letras.`);
    }
    else if(!campoNome.validity.valid && campoNome.value.length > tamanhoMaximoNome){
        campoNome.setCustomValidity(`O nome precisa ter no máximo ${tamanhoMaximoNome} letras.`);
    }
    else if(!campoNome.validity.valid){
        campoNome.setCustomValidity("Nome inválido.");
    }
}

if(pessoas.length > 0){
    trNenhuma.remove();
    pessoas.forEach(pessoa => {
        const elemento = criarElemento(pessoa);
        tbody.appendChild(elemento);
    });
}