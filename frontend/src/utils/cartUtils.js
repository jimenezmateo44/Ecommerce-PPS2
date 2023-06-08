export const addDecimals = (num) => {
    return (Math.round(num * 100) / 1000).toFixed(2);
};

export const updateCart = (state) => {
             //Calcular precio de producto
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
            
            //Calcular precio de envio
           
            //Calcular precio total
            state.totalPrice = (
                Number(state.itemsPrice)
            ).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));

            return state;
        };
