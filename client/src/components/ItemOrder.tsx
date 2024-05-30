import { OrderDto } from "../types/Order.dto"; 
import moment from "moment";  
import useOrderDetailsModal from "../hooks/zustands/useOrderDetailsModal";
import IconButton from "./buttons/IconButton";
import { CiBoxList } from "react-icons/ci";
import { memo } from "react";

const ItemOrder: React.FC<OrderDto> = (item: OrderDto) => {
    const { id, customerName, address, phone, createdAt, products } = item;  
    const orderDetailsModal = useOrderDetailsModal();
    console.log(products);
    return (
        <li className="border-[1px] shadow hover:shadow-lg border-gray-300 rounded-lg p-2">  
            <div className="flex-between">
                <p>Order #{id}</p>
                <p>{customerName}</p>
                <p> {products?.length}</p>  
                <p className="text-gray-500">{moment(createdAt).format("DD/MM/YYYY")}</p>  
                <p>{phone}</p>
            </div>
            <div className="flex-between mt-4 text-gray-500">
                <p className="text-base">{address}</p>
                <IconButton 
                    className="text-black bg-white shadow-md" 
                    hanldeClick={()=>orderDetailsModal.onOpen(item)} 
                    icon={CiBoxList}  
                    size={15}
                />
            </div> 
        </li>
    )
}

export default memo(ItemOrder);