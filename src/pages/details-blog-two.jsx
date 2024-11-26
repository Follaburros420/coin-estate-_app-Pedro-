import RegisterBottomBanner from '@/components/RegisterBottomBanner'
import BlogTwo from '@/components/userDetail/BlogTwo'
import WorksTopBanner from '@/components/WorksTopBanner'
import Layout from '@/layout'
import React from 'react'

export default function detailsBlogTwo() {
  return (
    <div>
      <Layout>
        <WorksTopBanner
          heading="Perspectivas y Actualizaciones sobre la Tokenización Inmobiliaria "
          desc="Mantente informado con nuestros últimos artículos, noticias y opiniones de expertos sobre el mundo en evolución de la inversión inmobiliaria y la tecnología blockchain."
        />
        <BlogTwo />
        <RegisterBottomBanner />
      </Layout>
    </div>
  )
}
