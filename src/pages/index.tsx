import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import PostTitlesContainer from 'src/components/Post/PostTitlesContainer';

const Dashboard = ({ search }: any) => {
  return (
    <ApexChartWrapper>
      <PostTitlesContainer search={search} />
    </ApexChartWrapper>
  )
}

export const getServerSideProps: any = async ({ query }: any) => {
  return {
    props: {
      search: query.search ?? '',
    },
  };
}

export default Dashboard
