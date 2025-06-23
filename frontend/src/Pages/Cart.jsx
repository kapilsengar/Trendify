import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
    const { products, currency, cartItem ,updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData); 

  }, [cartItem]);
  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] '>
      <div className='h-[8%] w-[100%] text-center mt-[80px]'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
        {
         cartData.map((item,index)=>{
             const productData = products.find((product) => product._id === item._id);
            
             return (
             <div key={index} className="w-full border-t border-b py-4">
  <div key={index} className="w-full border-t border-b py-4">
  <div className="w-full flex flex-row md:flex-row items-start md:items-center gap-4 md:gap-6 bg-[#51808048] p-4 rounded-2xl">
    
    {/* Product Image */}
    <img
      className="w-[100px] h-[100px] object-cover rounded-md mx-auto md:mx-0"
      src={productData.image1}
      alt={productData.name}
    />

    {/* Product Info */}
    <div className="flex-1 flex flex-col gap-2">
      <p className="text-[20px] md:text-[25px] text-[#f3f9fc]">{productData.name}</p>
      
      {/* Size and Quantity */}
      <div className="flex items-center gap-4 flex-wrap">
        
        {/* Price */}
        <p className="text-[18px] text-[#aaf4e7]">{currency} {productData.price}</p>
        
        {/* Size + Quantity */}
        <div className="flex items-center gap-4">
          <span className="w-[40px] h-[40px] text-[16px] text-white bg-[#518080b4] rounded-md flex items-center justify-center border border-[#9ff9f9]">
            {item.size}
          </span>

          <input
            type="number"
            min={1}
            defaultValue={item.quantity}
            className="w-[60px] h-[40px] md:w-[80px] px-3 py-2 text-white text-[18px] font-semibold bg-[#518080b4] border border-[#9ff9f9] rounded-md"
            onChange={(e) =>
              (e.target.value === '' || e.target.value === '0')
                ? null
                : updateQuantity(item._id, item.size, Number(e.target.value))
            }
          />
        </div>
      </div>
    </div>

    {/* Delete Button */}
    <div className="flex items-center justify-center md:justify-end">
      <RiDeleteBin6Line
        className="text-[#9ff9f9] w-[25px] h-[25px] cursor-pointer mt-2 md:mt-0"
        onClick={() => updateQuantity(item._id, item.size, 0)}
      />
    </div>
  </div>
</div>

</div>

             )
         })
        }
      </div>

      <div className='flex justify-start items-end my-20'>
        <div className='w-full sm:w-[450px]'>
            <CartTotal/>
            <button className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px]  border-[1px] border-[#80808049] ml-[30px] mt-[20px]' onClick={()=>{
                if (cartData.length > 0) {
      navigate("/placeorder");
    } else {
      console.log("Your cart is empty!");
    }
            }}>
                PROCEED TO CHECKOUT
            </button>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
