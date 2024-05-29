export function compareArray<T>(array1:any[] = [], array2: any[] = []):any[] {  
    const diff1 = array1.filter(item => !array2.includes(item)); 
    const diff2 = array2.filter(item => !array1.includes(item));  
    return Array.from(new Set([...diff1, ...diff2])) || Array.from(new Set([...array1, ...array2])); 
}
    