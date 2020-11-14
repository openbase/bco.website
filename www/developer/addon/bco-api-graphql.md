# BCO GraphQL API

[Source Code](https://github.com/openbase/bco.api.graphql)

## Bonjour Service Advertising

Service Name ```bco-api-graphql```

## Supported Queries
* `login(username: String, password: String): String` - Retrieve an authentication token (see [Authentication](#Authenticaiton))

## Supported Mutations
* `changePassword(username: String, oldPassword: String, newPassword: String): Boolean` - Note: the return value will always be true since an exception is thrown if changing the password fails


## Authentication
The authentication over the GraphQL API works with a token approach.
First, you have to retrieve a token for a user using the [login query](#Supported-Queries).
Then, you should add an `Authorization` header with the retrieved token as its value to all your requests to the API.

## Used Tools

1. [GraphQL](https://graphql.org/)
   * API Framework
2. [Rejoiner](https://rejoiner.io/)
   * Protobuffer type integration
4. [Bonjour Service](https://github.com/jmdns/jmdns)
   * Advertising and discovery of the graphql service within the local network
