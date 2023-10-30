import Header from "./components/Layout/Header";
import React, {useState} from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";

function App() {
	const [cartOpened, setCartOpened] = useState(false);

	const showCartHandler = () => {
		setCartOpened(true)
	};

	const hideCartHandler = () => {
		setCartOpened(false)
	}

  return (
    <CartContextProvider>
			{cartOpened && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
			<main>
				<Meals />
			</main>
    </CartContextProvider>
  );
}

export default App;
