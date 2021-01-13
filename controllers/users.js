import User from '../models/user.js'
import mongoose from 'mongoose'

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
    if (!user) throw new Error(notFound)
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

// userProfile 

async function userProfile(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id) //.populate(basket1.item)
    if (!user) throw new Error('notFound')
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

//update userprofile // Update baseket in userprofile specifically , but it essentially userprofile update. 

//set router to /userProfileUpdate/id --> the id would be the userprofile page, you can get the user if from there, just like what you worked on yesterday. 

async function userProfileUpdate(req, res, next){
  const { id } = req.params 
  try {
    const userToEdit = await User.findById(id)
    if (!userToEdit) throw new Error('notFound')
    Object.assign(userToEdit, req.body)
    userToEdit.basket1.push(req.body)
    await userToEdit.save()
    return res.status(202).json(userToEdit)
  } catch (err) {
    next(err)
  }
}

async function userBasketUpdate(req, res, next){
  const { id } = req.params 
  try {
    const userToEdit = await User.findById(id)
    if (!userToEdit) throw new Error('notFound')

    //if item is already in the basket stop them from spamming --> do this in the frontend.

    const ObjectId = mongoose.Types.ObjectId;
    const itemBasketId = new ObjectId;
    userToEdit.basket1.push({...req.body, itemBasketId}) // this one is better
    // userToEdit.basket1.push(req.body, id1)

    /*
    const { _id } = req.body
    console.log('REQUESTBODY',_id)
    const item = await item.findById(_id)
    userToEdit.basketcheckout.push(item) */


    await userToEdit.save()
    return res.status(202).json(userToEdit)
  } catch (err) {
    next(err)
  }
}






// async function itemUpdate(req, res, next){
//   const { id } = req.params
//   try {
//     const itemToEdit = await Item.findById(id)
//     if (!itemToEdit) throw new Error(notFound)
//     Object.assign(itemToEdit, req.body)
//     await itemToEdit.save()
//     return res.status(202).json(itemToEdit)
//   } catch (err) {
//     next(err)
//   }
// }



export default {
  userIndex: userIndex,
  userShow: userShow,
  userProfile: userProfile, 
  userProfileUpdate, userProfileUpdate,
  userBasketUpdate, userBasketUpdate
}



