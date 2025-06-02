import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Videogame } from "./components/Videogame";
import { videogames } from "./helpers/videogames";

export function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(videogames);
  const [cart, setCart] = useState(initialCart);

  const MAX_QUANTITY = 6;
  const MIN_QUANTITY = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (item) => {
    const indexItem = cart.findIndex(product => product.id === item.id);

    if(indexItem >= 0){
      const updatedCart = [...cart];
      updatedCart[indexItem].quantity += 1;
      setCart(updatedCart);
    }else{
      item.quantity = 1;
      setCart([...cart, item]);
    }
    
  }

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  }

  const handleClearCart = () => {
    setCart([]);
  }

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_QUANTITY){
        item.quantity += 1;
      }
      return item;
    })
    setCart(updatedCart);
  }

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity >= MIN_QUANTITY){
        item.quantity -= 1;
      }
      return item;
    })
    setCart(updatedCart);
  }
  
  return (
    <>      
      <Header 
        cart={cart} 
        handleClearCart={handleClearCart} 
        handleRemoveFromCart={handleRemoveFromCart}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map(videogame => (
              <Videogame
                key={videogame.id}
                videogame={videogame}
                handleAddToCart={handleAddToCart}
              />
            ))
          }
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            Gamezone - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}
