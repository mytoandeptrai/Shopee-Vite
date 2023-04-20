import { useQuery } from 'react-query'
import { cityAPI } from '~/api'
import { STALE_TIME_CONSTANT } from '~/constants'

export default function useFetchAdministrative(cityId?: string, districtId?: string) {
  const { data: citiesData } = useQuery({
    queryKey: ['cities'],
    queryFn: () => cityAPI.getAllCities(),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  const { data: districtsData } = useQuery({
    queryKey: ['districts', cityId],
    queryFn: () => cityAPI.getAllDistrict({ cityId }),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME,
    keepPreviousData: true,
    enabled: cityId !== undefined && cityId !== ''
  })

  const { data: wardsData } = useQuery({
    queryKey: ['wards', districtId],
    queryFn: () => cityAPI.getAllWard({ districtId }),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME,
    keepPreviousData: true,
    enabled: districtId !== undefined && districtId !== ''
  })

  return {
    cities: citiesData?.data || [],
    districts: districtsData?.data || [],
    wards: wardsData?.data || []
  }
}
