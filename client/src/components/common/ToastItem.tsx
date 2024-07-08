import { TiTickOutline } from "react-icons/ti";
import useToast from "../../hooks/useToast";
import { motion } from "framer-motion";

export const ToastItem = (t: any) => {
  const { isShow, data } = useToast();
  if(!isShow){
    return null;
  }
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-[200px] w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 absolute -top-[88px] right-[34%] z-10`}
    > 
      <div className="flex-1 w-0 p-2">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-14 w-14 rounded-md"
              src={data?.picture}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900 whitespace-nowrap truncate text-ellipsis max-w-24">
              {data?.name}
            </p>
            <p className="mt-1 text-sm text-gray-500 flex gap-4 items-center">
              Add success <span className="text-green-400"><TiTickOutline size={24}/> </span> 
            </p>
          </div>
        </div>
      </div> 
      <div className="bg-white w-5 h-5 absolute rotate-45 left-1/2 -bottom-[10px] z-0 ">  
      </div> 
    </motion.div>
  );
}
