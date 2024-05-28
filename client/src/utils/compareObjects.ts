export function compareObjects(obj1: any, obj2: any): any {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const diff1 = keys1.filter(key => !keys2.includes(key) || obj1[key] !== obj2[key]);
    const diff2 = keys2.filter(key => !keys1.includes(key) || obj1[key] !== obj2[key]);

    const diffKeys = [...diff1, ...diff2];
    
    const diffObj1 = diffKeys.reduce((result:any, key: any) => {
        if (keys1.includes(key)) {
            result[key] = obj1[key];
        }
        return result;
    }, {});

    const diffObj2 = diffKeys.reduce((result: any, key: any) => {
        if (keys2.includes(key)) {
            result[key] = obj2[key];
        }
        return result;
    }, {});

    return {
        obj1: diffObj1,
        obj2: diffObj2
    };
}
