import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function PlaceOrder() {
  const [method, setMethod] = useState('cod')
  const navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '',
    state: '', pinCode: '', country: '', phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true })
        if (data) {
          navigate("/order")
          setCartItem({})
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
          if (result.data) {
            setCartItem({})
            toast.success("Order Placed")
            navigate("/order")
            setLoading(false)
          } else {
            toast.error("Order Place Error")
            setLoading(false)
          }
          break;

        case 'razorpay':
          const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })
          if (resultRazorpay.data) {
            initPay(resultRazorpay.data)
            toast.success("Order Placed")
            setLoading(false)
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className="w-screen min-h-[100dvh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-start justify-center gap-10 px-4 py-6 overflow-y-auto ">
      
      {/* LEFT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center mt-20">
        <form id="orderForm" onSubmit={onSubmitHandler} className="w-full max-w-[600px] flex flex-col gap-4 px-2">
          <div className="py-2">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          <div className="flex flex-wrap gap-4">
            <input type="text" placeholder="First name" className="flex-1 h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-5 shadow-md" required onChange={onChangeHandler} name="firstName" value={formData.firstName} />
            <input type="text" placeholder="Last name" className="flex-1 h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-5 shadow-md" required onChange={onChangeHandler} name="lastName" value={formData.lastName} />
          </div>

          <input type="email" placeholder="Email address" className="w-full h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-5 shadow-md" required onChange={onChangeHandler} name="email" value={formData.email} />
          <input type="text" placeholder="Street" className="w-full h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-5 shadow-md" required onChange={onChangeHandler} name="street" value={formData.street} />

          <div className="flex flex-wrap gap-4">
            <input type="text" placeholder="City" className="flex-1 h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-5 shadow-md" required onChange={onChangeHandler} name="city" value={formData.city} />
            <input type="text" placeholder="State" className="flex-1 h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-5 shadow-md" required onChange={onChangeHandler} name="state" value={formData.state} />
          </div>

          <div className="flex flex-wrap gap-4">
            <input type="text" placeholder="Pincode" className="flex-1 h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-5 shadow-md" required onChange={onChangeHandler} name="pinCode" value={formData.pinCode} />
            <input type="text" placeholder="Country" className="flex-1 h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-5 shadow-md" required onChange={onChangeHandler} name="country" value={formData.country} />
          </div>

          <input type="text" placeholder="Phone" className="w-full h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-5 shadow-md" required onChange={onChangeHandler} name="phone" value={formData.phone} />

          {/* Button for larger screens only */}
          <div className="hidden md:flex justify-end mt-4">
            <button type="submit" className="text-[18px] bg-[#3bcee848] py-[10px] px-[40px] rounded-2xl text-white flex items-center justify-center gap-4 border border-[#80808049] hover:bg-[#35b8d7] transition-all">
              {loading ? <Loading /> : "PLACE ORDER"}
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE - CART + PAYMENT */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-start gap-6 px-2 mt-20">
        <div className="w-full max-w-[600px]">
          <CartTotal />
        </div>

        <div className="py-2">
          <Title text1="PAYMENT" text2="METHOD" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 w-full">
          <button onClick={() => setMethod("razorpay")} className={`w-[150px] h-[50px] rounded-sm ${method === "razorpay" ? "border-[3px] border-blue-900" : ""}`}>
            <img src={razorpay} className="w-full h-full object-cover rounded-sm" alt="razorpay" />
          </button>

          <button onClick={() => setMethod("cod")} className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-white text-[14px] px-5 rounded-sm text-[#332f6f] font-bold ${method === "cod" ? "border-[3px] border-blue-900" : ""}`}>
            CASH ON DELIVERY
          </button>
        </div>

        {/* Button for mobile screens only */}
        <div className="w-full flex md:hidden justify-center mt-6 mb-20">
          <button type="submit" form="orderForm" className="text-[18px] bg-[#3bcee848] py-[10px] px-[40px] rounded-2xl text-white flex items-center justify-center gap-4 border border-[#80808049] hover:bg-[#35b8d7] transition-all">
            {loading ? <Loading /> : "PLACE ORDER"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
