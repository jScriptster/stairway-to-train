export function canIUseIndexedDbDecorator():MethodDecorator {
  return function(target: Function, key: string, descriptor: any) {
    const originalMethod = descriptor.value; 
    descriptor.value =  function (...args: any[]) {
    let result;
    if (window.indexedDB) {
      result = originalMethod.apply(this, args);  
    }
      return result;
    }
    return descriptor;
  }
}