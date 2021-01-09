import React from 'react'
import axios from 'axios'


const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

// console.log('upload',uploadUrl)
// console.log(uploadPreset)

// 
function ImageUploadField( { value, name, onChange } ) {
  
  const handleUpload = async e => {
    const data = new FormData()  
    data.append('file', e.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    onChange({ target: { name, value: res.data.url } }) //* handleChange triggered
  }


  return (
    <>
      {value ?
        <div>
          <div style={{ width: '300px' }}>
            <img src={value} alt="profileImage" style={{ width: '100%', height: 'auto' }}/>
          </div>
        </div>
        :
        <>
          <input
            className="input"
            type="file"
            accept="jpg"
            onChange={handleUpload}
            name={name}
          />
        </>  
      }
    </>
  )
}

export default ImageUploadField