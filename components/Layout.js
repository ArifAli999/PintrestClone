import Navbar from './Navbar'


export default function Layout({ children }) {
    return (
        <div className='md:w-4/5 w-full container mx-auto h-[100%]  '>

            <Navbar />
            {children}

        </div>
    )
}