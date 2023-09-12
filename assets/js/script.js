class Pedido {
    constructor(cliente, mesa, descricao) {
        this.id = this.gerarId();
        this.cliente = cliente;
        this.mesa = mesa;
        this.descricao = descricao;
    }

    gerarId() {
        return Math.floor(Math.random() * 1000);
    }
}

class PedidoService {
    constructor() {
        this.pedidos = [];
    }

    addPedido(parametro) {
        this.pedidos.push(parametro);
    }

    listarPedidos() {
        return this.pedidos;
    }

    listarPedidosPorId(parametro) {
        return this.pedidos.find((pedido) => pedido.id == parametro);
    }

    atualizarPedido(id, cliente, mesa, descricao) {
        const pedido = this.listarPedidosPorId(id);

        pedido.cliente = cliente;
        pedido.mesa = mesa;
        pedido.descricao = descricao;

        return pedido;
    }

    deletarPedido(parametro) {
        return (this.pedidos.filter((pedido) => pedido.id != parametro
        ));
    }

    cont(pedidos) {
        return pedidos.lenght();
    }
}

const pedidoService = new PedidoService();

function criarPedidos() {
    const cliente = document.getElementById("pCliente").value;
    const mesa = Number(document.getElementById("pMesa").value);
    const descricao = document.getElementById("pDescricao").value;

    const novoPedido = new Pedido(cliente, mesa, descricao);

    pedidoService.addPedido(novoPedido);

    listarPedidos();

    contador();
}

function listarPedidos() {
    const pedidos = pedidoService.listarPedidos();

    const elementoLista = document.getElementById("div-container");
    elementoLista.innerHTML = "";

    let content = "";

    pedidos.forEach((pedido) => {
        content += `
        <div class="box" id="box-${pedido.id}">
            <p> ID: ${pedido.id}</p>
            <p> Cliente: ${pedido.cliente}</p>
            <p> Mesa: ${pedido.mesa}</p>
            <p> Descrição: ${pedido.descricao}</p>
            <button onclick="atualizarPedido(${pedido.id})"> Editar</button>
            <button onclick="deletarPedido(${pedido.id})"> Deletar</button>
        </div>
        <div id="box2">
            <h1>Lista de Pedidos</h2>
        </div>
    `;
    });

    elementoLista.innerHTML = content;
}

function listarPedidosPorId(id) {
    const pedido = listarPedidos.listarPedidosPorId(id);
}

let aux = null;

function atualizarPedido(id) {
    const pedido = pedidoService.listarPedidosPorId(id);

    document.getElementById("pCliente").value = pedido.cliente;
    document.getElementById("pMesa").value = pedido.mesa;
    document.getElementById("pDescricao").value = pedido.descricao;

    document.getElementById("botaoCadastrar").classList.add("hidden");
    document.getElementById("botaoEditar").classList.remove("hidden");

    aux = id;
}

function editarPedido() {

    document.getElementById("botaoCadastrar").classList.add("hidden");
    document.getElementById("botaoEditar").classList.remove("hidden");

    const cliente = document.getElementById("pCliente").value;
    const mesa = Number(document.getElementById("pMesa").value);
    const descricao = document.getElementById("pDescricao").value;

    pedidoService.atualizarPedido(aux, cliente, mesa, descricao);

    listarPedidos();

    document.getElementById("botaoCadastrar").classList.remove("hidden");
    document.getElementById("botaoEditar").classList.add("hidden");

    aux = null;
}


function deletarPedido(id) {

    pedidoService.deletarPedido(id);

    listarPedidos();
    document.getElementById(`box-${id}`).classList.add("hidden");

}

function contador() {
    const contador = pedidoService.cont();

    document.getElementById(`pedidosLista` + contador);
}

