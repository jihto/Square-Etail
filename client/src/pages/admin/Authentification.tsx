import React from 'react'
import FormField from '../../components/inputs/FormField'
import { Button } from '../../components/buttons/Button'
import { useNavigate } from 'react-router-dom'

const Authentification = () => {
    const navigate = useNavigate();
    return (
        <div className='absolute w-full h-screen'>
            <div className=' flex justify-center h-screen items-center'>
                <div className='bg-red-400 p-10 rounded-xl grid gap-4 w-1/4 text-white'>
                    <h1 className='text-xl'>Square Etail</h1>   
                    <p>Wellcome back to the Admin page</p>
                    <FormField handleChange={()=>{}} name='Email' placeholder='Input email...' value='' autoFocus />
                    <FormField handleChange={()=>{}} name='password' placeholder='Input password...' value='' type='password' /> 
                    <p className='flex justify-end underline'>Forgot password?</p>
                    <Button handleSubmit={()=>navigate('/admin/home')}>Submit</Button>
                </div>
                
            </div>
        </div>
    )
}

export default Authentification