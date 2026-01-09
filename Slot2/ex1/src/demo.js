const x = 5;
console.log(`The value of x is: ${x}`);

//kiem tra x la so duong hay so am
if (x > 0) {
    console.log(`${x} is a positive number.`);
} else if (x < 0) {
    console.log(`${x} is a negative number.`);
} else {
    console.log(`${x} is zero.`);
}
//dung toan tu 3 ngoi de kiem tra so am, so duong hay so 0
const result = (x > 0) ? `${x} is a positive number.` :
               (x < 0) ? `${x} is a negative number.` :
               `${x} is zero.`;
console.log(result);

//viet ham arrow function greet (ten,tuoi)
const greet = (name, age) => {
    console.log(`Xin chào ${name}, bạn năm nay ${age} tuổi.`);
};

//goi ham greet voi ten va tuoi
console.log(greet('An', 20));
console.log(greet('Binh', 25));

//mac dinh 18 age = 18 neu khong truyen tham so
const greet2 = (name, age = 18) => {
    console.log(`Xin chào ${name}, bạn năm nay ${age} tuổi.`);
};

//goi ham greet2 voi ten va tuoi
greet2('Cuong');
greet2('Duc', 22);

//viet ham tinh binh phuong cua mot so
const square = x => {
    return x * x;
};

square(4);

//viet ham in 1 doi tuong student gom cac thuoc tinh name, age, grade
// 1. Hàm in đối tượng Student (Cập nhật thêm ID)
const printStudent = ({ id, name, age, grade }) => {
    console.log(`ID: ${id}, Name: ${name}, Age: ${age}, Grade: ${grade}`);
};

//khai 1 list student va goi ham printStudent cho moi student trong list
const students = [
    { id: 1, name: 'Nhi', age: 21, grade: 'A' },
    { id: 2, name: 'Hon', age: 20, grade: 'B' },
    { id: 3, name: 'Khoi', age: 22, grade: 'C' },
    { id: 4, name: 'Minh', age: 19, grade: 'B' },
    { id: 5, name: 'Lan', age: 21, grade: 'A' },
    { id: 6, name: 'Tuan', age: 23, grade: 'D' },
    { id: 7, name: 'Vy', age: 20, grade: 'B' },
    { id: 8, name: 'Nam', age: 22, grade: 'A' },
    { id: 9, name: 'Hanh', age: 21, grade: 'C' },
    { id: 10, name: 'Duc', age: 24, grade: 'B' }
];

printStudent(students[0]);
printStudent(students[1]);
printStudent(students[2]);

//khong goi ham printStudent ma su dung vong lap de in thong tin moi student
students.forEach(student => printStudent(student));

//su dung destructuring de lay gia tri tu doi tuong student
students.forEach(({id,name, age, grade}) => {
    console.log(`ID: ${id}, Name: ${name}, Age: ${age}, Grade: ${grade}`);
});

//su dung map de tao ra list moi chi chua ten cua student
students.map(({id,name,age,grade}) => {
    console.log(`ten cua student la: ID: ${id},ten: ${name}, tuoi: ${age}, lop: ${grade}`);
})

//dung rest operator de lay tat ca cac so truyen vao ham va tinh tong
const sum = (...numbers) => {
    return numbers.reduce((total, num) => total + num, 0);
};

//them 1 student moi vao list student su dung spread operator
const newStudent = {id: 11,name: 'Linh', age: 23, grade: 'A'};
const updatedStudents = [...students, newStudent];
console.log(updatedStudents);
 console.log(sum(1,2,3,4,5,6));