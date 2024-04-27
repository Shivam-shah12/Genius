import React from 'react'
import Navbar from '@/components/mycompo/Navbar';
import Sidebar from '@/components/mycompo/Sidebar';
import { getApiLimit } from '@/lib/api-limit';
import { ModalProvider } from '@/components/mycompo/modal-provider';
import { checkSubscription } from '@/lib/subscription';
import { ToastProvider } from '@/components/mycompo/toast-provider';

const DashboardLayout = async({children}:{children:React.ReactNode}) => {
  const apiLimitCount=await getApiLimit();
  const isPro=await checkSubscription();
  return (
    <div className='h-full relative'>
    <div className="md:w-72 md:flex md:flex-col bg-gray-900 md:fixed md:inset-y-0  h-full hidden ">
     <Sidebar apiLimitCount={apiLimitCount} isPro={isPro}/>
    </div>
    <main className='md:pl-72'>
      <ModalProvider/>
      <Navbar/>
      <ToastProvider/>
      {children}
    </main>
    </div>
  )
}


export default DashboardLayout;
