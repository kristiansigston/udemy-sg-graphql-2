const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

const UserType = require('./types/user_type')
const AuthService = require('../services/auth')

const loginSingUpArgs = {
  email: { type: GraphQLString },
  password: { type: GraphQLString },
}

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: loginSingUpArgs,
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req }).catch((e) =>
          console.log(e)
        )
      },
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req
        req.logout()
        return user
      },
    },
    login: {
      type: UserType,
      args: loginSingUpArgs,
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req })
      },
    },
  },
})

module.exports = mutation
