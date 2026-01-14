import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import listOfStudent from '../listOfStudent';
import About from './About';

function StudentList() {
  return (
    <div className="container mt-4">
      <Row>
        {listOfStudent.map((student) => (
          <Col
            key={student.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4"
          >
            <About student={student} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default StudentList;
