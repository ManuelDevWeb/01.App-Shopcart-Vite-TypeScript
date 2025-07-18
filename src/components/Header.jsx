import { useMemo } from "react";

export const Header = ({ 
    cart, 
    handleClearCart, 
    handleRemoveFromCart, 
    handleIncreaseQuantity, 
    handleDecreaseQuantity 
}) => {
  // State derivado
  const isEmpty = () => cart.length === 0;

  const totalCart = useMemo(
    () =>
      cart.reduce((acc, product) => acc + product.price * product.quantity, 0),
    [cart]
  );

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid w-7"
                src="/gameshop.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid w-2"
                src="/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty() ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <table className="w-100 table">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <img
                              className="img-fluid"
                              src={`/products/${product.image}`}
                              alt={product.name}
                            />
                          </td>
                          <td>{product.name}</td>
                          <td className="fw-bold">${product.price}</td>
                          <td className="flex align-items-start gap-4">
                            <button type="button" className="btn btn-dark" disabled={product.quantity <= 1} onClick={() => handleDecreaseQuantity(product.id)}>
                              -
                            </button>
                            {product.quantity}
                            <button type="button" className="btn btn-dark" disabled={product.quantity >= 6} onClick={() => handleIncreaseQuantity(product.id)}>
                              +
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-danger" type="button" onClick={() => handleRemoveFromCart(product.id)}>
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <p className="text-end">
                  Total pagar: <span className="fw-bold">${totalCart}</span>
                </p>
                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={handleClearCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
