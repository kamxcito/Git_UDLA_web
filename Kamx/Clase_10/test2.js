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


class Persona {
  constructor(nombre, edad, sexo) {
    this.nombre = nombre;
    this.edad = edad;
    this.sexo = sexo;
  } 
  saludar() {
    console.log("Hola, mi nombre es " + this.nombre);
  }

}

const persona1 = new Persona("Sirrusqui", 30, "M");
console.log(persona1);
persona1.saludar();


//funciones de orden superior

const m=[5, 10, 15, 20];

const m1 = m.map((num) => num * 2);//map devuelve un array con los elementos modificados
console.log(m1);

const m2 = m.filter((num) => num > 10);//filter devuelve un array con los elementos que cumplen la condición
console.log(m2);

const m3 = m.reduce((acc, num) => acc + num, 0);//reduce devuelve un solo valor, en este caso la suma de todos los elementos del array
console.log(m3);

const m4 = m.find((num) => num > 10); //devuelve el primer elemento que cumple la condición
console.log(m4);

const m5 = m.some((num) => num > 10); //devuelve true si al menos un elemento cumple la condición
console.log(m5);

const m6 = m.every((num) => num > 10); //devuelve true si todos los elementos cumplen la condición
console.log(m6);

const m7 = m.sort((a, b) => a - b); //ordena el array de menor a mayor
console.log(m7);

const m8 = m.sort((a, b) => b - a); //ordena el array de mayor a menor
console.log(m8);

const m9 = m.reverse(); //invierte el orden del array
console.log(m9);

const m10 = m.includes(10); //devuelve true si el elemento está en el array
console.log(m10);

const m11 = m.indexOf(10); //devuelve el índice del elemento en el array

const m12 = m.join(", "); //devuelve un string con los elementos del array separados por comas
console.log(m12);

const m13 = [...m]; //copia el array
console.log(m13);

