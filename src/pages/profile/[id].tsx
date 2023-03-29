function Profile({ id }: any) {
  return <div>Profile for user sub {id}</div>
}

export const getServerSideProps: any = async ({ params }: any) => {
  const { id } = params;

  return {
    props: {
      id,
    },
  };
}

export default Profile;