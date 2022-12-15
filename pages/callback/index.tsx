import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ScriptProps } from 'next/script';
import { Fragment, useEffect, useRef, useState } from 'react';
import strava from 'strava-v3';

interface StravaDataProps extends ScriptProps {
  data: StravaObject;
}

interface StravaObject {
  client_secret: string;
  client_id: string;
  redirect_uri: string;
  access_token: string;
  refresh_token: string;
  expires_at: string;
  token_type: string;
  athlete: {};
}

function CallbackPage(props: StravaDataProps) {
  const codeRef = useRef<HTMLDivElement>(null);
  const athleteRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const template = `<pre>STRAVA_CLIENT_ID=${props.data.client_id}</pre><pre>STRAVA_CLIENT_SECRET=${props.data.client_secret}</pre><pre>STRAVA_REDIRECT_URI=${props.data.redirect_uri}</pre><pre>STRAVA_ACCESS_TOKEN=${props.data.access_token}</pre><pre>STRAVA_REFRESH_TOKEN=${props.data.refresh_token}</pre><pre>EXPIRES_AT=${props.data.expires_at}</pre><pre>TOKEN_TYPE=${props.data.token_type}</pre>`;
    if (codeRef.current && athleteRef.current) {
      codeRef.current.innerHTML = template;
      athleteRef.current.textContent = JSON.stringify(
        props.data.athlete,
        null,
        4,
      );
    }
  }, [props.data]);
  return (
    <Fragment>
      <Head>
        <title>Get Strava Token</title>
      </Head>
      <div className="lg:w-3/5 mx-auto flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="mockup-code w-full text-sm" ref={codeRef}></div>

        <div className="mockup-code w-full text-sm">
          <pre
            ref={athleteRef}
            className="whitespace-pre-wrap before:hidden pl-5"
          ></pre>
        </div>
      </div>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const code = String(query.code);
    const result = await strava.oauth.getToken(code);
    result.cleint_id = process.env.STRAVA_CLIENT_ID;
    result.client_secret = process.env.STRAVA_CLIENT_SECRET;
    result.redirect_uri = process.env.STRAVA_REDIRECT_URI;
    return {
      props: {
        data: result,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: {
          client_id: process.env.STRAVA_CLIENT_ID,
          client_secret: process.env.STRAVA_CLIENT_SECRET,
          redirect_uri: process.env.STRAVA_REDIRECT_URI,
        },
      },
    };
  }
};

export default CallbackPage;
