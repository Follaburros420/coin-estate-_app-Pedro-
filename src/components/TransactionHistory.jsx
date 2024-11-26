import React from "react";
const HISTORY=[
    {
        id:1,
        img:"/assets/svg2/fund.svg",
        about:'Funds added',
        date:'2024-10-05',
        amount:'100$',
        arrowImg:"/assets/svg2/greenArrow.svg",
        withdraw:'80$',
        dotImg:"/assets/svg2/redDot.svg",
        cancel:'cancelled',
    },
    {
        id:2,
        img:"/assets/svg2/fund.svg",
        about:'Funds added',
        date:'2024-10-05',
        amount:'100$',
        arrowImg:"/assets/svg2/greenArrow.svg",
        withdraw:'80$',
        dotImg:"/assets/svg2/redDot.svg",
        cancel:'cancelled',
    },
    {
        id:3,
        img:"/assets/svg2/fund.svg",
        about:'Funds added',
        date:'2024-10-05',
        amount:'100$',
        arrowImg:"/assets/svg2/greenArrow.svg",
        withdraw:'80$',
        dotImg:"/assets/svg2/redDot.svg",
        cancel:'cancelled',
    },
   
]

export default function TransactionHistory() {
  return (
    <div className="max-w-[1161px] mx-auto w-full pt-9 pb-[73px] px-5 md:px-12 overflow-auto">
      <div className=" max-w-[1008px] mx-auto w-full p-6 border  border-grey-400 rounded-[26px]">
        <p className="text-26 font-semibold">Transaction History</p>
        <div className="mt-8 flex justify-between text-16 md:text-20 font-regular">
          <p>Funds added</p>
          <p>Date</p>
          <p>Amount</p>
          <p>Funds withdrawn</p>
          <p>Transaction States</p>
        </div>
       {HISTORY.map((items ,idx)=>{
        return(
           <div  key={`${items.id}____${idx}`}>
             <div className="mt-10 flex justify-between items-center text-16 font-regular  ">
            <div className="flex gap-1 lg:gap-4 items-center">
                <img src={items.img} alt="" />
                <p className="text-16 font-regular text-grey-1400">{items.about}</p>
            </div>
            <p className="text-16 font-regular max-w-[100px] lg:max-w-[200px] w-full text-center text-grey-1400">{items.date}</p>
            <p className="text-16 font-regular  max-w-[70px] lg:max-w-[200px] w-full  text-grey-1400">{items.amount}</p>
            <div className="flex gap-1 items-center  max-w-[70px] lg:max-w-[200px] w-full ">
                <p className="text-16 font-regular  text-grey-1400">{items.withdraw}</p>
                <img src={items.arrowImg} alt="" />
            </div>
            <div className="flex gap-2.5 items-center  py-2.5 px-5 bg-red-200 rounded-[8px]">
                <img src={items.dotImg} alt="" />
                <p className="text-red-100 text-16 font-regular">{items.cancel}</p>
            </div>
        </div>
        <hr className="text-grey-400 w-full mt-10" />
           </div>
        );
       })}
      </div>
    </div>
  );
}
