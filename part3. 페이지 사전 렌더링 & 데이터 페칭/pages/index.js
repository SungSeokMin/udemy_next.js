import path from 'path';
import fs from 'fs/promises';

import Link from 'next/link';

function HomePage({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default HomePage;

export const getStaticProps = async (context) => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);

  const { products } = JSON.parse(jsonData);

  return {
    props: { products },
    revalidate: 2, // 10초
  };
};
