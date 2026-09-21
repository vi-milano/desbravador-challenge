import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { InfoText } from '~/components/InfoText';
import { useGetRepo } from '~/hooks/useGetRepo';

export default function RepoDetail() {
  const { repository = '', username = '' } = useParams<{
    username: string;
    repository: string;
  }>();
  const { data, isLoading } = useGetRepo({ owner: username, repository });
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="justify-content-center mb-3">
        <Col xs={12} md={8} className="mb-2 p-0">
          <Row>
            <Col xs={6}>
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                Voltar
              </Button>
            </Col>
            <Col className="d-flex justify-content-end" xs={6}>
              <Button
                variant="secondary"
                onClick={() => window.open(data?.data.html_url, '_blank')}
              >
                Acessar no GitHub
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center mb-3">
        <Col xs={12} md={8} className="mb-2 p-0">
          <Row>
            <Col sm={12}>
              <InfoText
                isLoading={isLoading}
                text={data?.data.name ?? 'Repositório não encontrado'}
                title="Nome"
              />
            </Col>
            <Col sm={12}>
              <InfoText
                isLoading={isLoading}
                text={data?.data.description ?? 'Sem descrição'}
                title="Descrição"
              />
            </Col>
            <Col sm={12} lg={6}>
              <InfoText
                isLoading={isLoading}
                text={data?.data.language ?? 'Linguagem não especificada'}
                title="Linguagem"
              />
            </Col>
            <Col sm={12} lg={6}>
              <InfoText
                isLoading={isLoading}
                text={data?.data.stargazers_count?.toString() ?? '0'}
                title="Estrelas"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
