import About from "@/components/About";
import AboutBlog from "@/components/AboutBlog";
import Blog from "@/components/Blog";
import WorksTopBanner from "@/components/WorksTopBanner";
import { useQueryGetBlogList } from "@/hooks/query";
import Layout from "@/layout";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: getBlogsList } = useQueryGetBlogList();
  const [blogs, setBlogs] = useState(getBlogsList)
  const firstBlog = getBlogsList?.filter((item) => item.image !== 'null')?.[0]

  const handleSelectFilter = (value) => {
    const filteredProperty = value !== 'all' ? getBlogsList.filter(
      (item) => item.blogStatus.toLowerCase() === value?.toLowerCase()
    ) : getBlogsList;
    setBlogs(filteredProperty)
  }

  const handleSearch = (value) => {
    const searched = getBlogsList.filter((item) =>
      item.heading.toLowerCase().includes(value.toLowerCase())
    );
    setBlogs(searched)
  }

  useEffect(() => {
    if (getBlogsList?.length > 0)
      setBlogs(getBlogsList)
  }, [getBlogsList?.length])
  return (
    <Layout>
      <div className="bg-lightblue">
        <WorksTopBanner
          heading={
            "Perspectivas y Actualizaciones sobre la Tokenización Inmobiliaria"
          }
          desc={
            "Mantente informado con nuestros últimos artículos, noticias y opiniones de expertos sobre el mundo en evolución de la inversión inmobiliaria y la tecnología blockchain."
          }
        />
        <Blog handleSelectFilter={handleSelectFilter} handleSearch={handleSearch} blog={firstBlog} />
        <AboutBlog getBlogsList={blogs} />
        <About />
      </div>
    </Layout>
  );
}
