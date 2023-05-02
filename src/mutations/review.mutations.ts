import { useMutation } from 'react-query'
import { reviewAPI } from '~/api'
import { IPayloadReview, IPayloadUpdateReview } from '~/types'

const useCreateReview = () => useMutation((payload: IPayloadReview) => reviewAPI.createNewReview(payload))
const useUpdateReview = () =>
  useMutation(({ reviewId, payload }: IPayloadUpdateReview) => reviewAPI.updateReview(reviewId, payload))
const useDeleteReview = () => useMutation((reviewId: string) => reviewAPI.deleteReview(reviewId))

export { useCreateReview, useUpdateReview, useDeleteReview }
