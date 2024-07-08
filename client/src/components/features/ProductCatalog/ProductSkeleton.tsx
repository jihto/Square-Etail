
const ProductSkeleton: React.FC<{items: number}> = ({items}) => {
    return (
        Array(items)
        .fill(0)
        .map((_, i) => (
            <div key={i} className="border border-gray-300 shadow rounded-2xl p-2 min-w-[280px] w-1/3 lg:w-fit m-2">
                <div className="animate-pulse">
                    <div className="w-[260px] h-[180px] rounded-xl bg-slate-200"></div>
                    <div className="flex-1 space-y-6 py-2"> 
                        <div className="h-8 bg-slate-200 rounded col-span-3"></div>
                        <div className="space-y-1">
                            <div className="grid grid-cols-3 gap-4">
                            <div className="h-8 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-8 bg-slate-200 rounded col-span-1"></div>
                        </div> 
                    </div>
                    </div>
                </div>
            </div>
        ))
        
    )
}

export default ProductSkeleton