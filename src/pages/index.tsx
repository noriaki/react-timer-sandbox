import React from 'react';
import { GetServerSideProps } from 'next';

import Clock from '~/components/Clock';

const IndexPage: React.FC = () => (
  <div>
    <p>Hello Next.js</p>
    <Clock />
  </div>
);

export const getServerSideProps: GetServerSideProps = () => {
  const currentTime = Date.now();
  return {
    props: { currentTime },
  };
};

export default IndexPage;
