import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ProductList } from '~/modules/Product'
import { getHistoryProductsLocalStorage, removeHistoryLocalStorage } from '~/utils'
import { sweetAlertDelete } from '~/utils/sweetAlert'
import historyEmpty from '~/assets/images/history.png'

const UserHistory = () => {
  const history = getHistoryProductsLocalStorage()
  const handleClearHistory = () => {
    sweetAlertDelete(() => {
      removeHistoryLocalStorage()
      window.location.reload()
    })
  }

  const isEmptyHistory = React.useMemo(() => {
    return history.length === 0
  }, [history])

  const renderProductHistoryList = () => {
    if (!isEmptyHistory) {
      return <ProductList products={history} />
    }
    return (
      <div className='mt-3 flex h-[300px] flex-col items-center justify-center gap-2'>
        <img src={historyEmpty} alt='history' className='h-20 w-20' />
        <h3>Lịch sử xem trống</h3>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Lịch sử xem gần đây</title>
      </Helmet>
      <div className='flex items-center justify-between'>
        <h2 className='text-base font-medium'>Lịch sử xem gần đây</h2>
        {!isEmptyHistory && (
          <button type='button' onClick={handleClearHistory} className='hover:text-redCustomize'>
            Xóa tất cả
          </button>
        )}
      </div>
      {renderProductHistoryList()}
    </>
  )
}

export default UserHistory
