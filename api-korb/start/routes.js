'use strict'

const { RouteResource } = require('@adonisjs/framework/src/Route/Manager')


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.resource('users', 'UserController').apiOnly()
Route.resource('products', 'ProductController').apiOnly()