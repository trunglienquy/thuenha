"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const router = useRouter()

    const checkServer = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health`, { method: 'GET' })
            if (res.ok) {
                router.push('/landing')
            }
        } catch (error) {
            console.error("Error checking server health:", error)
        }
    }
    useEffect(() => {
        checkServer()
    }, [router])
  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-center h-screen'>
        <div className='h-screen w-full'>
            <div className='flex flex-col justify-center w-full items-center h-full gap-6'>
                <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold text-center w-full'>Oops! Hệ thống đang bảo trì</h1>
                <span className='text-center text-xs md:text-lg '>Chúng tôi rất xin lỗi vì sự bất tiện này. Xin vui lòng quay lại sau.</span>
                <a href="/landing" className='px-10 py-3 md:px-20 md:py-5 bg-secondary-600 rounded-xl text-primary-100 text-xs md:text-xl font-bold'>Quay lại trang chủ</a>
            </div>
        </div>
        <div className='h-screen flex items-center justify-center w-full'>
            <img src="./maintance.svg" alt="maintance" />
        </div>
    </div>
  )
}

export default page