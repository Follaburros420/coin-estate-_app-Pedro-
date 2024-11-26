import React from "react";
import StyledImage from "./StyedImage";
import clsxm from "@/utils/clsxm";
const ASSETS = [
  {
    id: 1,
    img: "/assets/images/asset1.png",
    location: "/assets/svg2/location.svg",
    about: "Terry Lane, Golden CO 80403",
    flag: "/assets/svg2/flag.svg",
    price: "1$",
    token: "70",
    income: "$ 776.99",
  },
  {
    id: 2,
    img: "/assets/images/asset2.png",
    location: "/assets/svg2/location.svg",
    about: "Yule Street, Arvada CO 80007",
    flag: "/assets/svg2/flag.svg",
    price: "1$",
    token: "30",
    income: "$ 567.99",
  },
  {
    id: 3,
    img: "/assets/images/asset3.png",
    location: "/assets/svg2/location.svg",
    about: "Alice Court, Annapolis MD 21401",
    flag: "/assets/svg2/flag.svg",
    price: "1$",
    token: "60",
    income: "$ 543.99",
  },
  {
    id: 4,
    img: "/assets/images/asset4.png",
    location: "/assets/svg2/location.svg",
    about: "Doane Street, Fremont CA 94538",
    flag: "/assets/svg2/flag.svg",
    price: "1$",
    token: "40",
    income: "$ 453.99",
  },
];

export default function Assets() {
  return (
    <div className="px-6 md:px-12 ">
      <div className="max-w-[1161px] mx-auto w-full mt-10 lg:mt-0 ">
        <p className="text-26 md:text-32 text-center md:text-start font-ubuntu font-medium text-Yellow-100">
          My Assets
        </p>
        {/* <div className="text-16 md:text-20 font-regular flex justify-between">
          <p>Projects</p>
          <p className=" max-w-[100px] lg:max-w-[200px] w-full text-end md:text-center">
            Address
          </p>
          <p className=" max-w-[150px] lg:max-w-[250px] text-end lg:text-center w-full ">
            Token price
          </p>
          <p className=" max-w-[120px] w-full text-end lg:text-start">
            Your Tokens
          </p>
          <p className=" max-w-[100px] md:max-w-[150px] text-end lg:text-start w-full  ">
            {" "}
            Monthly Income
          </p>
        </div>
        {ASSETS.map((items, idx) => {
          return (
            <div
              key={`${items.id}____${idx}`}
              className="mt-6 flex justify-between border-b border-lightGray-500 pb-5 items-center md:overflow-auto"
            >
              <div className="flex gap-2 md:gap-4 items-center">
                <StyledImage
                  src={items.img}
                  alt=""
                  className="h-[50px]  md:h-[100px] w-[50px]  md:w-[100px] "
                />
                <div className="flex  gap-2 md:gap-4 items-center">
                  <StyledImage
                    src={items.location}
                    alt=""
                    className="w-[9px] h-3"
                  />
                  <p className="text-grey-600 font-inter text-12 font-regular ">
                    {items.about}
                  </p>
                  <StyledImage
                    src={items.flag}
                    alt=""
                    className="w-[22px] h-[23px]"
                  />
                </div>
              </div>

              <p className="text-grey-700 max-w-[50px] lg:max-w-[100px]  w-full text-center md:text-start  text-12 md:text-16 font-regular">
                {items.price}
              </p>
              <p className="text-grey-700  text-end md:text-start text-12 md:text-16 font-regular">
                {items.token}
              </p>
              <p className="text-darkCyan max-w-[70px] lg:max-w-[150px] text-end md:text-start w-full  text-12 md:text-16 font-regular">
                {items.income}
              </p>
            </div>
          );
        })} */}
        <div className="w-full overflow-x-auto hide-scrollbar ">
          <div className="border min-w-[1000px] border-grey-400 mt-4 p-6 rounded-[26px]">
            <table className="table-fixed w-full ">
              <thead className="text-16 md:text-20 font-regular w-full">
                <tr className=" ">
                  <th className="text-start ">Projects</th>
                  <th>Address</th>
                  <th>Token price</th>
                  <th className="text-Yellow-100 ">Your Tokens</th>
                  <th> Monthly Income</th>
                </tr>
              </thead>
              <tbody style={{ marginTop: "20px" }} className="w-full ">
                {ASSETS.map((items, idx) => {
                  return (
                    <tr
                      key={`${items.id}____${idx}`}
                      className={clsxm(
                        "text-center",
                        idx === 3 ? "" : "border-b border-b-lightGray-500 "
                      )}
                    >
                      <td className="py-6 ">
                        <StyledImage
                          src={items.img}
                          alt=""
                          className="h-[50px]  md:h-[100px] w-[50px]  md:w-[100px] "
                        />
                      </td>
                      <td className=" ">
                        <div className="flex items-center justify-between w-full gap-2 ">
                          <StyledImage
                            src={items.location}
                            alt=""
                            className="w-[9px] h-3"
                          />
                          <p className="text-grey-600 font-inter truncate text-12 font-regular ">
                            {items.about}
                          </p>
                          <StyledImage
                            src={items.flag}
                            alt=""
                            className="w-[22px] h-[23px]"
                          />
                        </div>
                      </td>

                      <td className="text-grey-700 w-full text-12 md:text-16 font-regular">
                        {items.price}
                      </td>
                      <td className="text-grey-700 text-12 md:text-16 font-regular">
                        {items.token}
                      </td>
                      <td className="text-darkCyan text-12 md:text-16 font-regular">
                        {items.income}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
