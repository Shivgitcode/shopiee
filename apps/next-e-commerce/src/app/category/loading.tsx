import Spinner from '@/components/Spinner'
import React from 'react'

export default function loading() {
    return (
        <div className=' w-full h-[500px] flex items-center justify-center'><Spinner></Spinner></div>
    )
}
