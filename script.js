/* 1. CARROSSEL DE DISCOS (Seção 6) */

// Duas listas simples separadas: uma para fotos, outra para legendas
let fotos = [
    "img/blond - album.jpg",
    "img/asap - album.jpg",
    "img/orange - album.jpg",
    "img/IGOR - album.jpg"
];

let legendas = [
    "Frank Ocean - Blond (2016)",
    "A$AP Rocky - LIVE.LOVE.A$AP (2011)",
    "Frank Ocean - channel ORANGE (2012)",
    "Tyler, The Creator - IGOR (2019)"
];

let posicao = 0;

function atualizarCarrossel() {
    document.getElementById("andre_carrossel_img").src = fotos[posicao];
    document.getElementById("andre_carrossel_legenda").innerText = legendas[posicao];
    document.getElementById("andre_carrossel_contador").innerText = "Item " + (posicao + 1) + " de " + fotos.length;
}

// Botão Próximo
document.getElementById("andre_btn_prox").onclick = function () {
    posicao = posicao + 1;
    if (posicao >= fotos.length) {
        posicao = 0; // Volta para o começo
    }
    atualizarCarrossel();
};

// Botão Anterior
document.getElementById("andre_btn_ant").onclick = function () {
    posicao = posicao - 1;
    if (posicao < 0) {
        posicao = fotos.length - 1; // Vai para o último
    }
    atualizarCarrossel();
};

// Botão Adicionar Disco
document.getElementById("andre_btn_add_carrossel").onclick = function () {
    let textoDigitado = document.getElementById("andre_nova_legenda_carrossel").value;

    if (textoDigitado === "") {
        alert("Digite o nome do disco primeiro!");
        return;
    }

    fotos.push("img/radiohead - album.jpg");
    legendas.push(textoDigitado);

    posicao = fotos.length - 1;
    atualizarCarrossel();
    document.getElementById("andre_nova_legenda_carrossel").value = "";
};





/* 2. FILA DE REPRODUÇÃO (Seção 7) */

let lista = document.getElementById("andre_lista_fila");

function contarMusicas() {
    let itens = lista.getElementsByTagName("li");
    document.getElementById("andre_contador_fila").innerText = "Total: " + itens.length + " faixas";
}


// Função que ativa os botões de cada música da lista
function ativarBotoesDaFila() {
    let itens = lista.getElementsByTagName("li");

    for (let i = 0; i < itens.length; i++) {
        let item = itens[i];
        let btnStatus = item.querySelector(".andre_btn_status");
        let btnEditar = item.querySelector(".andre_btn_editar");
        let btnRemover = item.querySelector(".andre_btn_remover");
        let textoMusica = item.querySelector(".andre_texto_musica");

        // Marcar como ouvida ou pendente
        btnStatus.onclick = function () {
            if (item.getAttribute("data-status") === "pendente") {
                item.setAttribute("data-status", "ouvida");
                item.className = "andre_item_fila ouvida";
                btnStatus.innerText = "Marcar Pendente";
            } else {
                item.setAttribute("data-status", "pendente");
                item.className = "andre_item_fila";
                btnStatus.innerText = "Marcar Ouvida";
            }
        };

        // Editar nome
        btnEditar.onclick = function () {
            let novoNome = prompt("Novo nome da música:", textoMusica.innerText);
            if (novoNome !== null && novoNome !== "") {
                textoMusica.innerText = novoNome;
            }
        };

        // Remover música
        btnRemover.onclick = function () {
            item.remove();
            contarMusicas();
        };
    }
}

// Ativa os botões das 3 músicas que já vêm no HTML
ativarBotoesDaFila();

// Adicionar nova música
document.getElementById("andre_btn_add_fila").onclick = function () {
    let nome = document.getElementById("andre_input_musica").value;

    if (nome === "") {
        alert("Digite o nome da música!");
        return;
    }

    lista.innerHTML = lista.innerHTML + `
        <li class="andre_item_fila" data-status="pendente">
            <span class="andre_texto_musica">${nome}</span>
            <div class="andre_acoes_item">
                <button type="button" class="andre_btn_acao andre_btn_status">Marcar Ouvida</button>
                <button type="button" class="andre_btn_acao andre_btn_editar">Editar</button>
                <button type="button" class="andre_btn_acao andre_btn_remover">✕</button>
            </div>
        </li>
    `;

    document.getElementById("andre_input_musica").value = "";
    ativarBotoesDaFila();
    contarMusicas();
};

// Limpar fila
document.getElementById("andre_btn_limpar_fila").onclick = function () {
    lista.innerHTML = "";
    contarMusicas();
};

// Filtros (Todas, Na Fila, Ouvidas)
function filtrar(tipo) {
    let itens = lista.getElementsByTagName("li");

    for (let i = 0; i < itens.length; i++) {
        let status = itens[i].getAttribute("data-status");

        if (tipo === "todas" || tipo === status) {
            itens[i].style.display = "flex";
        } else {
            itens[i].style.display = "none";
        }
    }
}

document.getElementById("andre_filtro_todas").onclick = function () { filtrar("todas"); };
document.getElementById("andre_filtro_pendentes").onclick = function () { filtrar("pendente"); };
document.getElementById("andre_filtro_ouvidas").onclick = function () { filtrar("ouvida"); };





/* 3. JANELA MODAL DA DEMO (Seção 8) */

let modal = document.getElementById("andre_modal_container");

document.getElementById("andre_btn_abrir_modal").onclick = function () {
    let titulo = document.getElementById("andre_demo_titulo").value;
    let artista = document.getElementById("andre_demo_artista").value;
    let desc = document.getElementById("andre_demo_descricao").value;
    let arquivo = document.getElementById("andre_demo_arquivo").files[0];

    if (titulo === "" || artista === "") {
        alert("Preencha o título e o artista!");
        return;
    }

    document.getElementById("andre_modal_titulo_exibicao").innerText = titulo;
    document.getElementById("andre_modal_artista_exibicao").innerText = artista;
    document.getElementById("andre_modal_desc_exibicao").innerText = desc;

    let imgPreview = document.getElementById("andre_modal_img_exibicao");
    if (arquivo) {
        imgPreview.src = URL.createObjectURL(arquivo);
        imgPreview.style.display = "block";
    } else {
        imgPreview.style.display = "none";
    }

    modal.style.display = "flex";
};

document.getElementById("andre_btn_fechar_modal").onclick = function () {
    modal.style.display = "none";
};


/* 4. VALIDAÇÃO DO FORMULÁRIO VIP (Seção 10) */

document.getElementById("andre_form_cadastro").onsubmit = function (evento) {
    evento.preventDefault(); // Não deixa a página recarregar

    let nome = document.getElementById("andre_nome").value;
    let email = document.getElementById("andre_email").value;
    let senha = document.getElementById("andre_senha").value;
    let confirma = document.getElementById("andre_confirma_senha").value;
    let idade = document.getElementById("andre_idade").value;
    let genero = document.getElementById("andre_genero_fav").value;
    let termos = document.getElementById("andre_termos").checked;

    if (nome.length < 3) {
        alert("Digite um nome com pelo menos 3 letras.");
        return;
    }
    if (!email.includes("@")) {
        alert("Digite um e-mail válido.");
        return;
    }
    if (senha.length < 6 || senha !== confirma) {
        alert("A senha deve ter 6 caracteres e ser igual nos dois campos.");
        return;
    }
    if (idade < 12 || idade > 120 || idade === "") {
        alert("Digite uma idade válida.");
        return;
    }
    if (genero === "") {
        alert("Escolha um gênero favorito.");
        return;
    }
    if (termos === false) {
        alert("Marque a caixa aceitando os termos.");
        return;
    }

    alert("Cadastro concluído com sucesso! Bem-vindo, " + nome + "!");
    document.getElementById("andre_form_cadastro").reset();
};