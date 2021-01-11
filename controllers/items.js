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
    if (!item) throw new Error(notFound)
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
    if (!itemToEdit) throw new Error(notFound)
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
    if (!itemToDelete) throw new Error(notFound)
    await itemToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

// create comments

async function itemCommentCreate(req, res, next) {
  const { id } = req.params

  console.log('backend id', id)
  try {
    const item = await Item.findById(id)
    if (!item) throw new Error(notFound)
    const newComment = { ...req.body, owner: req.currentUser._id }
    item.comments.push(newComment)
    await item.save()
    return res.status(201).json(item) // Note to self: this was originally item, but need to change to only get the exact one that was created, since I need its id.
  } catch (err) {
    next(err)
  }
}

// I need to GET the item to delete first so that I know which one to delete
// I need to set up a delete button on pokeshow, and I need the response to give me the specific item, and the specific id. 





// delete comments

async function itemCommentDelete(req, res, next) {
  const { id, commentId } = req.params
  try {
    const item = await Item.findById(id)
    if (!item) throw new Error(notFound)
    const commentToDelete = item.comments.id(commentId)
    if (!commentToDelete) throw new Error(notFound)
    if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error(forbidden)
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