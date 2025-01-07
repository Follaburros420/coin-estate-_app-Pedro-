import PropertyTable from '@/components/Admin/PropertyTable';
import SortableTable from '@/components/Admin/Table';
import { useMutateMintNft } from '@/hooks/contract/mutateContract';
import { useQueryGetNftsFromContract } from '@/hooks/contract/query';
import { useMutateDeleteBlog } from '@/hooks/mutation';
import { useQueryGetBlogList, useQueryGetProperty } from '@/hooks/query';
import Layout from '@/layout/admin';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const { mutate: mintNfts, isPending: isLoadingMint } = useMutateMintNft();

  const { data: getNftsList } = useQueryGetNftsFromContract();
  // console.log({ getNftsList });
  const { data: getPropertyDetails } = useQueryGetProperty();
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
    ...item,
    rowNum: idx + 1,
    actions: (
      <div className='flex items-center space-x-2'>
        <button
          className='font-bold bg-red-100 bg-transparent p-1'
          onClick={(res) => {
            // console.log(res);
          }}>
          {isLoadingMint ? 'Loading...' : 'Mint'}
        </button>
      </div>
    ),
  }));
  // console.log("🚀 ~ latestData ~ latestData:", latestData)

  const handleDelete = (id) => {
    mutateDeleteBlog(id);
  };

  const handleUpdate = (cell, id) => {
    if (cell === 'edit') {
      router.push(`/admin/update-blog?id=${id}`);
    }
  };

  const handleMintNft = (res) => {
    const index =  latestData?.findIndex((item) => item.id === res?.id);
    const tokenAddress = getNftsList?.[index]
    console.log({res, index,tokenAddress});
    mintNfts({tokenAddress, amount:res?.propertyPrice,})
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
          {getPropertyDetails?.length > 0 && (
            <PropertyTable data={latestData} handleMintNft={handleMintNft} rowsPerPage={7} />
          )}
        </div>
      </Layout>
    </div>
  );
}
