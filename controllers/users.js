import User from '../models/user.js'


// user index 

async function userIndex (_req, res, next) {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

export default {
  userIndex: userIndex
}