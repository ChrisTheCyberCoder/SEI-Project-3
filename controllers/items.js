import Item from '../models/item.js'

//index 

async function itemIndex (_req, res, next) {
  try {
    const items = await Item.find()
    return res.status(200).json(items)
  } catch (err) {
    next(err)
  }
}

//item create

async function itemCreate (req, res, next) {
  try {
    const newItem = await Item.create(req.body)
    return res.status(201).json(newItem)
  } catch (err) {
    next(err)
  }
}

//item show 

async function itemShow(req, res, next) {
  const { id } = req.params
  try {
    const item = await Item.findById(id).populate('comments.owner')
    if (!item) throw new Error('notFound')
    return res.status(200).json(item)
  } catch (err) {
    next(err)
  }
}

//item update 

async function itemUpdate(req, res, next){
  const { id } = req.params
  try {
    const itemToEdit = await Item.findById(id)
    if (!itemToEdit) throw new Error('notFound')
    Object.assign(itemToEdit, req.body)
    await itemToEdit.save()
    return res.status(202).json(itemToEdit)
  } catch (err) {
    next(err)
  }
}

//item delete

async function itemDelete(req, res, next) {
  const { id } = req.params
  try {
    const itemToDelete = await Item.findById(id)
    if (!itemToDelete) throw new Error('notFound')
    await itemToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

// create comments

async function itemCommentCreate(req, res, next) {
  const { id } = req.params
  const userId = req.currentUser._id
  
  try {
    const item = await Item.findById(id)
    if (!item) throw new Error('notFound') 

    const onlyCommentOwnerId = item.comments.map(comment => {
      return comment.owner._id
    })

    const findComment = onlyCommentOwnerId.find(specificId => {
      if (`${specificId}` === `${userId}`) {
        return true
      } else {
        return false
      }
    })

    if (findComment) {
      // return res.status(501).json({ message: 'You already commented'})
      throw new Error ('You have already commented')
    } 
    
    const newComment = { ...req.body, owner: req.currentUser._id }
    item.comments.push(newComment)
    await item.save()
    return res.status(201).json(item) 

  } catch (err) {
    next(err)
  }
}

// delete comments

async function itemCommentDelete(req, res, next) {
  const { id, commentId } = req.params
  try {
    const item = await Item.findById(id)
    if (!item) throw new Error('notFound')
    const commentToDelete = item.comments.id(commentId)
    if (!commentToDelete) throw new Error('notFound')
    if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error('forbidden')
    await commentToDelete.remove()
    await item.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}



export default {
  index: itemIndex,
  create: itemCreate,
  show: itemShow,
  update: itemUpdate,
  delete: itemDelete,
  commentCreate: itemCommentCreate,
  commentDelete: itemCommentDelete
}