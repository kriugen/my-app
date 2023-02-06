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
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <HomeComponent posts={ posts } />
        </Grid>
      </Grid>
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
