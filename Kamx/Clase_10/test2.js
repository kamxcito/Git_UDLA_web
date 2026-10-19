let x = 5;

console.log(x);

const array = [1, 2, 3, 4, 5];

array.push(6);

console.log("tamaño del array: " + array.length);

array.push("casa");

console.log(array);

array.pop();//cabeza del array
array.shift();//cola del array

console.log(array);

console.log(array.splice(1, 3)); //elimina elementos del array desde la posición 1 y elimina 3 elementos

//arrow function

const x2=(a,b) => a/b;
console.log(x2(10,2));

const x3=(a,b) => {return a*b};
console.log(x3(10,2));

const persona= {nombre: "Juan", edad: 30, sexo: "M", direccion: {calle: "Av. Siempre Viva", numero: 123, ciudad: "Springfield"}};
console.log(persona.nombre);
console.log(persona.direccion.calle);

persona.nombre= "Pedro";
console.log(persona.nombre);
persona.esposo= "Maria";
console.log(persona);