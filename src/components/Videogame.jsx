import React from "react";

export const Videogame = ({videogame, handleAddToCart}) => {
  const {name, description, image, price} = videogame;

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/products/${image}`}
          alt={name}
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>
          {description}
        </p>
        <p className="fw-black text-primary fs-3">$ {price}</p>
        <button type="button" className="btn btn-dark w-100" onClick={()=>handleAddToCart(videogame)}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
