import StyledImage from "@/components/StyedImage";

export default function BlockChainTab({nft}) {
  return (
    <div className="mt-8 bg-black-1000 p-6 rounded-[20px] overflow-hidden ">
      <div className="flex flex-col sm:flex-row items-center justify-between ">
        <div className="flex items-center gap-2 ">
          <StyledImage
            src="/assets/svg/BlockChainCubes.svg"
            className="w-11 h-4 "
          />
          <p className="text-20 text-white font-bold ">Blockchain</p>
        </div>
        <div>
          <p className="text-Yellow-100 font-bold text-20 ">
            Total tokens: <span className="text-white ">{nft?.tokenPrice}</span>
          </p>
        </div>
      </div>
      <p className="text-24 font-bold text-center sm:text-start text-Yellow-100 mt-10 ">
        Información del Token{" "}
      </p>
      <div
        style={{ borderRadius: "0px 0px 20px 20px" }}
        className="border-t border-t-Yellow-100 mt-5 "
      >
        <div className="grid sm:grid-cols-2 place-items-center sm:place-items-start py-3 border-b border-b-white  ">
          <p className="text-24 font-bold  ">Identificador</p>
          <p className="mt-2 ">{nft?.location}</p>
        </div>
        <div className="grid sm:grid-cols-2 place-items-center sm:place-items-start py-3 border-b border-b-white ">
          <p className="text-24 font-bold  ">Dirección del Contrato</p>
          <p className="text-blue-400 mt-2 truncate ">
            {nft?.address}
          </p>
        </div>
      </div>
    </div>
  );
}
