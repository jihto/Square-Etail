import { IconType } from "react-icons";

export interface DashBoardItemProps{
    icon: IconType;
    statistic?: IconType;
    title: string; 
    description: string; 
    total: 'totalProducts' | 'totalViews' | 'totalCompletedProducts' | 'totalPeadingProducts';
    type: 'order' | 'views' | 'product', 
    start: string;
}
