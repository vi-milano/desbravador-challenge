import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';

export default function RepoList() {
  const { username } = useParams<{ username: string }>();
  return (
    <Container>
      <Row>
        <Col>Lista de repos do {username}</Col>
      </Row>
    </Container>
  );
}
