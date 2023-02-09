import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import { GetServerSideProps } from 'next'
import PostTitlesContainer from 'src/components/Post/PostTitlesContainer';

const Dashboard = ({ search }: any) => {
  return (
    <ApexChartWrapper>
      <PostTitlesContainer search={ search } />
    </ApexChartWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }: any) => {
  return {
    props: {
      search: query.search ?? '',
    },
  };
}

export default Dashboard
