const formulario = document.querySelector('.js-form');
const campoNome = document.querySelectorAll('.js-field')[0];
const campoData = document.querySelectorAll('.js-field')[1];
const botaoFormulario = document.getElementById('botao-formulario');
const tbody = document.querySelector('.js-tbody');
const trNenhuma = document.querySelector('.js-nenhuma');

const tamanhoMinimoNome = 3;
const tamanhoMaximoNome = 120;

let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

campoNome.setAttribute('minlength', tamanhoMinimoNome);
campoNome.setAttribute('maxlength', tamanhoMaximoNome);
campoData.setAttribute('max', new Date().toISOString().split('T')[0]);

const formatarData = (data) => {
    let dataDividida = [];
    if(data.includes('/')){
        dataDividida = data.split('/');
        return `${dataDividida[2]}-${dataDividida[1]}-${dataDividida[0]}`;
    }
    else{
        dataDividida = data.split('-');
        return `${dataDividida[2]}/${dataDividida[1]}/${dataDividida[0]}`;
    }
}

const limparCampos = () => {
    campoNome.value = '';
    campoData.value = '';
}

const criarElemento = (pessoa) => {
    const tr = document.createElement('tr');
    const tdNome = document.createElement('td');
    tdNome.textContent = pessoa.nome;
    const tdDataNascimento = document.createElement('td');
    tdDataNascimento.textContent = pessoa.dataNascimento;
    const tdBotao = document.createElement('td');
    const botaoEditar = document.createElement('button');
    botaoEditar.textContent = "Editar";
    const botaoDeletar = document.createElement('button');
    botaoDeletar.textContent = "Deletar";

    tdBotao.appendChild(botaoEditar);
    tdBotao.appendChild(botaoDeletar);
    tr.appendChild(tdNome);
    tr.appendChild(tdDataNascimento);
    tr.appendChild(tdBotao);

    const atualizar = (evento) => {
        evento.preventDefault();
        pessoa.nome = campoNome.value;
        pessoa.dataNascimento = formatarData(campoData.value);
        localStorage.setItem("pessoas", JSON.stringify(pessoas));
        tdNome.textContent = pessoa.nome;
        tdDataNascimento.textContent = pessoa.dataNascimento;

        botaoFormulario.textContent = "Salvar";
        limparCampos();
        formulario.removeEventListener('submit', atualizar);
        formulario.addEventListener('submit', salvarFormulario);
    }

    botaoEditar.onclick = () => {
        campoNome.value = pessoa.nome;
        campoData.value = formatarData(pessoa.dataNascimento);
        botaoFormulario.textContent = "Editar";
        formulario.removeEventListener('submit', salvarFormulario);
        formulario.addEventListener('submit', atualizar);
    }

    botaoDeletar.onclick = () => {
        pessoas = pessoas.filter(p => pessoa != p);
        localStorage.setItem("pessoas", JSON.stringify(pessoas));
        tr.remove();
        pessoas.length < 1 ? tbody.appendChild(trNenhuma) : "";
    }

    return tr;
}

const salvarFormulario = (evento) => {
    evento.preventDefault();

    const nome = campoNome.value;
    const dataNascimento = formatarData(campoData.value);

    const pessoa = { nome, dataNascimento };
    pessoas.push(pessoa);
    localStorage.setItem("pessoas", JSON.stringify(pessoas));

    trNenhuma.remove();
    const elemento = criarElemento(pessoa);
    tbody.appendChild(elemento);

    limparCampos();
}

formulario.addEventListener('submit', salvarFormulario);

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