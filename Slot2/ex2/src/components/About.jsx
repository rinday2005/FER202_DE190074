import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <Card style={{ width: '18rem' }}>
       <img src={student.avatar} alt={student.name} 
          style={{  borderRadius: '8px' }} 
          />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
           <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
          <p>Age: {student.age}</p>
          <p>Grade: {student.grade}</p>
         
         
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
        </>
    )
}
export default About;