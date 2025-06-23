import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
  let [orderData, setOrderData] = useState([])
  let { currency } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (result.data) {
        let allOrdersItem = []
        result.data.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [])

  return (
    <div className='w-full min-h-screen p-5 pb-[150px] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <div className='text-center mt-20'>
        <Title text1='MY' text2='ORDER' />
      </div>

      <div className='w-full mt-10 flex flex-col gap-6'>
        {orderData.map((item, index) => (
          <div key={index} className='w-full border-t border-b'>
            <div className='flex flex-row md:flex-row items-start md:items-center gap-4 bg-[#51808048] p-4 rounded-2xl relative'>

              {/* Product Image */}
              <img
                src={item.image1}
                alt=""
                className='w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-md object-cover'
              />

              {/* Info Section */}
              <div className='flex flex-col gap-2 text-sm text-[#f3f9fc]'>
                <p className='text-base md:text-2xl'>{item.name}</p>

                <div className='flex flex-wrap gap-3 text-xs md:text-lg text-[#aaf4e7]'>
                  <p>{currency} {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>

                <p className='text-xs md:text-base text-[#aaf4e7]'>
                  Date: <span className='text-[#e4fbff] pl-2'>{new Date(item.date).toDateString()}</span>
                </p>

                <p className='text-xs md:text-base text-[#aaf4e7]'>
                  Payment Method: {item.paymentMethod}
                </p>
              </div>

              {/* Status */}
              <div className='absolute top-2 right-2 '>
                <div className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-green-500'></span>
                  <p className='text-xs md:text-sm text-[#f3f9fc]'>{item.status}</p>
                </div>
              </div>

              {/* Button */}
              <div className='absolute bottom-2 right-2 '>
                <button
                  onClick={loadOrderData}
                  className='px-3 py-1 md:px-5 md:py-2 bg-[#101919] text-xs md:text-sm text-[#f3f9fc] rounded-md hover:bg-slate-700 active:bg-slate-600'
                >
                  Track Order
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
