import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
	items: [],
	totalAmount: 0
}

const cartReducer = (state, action) => {
	if (action.type === 'ADD_ITEM') {
 		// const updatedItems = state.items.concat(action.item);/* concat добавляет новый элемент в массив и возвращает новый массив */
		 const updatedTotalAmount =  state.totalAmount + (action.item.price * action.item.amount); /* значение totalAmount из последнего сост-ия */
		
		const existingCartItemIndex = state.items.findIndex((item) => {
			return item.id === action.item.id;//id существующего эл-та = id эл-та, кот в данный момент добавляется в корзину
		});

		const existingCartItem = state.items[existingCartItemIndex];
		
		let updatedItem;
		let updatedItems;

		if (existingCartItem){
			updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount
			};
			updatedItems = [...state.items];//все существующие items в старом массиве
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		else {
			updatedItem = {
				...action.item,
			}
			updatedItems = state.items.concat(updatedItem)
		}

//возвращаем новое состояние
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount
		}
	} 


	if (action.type === 'REMOVE_ITEM') {
		const existingCartItemIndex = state.items.findIndex((item) => {
			return item.id === action.id;
		});

		const existingCartItem = state.items[existingCartItemIndex];

		const updatedTotalAmount = state.totalAmount - existingCartItem.price;

		let updatedItems;
		if (existingCartItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = { //обновленный эл-т
				...existingCartItem,
				 amount: existingCartItem.amount - 1
			} 
		updatedItems = [...state.items];
		updatedItems[existingCartItemIndex] = updatedItem; //заменяю один из эл-тов этого массива на updatedItem
	}
	return {//возвращаю новый объект состояния
		items: updatedItems,
		totalAmount: updatedTotalAmount
	}
}

	return defaultCartState;
}

const CartContextProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

	const addItemHandler = item => {
		dispatchCartAction({
			type: 'ADD_ITEM',
			item: item,
		})
	};
	const removeItemHandler = id => {
		dispatchCartAction({
			type: 'REMOVE_ITEM',
			id: id,
		})
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemHandler,
		removeItem: removeItemHandler
	}

	return (
		<CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
	)
}
export default CartContextProvider; 






// import { useReducer } from "react";

// import CartContext from "./cart-context";

// const defaultCartState = {
//   items: [],
//   totalAmount: 0,
// };

// const cartReducer = (state, action) => {
//   if (action.type === "ADD_ITEM") {
//     const updatedTotalAmount =
//       state.totalAmount + action.item.price * action.item.amount;

//     const existingCartItemIndex = state.items.findIndex((item) => {
//       return item.id === action.item.id;
//     });

//     const existingCartItem = state.items[existingCartItemIndex];

//     let updatedItem;
//     let updatedItems;

//     if (existingCartItem) {
//       updatedItem = {
//         ...existingCartItem,
//         amount: existingCartItem.amount + action.item.amount,
//       };

//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     } else {
//       updatedItem = {
//         ...action.item,
//       };
//       updatedItems = state.items.concat(updatedItem);
//     }

//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount,
//     };
//   }

//   if (action.type === "REMOVE_ITEM") {
//     const existingCartItemIndex = state.items.findIndex((item) => {
//       return item.id === action.id;
//     });

//     const existingCartItem = state.items[existingCartItemIndex];

//     const updatedTotalAmount = state.totalAmount - existingCartItem.price;

//     let updatedItems;
//     if (existingCartItem.amount === 1) {
//       updatedItems = state.items.filter((item) => item.id != action.id);
//     } else {
//       const updatedItem = {
//         ...existingCartItem,
//         amount: existingCartItem.amount - 1,
//       };
//       updatedItems = [...state.items];
//       updatedItems[existingCartItemIndex] = updatedItem;
//     }

//     return {
//       items: updatedItems,
//       totalAmount: updatedTotalAmount,
//     };
//   }

//   if (action.type === "CLEAR_CART") {
//     return defaultCartState;
//   }

//   return defaultCartState;
// };

// const CartContextProvider = (props) => {
//   const [cartState, dispatchCartAction] = useReducer(
//     cartReducer,
//     defaultCartState
//   );

//   const addItemHandler = (item) => {
//     dispatchCartAction({
//       type: "ADD_ITEM",
//       item: item,
//     });
//   };

//   const removeItemHandler = (id) => {
//     dispatchCartAction({
//       type: "REMOVE_ITEM",
//       id: id,
//     });
//   };

//   const clearCartHandler = () => {
//     dispatchCartAction({ type: "CLEAR_CART" });
//   };

//   const cartContext = {
//     items: cartState.items,
//     totalAmount: cartState.totalAmount,
//     addItem: addItemHandler,
//     removeItem: removeItemHandler,
//     clearCart: clearCartHandler,
//   };

//   return (
//     <CartContext.Provider value={cartContext}>
//       {props.children}
//     </CartContext.Provider>
//   );
// };

// export default CartContextProvider;