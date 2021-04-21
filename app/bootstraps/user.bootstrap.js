const UserService = require('../services/user.service')
const userService = new UserService()

const { color } = require('../constants')
const user = require('./data/user.json')

const run = async () => {

  try {
    const hasUser = await userService.count({ email: user.email })

    if (!hasUser)
      userService.insert(user)
  } catch (error) {
    console.log(color.RED, error)
  }

}

run();