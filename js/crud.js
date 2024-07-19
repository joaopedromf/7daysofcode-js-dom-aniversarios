const formulario = document.querySelector('.js-form');
const campoNome = document.querySelectorAll('.js-field')[0];
const campoData = document.querySelectorAll('.js-field')[1];
const botaoAdicionar = document.getElementById('botao-adicionar');
const botaoCancelar = document.getElementById('botao-cancelar');
const botaoFormulario = document.getElementById('botao-formulario');
const tabela = document.querySelector('table');
const tbody = document.querySelector('.js-tbody');
const trNenhuma = document.querySelector('.js-nenhuma');

let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

const abrirFormulario = () => {
    if(formulario.classList.contains('esconder')){
        formulario.style.opacity = "0";
        formulario.classList.remove('esconder');
        window.setTimeout(() => formulario.style.opacity = "1", 300);
        tabela.classList.add('tabela-form-aberto');
        window.setTimeout(() => tabela.classList.remove('tabela-form-aberto'), 1000);
    }
};
const fecharFormulario = (animarTabela = true) => {
    limparCampos();
    formulario.removeEventListener('submit', atualizar);
    formulario.addEventListener('submit', salvarFormulario);
    botaoFormulario.textContent = "Salvar";
    formulario.classList.add('form-fechado');
    if(animarTabela){
        tabela.classList.add('tabela-form-fechado');
        formulario.style.opacity = "0";
    }
    window.setTimeout(() =>{ 
        formulario.classList.remove('form-fechado');
        formulario.classList.add('esconder');
    }, 1500);
    if(animarTabela){
        window.setTimeout(() => tabela.classList.remove('tabela-form-fechado'), 1500);
    }
}

botaoAdicionar.addEventListener('click', () => {
    abrirFormulario();
});

botaoCancelar.addEventListener('click', () => {
    fecharFormulario();
});

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

const atualizar = (evento) => {
    evento.preventDefault();
    window.pessoa.nome = campoNome.value;
    window.pessoa.dataNascimento = formatarData(campoData.value);
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
    window.tdNome.textContent = window.pessoa.nome;
    window.tdDataNascimento.textContent = window.pessoa.dataNascimento;

    botaoFormulario.textContent = "Salvar";
    limparCampos();
    formulario.removeEventListener('submit', atualizar);
    formulario.addEventListener('submit', salvarFormulario);
    fecharFormulario();
}

const criarElemento = (pessoa) => {
    const tr = document.createElement('tr');
    const tdNome = document.createElement('td');
    tdNome.textContent = pessoa.nome;
    const tdDataNascimento = document.createElement('td');
    tdDataNascimento.classList.add('td-data');
    tdDataNascimento.textContent = pessoa.dataNascimento;
    const tdBotao = document.createElement('td');
    tdBotao.classList.add('td-botoes');
    const botaoEditar = document.createElement('button');
    botaoEditar.setAttribute('title', 'Editar');
    const iconeEditar = document.createElement('i');
    iconeEditar.classList.add('fa-solid', 'fa-pen-to-square');
    const botaoDeletar = document.createElement('button');
    botaoDeletar.setAttribute('title', 'Deletar');
    const iconeDeletar = document.createElement('i');
    iconeDeletar.classList.add('fa-solid', 'fa-trash-can');

    botaoEditar.appendChild(iconeEditar);
    botaoDeletar.appendChild(iconeDeletar);
    tdBotao.appendChild(botaoEditar);
    tdBotao.appendChild(botaoDeletar);
    tr.appendChild(tdNome);
    tr.appendChild(tdDataNascimento);
    tr.appendChild(tdBotao);

    botaoEditar.onclick = () => {
        abrirFormulario();
        campoNome.value = pessoa.nome;
        campoData.value = formatarData(pessoa.dataNascimento);
        botaoFormulario.textContent = "Editar";
        formulario.removeEventListener('submit', salvarFormulario);

        window.pessoa = pessoa;
        window.tdNome = tdNome;
        window.tdDataNascimento = tdDataNascimento;
        formulario.addEventListener('submit', atualizar);
    }

    botaoDeletar.onclick = () => {
        pessoas = pessoas.filter(p => pessoa != p);
        localStorage.setItem("pessoas", JSON.stringify(pessoas));
        fecharFormulario(false);
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
    fecharFormulario();
}

formulario.addEventListener('submit', salvarFormulario);

if(pessoas.length > 0){
    trNenhuma.remove();
    pessoas.forEach(pessoa => {
        const elemento = criarElemento(pessoa);
        tbody.appendChild(elemento);
    });
}