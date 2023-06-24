import "../../styles/pedidoformulario.css";

const PedidoFormulario = ({ produtos, handleSubmit, quantidades, calcularValorParcial, handleQuantidadeChange, valorTotal }) => {
  return (
    <form className="item-carrinho row d-flex flex-column my-0 mx-auto" onSubmit={handleSubmit}>
      {produtos.map((produto, index) => (
        <div className="col" key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{produto.name}</h5>
              <p>Descrição: {produto.description}</p>
              <p>Preço: R$ {produto.price}</p>
              <p>
                Quantidade:
                <input
                  className="product-quantity"
                  type="number"
                  value={quantidades[index]}
                  onChange={(event) => handleQuantidadeChange(event, index)}
                />
              </p>
              <p className="lead">
                Valor: R$ {calcularValorParcial(quantidades[index], produto)}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="col">
        <h4>Valor Total: R$ {valorTotal}</h4>
      </div>
      <button type="submit" className="btn btn-primary">
        Finalizar Pedido
      </button>
    </form>
  );
};

export default PedidoFormulario;
