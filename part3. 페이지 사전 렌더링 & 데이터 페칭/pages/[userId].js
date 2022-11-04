const UserIdPage = ({ userId }) => {
  return <div>{userId}</div>;
};

export default UserIdPage;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { userId } = params;

  return {
    props: {
      userId,
    },
  };
};
