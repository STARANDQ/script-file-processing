let k = 0; // день місяця
let m = 0; // місце у ряді

let price = 0;

if(m >= 1 && m <= 5){
    price = 500;
}


if(k >= 1 && k <= 10){

}

if( k >= 11 && k <= 30){
    price = price + (price * 0.07);
}

console.log(price);

