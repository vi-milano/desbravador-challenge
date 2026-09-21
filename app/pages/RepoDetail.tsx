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
      <Row>
        <Col>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <InfoText
            isLoading={isLoading}
            text={data?.data.name ?? 'Repositório não encontrado'}
            title="Nome"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InfoText
            text={data?.data.description ?? 'Nenhuma descrição disponível'}
            isLoading={isLoading}
            title="Descrição"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InfoText
            text={data?.data.stargazers_count?.toString()}
            isLoading={isLoading}
            title="Estrelas"
            length={3}
          />
        </Col>
      </Row>
    </Container>
  );
}
