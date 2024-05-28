import DisplayProducts from '../../products/DisplayProducts'

const Relative = () => {
    return (
        <div className="flex flex-col gap-3 h-[800px] max-h-5/6 overflow-x-hidden overflow-auto touch-pan-x rounded-lg "> 
            <DisplayProducts/>
        </div>
    )
}

export default Relative