import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Student({ student }) {
  return (
    <Card style={{ width: '15rem' }}>
      <Card.Img
        variant="top"
        src={student.avatar}
        alt={student.name}
        style={{ borderRadius: '8px' }}
      />

      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>
          <p>ID: {student.id}</p>
          <p>Age: {student.age}</p>
          <p>Grade: {student.grade}</p>
        </Card.Text>

        <Button variant="primary">View detail</Button>
      </Card.Body>
    </Card>
  );
}

export default Student;
