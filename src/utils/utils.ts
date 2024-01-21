import * as fs from 'fs';
import * as path from 'path';

export function arrayIntersection<T>(arr1: T[], arr2: T[]): T[] {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return [...set1].filter(value => set2.has(value));
}

export function snakeToCamel(str: string) {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

export function getClassName(value:any,format:string){
      const classNameCammelCase= format.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return value[key] !== undefined ? `${value[key]}` : match;
      });
      return classNameCammelCase.charAt(0).toUpperCase() + classNameCammelCase.slice(1);
}

export function storeFile(content:any,fileName:any,directory:string){
  const fullPath=path.join(process.cwd(), directory)
     if (!fs.existsSync(fullPath)) {
        // If not, create the directory
        fs.mkdirSync(fullPath);
       }
    return fs.writeFileSync(`${fullPath}/${fileName}.js`, content);
}
 
  