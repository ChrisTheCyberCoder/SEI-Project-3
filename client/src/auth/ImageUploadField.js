import React from 'react'
// import axios from 'axios'


const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

console.log('upload',uploadUrl)
console.log(uploadPreset)

// { value, name, onChange }
function ImageUploadField(  ) {
  
  // const handleUpload = async e => {
  //   const data = new FormData()  
  //   data.append('file', e.target.files[0])
  //   data.append('upload_preset', uploadPreset)
  //   const res = await axios.post(uploadUrl, data)
  //   onChange({ target: { name, value: res.data.url } }) //* handleChange triggered
  // }


  return (
    <p>image upload</p>
  )
}

export default ImageUploadField