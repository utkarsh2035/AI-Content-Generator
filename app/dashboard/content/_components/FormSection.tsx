"use client"
import React, { useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'

interface PROPS{
    selectedTemplate?:TEMPLATE,
    userFormInput:any,
    loading:boolean
}

const FormSection = ({selectedTemplate, userFormInput, loading}:PROPS) => {

    const[formData, setFormData] = useState<any>()
    const handleInputChange = (e:any)=>{
        const{name, value} = e.target
        setFormData({...formData, [name]:value})
    }
    const onSubmit = (e:any)=>{
        e.preventDefault()
        userFormInput(formData)
    }

  return (
    <div className='p-5 shadow-lg border rounded-lg bg-white'>
        {/* @ts-ignore */}
        <Image src={selectedTemplate?.icon} alt='icon' width={70} height={70}/> 
      <h2 className='font-bod text-2xl mb-2 text-primary pt-4'>
        {selectedTemplate?.name}
      </h2>
      <p className='text-sm text-gray-500'>{selectedTemplate?.desc}</p>

      <form className='mt-6' onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
            <div className='my-2 flex flex-col gap-2 mb-7' key={index}>
                <label className='font-bold'>{item.label}</label>
                { item.field == 'input' ?
                    <Input name={item.name} required={item?.required} onChange={handleInputChange} />
                    : item.field == 'textarea' ?
                    <Textarea name={item.name} required={item?.required} onChange={handleInputChange} rows={5}/> : null
                }
            </div>
        ))}
        <Button className='w-full py-6' type='submit' disabled={loading}>
            {loading&&<Loader2Icon className='animate-spin'/>}
            Generate Content</Button>
      </form>
    </div>
  )
}

export default FormSection
