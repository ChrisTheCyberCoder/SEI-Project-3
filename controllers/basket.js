//import User from '../models/user.js'

// basket update 

// when user makes a request to baseurl/basket 
// I need to get their req.body in a packaged json automtically to then send out to the api, this then goes through the controller, and should give back the updated version of their userprofile which has the updated basket. front end can then either use that response, or get another response from get userprofile. 

//so they will be sending this to be added in 

//const basket = {
  //item: {//Item Link. }, get Item Id from the front end, and send it through. 
  //quantity: //this too. 
//}

//this request should then be sent to this controller. This controller should check the userprofile to edit, if no userid throw error, then assign the object with userprofile to edit with the req.body, then save it return the json. Then throw error. 

//async function basketUpdate(req, res, next){ //updating userprofile basically
  //try {

  //}
//}

// Similar to the below but push it 

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