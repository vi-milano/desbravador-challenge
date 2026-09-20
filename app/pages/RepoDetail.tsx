import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useGetRepo } from '~/hooks/useGetRepo';

export default function RepoDetail() {
  const { repository = '', username = '' } = useParams<{
    username: string;
    repository: string;
  }>();
  const { data } = useGetRepo({ owner: username, repository });

  return (
    <Container>
      <Row>
        <Col>{data?.data.name}</Col>
      </Row>
    </Container>
  );
}
