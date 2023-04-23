import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { voucherAPI } from '~/api'
import { Loading } from '~/components/Loading'
import { STALE_TIME_CONSTANT } from '~/constants'
import { VoucherEmpty, VoucherList } from '~/modules/Voucher'
import { routeConfig } from '~/route/routeConfig'
import { useStore } from '~/store/globalStore'

const VoucherDiscoverPage = () => {
  const { currentUser } = useStore((state) => state)
  const navigate = useNavigate()

  const {
    isLoading,
    data: vouchersData,
    refetch
  } = useQuery({
    queryKey: ['vouchersDiscover'],
    queryFn: () => voucherAPI.getDiscoverVoucher(),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  const saveVoucherMutation = useMutation({
    mutationFn: (code: string) => voucherAPI.saveVoucher(code)
  })

  const handleSubmitVoucher = React.useCallback(
    (voucher: string) => {
      if (!currentUser || !currentUser._id) {
        navigate(routeConfig.SignIn)
        return
      }

      saveVoucherMutation.mutate(voucher, {
        onSuccess: ({ message }) => {
          toast.success(message)
          refetch()
        },
        onError: (error: any) => {
          toast.error(error?.message)
        }
      })
    },
    [currentUser, navigate, refetch, saveVoucherMutation]
  )

  const renderVoucherDiscover = () => {
    if (isLoading) {
      return <Loading />
    }

    if (vouchersData?.data?.data?.length === 0 || !vouchersData) {
      return <VoucherEmpty />
    }

    const voucherList = vouchersData?.data
    return (
      <div className='layout-container'>
        <h2 className='mt-6 mb-4 text-base font-medium'>KHÁM PHÁ VOUCHER TỪ SHOPBEE</h2>
        <VoucherList
          voucherList={voucherList}
          currentUserId={currentUser?._id}
          isDiscoverVoucherPage
          handleSubmitVoucher={handleSubmitVoucher}
        />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Mã Giảm Giá | Sale Sale Ngày Hội Mua Sắm | Shopee Việt Nam</title>
      </Helmet>
      {renderVoucherDiscover()}
    </>
  )
}

export default VoucherDiscoverPage
