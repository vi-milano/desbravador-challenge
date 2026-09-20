import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useGetUserRepos } from '~/hooks/useGetUserRepos';

export default function RepoList() {
  const { username } = useParams<{ username: string }>();
  const { data } = useGetUserRepos(username || '');

  return (
    <Container>
      {data?.data.map((repo) => (
        <Row>
          <Col>{repo.name}</Col>
        </Row>
      ))}
    </Container>
  );
}
