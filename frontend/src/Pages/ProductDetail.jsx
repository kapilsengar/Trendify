import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from "../component/RelatedProduct";
import Loading from "../component/Loading";
import { toast } from "react-toastify";

function ProductDetail() {
  let { productId } = useParams();
  let { products, currency, addtoCart, loading } = useContext(shopDataContext);
  let [productData, setProductData] = useState(false);

  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);
        setImage(item.image1);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col ">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-5 px-4 py-10 mt-[70px] ">
        {/* Image Selector */}
        <div className="flex flex-col lg:flex-row gap-5 w-full lg:w-1/2 items-center justify-center ">
         {/* Main Image */}
          <div className="w-full max-w-[400px] aspect-[4/5] border border-[#80808049] rounded-md overflow-hidden">
            <img
              src={image}
              alt="main"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3">
            {[image1, image2, image3, image4].map((img, index) => (
              <div key={index} className="w-[60px] h-[60px] md:w-[100px] md:h-[110px] bg-slate-300 border border-[#80808049] rounded-md overflow-hidden">
                <img
                  src={img}
                  alt={`thumb-${index}`}
                  className="w-full h-full object-cover cursor-pointer rounded-md"
                  onClick={() => setImage(img)}
                />
              </div>
            ))}
          </div>

         
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 px-4 flex flex-col gap-4 mt-5 lg:mt-0 text-white">
          <h1 className="text-3xl md:text-4xl font-semibold">{productData.name.toUpperCase()}</h1>

          <div className="flex items-center gap-1">
            <FaStar className="text-xl fill-[#FFD700]" />
            <FaStar className="text-xl fill-[#FFD700]" />
            <FaStar className="text-xl fill-[#FFD700]" />
            <FaStar className="text-xl fill-[#FFD700]" />
            <FaStarHalfAlt className="text-xl fill-[#FFD700]" />
            <p className="text-lg font-semibold pl-2">(124)</p>
          </div>

          <p className="text-2xl font-semibold">
            {currency} {productData.price}
          </p>

          <p className="text-lg">
            {productData.description} and Stylish, breathable cotton shirt with a modern slim fit.
            Easy to wash, super comfortable, and designed for effortless style.
          </p>

          {/* Size Selection */}
          <div className="flex flex-col gap-3">
            <p className="text-xl font-semibold">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 rounded-md bg-slate-300 transition-all duration-300 ${
                    item === size ? "bg-black text-[#2f97f1] text-lg" : ""
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Add to Cart Button */}
            <button
              className="bg-[#495b61c9] border border-[#80808049] text-white py-3 px-6 rounded-2xl shadow-md shadow-black active:bg-slate-500 transition-all duration-300"
              onClick={() => {
                if (!size) {
                  toast.warn("Please select a size!", {
                    position: "top-center",
                  });
                  return;
                }
                addtoCart(productData._id, size);
                toast.success("Added to cart!");
              }}
            >
              {loading ? <Loading /> : "Add to Cart"}
            </button>
          </div>

          {/* Info Section */}
          <div className="w-full h-px bg-slate-700 mt-4"></div>
          <div className="text-sm mt-2">
            <p>✔ 100% Original Product.</p>
            <p>✔ Cash on delivery available</p>
            <p>✔ Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and Related Products */}
      <div className="w-full flex flex-col items-start px-4 md:px-10 py-10 gap-6 bg-gradient-to-l from-[#141414] to-[#0c2025]">
        <div className="flex flex-wrap gap-4 text-white">
          <p className="border px-5 py-3 rounded text-sm">Description</p>
          <p className="border px-5 py-3 rounded text-sm">Reviews (124)</p>
        </div>

        <div className="w-full max-w-[900px] bg-[#3336397c] border text-white text-base md:text-lg px-4 py-6 rounded-md">
          <p>
            Upgrade your wardrobe with this stylish slim-fit cotton shirt,
            available now on Trendify. Crafted from breathable, high-quality
            fabric, it offers all-day comfort and effortless style. Easy to
            maintain and perfect for any setting, this shirt is a must-have
            essential for those who value both fashion and function.
          </p>
        </div>

        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <Loading />
    </div>
  );
}

export default ProductDetail;
