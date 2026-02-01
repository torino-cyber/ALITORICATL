
let tipoSelecionado = "";
let carrinho = [];

function selecionarTipo(tipo) {
  tipoSelecionado = tipo;
  document.getElementById("tipoCompra").classList.add("hidden");
  document.getElementById("catalogo").classList.remove("hidden");
  document.getElementById("tituloCatalogo").innerText =
    tipo === "grade" ? "Atacado Grade" : "Atacado Caixa";
  renderizarProdutos();
}

function renderizarProdutos() {
  const div = document.getElementById("produtos");
  div.innerHTML = "";

  produtos
    .filter(p => p.tipo === tipoSelecionado)
    .forEach(p => {
      div.innerHTML += `
        <div class="produto">
          <img src="${p.imagem}">
          <h4>${p.nome}</h4>
          <p>R$ ${p.preco}</p>
          <button onclick="adicionarCarrinho('${p.nome}', ${p.preco})">
            Adicionar
          </button>
        </div>
      `;
    });
}

function adicionarCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach(p => {
    total += p.preco;
    lista.innerHTML += `<p>${p.nome} - R$ ${p.preco}</p>`;
  });

  document.getElementById("total").innerText = total;
}

function abrirCheckout() {
  document.getElementById("checkout").classList.remove("hidden");
}

function enviarWhatsApp() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const envio = document.getElementById("envio").value;

  let mensagem = `Pedido Atacado Torino%0A%0A`;
  mensagem += `Nome: ${nome}%0AEmail: ${email}%0AEnvio: ${envio}%0A%0AProdutos:%0A`;

  let total = 0;
  carrinho.forEach(p => {
    total += p.preco;
    mensagem += `- ${p.nome} | R$ ${p.preco}%0A`;
  });

  mensagem += `%0ATotal: R$ ${total}`;

  window.open(
    `https://wa.me/5511939586226?text=${mensagem}`,
    "_blank"
  );
}
