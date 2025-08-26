import Image from 'next/image'

const Loader = () => {
    return (
        <span className='loader '>
            <Image
                src='/loader.svg'
                alt='loader'
                width={20}
                height={20}
                className='animate-spin'
                priority
            />
        </span>
    )
}

export default Loader;