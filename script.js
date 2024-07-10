const formulario = document.querySelector('.js-form');
const camposFormulario = document.querySelectorAll('.js-field');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = camposFormulario[0].value;
    const data = camposFormulario[1].value;
    console.log(`Nome: ${nome}\nAniversário: ${data}`);
});