import { useCallback, useMemo, useState } from 'react';
import { Col, Container, Dropdown, ListGroup, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { useGetUserRepos } from '~/hooks/useGetUserRepos';
import type { GitHubUserReposResponseItem } from '~/services/getGitHubUserRepos.types';

const SORT_OPTIONS = {
  stars: {
    label: 'Mais estrelas',
    compare: (a: GitHubUserReposResponseItem, b: GitHubUserReposResponseItem) =>
      (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0),
  },
  name: {
    label: 'Nome (A–Z)',
    compare: (a: GitHubUserReposResponseItem, b: GitHubUserReposResponseItem) =>
      a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }),
  },
  updated: {
    label: 'Atualizados recentemente',
    compare: (a: GitHubUserReposResponseItem, b: GitHubUserReposResponseItem) =>
      Date.parse(b.updated_at ?? '') - Date.parse(a.updated_at ?? ''),
  },
} satisfies Record<
  string,
  {
    label: string;
    compare: (
      a: GitHubUserReposResponseItem,
      b: GitHubUserReposResponseItem
    ) => number;
  }
>;

type SortKey = keyof typeof SORT_OPTIONS;

export default function RepoList() {
  const { username } = useParams<{ username: string }>();
  const { data } = useGetUserRepos(username || '');
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState<SortKey>('stars');

  const handleViewDetails = useCallback(
    (repoName: string) => {
      navigate(`/user/${username}/${repoName}`);
    },
    [navigate, username]
  );

  const repos = useMemo(
    () => [...(data?.data ?? [])].sort(SORT_OPTIONS[sortKey].compare),
    [data, sortKey]
  );

  return (
    <Container>
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={8}
          className="d-flex justify-content-between align-items-center mb-2 p-0"
        >
          <p className="mb-0">Repositórios mais populares</p>

          <Dropdown onSelect={(key) => key && setSortKey(key as SortKey)}>
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              {SORT_OPTIONS[sortKey].label}
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              {Object.entries(SORT_OPTIONS).map(([key, { label }]) => (
                <Dropdown.Item
                  key={key}
                  eventKey={key}
                  active={key === sortKey}
                >
                  {label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row className="justify-content-center mb-3">
        <Col xs={12} md={8} className="mb-2 p-0">
          <ListGroup>
            {repos.map((repo) => (
              <ListGroup.Item
                key={repo.id}
                action
                onClick={() => handleViewDetails(repo.name)}
              >
                {repo.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
