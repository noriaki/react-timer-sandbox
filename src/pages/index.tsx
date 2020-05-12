import React from 'react';
import { GetServerSideProps } from 'next';

import Clock from '~/components/Clock';

type ReactComponent = React.FC<{
  currentTime: number;
}>;

const IndexPage: ReactComponent = ({ currentTime }) => (
  <div>
    <p>Hello Next.js</p>
    <Clock currentTime={currentTime} />
  </div>
);

export const getServerSideProps: GetServerSideProps = () => {
  const currentTime = Date.now();
  return {
    props: { currentTime },
  };
};

export default IndexPage;
