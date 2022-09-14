import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
// import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  //the user is stored in session
  console.log("mjeioefhowhf");
  console.log(status);
  console.log(session);
  const user = session?.user;

  return (
    <div className={styles.container}>
      This is home
      {user && (
        <>
          <img src={user.image} layout="fill" alt="user" />
          <h2>{user.name}</h2>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
      {!user && <button onClick={() => signIn("github")}>Sign in</button>}
    </div>
  );
}
