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
import { useLocation, useMatch, useNavigate, useOutlet } from 'react-router';
import { InfoText } from '~/components/InfoText';
import { useGetUser } from '~/hooks/useGetUser';

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
  const match = useMatch('/user/:username/*');
  const username = match?.params.username;
  const { data, isSuccess, isLoading, isError } = useGetUser(username ?? '');

  const navigate = useNavigate();
  const location = useLocation();
  const currentOutlet = useOutlet();

  const handleSubmit = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!searchValue) {
        navigate('/');
      } else {
        navigate(`user/${searchValue}`);
      }
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
        {isError && (
          <motion.div
            key="user-not-found"
            variants={collapseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Row className="justify-content-center mb-3">
              <Col xs={12} md={8}>
                <p className="text-center text-danger">
                  Usuário não encontrado.
                </p>
              </Col>
            </Row>
          </motion.div>
        )}
        {!isLoading && isSuccess && (
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
                  <Col xs={12} md="auto" className="mb-2">
                    <Image
                      src={data?.data.avatar_url}
                      roundedCircle
                      width={96}
                      height={96}
                      className="border border-2 border-dark-subtle object-fit-cover"
                    />
                  </Col>

                  <Col className="mb-2">
                    <Row>
                      <Col sm={12} lg={6}>
                        <InfoText
                          text={data?.data.name ?? '-'}
                          isLoading={isLoading}
                          title="Nome"
                        />
                      </Col>
                      <Col sm={12} lg={6}>
                        <InfoText
                          text={data?.data.email ?? '-'}
                          isLoading={isLoading}
                          title="E-mail"
                        />
                      </Col>

                      <Col sm={12}>
                        <InfoText
                          text={data?.data.bio ?? '-'}
                          isLoading={isLoading}
                          title="Bio"
                        />
                      </Col>

                      <Col sm={12} lg={6}>
                        <InfoText
                          text={data?.data.followers?.toString()}
                          isLoading={isLoading}
                          title="Seguidores"
                        />
                      </Col>

                      <Col sm={12} lg={6}>
                        <InfoText
                          text={data?.data.following?.toString()}
                          isLoading={isLoading}
                          title="Seguindo"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </motion.div>
        )}
      </AnimatePresence>
      {!isError && (
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
      )}
    </Container>
  );
}
