const campoFormNome = document.querySelectorAll('.js-field')[0];
const campoFormData = document.querySelectorAll('.js-field')[1];

const tamanhoMinimoNome = 3;
const tamanhoMaximoNome = 120;
const dataHoje = new Date().toLocaleString('pt-br', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' });

campoFormNome.setAttribute('minlength', tamanhoMinimoNome);
campoFormNome.setAttribute('maxlength', tamanhoMaximoNome);

const formataData = (data) => {
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

campoFormData.setAttribute('max', formataData(dataHoje));

campoFormNome.oninvalid = () => {
    campoFormNome.setCustomValidity("");
    if(!campoFormNome.validity.valid && campoFormNome.value.length < tamanhoMinimoNome){
        campoFormNome.setCustomValidity(`O nome precisa ter no mínimo ${tamanhoMinimoNome} letras.`);
    }
    else if(!campoFormNome.validity.valid && campoFormNome.value.length > tamanhoMaximoNome){
        campoFormNome.setCustomValidity(`O nome precisa ter no máximo ${tamanhoMaximoNome} letras.`);
    }
    else if(!campoFormNome.validity.valid){
        campoFormNome.setCustomValidity("Nome inválido.");
    }
}