# ReviewsApp - Server

This is the server side of my [reviews app](https://github.com/mmmikolay/reviewsapp). It is an Express GraphQL server that establishes the connection between a MongoDB cluster (where I keep the reviews data), and the client side(where all the data is vidible by the user).

## Server Structure

1. **Schema:** We need to provide a GraphQL schema to the server (*app.js* in this instance) describing the access points, methods, and data types required by our queries. All the operations will be run according to the info provided in the schema.

2. **Models:** Models are there to make the connection between GraphQL types defined in the *Schema*, and data returned by *Resolvers*. By using a *model*, logic to read from, or write to a GraphQL type, and process of actually generating/returning data is separated.

3. **Resolvers:** Task of the resolvers is mapping the input or output of a query/mutation to the related type described in the *Schema*. In this case, as we use *models* as an intermediate layer, the actual mapping is done between the resolvers and fields described in the respective model of a certain GraphQL type.

4. **Authentication:** There is also a middleware called **is-auth**, which checks the authentication data received from the client. On a successful login attempt, server sends an encrypted token to the client as a http-only cookie. When a request that requires user authentication is made, auth logic checks the received token to check if the request made by a valid user.