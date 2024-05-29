import { IconType } from "react-icons";
import { CiBellOn, CiDesktop, CiDumbbell, CiForkAndKnife, CiGift, CiGlobe, CiHome, CiMedicalCase, CiPhone, CiRollingSuitcase, CiShoppingBasket, CiStopwatch } from "react-icons/ci";
import { GiBilledCap, GiClothes, GiLargeDress } from "react-icons/gi"; 
import { DashBoardItemProps } from "../types/DashBoardItem.interface"; 
import { MdOutlineCancelPresentation, MdOutlinePendingActions, MdPlaylistAddCheckCircle } from "react-icons/md";
import { HiArchive, HiCog, HiHome, HiLocationMarker } from "react-icons/hi";
import { IoIosArrowForward, IoIosCart, IoIosCube, IoIosEye, IoMdJournal } from "react-icons/io";
import { PiSneakerMoveFill } from "react-icons/pi";
import { SiAdidas, SiBluesky, SiImessage, SiNewbalance, SiNike, SiPkgsrc, SiPuma, SiRocketdotchat, SiWhatsapp } from "react-icons/si";
import { variantsBottom, variantsRight } from "../styles/animation";
import {previousMonth} from '../utils/previousMonth';
import {AiFillSkin } from 'react-icons/ai';

export interface NavListsProps{
    name: string;
    link: string;
    icon: IconType;
} 

const NavLists:Array<NavListsProps>  = [
    {
        name: "Home",
        icon: CiHome ,
        link: "home"
    },{
        name:"Discovery",
        icon: CiGlobe  ,
        link:"shopping",
    },{
        name: "Contact",
        icon: CiPhone  ,
        link:"contact"
    } 
];

const NavAdminLists:Array<NavListsProps>  = [
    {
        name: "Overview",
        icon: HiHome  ,
        link: "home"
    },{
        name:"Product",
        icon:   HiLocationMarker,
        link:"products",
    },{
        name:"Trash",
        icon:   HiArchive ,
        link:"deleted",
    },{
        name: "Account",
        icon:HiCog  ,
        link:"account"
    } 
];

const NavListsIcon: IconType[] = [ 
    CiBellOn ,
    CiShoppingBasket,  
]

const ListsDashboard: DashBoardItemProps[] = [
    {
        icon: IoIosEye  ,
        statistic: IoIosArrowForward  ,
        title: 'Total Views', 
        description: 'Total views products in this year',
        type: "views" ,
        total: 'totalViews', 
        start: new Date().getFullYear().toString(),
    },{
        icon: IoIosCube   ,
        statistic: IoIosArrowForward  ,
        title: 'Total Products', 
        description: 'Total products have created in a month',
        type: "product" ,
        total: 'totalProducts', 
        start: previousMonth(),
    },{
        icon: IoIosCart    ,
        statistic: IoIosArrowForward  ,
        title: 'Total Orders', 
        description: 'New orders every week',
        type: "order" ,
        total: 'totalPeadingProducts', 
        start: new Date().getFullYear().toString(),
    },{
        icon: IoMdJournal     ,
        statistic: IoIosArrowForward  ,
        title: 'Total Sold', 
        description: 'Start from  Feb 2021' ,
        type: "order" ,
        total:  'totalCompletedProducts'  , 
        start: new Date().getFullYear().toString(),
    }
]
export interface ColourOption {
    readonly label: string;
    readonly value: string;
    readonly color?: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}
 
export interface BaseProps{
    name?:string;
    icon: IconType; 
    animation?: VoidFunction;
}

const ListsFilter: Array<BaseProps> = [
    {
        name: "All",
        icon: SiPkgsrc   , 
    },{
        name: "New balance",
        icon: SiNewbalance  , 
    },{
        name:"Nike",
        icon: SiNike  , 
    },{
        name: "Adidas",
        icon: SiAdidas , 
    },{
        name: "Puma",
        icon: SiPuma  , 
    }, 
]

const ListsIconHomePage: Array<BaseProps> = [
    {
        name: "New balance",
        icon: SiNewbalance  , 
        animation: variantsRight(1),
    },{
        name:"Nike",
        icon: SiNike  , 
        animation: variantsRight(1.5),
    },{
        name: "Adidas",
        icon: SiAdidas , 
        animation: variantsRight(2),
    },{
        name: "Puma",
        icon: SiPuma  , 
        animation: variantsRight(2.5),
    },{
        name:"Sneaker",
        icon: GiBilledCap , 
        animation: variantsRight(3),
    }
]


const ListIconCategories: Array<BaseProps> = [
    {
        icon: CiGift ,
        name: "Gift"
    },{
        icon: CiShoppingBasket,
        name: "Items"
    }, {
        icon: CiDesktop,
        name: "Technology"
    },{
        icon: CiRollingSuitcase ,
        name: "Travels"
    }, {
        icon: CiStopwatch ,
        name: "Decorators"
    },{
        icon: CiForkAndKnife ,
        name: "Cooking"
    }, {
        icon: CiMedicalCase ,
        name: "Medical"
    },{
        icon: CiDumbbell ,
        name: "Gym"
    },  
]

const IconCategoriesFilter: Array<BaseProps> = [
    {
        icon: AiFillSkin  ,
        name: "t-shirt"
    },{
        icon: PiSneakerMoveFill ,
        name: "Sneaker"
    },{
        icon: GiClothes ,
        name: "Clothes",
    },{
        icon: GiLargeDress,
        name: "fashion" 
    }
] 
const MenuOrderList: Array<{name: React.ReactNode, color:string ,icon: IconType, }> = [
    {
        name:'History',
        color: "text-blue-400 border-blue-400 bg-blue-50",
        icon: MdPlaylistAddCheckCircle  
    }, {
        name:'Peding', 
        color: "text-green-400 border-green-400 bg-green-50",
        icon: MdOutlinePendingActions 
    }, {
        name: "Cancel", 
        color: "text-red-400 border-red-400 bg-red-50",
        icon: MdOutlineCancelPresentation 
    }]

interface ContactInformationProps extends BaseProps{
    content: string;
    button: string; 
}

const ContactInformation: ContactInformationProps[] = [
    {
        name: "Chat to sales",
        content: "Speak to our friendly team",
        button: "Chat to sales",
        icon: SiWhatsapp , 
        animation: variantsBottom(1),
    },{
        name: "Chat with support",
        content: "We here to help.",
        button: "Chat with support",
        icon: SiRocketdotchat , 
        animation: variantsBottom(1.5)
    },{
        name: "Visit us",
        content: "Visit our office HQ",
        button: "Get directions",
        icon: SiBluesky, 
        animation: variantsBottom(2)
    },{
        name: "Give us the feetback",
        content: "Speak to our friendly team",
        button:"Send feedbak",
        icon: SiImessage , 
        animation: variantsBottom(2.5)
    }
] 

export { 
    MenuOrderList,
    NavLists, 
    NavListsIcon, 
    NavAdminLists,
    ListsDashboard,
    ListsFilter,
    ListIconCategories,     
    IconCategoriesFilter,
    ListsIconHomePage,
    ContactInformation
}



