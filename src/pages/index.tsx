// ** MUI Imports
import Grid from '@mui/material/Grid'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import { listPosts } from 'src/graphql/queries'
import { API } from 'aws-amplify'
import { GetServerSideProps } from 'next'
import HomeComponent from '../components/HomeComponent';

const Dashboard = ({ posts }: any) => {
  return (
    <ApexChartWrapper>
      <HomeComponent posts={ posts } />
    </ApexChartWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const postData: any = await API.graphql({
    query: listPosts,
  });

  return {
    props: {
      posts: postData.data.listPosts.items,
    },
  };
}

export default Dashboard
