
import { createContext, useEffect, useState } from "react"
import axios from 'axios'

// import { food_list } from "../assets/assets"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    
    const [cartItems, setCartItems] = useState({});
    const backendUrl = "http://localhost:8974"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({ ...prev, [itemId]:1 }));  
        }else{
            setCartItems((prev) => ({ ...prev, [itemId]:prev[itemId]+1 }));
        }
        if(token){
            await axios.post(backendUrl + "/api/cart/add", { itemId }, {headers: {token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]:prev[itemId] - 1 }));
        if(token){
            await axios.post(backendUrl + "/api/cart/remove", { itemId }, {headers: {token}});
        }
    }

    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems])

    // method to calculate total amount of cart items
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(backendUrl+"/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(backendUrl + "/api/cart/get", {}, {headers: {token}});
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("JWT_Token")){
                setToken(localStorage.getItem("JWT_Token"));
                await loadCartData(localStorage.getItem("JWT_Token"));
            }
        }
        loadData();
    }, [])
    
    const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      backendUrl,
      token,
      setToken
    };

    return(
        <StoreContext.Provider value={contextValue} >
           { props.children }
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;