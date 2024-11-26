
import PropertyTable from "@/components/Admin/PropertyTable";
import SortableTable from "@/components/Admin/Table";
import { useMutateDeleteBlog } from "@/hooks/mutation";
import { useQueryGetBlogList, useQueryGetProperty } from "@/hooks/query";
import Layout from "@/layout/admin";

export default function Dashboard() {
  const { data: getPropertyDetails } = useQueryGetProperty();
  const { mutate: mutateDeleteBlog, isPending: isLoadingDelete } = useMutateDeleteBlog();
  // const { data: getPropertyDetails } = useQueryGetPropertiesList()
  const { data: blogList } = useQueryGetBlogList()
  const latestBlogList = blogList?.map((item, idx) => {
    const date = new Date(item?.createdAt);
    return {
      ...item,
      rowNum: idx + 1,
      value: date?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      edit: <img src="/assets/svg/edit.svg" alt="" className="mx-auto" />,
      delete: <img src="/assets/svg/delete.svg" alt="" className="mx-auto" />,
    }
  });

  const latestData = getPropertyDetails?.map((item, idx) => ({ ...item, rowNum: idx + 1 }));


  const handleDelete = (id) => {
    console.log('delete', id)
    mutateDeleteBlog(id)
  }

  const handleUpdate = (id) => {
    console.log('update', id)
  }


  return (
    <div>
      <Layout>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl text-center uppercase font-bold mb-6">Blogs</h1>
          {blogList?.length > 0 &&
            <SortableTable
              deleteRow={handleDelete}
              updateRow={handleUpdate}
              data={latestBlogList}
              rowsPerPage={7}
            />
          }
        </div>
        <div className="container mx-auto p-6">
          <h1 className="text-2xl text-center uppercase font-bold mb-6">Properties</h1>
          {getPropertyDetails?.length > 0 && <PropertyTable data={latestData} rowsPerPage={7} />}
        </div>
      </Layout>
    </div>
  );
}
