export function shortText(str:string):string{
    if(str.length > 40){
        return str.slice(0,40) + "...";
    }else{
        return str;
    }
}