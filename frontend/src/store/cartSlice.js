import {createSlice} from '@reduxjs/toolkit'

const initialState={
    cartItems:[],
    totalQuantity:0,
    totalPrice:0,
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload;
            const existingUser=state.cartItems.find(i=>i._id=== item._id)

            if(existingUser){
                existingUser.quantity+=1
            }
            else{
                state.cartItems.push({...item,quantity:1})
            }
            state.totalQuantity+=1;
            state.totalPrice+=item.price;
        },
        removeFromCart:(state,action)=>{
            const id=action.payload
            const item=state.cartItems.find(i=>i._id=== id)

            if(item){
                state.cartItems=state.cartItems.filter(i=>i._id !== id)
                state.cartItems.totalPrice -= item.price * item.quantity;
                state.cartItems.totalQuantity -= item.quantity
            }

        },
        increaseQuantity:(state,action)=>{
            const id=action.payload;
            const item=state.cartItems.find(i=>i._id === id)

            if(item && item.quantity>1){
                item.quantity+=1
                state.totalPrice+=item.price
                state.totalQuantity +=1
                
            }

        },
        decreaseQuantity:(state,action)=>{
            const id=action.payload;
            const item=state.cartItems.find(i=>i._id === id)

            if(item){
                item.quantity-=1
                state.totalPrice-=item.price
                state.totalQuantity -=1
                
            }

        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
          },
        
    }
})

export const{
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
}=cartSlice.actions;
export default cartSlice.reducer