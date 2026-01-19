// function personMaker(name, age){
//     const person = {
//         name:name, 
//         age : age, 
//         talk(){
//             console.log(`Hi my name is ${this.name}`);
//         },
//     };
//     return person;
// }

class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    talk(){
        console.log(`Hi my name is ${this.name}`);
    }
}

let p1 = new Person("adam", 25);
let p2 = new Person("om", 17);