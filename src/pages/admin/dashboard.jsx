import PropertyTable from '@/components/Admin/PropertyTable';
import SortableTable from '@/components/Admin/Table';
import { useMutateMint } from '@/hooks/contract/mutateContract';
import { useQueryGetNftsFromContract } from '@/hooks/contract/query';
import { useMutateDeleteBlog, useMutateMinteToken } from '@/hooks/mutation';
import { useQueryGetBlogList, useQueryGetMintedTokenlist, useQueryGetProperty } from '@/hooks/query';
import Layout from '@/layout/admin';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const { mutate: mintToken } = useMutateMinteToken();
  
  const { data: mintedTokensList, refetch } = useQueryGetMintedTokenlist();
  const { data: getPropertyDetails, refetch: propertyRefetch } = useQueryGetProperty();

  const onSuccess = (value) => {
    const values = {
      name: selected?.name,
      tokenId: selected?.id,
      address: selected?.address,
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

  const { mutate: mintNfts, isPending: isLoadingMint } = useMutateMint(onSuccess);
  const { data: getNftsList } = useQueryGetNftsFromContract();
  console.log({ getNftsList });

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

  const latestData = getPropertyDetails?.map((item, idx) => ({
    minted: mintedTokensList?.filter((mint) => mint.tokenId === item.id)?.[0]?.name ? 'Minted' : 'Not Minted',
    ...item,
    rowNum: idx + 1,
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
    setSelected({ ...res, tokenAddress });

    mintNfts({ tokenAddress, amount: res?.propertyPrice });
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
        <div className='container mx-auto p-6'>
          <h1 className='text-2xl text-center uppercase font-bold mb-6'>Properties</h1>
          <button onClick={handleRefresh}>handleRefresh</button>
          {getPropertyDetails?.length > 0 && (
            <PropertyTable data={latestData} handleMintNft={handleMintNft} rowsPerPage={10} />
          )}
        </div>
      </Layout>
    </div>
  );
}
