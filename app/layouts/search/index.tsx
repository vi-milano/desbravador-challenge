import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router';
import { useGetUsers } from '~/hooks/useGetUsers';

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>('');
  const { data, mutate, isSuccess } = useGetUsers();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate(searchValue, {
        onSuccess: (userData, username) => {
          queryClient.setQueryData(['gitHubUser', username], userData);
          navigate(`user/${username}`);
        },
      });
    },
    [searchValue]
  );

  return (
    <Container className="d-flex flex-column justify-content-center mt-4">
      <Row className="justify-content-center align-items-center ">
        <Col>
          <h1 className="text-center">Busca Github</h1>
          <p className="text-center">
            Consulte qualquer usuário do GitHub e explore os repositorios deles
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Usuário do GitHub"
                aria-label="Buscar usuário do GitHub"
              />
              <Button
                type="submit"
                variant="outline-secondary"
                id="search-button"
              >
                Buscar
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      {isSuccess && (
        <Row>
          <Col className="mb-2" xs={12} md={6} lg={4}>
            <span className="fw-bold">Nome: </span>
            <span> {data?.data.name}</span>
          </Col>
          <Col className="mb-2" xs={12} md={6} lg={4}>
            <span className="fw-bold">Bio: </span>
            <span> {data?.data.bio}</span>
          </Col>
          <Col className="mb-2" xs={12} md={6} lg={4}>
            <span className="fw-bold">Total de repositórios: </span>
            <span> {data?.data.public_repos}</span>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
