import { useMutateTransferFunds } from '@/hooks/mutation'
import { useQueryGetUser } from '@/hooks/query'
import Layout from '@/layout/admin'
import React from 'react'

export default function Page() {
  const { mutate: sendFunds } = useMutateTransferFunds()
  return (
    <div>
      <Layout>
        <h2 className='uppercase text-center mt-10 text-32 font-bold'>testing page</h2>
        <button onClick={() => sendFunds({ address: '0xA90f979c91B5422ea8eA36ecd1128876fc371bc3' })}>Transfer Founds</button>
      </Layout>
    </div>
  )
}
