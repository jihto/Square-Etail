
import { useForm } from 'react-hook-form';
import FormField from '../../components/inputs/FormField';
import { Button } from '../../components/buttons/Button';
import { CiGlobe, CiLight, CiMedal } from 'react-icons/ci';
import Heading from '../../components/Heading';

interface FormValues{
    name: string;
    email: string;
    content: string;
}


const Contact = () => { 
    const {register} = useForm<FormValues>()  
    return (
        <article className='flex w-auto mx-5 gap-10 md:mx-20 lg:mx-40 xl:mx-80 mt-24 md:mt-[150px]'>
            <section className='flex-1 grid gap-4 text-center'>  
                <p className='text-3xl font-medium text-secondary'>Get in touch with us for more information</p>
                <p>if you need help or have a question, we're here for you</p>
                <FormField 
                    name='name'
                    register={register("name")}
                    labelName='Full name'
                    placeholder='Write your fullname...'
                />
                <FormField 
                    name='email'
                    register={register("email")}
                    labelName='Email'
                    placeholder='Write your email...'
                />
                <div className='grid gap-3'> 
                    <label className='text-start font-medium'>How can we help you?</label>
                    <textarea
                        className='outline-none border p-4 rounded-md bg-gray-50 focus:border-secondary h-48' 
                        placeholder='Space your message ...'>
                    </textarea>
                </div>
                <Button className='bg-secondary text-white'>Send Message</Button>
            </section>
            <aside className='flex-1 grid gap-2 bg-gray-200  w-3/4 p-2 rounded-xl '>
                <div className='bg-gray-50 p-4 grid-center rounded-lg  shadow-lg hover:shadow-xl'>
                    <Heading title={<><CiLight size={40}/>Customzed software solutions</>}>
                        We create individually tailored software that meets the unique needs of our clients. 
                    </Heading>
                </div>
                <div className='bg-gray-50 p-4 grid-center rounded-lg  shadow-lg hover:shadow-xl'>
                    <Heading title={<><CiMedal size={40} />Exprtise in the latest technologies</>}>
                        Our team of developers has deep knowledge and experience in the lastest technologies.
                    </Heading>
                </div>
                <div className='bg-gray-50 p-4 rounded-lg grid-center  shadow-lg hover:shadow-xl'>
                    <Heading title={<><CiGlobe size={40} />Support and maintenance</>}>
                        We do not stop our work after implementing the solution - we provide continouns support and maintenance. 
                    </Heading>
                </div>
            </aside>
        </article> 
    )
}

export default Contact