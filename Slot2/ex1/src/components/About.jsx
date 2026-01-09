//khai bao 1 doi tuong student gom cac thuoc tinh id, name,avatar, age, grade
//In ra thong tin cua h1, p, va img
function About() {
    const student = {
        id: 1,
        name:'Nhi',
        avatar: '/images/Ngu-Thu-Han-1A.jpg',
        age: 21,
        grade: 'SE19C02'
    }
    return (
        <>
          <h1>This is the About Page</h1>
          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
          <p>Age: {student.age}</p>
          <p>Grade: {student.grade}</p>
          <p>Avatar:</p>
          <img src={student.avatar} alt={student.name} 
          style={{ width: '150px', borderRadius: '8px' }} 
          />
        </>
    )
}
export default About;