import { useForm } from "react-hook-form";
import Box from "./Box";
import Container from "./Container";
import { Button } from "./buttons/Button";
import FormField from "./inputs/FormField"; 
import Heading from "./Heading";
import Each from "../middlewares/Each"; 
import useInView from "../hooks/useInView";
import { variantsBottom, variantsTop } from "../styles/animation";
import { motion } from 'framer-motion';
import { ContactInformation } from "../constants";
interface FooterProps {}

interface ListsProps{
    title: string;
    items: string[];
}

const lists: ListsProps[] = [
    {
        title: "Products",
        items: ["Shoes", "Apparel"]
    },{
        title: "Collections",
        items: ['Nike', 'Adidas', 'Vans',]
    },{
        title:"Legal",
        items:["Privacy Policy", 'Terms and Conditions']
    },{
        title:"Featured",
        items:["New Arrivals", 'Sale', "Start Selling"]
    },{
        title:"Support",
        items:["Contact us", 'Give feedback', "Help center"]
    }
]


const Footer: React.FC<FooterProps> = () =>{ 
    const { register} = useForm();
    const [ref, isVisible] = useInView();
    return (
        <footer ref={ref} className="w-full snap-start scroll-m-0 h-screen grid content-between">
            <div className="text-center mt-20 grid gap-7">
                <motion.p variants={variantsTop()} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="font-medium text-5xl">Get in touch</motion.p>
                <motion.p variants={variantsBottom()} initial="hidden"  animate={isVisible ? "visible" : "hidden"} className="text-lg text-gray-600">Ready to help your experience faster? Let's chat about how we can help</motion.p>
                    <div className="flex-center gap-5 mt-10">
                    <Each 
                        of = {ContactInformation}
                        render = {(item: any) => 
                            <motion.div variants={item.animation} initial="hidden"  animate={isVisible ? "visible" : "hidden"} className="border-px w-64 border px-6 py-4 rounded-xl grid gap-8 shadow-lg">
                                <item.icon className="bg-blue-100 text-secondary rounded-lg px-4 py-4" size={30}/>
                                <Heading title={item.name}>{item.content}</Heading>
                                <Button>{item.button}</Button>
                            </motion.div>
                        }
                    /> 
                    </div>
            </div>
            <Container>
                <div className="grid md:flex gap-5 justify-between pb-24 border-t-2 border-gray-400 pt-5"> 
                    <div className="w-full md:w-1/2 lg:w-2/5 grid gap-3">
                        <div className="font-bold lg:text-xl">
                            LOGO
                        </div>
                        <div className="text-gray-600 font-bold break-words">
                            Footwear was designed and founded in 2023 by person. The theme is about sneakers ecommerce that use for shoes selling around the word.
                        </div>
                        <Box className="grid px-8 py-6 shadow-md">
                            <div className="flex justify-between">
                                <p className="lg:text-lg break-words">Don't Wanna Miss Our Offers</p>
                                <p className="text-gray-600 break-words">Drop your email below , and start receiving the best offer from FoorWear</p>
                            </div>
                            <div className="w-full flex gap-5"> 
                                <FormField   
                                    register={register}
                                    name="contact"
                                    placeholder="Youremail@mail.com"  
                                />
                                <Button className="grid max-w-32" handleSubmit={()=>{}}> Subscribe</Button>
                            </div>
                        </Box>
                    </div>
                    <div className="grid grid-cols-3 text-gray-600 md:w-1/2 text-left items-start">
                        {
                            lists.map((item, index) => (
                                <div key={index} className="grid gap-2 ">
                                    <p className="font-bold lg:text-lg">{item.title}</p>
                                    {
                                        item.items.map((subItem, subIndex)=>(
                                            <p key={subIndex}>{subItem}</p>  
                                        ))
                                    }
                                </div>
                            ))
                        } 
                    </div> 
                </div>
            </Container>
        </footer>
    )
}


export default Footer;