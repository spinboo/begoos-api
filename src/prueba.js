const firstName = 'Dani';
const lastName= 'Perez';

function factoria (lastName) {
    console.log(arguments);
    return function (myName) {
        console.log(arguments);
        console.log(myName + lastName);
    }
}
console.log(factoria);

const prueba = factoria(lastName);
console.log(prueba);
prueba(firstName);

prueba = secondfunction()

