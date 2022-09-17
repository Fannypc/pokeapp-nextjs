import { getSession } from "next-auth/react";
import { requireAuthentication } from "../utils/requireAuthentication";

export default function Dashboard({ session }) {
  // const user = session?.user;

  return <div>Dashboard should only be for logged in users</div>;
}

export async function getServerSideProps(context) {
  return requireAuthentication(context, (session) => {
    return {
      props: { session },
    };
  });
}
