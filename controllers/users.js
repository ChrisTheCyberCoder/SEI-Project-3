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
    if (!user) throw new Error('notFound') //throw new Error('notFound')
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
    // userToEdit.basket1.push(req.body) //This shouldnt be here.
    await userToEdit.save()
    return res.status(202).json(userToEdit)
  } catch (err) {
    next(err)
  }
}

async function userBasketUpdate(req, res, next){ //more like userbasket add. 
  const { id } = req.params 
  const {itemId} = req.body

  console.log('DID IT WORK', itemId)
  try {
    const userToEdit = await User.findById(id)
    if (!userToEdit) throw new Error('notFound')

    userToEdit.basket1.find(item => {
      if (item.itemId === itemId) throw new Error('Item already in basket') // throw new Error('Item Already added to basket')
    })

    // const ObjectId = mongoose.Types.ObjectId; //! Get rid temporarily
    // const itemBasketId = new ObjectId; //! Get rid temporarily
    userToEdit.basket1.push({...req.body}) // this one is better // ({...req.body, itemBasketId}) 
    // userToEdit.basket1.push(req.body, id1)

    /*
    const { _id } = req.body
    console.log('REQUESTBODY',_id)
    const item = await item.findById(_id)
    userToEdit.basketcheckout.push(item) */

    await userToEdit.save()
    return res.status(202).json(userToEdit)
  } catch (err) {
    //console.log(err.response.message)
    next(err)
  }
}

async function userBasketDelete(req, res, next){

  const { id, itemdelete } = req.params 
  try {
    const userToEdit = await User.findById(id)
    if (!userToEdit) throw new Error('notFound')

    const check = userToEdit.basket1.filter(item => {

      if (item.itemId !== itemdelete) {
        console.log('REQPARAM', itemdelete)
        console.log('THE ITEM', item.itemId)
        return item.itemId
      }
    })

    console.log('CHECK IT', check)

    userToEdit.basket1= check

    //userToEdit.basket1 = []

    //userToEdit.basket1.push(check)

    //console.log(test)

    await userToEdit.save()
    return res.status(202).json(userToEdit)
    
  } catch (err) {
    console.log(err)
    next(err)
  }

}

export default {
  userIndex: userIndex,
  userShow: userShow,
  userProfile: userProfile, 
  userProfileUpdate: userProfileUpdate,
  userBasketUpdate: userBasketUpdate,
  userBasketDelete: userBasketDelete
}



