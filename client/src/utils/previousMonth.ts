export const previousMonth: () => string = () => {
    const currentDate: Date = new Date(); 
    const oneMonthAgo: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()); 
    const daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
    const dayIndex: number = oneMonthAgo.getDay(); 
    const dayName: string = daysOfWeek[dayIndex];
    return ` ${dayName} (${currentDate.getDay()}/${currentDate.getMonth()}/${currentDate.getFullYear()})`;
}