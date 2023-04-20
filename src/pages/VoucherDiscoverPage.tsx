import React from 'react'
import { useStore } from '~/store/globalStore'

const VoucherDiscoverPage = () => {
  const { currentUser } = useStore((state) => state)

  return <div>VoucherDiscoverPage</div>
}

export default VoucherDiscoverPage
