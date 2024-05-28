export function compareArray<T>(array1:any[], array2: any[]):any[] {
    // Find items in array1 that are not in array2
    const diff1 = array1.filter(item => !array2.includes(item));
    
    // Find items in array2 that are not in array1
    const diff2 = array2.filter(item => !array1.includes(item));
    
    // Combine both differences
return [...diff1, ...diff2];
}
    