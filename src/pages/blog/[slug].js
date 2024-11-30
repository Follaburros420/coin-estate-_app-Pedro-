import {
  BlogTwo_QueryFour_Content,
  BlogTwo_QueryTwo_Content,
} from "@/_mock/data";
import BlogHeaders from "@/components/userDetail/BlogHeaders";
import WorksTopBanner from "@/components/WorksTopBanner";
import { useQueryGetBlogList } from "@/hooks/query";
import Layout from "@/layout";
import { useParams } from "next/navigation";

export default function BlogTwo() {
  const params = useParams()
  const { data: getBlogsList } = useQueryGetBlogList();

  const selectedData = getBlogsList?.filter(item => item.id === params.slug)?.[0]

  return (
    <Layout>
      <WorksTopBanner
        heading={selectedData?.heading || "Perspectivas y Actualizaciones sobre la Tokenización Inmobiliaria "}
        desc={selectedData?.description || "Mantente informado con nuestros últimos artículos, noticias y opiniones de expertos sobre el mundo en evolución de la inversión inmobiliaria y la tecnología blockchain."}
      />
      <div className="px-6 sm:px-10 ">

        <div className="w-full max-w-[1161px] mx-auto my-10 sm:my-20 ">


          <BlogHeaders
            userImg={"/assets/svg/UserIcon.svg"}
            userName={"Pedro Ardila"}
            date={"Octubre 17, 2024"}
            dataBtn={"Sector Inmobiliario"}
            mainImg={"/assets/images/BlogTwoMainImg.png"}
            heading={selectedData?.subheading}
          />
          <div className="text-14 font-inter text-gray font-medium bg-white rounded-[8px] shadow-md mt-8 sm:mt-16 p-6 ">
            <div>
              <p>
                {selectedData?.details}
              </p>
              <br />
              {selectedData?.items.map((item, idx) => {
                return (
                  <div key={item.key}>
                    <p className=" sm:text-20 font-bold font-inter text-center sm:text-start capitalize text-black-100 ">{item?.name}</p>
                    <div dangerouslySetInnerHTML={{ __html: item.text_details }} />
                  </div>
                )
              })}

            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
