export const notFound = 'notFound'
export const validationError = 'ValidationError'
export const castError = 'CastError'
export const unauthorized = 'unauthorized'
export const forbidden = 'forbidden'

export default function errorHandler(err, _req, res, next) {
  console.log('🤖 An Error Happened', err.name, err.message)

  if (err.name === validationError) {
    const customErrors = {}

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }

    return res.status(422).json({
      message: 'Form Validation Errors',
      errors: customErrors,
    })
  }

  if (err.message === forbidden) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  if (err.message === unauthorized) {
    console.log('YOU HAVE AN ERROR MESSAGE!!')
    return res.json({ message: 'Unauthorized' }) //Note to self: 401 res status can prevent you from extracting data messages, so do this in catch for now or take status 401 out. 
  }

  if (err.name === castError || err.message === notFound) {
    return res.status(404).json({ message: 'Not Found ' })
  }

  if (err.message === ReferenceError) {
    console.log("this is a reference error")
  }

  if (err.message === 'Item already in basket') {
    return res.json({ message: 'Item already in basket'})
  }

  // if (err.message === 'User not Found') {
  //   return res.json({ message: 'Please Login to Access This Page'})
  // }

  if (err.message === 'You have already commented') {
    return res.status(501).json({ message: 'You have already commented'})
  }


  res.sendStatus(500)
  next(err)
}