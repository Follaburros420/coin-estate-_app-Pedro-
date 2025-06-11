import StyledImage from "@/components/StyedImage";
import { formatNumberIndianStyle } from "@/utils/wagmiConfig";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlockChainTab({ nft, userData }) {
  const params = useParams();
  const remaining = userData?.filter((item) => item.propertyId === params?.market_place)?.[0];

  const totalTokens = nft?.totalInvestmentPrice / nft?.tokenPrice;
  let remainingTokens = remaining?.remaining / nft?.tokenPrice;
  remainingTokens = totalTokens - remainingTokens;

  remainingTokens = Number(remainingTokens?.toFixed(4));
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
            Total tokens: <span className="text-white ">{formatNumberIndianStyle(remainingTokens)}</span>
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
          <Link href={`https://testnet.bscscan.com/address/${nft?.address}`} target="_blank" className="text-light-blue hover:underline mt-2 truncate ">
            {nft?.address}
          </Link>
        </div>
      </div>
    </div>
  );
}
