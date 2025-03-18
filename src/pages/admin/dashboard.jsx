import PropertyTable from '@/components/Admin/PropertyTable';
import MonthlyInvestment from '@/components/Admin/SetMonthly';
import SortableTable from '@/components/Admin/Table';
import { useMutateMint } from '@/hooks/contract/mutateContract';
import { useQueryGetNftsFromContract } from '@/hooks/contract/query';
import { useMutateDeleteBlog, useMutateMinteToken } from '@/hooks/mutation';
import {
  useQueryGetBlogList,
  useQueryGetMintedTokenlist,
  useQueryGetMonthlyPriceList,
  useQueryGetProperty
} from '@/hooks/query';
import Layout from '@/layout/admin';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

const handleFormateMonth = (monthlyPriceList) => {
  // 🔹 Group data by tokenId
  const groupedByTokenId = monthlyPriceList.reduce((acc, item) => {
    if (!acc[item.tokenId]) {
      acc[item.tokenId] = [];
    }
    acc[item.tokenId].push(item);
    return acc;
  }, {});

  // 🔹 Sort each token group by createdAt (ascending)
  Object.keys(groupedByTokenId).forEach((tokenId) => {
    groupedByTokenId[tokenId].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  });

  // 🔹 Get date thresholds
  const now = new Date();
  const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  // const firstDayOfCurrentMonth = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago

  // 🔹 Separate tokens by date
  const currentMonthTokens = {};
  const olderTokens = {};

  Object.keys(groupedByTokenId).forEach((tokenId) => {
    const latestEntry = groupedByTokenId[tokenId].at(-1); // Get the latest updated entry

    if (new Date(latestEntry.createdAt) >= firstDayOfCurrentMonth) {
      currentMonthTokens[tokenId] = groupedByTokenId[tokenId];
    } else {
      olderTokens[tokenId] = groupedByTokenId[tokenId];
    }
  });

  return {
    currentMonthTokens,
    olderTokens,
  };
};

export default function Dashboard() {
  const router = useRouter();
  const { address } = useAccount();
  // const [pagination, setPagination] = useState({
  //     pageIndex: 0,
  //     pageSize: 5,
  //   });
  
  const [selected, setSelected] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const { mutate: mintToken } = useMutateMinteToken();
  const { data: mintedTokensList, refetch } = useQueryGetMintedTokenlist();
  const { data: getPropertyDetails, refetch: propertyRefetch } = useQueryGetProperty();
  const { data: monthlyPriceList, refetch: refetchList } = useQueryGetMonthlyPriceList();


  // Filter records created before 30 days
  const recodesOfMonth = monthlyPriceList?.length > 0 && handleFormateMonth(monthlyPriceList);


  const onSuccess = (value) => {
    const values = {
      name: selected?.name,
      tokenId: selected?.id,
      address: address,
      price: selected?.propertyPrice,
      tokenAddress: selected?.tokenAddress,
    };
    mintToken(values);
    refetch();
    propertyRefetch();
    setTimeout(() => {
      refetch();
      propertyRefetch();
    }, 1000);
  };

  const handleRefresh = () => {
    refetch();
    propertyRefetch();
  };

  const handleSendPay = (value) => {
    if (value?.minted !== 'Not Minted') {
      const mintedData = mintedTokensList.filter((item) => item.tokenId === value?.id)?.[0];
      setOpenModel({ ...value, tokenAddress: mintedData?.tokenAddress });
      refetchList();
    } else {
      toast.error('please mint it first');
    }
  };

  const { mutate: mintNfts, isPending: isLoadingMint } = useMutateMint(onSuccess);
  const { data: getNftsList } = useQueryGetNftsFromContract();
  console.log({getNftsList})

  const { mutate: mutateDeleteBlog, isPending: isLoadingDelete } = useMutateDeleteBlog();
  const { data: blogList } = useQueryGetBlogList();
  const latestBlogList = blogList?.map((item, idx) => {
    const date = new Date(item?.createdAt);
    return {
      ...item,
      rowNum: idx + 1,
      value: date?.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      edit: <img src='/assets/svg/Edit.svg' alt='' className='mx-auto' />,
      delete: <img src='/assets/svg/delete.svg' alt='' className='mx-auto' />,
    };
  });
  //
  const latestData = getPropertyDetails?.map((item, idx) => ({
    minted: mintedTokensList?.filter((mint) => mint.tokenId === item.id)?.[0]?.name ? 'Minted' : 'Not Minted',
    ...item,
    rowNum: idx + 1,
    monthly: (
      <div className=''>
        {!recodesOfMonth?.currentMonthTokens?.[item?.id] ? (
          <button className='font-bold bg-blue-400 w-full py-2 rounded-[8px] bg-transparent p-1'>Add</button>
        ) : (
          <p className='font-bold'>
            {recodesOfMonth?.currentMonthTokens?.[item?.id]?.[0]?.price}{' '} $ /{' '}
            {recodesOfMonth?.currentMonthTokens?.[item?.id]?.[0]?.percentage} %
          </p>
        )}
      </div>
    ),
    actions: (
      <div className='flex items-center space-x-2 px-2'>
        {!mintedTokensList?.filter((mint) => mint.tokenId === item.id)?.[0]?.name ? (
          <button className='font-bold bg-blue-400 w-full py-2 rounded-[8px] bg-transparent p-1'>
            {isLoadingMint && selected.id === item.id ? 'Loading...' : 'Mint'}
          </button>
        ) : (
          'Minted'
        )}
      </div>
    ),
  }));

  const handleDelete = (id) => {
    mutateDeleteBlog(id);
  };

  const handleUpdate = (cell, id) => {
    if (cell === 'edit') {
      router.push(`/admin/update-blog?id=${id}`);
    }
  };

  const handleMintNft = (res) => {
    const index = latestData?.findIndex((item) => item.id === res?.id);
    const tokenAddress = getNftsList?.[index];
    console.log({tokenAddress})
    setSelected({ ...res, tokenAddress });

    mintNfts({ tokenAddress, amount: res?.totalInvestmentPrice });
  };

  return (
    <div>
      <Layout>
        <div className='container mx-auto p-6'>
          <h1 className='text-2xl text-center uppercase font-bold mb-6'>Blogs</h1>
          {blogList?.length > 0 && (
            <SortableTable deleteRow={handleDelete} updateRow={handleUpdate} data={latestBlogList} rowsPerPage={7} />
          )}
        </div>
        <div></div>
        <div className='container mx-auto p-6'>
          <h1 className='text-2xl text-center uppercase font-bold mb-6'>Properties</h1>
          {/* <button onClick={handleRefresh}>handleRefresh</button> */}
          {getPropertyDetails?.length > 0 && (
            <PropertyTable
              data={latestData}
              handleMintNft={handleMintNft}
              handleSendPay={handleSendPay}
              rowsPerPage={5}
            />
          )}
        </div>

        {openModel && <MonthlyInvestment refetchList={refetchList} setOpenModel={setOpenModel} openModel={openModel} />}
      </Layout>
    </div>
  );
}
