import { IconType } from "react-icons";
import Container from "../../components/Container"; 
import Footer from "../../components/Footer";
import { Button } from "../../components/buttons/Button"; 
import { ListsIconHomePage } from "../../constants";
import Each from "../../middlewares/Each";   
import { motion } from 'framer-motion';
import { NavLink } from "react-router-dom";
import { opacityVariants, variantsBottom, variantsLeft, variantsRight, variantsTop } from "../../styles/animation";
import useInView from "../../hooks/useInView";  
import { IoArrowForward } from "react-icons/io5";


const Home: React.FunctionComponent = () => {  
    const [ref, isVisible] = useInView();
    const [ref2, isVisible2] = useInView(); 
    return (   
        <Container className=" relative overflow-y-auto snap-y snap-mandatory flex flex-col max-h-screen text-center overflow-x-hidden">
            <section className=" snap-start scroll-m-0 h-screen grid-center mx-auto w-full pb-56">
                <motion.img variants={opacityVariants} initial="hidden" animate="visible"  src ="public/logo.jpg" className="w-full h-[350px] object-contain bg-gradient-to-r from-[#2581fe] to-[#3f8ffe] rounded-xl" /> 
                <motion.p variants={variantsTop()} initial="hidden" animate="visible"  className="uppercase text-4xl font-medium">
                    Wellcome to Square Etail
                </motion.p> 
                <motion.p variants={variantsTop()} initial="hidden" animate="visible" className="text-gray-500 text-2xl w-full lg:w-2/3">
                    We believe in making online shopping a delightful experience. Our platform brings together a curated selection of products, seamless transactions, and exceptional customer service. Whether you’re looking for fashion, electronics, home decor, or more, we’ve got you covered.
                </motion.p> 
                <div className="grid gap-x-20 grid-cols-5 justify-between">
                    <Each 
                        of={ListsIconHomePage}
                        render={(item: {icon: IconType, name: string, animation: any}) =>  
                            <motion.div
                                className="relative w-20 h-20 bg-white shadow-lg rounded-full overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                variants={item.animation} initial="hidden" animate="visible"
                            >
                                <motion.div
                                    className="absolute inset-0 flex justify-center items-center bg-blue-500 text-white text-lg font-bold"
                                    initial={{ opacity: 1 }}
                                    whileHover={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <item.icon size={30}/>
                                </motion.div>
                                <motion.div
                                    className="absolute inset-0 grid justify-center items-center bg-white text-blue-400 text-lg font-bold"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                > 
                                    <NavLink to={`/shopping/?createBy=${item.name}`} className="">Views</NavLink>
                                </motion.div>
                            </motion.div>
                    }
                    />
                </div> 
            </section>
            <section ref={ref} className="pb-20 text-center flex-center flex-col gap-3 snap-start scroll-m-0  h-screen"> 
                <motion.p variants={variantsTop()} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="text-5xl font-bold">Super Combo</motion.p>
                <motion.p variants={variantsBottom()} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="text-gray-500 mb-8 mt-2 text-2xl">Our latest collection, where classic and contemporary  styles converge in perfect harmony</motion.p> 
                <div className="grid-center lg:grid-cols-3 gap-5  w-full max-w-[1320px] mx-auto ">
                    <motion.div variants={variantsTop()} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="md:col-span-2 w-full h-[350px] bg-black rounded-lg relative inline-block overflow-hidden"> 
                        <div className="absolute w-fit h-fit top-[40%] left-[44%] flex-center z-10 flex-col text-white font-medium">
                            <p className="text-3xl">Glasses</p>
                            <p>Dior</p>
                        </div>
                        <img src="public/images/3.jpg" className="object-right-top object-cover w-full h-full hover:scale-110 rounded-lg hover:rounded-md transition-all duration-500 opacity-60"/>
                    </motion.div>
                    <motion.div variants={variantsRight()} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="w-full h-[350px] bg-black rounded-lg relative inline-block overflow-hidden"> 
                        <div className="absolute w-fit h-fit top-[40%] left-[40%] flex-center z-10 flex-col text-white font-medium">
                            <p className="text-3xl">Sneaker</p>
                            <p>Nike</p>
                        </div>
                        <img src="public/images/6.jpg" className="object-right-top object-cover w-full h-full hover:scale-110 rounded-lg hover:rounded-md transition-all duration-500 opacity-60"/>
                    </motion.div>   
                    <motion.div  variants={variantsLeft()} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="w-full h-[350px] bg-black rounded-lg relative inline-block overflow-hidden"> 
                        <div className="absolute w-fit h-fit top-[40%] left-[40%] flex-center z-10 flex-col text-white font-medium">
                            <p className="text-3xl">Paint</p>
                            <p>Chanel</p>
                        </div>
                        <img src="public/images/1.jpg" className="object-right-top object-cover w-full h-full hover:scale-110 rounded-lg hover:rounded-md transition-all duration-500 opacity-60"/>
                    </motion.div>
                    <motion.div  variants={variantsRight()} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="w-full h-[350px] bg-black rounded-lg relative inline-block overflow-hidden"> 
                        <div className="absolute w-fit h-fit top-[40%] left-[40%] flex-center z-10 flex-col text-white font-medium">
                            <p className="text-3xl">T-shirt</p>
                            <p>Donut</p>
                        </div>
                        <img src="public/images/5.jpg" className="object-right-top object-cover w-full h-full hover:scale-110 rounded-lg hover:rounded-md transition-all duration-500 opacity-60"/>
                    </motion.div>
                    <motion.div  variants={variantsBottom()} initial="hidden" animate={isVisible ? "visible" : "hidden"}  className="w-full h-[350px] bg-black rounded-lg relative inline-block overflow-hidden"> 
                        <div className="absolute w-fit h-fit top-[40%] left-[40%] flex-center z-10 flex-col text-white font-medium">
                            <p className="text-3xl">Dress</p>
                            <p>Louis Vuitton</p>
                        </div>
                        <img src="public/images/2.jpg" className="object-right-top object-cover w-full h-full hover:scale-110 rounded-lg hover:rounded-md transition-all duration-500 opacity-60"/>
                    </motion.div>
                </div> 
            </section>
            <section ref={ref2} className="pb-20 flex-center flex-col gap-7 text-black rounded-2xl snap-start scroll-m-0 h-screen">
                <motion.p variants={variantsTop()} initial="hidden"  animate={isVisible2 ? "visible" : "hidden"}  className="font-bold text-5xl ">Bringing you to update fanstastic footwear</motion.p>
                <motion.p variants={variantsBottom()} initial="hidden"  animate={isVisible2 ? "visible" : "hidden"}  className="text-2xl text-gray-500 mb-16">View all brands of out collection on Footewear, there is another collection. Please check it out bro, seriously!</motion.p>
                <div className="grid grid-cols-3 w-full gap-5  max-w-[1320px] mx-auto">
                    <Each 
                        of={[{name:"man", animation: variantsLeft()}, {name: "woman", animation: variantsBottom()}, {name: "kids", animation: variantsRight()}]}
                        render={(item: any) => 
                            <motion.div variants={item.animation} initial="hidden"  animate={isVisible2 ? "visible" : "hidden"}  className="relative">
                                <img className="rounded-lg h-[200px] md:h-[400px] lg:h-[600px] w-[600px] object-cover" src={`src/assets/images/${item.name}.jpg`}/>
                                <div className="absolute bottom-1 left-1 md:bottom-6 md:left-6 grid gap-5">
                                    <p className="uppercase text-3xl text-white">{item.name}</p>
                                    <Button 
                                        handleSubmit={()=>{}} 
                                        className="rounded-full bg-gray-100 px-8 py-2 font-medium">See more <IoArrowForward /></Button>
                                </div>
                            </motion.div>
                        }
                    />
                </div>
            </section> 
            <Footer/> 
        </Container> 
    )
}

export default Home;