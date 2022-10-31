import { useRouter } from 'next/router';

const ClientProjectsPage = () => {
  const router = useRouter();

  const onMove = () => router.push('/clients/max/projectA');

  return (
    <div>
      <h1>ClientProjects Page</h1>

      <button onClick={onMove}>Moving Project A</button>
    </div>
  );
};

export default ClientProjectsPage;
