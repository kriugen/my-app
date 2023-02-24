import { GetServerSideProps } from "next";

export default function Profile({ user }: any) {
  return <p>Profile for user: {user.id}</p>;
}


export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  const { user_id } = params;
  return {
    props: {
      user: { id: user_id },
    },
  };
}