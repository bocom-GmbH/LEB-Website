import type { ApolloClientOptions } from '@apollo/client/core'
import { createHttpLink } from '@apollo/client/link/http/index.js'
import { InMemoryCache } from '@apollo/client/cache/index.js'
import type { BootFileParams } from '@quasar/app-vite'
// import { setContext } from '@apollo/client/link/context';
// import { Cookies } from 'quasar';

export /* async */ function getClientOptions(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  /* {app, router, ...} */ options?: Partial<BootFileParams<any>>
) {
  const httpLink = createHttpLink({
    uri: 'https://graphql.db-bocom.at/',
});
// const authLink = setContext((_, { headers }) => {
//     return {
//         headers: {
//             ...headers,
//             authorization: Cookies.get('apollo-token') ?? '',
//         },
//     };
// });

return <ApolloClientOptions<unknown>>Object.assign(
    // General options.
    <ApolloClientOptions<unknown>>{
        link: httpLink,

        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: 'no-cache',
            },
            watchQuery: {
                fetchPolicy: 'no-cache',
            },
            mutate: {
                fetchPolicy: 'no-cache',
            },
        },
    },

    // Specific Quasar mode options.
    process.env.MODE === 'spa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'ssr'
      ? {
          //
        }
      : {},
    process.env.MODE === 'pwa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'bex'
      ? {
          //
        }
      : {},
    process.env.MODE === 'cordova'
      ? {
          //
        }
      : {},
    process.env.MODE === 'capacitor'
      ? {
          //
        }
      : {},
    process.env.MODE === 'electron'
      ? {
          //
        }
      : {},

    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},

    // For ssr mode, when on server.
    process.env.MODE === 'ssr' && process.env.SERVER
      ? {
          ssrMode: true,
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === 'ssr' && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100,
        }
      : {}
  )
}
