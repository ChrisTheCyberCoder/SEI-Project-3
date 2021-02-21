import User from '../models/user.js'
// import mongoose from 'mongoose'

// user index 

async function userIndex (_req, res, next) {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

// Show single User

async function userShow(req, res, next) {
  const { id } = req.params
  try {
    const user = await User.findById(id) //.populate('comments.owner')
    if (!user) throw new Error('notFound')
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

// userProfile 

async function userProfile(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id).populate('basket.item')
    if (!user) throw new Error('notFound') 
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}


async function userProfileUpdate(req, res, next){
  const { id } = req.params 
  try {
    const userToEdit = await User.findById(id)
    if (!userToEdit) throw new Error('notFound')
    Object.assign(userToEdit, req.body)
    await userToEdit.save()
    return res.status(202).json(userToEdit)
  } catch (err) {
    next(err)
  }
}

async function addItemToBasket(req, res, next) {

  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error('notFound')
    user.basket.push(req.body)
    await user.save()
    return res.status(201).json(user)
  } catch(err) {
    next(err)
  }
}

async function updateBasket(req, res, next) {
  const { itemId } = req.params
  
  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error('notFound')
    const itemToUpdate = user.basket.id(itemId)
    if (!itemToUpdate) throw new Error ('Item not found')
    itemToUpdate.quantity = req.body.quantity
    await user.save()
    return res.status(201).json(user)
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function removeItemFromBasket(req, res, next){

  const { itemId } = req.params

  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error('notFound')
    const itemToRemove = user.basket.id(itemId)
    if (!itemToRemove) throw new Error ('Item not found')
    await itemToRemove.remove()
    await user.save()
    return res.sendStatus(204)
  } catch(err) {
    next(err)
  }

}

async function checkoutAndEmptybasket(req, res, next){ //also add to recent purchases

  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error('notFound')
    user.recentPurchases = user.basket
    user.basket = []
    await user.save()
    return res.json(user)
  } catch(err) {
    next(err)
  }

}

export default {
  userIndex,
  userShow,
  userProfile, 
  userProfileUpdate,
  addItemToBasket,
  removeItemFromBasket,
  updateBasket, 
  checkoutAndEmptybasket
}



