const formulario = document.querySelector('.js-form');
const campoNome = document.querySelectorAll('.js-field')[0];
const campoData = document.querySelectorAll('.js-field')[1];

const tamanhoMinimoNome = 3;
const tamanhoMaximoNome = 120;

campoNome.setAttribute('minlength', tamanhoMinimoNome);
campoNome.setAttribute('maxlength', tamanhoMaximoNome);
campoData.setAttribute('max', new Date().toISOString().split('T')[0]);


formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = campoNome.value;
    let data = campoData.value.split('-');
    data = `${data[2]}/${data[1]}/${data[0]}`;
    console.log(`Nome: ${nome}\nAniversário: ${data}`);
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