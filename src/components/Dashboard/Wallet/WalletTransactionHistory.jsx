import { Wallet_Transaction_History_Data } from "@/_mock/data";
import StyledImage from "@/components/StyedImage";
import clsxm from "@/utils/clsxm";
import React from "react";

export default function WalletTransactionHistory() {
  return (
    <div className="w-full overflow-x-auto hide-scrollbar ">
      <div className="min-w-full w-[1000px] border border-grey-400 p-6 rounded-[26px] mt-6 lg:mt-12 ">
        <p className="text-29 font-bold ">Transaction History</p>
        <table
          border="1"
          className="text-left mt-8 w-full table-fixed  "
        >
          <thead>
            <tr className="  ">
              <th className="text-[26px] font-regular ">Funds Added</th>
              <th className="text-center text-[26px] font-regular  ">Date</th>
              <th className="text-center text-[26px] font-regular  ">Amount</th>
              <th className="text-center text-[26px] font-regular  ">
                Funds Withdrawn
              </th>
              <th className="text-center text-[26px] font-regular  ">
                Transactions States
              </th>
            </tr>
          </thead>
          <tbody>
            {Wallet_Transaction_History_Data.map((item, idx) => (
              <tr
                key={item.id}
                className={clsxm(
                  "text-center text-grey-600 ",
                  idx === 1 && "border-y border-[#817E7E] "
                )}
              >
                <td className="flex items-center gap-5 py-10 ">
                  <StyledImage
                    src="/assets/svg/WalletMoneyGrey.svg"
                    className="w-4 h-4 "
                  />
                  <p className="text-grey-600 text-16 ">Funds Added</p>
                </td>
                <td>{item.date}</td>
                <td>{item.amount}</td>
                <td className="flex items-center justify-center gap-1 ">
                  {item.withdrawn}
                  {idx === 0 && (
                    <StyledImage src={item.arrowImg} className="w-5 h-5 " />
                  )}
                  {idx === 1 && (
                    <StyledImage src={item.arrowImg} className="w-5 h-5 " />
                  )}
                </td>
                <td className="text-center ">
                  <p
                    style={{
                      backgroundColor: `${item.statusBg}`,
                      color: `${item.statusTitleColor}`,
                    }}
                    className="w-fit text-center  flex items-center gap-2 rounded-[7px] mx-auto py-2 px-6 "
                  >
                    <span
                      style={{ backgroundColor: `${item.statusDot}` }}
                      className="rounded-full w-[10px] h-[10px] "
                    />
                    {item.statusTitle}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
