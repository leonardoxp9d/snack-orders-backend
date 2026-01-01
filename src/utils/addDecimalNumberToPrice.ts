
export function addDecimalNumberToPrice(price: number) {
    const priceDecimalNumber = price / 100;
    return priceDecimalNumber;
}

/* 
    - Convete o price de string para número
    - Tira o número decimal sem arredondar, mantendo somente 2 casas
    e ae multiplica por 100, retirando os decimais
    Para manter as 2 casas poderia fazer com toFixed(2) e multiplicar por 100,
    mas ele arredonda o número pra cima se for maior que 5,
    a terceira casa decimal
*/