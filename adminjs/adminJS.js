import AdminJS, { actions } from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import { Product } from '../database/models/Product.js'
import { Category } from '../database/models/Category.js'
import { User } from '../database/models/User.js'
import Order from '../database/models/Order.js'
import { Address } from '../database/models/Address.js'

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})

const adminOptions = {
    resources: [Product, Category, User, Order, Address]
}

export const admin = new AdminJS(adminOptions)

export const adminRouter = AdminJSExpress.buildRouter(admin)

