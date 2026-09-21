import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Image,
} from 'react-bootstrap';
import { useNavigate, useOutlet } from 'react-router';
import { InfoText } from '~/components/InfoText';
import { useGetUsers } from '~/hooks/useGetUsers';

const collapseVariants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.5, ease: 'easeIn' },
  },
} as const;

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>('');
  const { data, mutate, isSuccess, isPending } = useGetUsers();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const currentOutlet = useOutlet();

  const handleSubmit = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      mutate(searchValue, {
        onSuccess: (userData, username) => {
          queryClient.setQueryData(['gitHubUser', username], userData);
          navigate(`user/${username}`);
        },
        onError: () => {
          navigate('');
        },
      });
    },
    [searchValue]
  );

  return (
    <Container className="mt-4">
      <Row className="justify-content-center mb-3">
        <Col xs={12} md={8}>
          <h1 className="text-center">Busca Github</h1>
          <p className="text-center">
            Consulte qualquer usuário do GitHub e explore os repositorios deles
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center mb-3">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Usuário do GitHub"
                aria-label="Buscar usuário do GitHub"
              />
              <Button type="submit" variant="light" id="search-button">
                Buscar
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <AnimatePresence mode="wait">
        {isSuccess && (
          <motion.div
            key="user-card"
            variants={collapseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Row className="justify-content-center mb-3">
              <Col xs={12} md={8}>
                <Row className="align-items-center">
                  <Col xs="auto" className="mb-2">
                    <Image
                      src={data?.data.avatar_url}
                      roundedCircle
                      width={96}
                      height={96}
                      className="border border-2 border-dark-subtle object-fit-cover"
                    />
                  </Col>

                  <Col className="mb-2">
                    <InfoText
                      text={data?.data.name ?? 'Nenhum nome disponível'}
                      isLoading={isPending}
                      title="Nome"
                      length={20}
                    />

                    <InfoText
                      text={data?.data.bio ?? 'Nenhuma bio disponível'}
                      isLoading={isPending}
                      title="Bio"
                      length={20}
                    />

                    <InfoText
                      text={data?.data.public_repos?.toString()}
                      isLoading={isPending}
                      title="Total de repositórios"
                      length={3}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </motion.div>
        )}
      </AnimatePresence>
      <Row>
        <Col>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={collapseVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {currentOutlet}
            </motion.div>
          </AnimatePresence>
        </Col>
      </Row>
    </Container>
  );
}
