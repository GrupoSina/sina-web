export const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',  
    // trailingZeroDisplay: 'stripIfInteger',
    minimumFractionDigits: 2 
  });