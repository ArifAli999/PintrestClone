import React from 'react'

function FileUploader({img, handleChange}) {
  return (
      <div className="w-full rounded-lg p-6">
          <label className='text-xs text-gray-500 w-full mb-4'>FILE
              <div className="mt-2 rounded border border-gray-300 ">

                  <div className="flex items-center justify-center w-full ">

                      <label
                          className="flex flex-col w-full h-full  justify-center">

                          <div className="flex flex-col items-center justify-center pt-0 mb-0 max-h-[400px] w-full relative">
                              {img ? (<><img src={img} alt="" className="w-full max-h-[300px] object-fit object-cover " /><input type="file" className="opacity-0 bg-gray-400 absolute w-full" onChange={handleChange} accept="/image/*" /></>
                              ) : (<>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-pink-400 group-hover:text-pink-50 mt-6"
                                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>
                                  <p className="pt-6 mb-6 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                      Attach an image
                                  </p>
                                  <input type="file" className="opacity-0 bg-gray-400 absolute w-full" onChange={handleChange} accept="/image/*" />
                              </>)}


                          </div>


                      </label>
                  </div>
              </div>
          </label>

      </div>
  )
}

export default FileUploader