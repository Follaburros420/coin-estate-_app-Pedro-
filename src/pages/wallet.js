import Currency from '@/components/Currency'
import Investment from '@/components/Investment'
import Profile from '@/components/Profile'
import TransactionHistory from '@/components/TransactionHistory'
import Layout from '@/layout/admin'
import React from 'react'

export default function page() {
  return (
    <Layout>
      <div className="bg-black-800 text-white">
        <Profile />
        <Currency />
        <Investment />
        <TransactionHistory />
      </div>
    </Layout>
  )
}
