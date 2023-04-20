import loadingGif from '~/assets/images/loading.gif'

const Loading = () => {
  return (
    <div className='flex min-h-[50vh] items-center justify-center'>
      <img src={loadingGif} alt='loading' className='h-12 w-12' />
    </div>
  )
}

export default Loading
