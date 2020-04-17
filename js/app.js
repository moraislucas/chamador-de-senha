function initChamadorSenha() {

    const audio = document.querySelector('#audioChamada');
    const senhaHTML = document.querySelector('.senha');
    let senhaAtual = +senhaHTML.innerText;
    let senhaNormal = document.querySelector('.normal');
    let senhaPrior = document.querySelector('.prioridade');
    const senhaAnterior = document.querySelector('.anterior');


    if (senhaHTML) {
        window.addEventListener('keyup', (e) => {
            senhaAnterior.innerText = senhaHTML.innerText;

            if (senhaAtual >= 0) {
                if (e.key == "ArrowRight") {
                    senhaAtual = (+senhaNormal.value) + 1;
                    senhaNormal.value = arrumaSenha(senhaAtual, 4);
                    senhaHTML.innerText = senhaNormal.value;
                    audio.play();
                } else if (e.key == "ArrowLeft") {
                    senhaAtual = (+senhaNormal.value) - 1;
                    if (senhaAtual <= 0) {
                        senhaAtual = 0;
                        const div = document.createElement('div');
                        div.classList.add('modal-erro');
                        div.innerHTML = '<h3>Senhas a partir do zero</h3>';
                        document.body.appendChild(div);
                    }
                    senhaNormal.value = arrumaSenha(senhaAtual, 4);
                    senhaHTML.innerText = senhaNormal.value;
                    audio.play();
                } else if (e.key == "ArrowUp") {
                    senhaAtual = (+(senhaPrior.value).replace('P', '')) + 1;
                    senhaPrior.value = "P" + arrumaSenha(senhaAtual, 3);
                    senhaHTML.innerText = senhaPrior.value;
                    audio.play();
                } else if (e.key == "ArrowDown") {
                    senhaAtual = (+(senhaPrior.value).replace('P', '')) - 1;
                    if (senhaAtual <= 0) {
                        senhaAtual = 0;

                        const div = document.createElement('div');
                        div.classList.add('modal-erro');
                        div.innerHTML = '<h3>Senhas a partir do zero</h3>';
                        document.body.appendChild(div);
                    }
                    senhaPrior.value = "P" + arrumaSenha(senhaAtual, 3);
                    senhaHTML.innerText = senhaPrior.value;
                    audio.play();
                }
            }

        })
    }


    function initModal(modalId, btnId) {
        const modal = document.getElementById(modalId);
        const btn = document.querySelectorAll(btnId);

        if (modal && btn) {
            modal.addEventListener('click', (e) => {
                console.log(e.target)
                if (e.target.id == modalId || e.target.className == 'fecha-modal' || e.target.id ==
                    'btn-cancela')
                    modal.classList.remove('mostrar');
            })

            btn.forEach(btn => {
                btn.addEventListener('click', handleClick);
            });

            function handleClick(event) {
                event.preventDefault();
                modal.classList.add('mostrar')
            }

            window.addEventListener('keyup', (e) => {
                if (e.key == 'Escape')
                    modal.classList.remove('mostrar')
            });
        }

    }

    initModal('modal-instrucoes', '.instrucoes');


    function arrumaSenha(senha, tamanho) {
        let saida = senha + "";
        while (saida.length < tamanho) saida = "0" + saida;
        return saida;
    }

}


initChamadorSenha();