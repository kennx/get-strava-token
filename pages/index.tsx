import {
  IdentificationIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import { Fragment, useRef, useState } from 'react';

function HomePage() {
  const clientIDInput = useRef<HTMLInputElement>(null);
  const clientSecretInput = useRef<HTMLInputElement>(null);

  const [submit, setSubmit] = useState(false);

  const linkToAuthorizeURL = async () => {
    if (clientIDInput.current && clientSecretInput.current) {
      const client_id = clientIDInput.current.value;
      const client_secret = clientSecretInput.current.value;
      if (client_id && client_secret) {
        setSubmit(true);
        try {
          const raw = await fetch('/api/access', {
            method: 'POST',
            body: JSON.stringify({
              client_id,
              client_secret,
            }),
          });
          const result = await raw.json();
          setSubmit(false);
          if (result.url) {
            window.location.href = result.url;
          }
        } catch (error) {
          setSubmit(false);
          console.log(error);
        }
      }
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Get Strava Token</title>
      </Head>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="clientID"
                className="block text-sm font-medium text-gray-700"
              >
                Client ID
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span>
                    <IdentificationIcon className="h-6 w-6 text-gray-300" />
                  </span>
                </div>
                <input
                  disabled={submit}
                  type="text"
                  name="client_ID"
                  id="clientID"
                  ref={clientIDInput}
                  className="block w-full rounded-md border-gray-300 pt-2 pb-2 pl-12 pr-12 focus:border-indigo-500 focus:ring-indigo-500 lg:text-lg"
                  placeholder="客户端ID"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="clientSecret"
                className="block text-sm font-medium text-gray-700"
              >
                Client Secret
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span>
                    <ShieldCheckIcon className="h-6 w-6 text-gray-300" />
                  </span>
                </div>
                <input
                  disabled={submit}
                  type="text"
                  name="client_secret"
                  id="clientSecret"
                  ref={clientSecretInput}
                  className="block w-full rounded-md border-gray-300 pt-2 pb-2 pl-12 pr-12 focus:border-indigo-500 focus:ring-indigo-500 lg:text-lg"
                  placeholder="客户端密钥"
                />
              </div>
            </div>

            <div>
              <button
                disabled={submit}
                type="submit"
                onClick={linkToAuthorizeURL}
                className="w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HomePage;
