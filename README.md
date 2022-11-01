# Next.js

- [파일 기반의 라우팅](#파일-기반의-라우팅)
- [Link 컴포넌트로 내비게이팅 하기](#link-컴포넌트로-내비게이팅-하기)
- [동적 라우팅에서 path parameter 추출하기](#동적-라우팅에서-path-parameter-추출하기)
- [Catch all routes](#catch-all-routes)
- [커스텀 404 페이지 추가하기](#커스텀-404-페이지-추가하기)
- [Pre-Rendering](#pre-rendering)
- [초기 로드(initial load) 및 수화(hydration)](#초기-로드initial-load-및-수화hydration)
- [getStaticProps() - 정적 페이지 생성](#getstaticprops---정적-페이지-생성)
- [증분 정적 생성, ISR(Incremental Static Regeneration)](#증분-정적-생성-isrincremental-static-regeneration))

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

> ## Link 컴포넌트로 내비게이팅 하기

기존 React에서는 페이지 이동 시 `react-router-dom` 모듈의 `Link` 컴포넌트를 사용해야 라우팅이 가능했다.

```js
import { Link } from 'react-router-dom';

const App = () => {
  return <Link to="products">Products 페이지로 이동</Link>;
};
```

하지만 Next.js는 기본적으로 제공해주는 `next/link`의 `Link` 컴포넌트로 처리할 수 있다.  
다만, `href` 속성을 이용해야 한다.

```js
import Link from 'next/link';

const App = () => {
  return <Link href="products">Products 페이지로 이동</Link>;
};
```

또한, `useRouter` hooks를 이용하는 방법도 있다.

```js
import { useRouter } from 'next/router';

const App = () => {
  const router = useRouter();

  const onMove = () => router.push('/products');

  return <button onClick={onMove}>moving products page</button>;
};
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

> ## Catch all routes

대괄호[] 안에 세 개의 점을 추가하여 동적 경로를 확장하여 모든 경로를 포착할 수 있다.

예를들어, 특정 날짜로 블로그 게시글을 조회하는 기능이 있다고 가정했을 때,`/blog/2022/10/31` 이런 식으로 `2022`, `10`, `31`의 값을 추출하는 기능이다.

`2022`, `10`, `31`은 언제나 변할 수 있는 동적인 값이다.

```js
// pages/blog/[...slug].js

import { useRouter } from 'next/router';

const BlogPostsPage = () => {
  const router = useRouter();

  console.log(router);

  return <div>BlogPosts Page</div>;
};

export default BlogPostsPage;
```

<img  src="https://user-images.githubusercontent.com/72539723/198910442-cb332ddc-906f-4929-ad18-245eafdeff8f.png" width="414" alt="catch all routes">

> ## 커스텀 404 페이지 추가하기

Next.js는 의도하지 않은 경로를 접근했을 때 기본적으로 404 페이지를 제공해준다.

<img  src="https://user-images.githubusercontent.com/72539723/198915966-fd6118d4-48e0-431f-a9dc-4571054bed4f.png" width="414" alt="404">

하지만 아래와 같이 두 가지 방법으로 pages 폴더 하위에 404 페이지를 만들어서 쉽게 제어할 수 있다.

- pages/404.js
- pages/404/index.js

```js
import React from 'react';

const NotFoundPage = () => {
  return <div>Page Not Found !!</div>;
};
```

<img  src="https://user-images.githubusercontent.com/72539723/198916354-0a3675ca-1226-41a9-b28f-ad8d083b4ddd.png" width="412" alt="custom 404">

---

> ## Pre-Rendering

React는 `CSR(Client Side Rendering)` 방식을 사용한다.

- `빈 내용의 index.html 파일을 다운 받고 index.html 내부의 자바스크립트 번들 파일을 다운로드 후 최종 컨텐츠를 렌더링` 하는 방식이다.

이에 반해 Next.js는 `SSR(Server Side Rendering` 방식을 사용한다.

- `클라이언트에서 요청이 들어올 때마다 서버로부터 완전히 만들어진 html 파일을 받아와 페이지를 렌더링` 하는 방식이다.

Next.js에서 가장 중요한 개념인 `Pre-Rendering`은 모든 페이지가 사용자에게 전해지기 전에 html을 미리 생성하는 것이다.

`Pre-Rendering`은 `초기 로드(initial load)`와 `수화(hydration)` 단계로 구성된다.

<img  src="https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png" width="412" alt="custom 404">

[이미지 출처](https://nextjs.org/learn/basics/data-fetching/pre-rendering)

> ## 초기 로드(initial load) 및 수화(hydration)

### 📌 초기 로드(initial load)

html을 먼저 화면에 보여주며, 아직 자바스크립트 파일이 로드가 되지 않았으므로 `사용자와의 상호작용`은 일어나지 않는 단계이다.

### 📌 수화(hydration)

서버에서 초기 로드 단계를 수행하고 클라이언트로 전송해준 후, 바로 `자바스크립트를 로드 시킨 후 클라이언트로 전송`해준다. 즉, `전송 받은 자바스크립트와 html을 이어주는 단계`이다.  
`수화(hydration)` 단계에서 초기 로드를 거친 컴포넌트는 초기화되며, `사용자와의 상호작용`이 가능해진다.

> ## getStaticProps() - 정적 페이지 생성

Next.js는 빌드 시 `getStaticProps()`에서 반환된 props를 사용하여 이 페이지를 미리 렌더링 한다.

보통 빌드 후에도 고정되는 내용을 보여주고 싶을 때 사용한다.

정적 페이지로 만들어질 컴포넌트 내부에 `getStaticProps()` 함수가 존재해야 하며, 다른 파일에 존재할 경우에는 동작하지 않는다.

```js
export const getStaticProps = async (context) => {
  return {
    props: {
      // data
    },
  };
};
```

> ## 증분 정적 생성, ISR(Incremental Static Regeneration)

`getStaticProps()`로 Next.js가 빌드될 때 정적 페이지를 생성하지만, 자주 바뀌는 데이터에 대해서 사용자에게 바로 보여줄 수 있어야 한다. 이런 경우 `증분 정적 생성`, 즉 `ISR` 방법을 이용할 수 있다.

결론적으로 페이지를 사전 생성을 하긴 하지만 `최대 X초마다 들어오는 모든 요청에 대해 주어진 페이지를 재생성` 하도록 하는 방법이다.

```js
// 10초마다 페이지를 재성성

export const getStaticProps = async (context) => {
  return {
    props: {
      // data
    },
    revalidate: 10, // 10초
  };
};
```

❗️다만, 개발 환경에서는 `revalidate` 값과 상관없이 새로고침 시 매번 페이지를 재생성한다.
