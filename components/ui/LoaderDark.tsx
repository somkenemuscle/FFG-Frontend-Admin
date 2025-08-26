import Image from 'next/image'

const LoaderDark = () => {
    return (
        <span className='loader '>
            <Image
                src='/loaderDark.svg'
                alt='loader'
                width={20}
                height={20}
                className='animate-spin'
                priority
            />
        </span>
    )
}

export default LoaderDark;