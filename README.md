# 목차

📌 [Next.js 라우팅](파일-기반의-라우팅)  
📌 [동적 라우팅에서 path parameter 추출하기](동적-라우팅에서-path-parameter-추출하기)

---

> ## 파일 기반의 라우팅

기존 React의 라우팅 방식은 `react-router-dom` 모듈을 통해 구현할 수 있다.

```js
import { React } from 'react';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        Home
      </Route>
      <Route path="/products" element={<Products />}>
        Products
      </Route>
      <Route path="/products/:id" element={<Product />}>
        Product
      </Route>
    </Routes>
  );
};
```

하지만 Next.js는 `파일 기반의 라우팅` 방식으로 보다 간편하게 라우팅 처리를 할 수 있다.

```js
pages/index.js -> '/'

pages/products/index.js -> '/products'

pages/products/[id].js -> '/products/:id'
```

> ## 동적 라우팅에서 path parameter 추출하기

`router object`의 query 속성을 이용하면 path parameter를 손쉽게 추출할 수 있다.

```js
// pages/portfolio/[projectId]/index.js

import { useRouter } from 'next/router';

const PortfolioProjectPage = () => {
  const router = useRouter();

  console.log(router);
  console.log(router.query.projectId); // path parameter

  return <div>Portfolio Project Page</div>;
};

export default PortfolioProjectPage;
```

<img src="https://user-images.githubusercontent.com/72539723/198908379-c5782909-eb94-4497-8fdc-f6c3aea7538c.png" width="414" alt="router 객체">
