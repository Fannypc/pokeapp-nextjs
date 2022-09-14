import { getSession } from "next-auth/react";

export default function Dashboard({ session }) {
  // const user = session?.user;

  return <div>Dashboard should only be for logged in users</div>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) return { redirect: { destination: "/", permanent: false } };

  return {
    props: {
      session,
    },
  };
}
