import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { voucherAPI } from '~/api'
import { Loading } from '~/components/Loading'
import { Tabs } from '~/components/Tabs'
import { STALE_TIME_CONSTANT } from '~/constants'
import useQueryParams from '~/hooks/useQueryParams'
import { CommonLayout } from '~/layouts/templates'
import { VoucherEmpty, VoucherForm, VoucherList } from '~/modules/Voucher'
import { routeConfig } from '~/route/routeConfig'
import { useStore } from '~/store/globalStore'

const UserWallet = () => {
  const { currentUser } = useStore((state) => state)
  const { queryParams } = useQueryParams()
  const status = queryParams?.status || ''

  const tabs = React.useMemo(
    () => [
      {
        key: '',
        display: 'Tất cả',
        to: routeConfig.VoucherWalletPage
      },
      {
        key: 'used',
        display: 'Đã sử dụng',
        to: `${routeConfig.VoucherWalletPage}?status=used`
      },
      {
        key: 'expiration',
        display: 'Hết hiệu lực',
        to: `${routeConfig.VoucherWalletPage}?status=expiration`
      }
    ],
    []
  )

  const {
    isLoading,
    refetch,
    data: myVouchersData
  } = useQuery({
    queryKey: ['myVouchers', status],
    queryFn: () => voucherAPI.getMyVoucher({ status }),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  const saveVoucherMutation = useMutation({
    mutationFn: (code: string) => voucherAPI.saveVoucher(code)
  })

  const handleSubmitVoucher = React.useCallback(
    (voucher: string) => {
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
    [refetch, saveVoucherMutation]
  )

  const renderVoucher = () => {
    if (isLoading) {
      return <Loading />
    }

    if (myVouchersData?.data.length === 0 || !myVouchersData) {
      return <VoucherEmpty />
    }

    return <VoucherList voucherList={myVouchersData?.data} />
  }

  return (
    <CommonLayout
      title='Ví voucher'
      desc='Khám phá kho voucher'
      subtitle={
        <Link to={routeConfig.VoucherDiscoverPage} className='text-[#ee4d2d]'>
          Tìm thêm voucher
        </Link>
      }
    >
      <Helmet>
        <title>Kho voucher của bạn</title>
      </Helmet>
      <VoucherForm handleSubmitForm={handleSubmitVoucher} disabledButton={!currentUser || !currentUser?._id} />
      <Tabs query={status} tabs={tabs} />
      {renderVoucher()}
    </CommonLayout>
  )
}

export default UserWallet
