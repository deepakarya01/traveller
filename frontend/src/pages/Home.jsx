import React, { useContext } from 'react'
import Places from '../components/Places'
import ClipLoader  from 'react-spinners/ClipLoader'
import { UserContext } from '../store/AuthContext'

const Home = () => {
  const {loading} = useContext(UserContext);
  return (
    <>
    {loading && (
         <div className="flex items-center justify-center w-full h-80">
            <ClipLoader color="#3b82f6" size={50} />
         </div>
      )}
    <div className='grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-4'>
      <Places/>      
    </div>
    </>
  )
}

export default Home