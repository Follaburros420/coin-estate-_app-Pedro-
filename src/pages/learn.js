import About from "@/components/About";
import AboutBlog from "@/components/AboutBlog";
import Blog from "@/components/Blog";
import WorksTopBanner from "@/components/WorksTopBanner";
import { useQueryGetBlogList } from "@/hooks/query";
import Layout from "@/layout";

export default function Page() {
  const { data: getBlogsList } = useQueryGetBlogList();
  const firstBlog = getBlogsList?.filter((item)=>item.image !== 'null')?.[0]
  return (
    <Layout>
      <div className="bg-lightblue">
        {/* <Update /> */}
        <WorksTopBanner
          heading={
            "Perspectivas y Actualizaciones sobre la Tokenización Inmobiliaria"
          }
          desc={
            "Mantente informado con nuestros últimos artículos, noticias y opiniones de expertos sobre el mundo en evolución de la inversión inmobiliaria y la tecnología blockchain."
          }
        />
        <Blog blog={firstBlog} />
        <AboutBlog getBlogsList={getBlogsList} />
        <About />
      </div>
    </Layout>
  );
}
