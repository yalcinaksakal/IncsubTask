import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";
import { auth, createUserProfileDocument } from "../utils/firebase.utils";

// import firebase from "firebase";
import store from "../store";
import { Provider, useDispatch } from "react-redux";
import { loginActions } from "../store/login-slice";

function App({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  //check whether a user signed in or not
  useEffect(() => {
    dispatch(loginActions.setLoggingIn(true));
    let unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // console.log(userRef);
        userRef?.onSnapshot(snapShot => {
          // console.log(snapShot, snapShot.data());
          const data = snapShot.data();
          dispatch(
            loginActions.login({
              uid: snapShot.id,
              email: data?.email,
              displayName: data?.displayName,
              picture: userAuth.photoURL ? userAuth.photoURL : "",
            })
          );
        });
      } else dispatch(loginActions.logout());
    });

    return () => unsubscribeFromAuth();
  }, []);

  return (
    <>
      <Head>
        <title>Incsub Task</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

function IncSubTask(props: AppProps) {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
}

export default IncSubTask;
