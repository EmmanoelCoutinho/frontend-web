export const verifyAndAddPlus = (value: number | string) => {
  if(value === 5 || value === '5'){
     return '5 ou +';
  }else {
    return value;
  }
}