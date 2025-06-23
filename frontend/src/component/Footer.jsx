import React from 'react'
import logo from "../assets/logo.png"

function Footer() {
  return (
    <div className="w-full bg-[#dbfcfcec]">
      {/* Top Section */}
      <div className="w-full flex flex-col md:flex-row items-start justify-between px-4 md:px-12 py-6 md:py-10 gap-6">
        
        {/* Logo & About */}
       <div className="w-full md:w-[30%] flex flex-col gap-2 items-center text-center">
  <div className="flex items-center gap-2">
    <img src={logo} alt="logo" className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]" />
    <p className="text-sm md:text-[20px] font-semibold text-black">Trendify</p>
  </div>
  <p className="text-xs md:text-sm text-[#1e2223] hidden md:block">
    Trendify is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier every day.
  </p>
  <p className="text-xs text-[#1e2223] md:hidden">
    Fast. Easy. Reliable. Trendify Shopping
  </p>
</div>


        {/* Company Links */}
        <div className="w-full md:w-[25%] flex flex-col items-center md:items-center gap-2 text-center">
          <p className="text-sm md:text-[20px] font-semibold text-[#1e2223]">COMPANY</p>
          <ul className="text-xs md:text-sm text-[#1e2223] space-y-1">
            <li className="hidden md:block cursor-pointer">Home</li>
            <li className="cursor-pointer">About us</li>
            <li className="hidden md:block cursor-pointer">Delivery</li>
            <li className="cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-[25%] flex flex-col items-center md:items-center gap-2 text-center">
          <p className="text-sm md:text-[20px] font-semibold text-[#1e2223]">GET IN TOUCH</p>
          <ul className="text-xs md:text-sm text-[#1e2223] space-y-1">
            <li>+91-7451032320</li>
            <li>kapilsengar49@gmail.com</li>
            <li className="hidden md:block">+1-123-456-7890</li>
            <li className="hidden md:block">admin@Trendify.com</li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-slate-400 "></div>

      {/* Bottom Note */}
     <div className="w-full text-center py-3 text-xs md:text-sm text-[#1e2223] bg-[#dbfcfcec] mb-20 md:mb-0">
  © 2025 Trendify — All Rights Reserved
</div>

    </div>
  )
}

export default Footer
