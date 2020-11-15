# BCO GraphQL API

[Source Code](https://github.com/openbase/bco.api.graphql)

## Bonjour Service Advertising

Service Name ```bco-api-graphql```

## Supported Queries
* `login(username: String!, password: String!): String` - Retrieve an authentication token (see [Authorization Header](#supported-headers))

## Supported Mutations
* `changePassword(username: String!, oldPassword: String!, newPassword: String!): Boolean` - Note: the return value will always be true since an exception is thrown if changing the password fails

## Supported Headers
The GraphQL API Server will process the following HTTP headers on requests:

* **Authorization Header**:
The authorization header can be used to authenticate your client at BCO.
Just send the token received through a [login query](#supported-queries) as the value of the authorization header with your requests. 
If this header is not supplied, your actions will be performed with other permissions.

* **Accept-Language Header**:
If you set the accept-language header to a language code, the GraphQL API will resolve all multi languge strings (eg. labels and descriptions) according to this language.
On queries the text matching the language code are returned and on mutations the values matching your language code are modified.
It this header is not set, the default of the server running the GraphQL API is used.

## Used Tools

1. [GraphQL](https://graphql.org/)
   * API Framework
2. [Rejoiner](https://rejoiner.io/)
   * Protobuffer type integration
4. [Bonjour Service](https://github.com/jmdns/jmdns)
   * Advertising and discovery of the graphql service within the local network
