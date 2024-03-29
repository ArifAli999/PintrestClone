import { Tab } from '@headlessui/react'
import PostGrid from './PostGrid'
import LikedPosts from './LikedPosts'
import ListPosts from './ListPosts'
import useAuthStore from '../store/authStore'

function ProfileTabs({ posts, likes, profileid }) {

    const { userProfile } = useAuthStore()


    return (
        <Tab.Group >
            <Tab.List className='flex space-x-1 irounded-xl items-center justify-center gap-6 p-2 mt-4'>
                <Tab className={({ selected }) =>
                    selected ? 'bg-pink-500 text-white  py-2 px-4  rounded-full transition-all duration-50 ease-linear ' : 'bg-gray-100 text-black transition-all duration-50 ease-linear py-2 px-4  rounded-full'
                }>

                    Posts
                </Tab>
                <Tab className={({ selected }) =>
                    selected ? 'bg-pink-500 text-white  py-2 px-4  rounded-full transition-all duration-50 ease-linear ' : 'bg-gray-100 text-black transition-all duration-50 ease-linear py-2 px-4  rounded-full'
                }>Favourites</Tab>

                {userProfile.uid === profileid ? <Tab className={({ selected }) =>
                    selected ? 'bg-pink-500 text-white  py-2 px-4  rounded-full transition-all duration-50 ease-linear ' : 'bg-gray-100 text-black transition-all duration-50 ease-linear py-2 px-4  rounded-full'
                }>Saved</Tab> : null}
             
            </Tab.List>


            <Tab.Panels>
                <Tab.Panel>
                    <PostGrid posts={posts} />
                </Tab.Panel>
                <Tab.Panel>
                    <LikedPosts likes={likes} />
                </Tab.Panel>

                {userProfile.uid === profileid ? <Tab.Panel className='w-full'>
                    <ListPosts profileid={profileid} />
                </Tab.Panel> : null }
          


            </Tab.Panels>
        </Tab.Group>
    )
}

export default ProfileTabs