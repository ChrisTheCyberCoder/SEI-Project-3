import React from 'react'
import axios from 'axios'


const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

// console.log('upload',uploadUrl)
// console.log(uploadPreset)

// 
function ImageUploadField( { value, name, onChange } ) {
  const [ hover, setHover] = React.useState(false)
  const handleUpload = async e => {
    const data = new FormData()  
    data.append('file', e.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    onChange({ target: { name, value: res.data.url } }) //* handleChange triggered
  }
  
  const handleHover = () =>{
    setHover(!hover)
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
          <div className="input_wrapper" onMouseEnter={handleHover} onMouseLeave={handleHover}>
            <div type="button" className={`upload_button ${hover ? 'hover' : ''}`} htmlFor="upload" > 
              <img src="../assets/pokeball_orange.svg" alt="pokeball" /> 
              Upload Image
            </div>
            <input
              id="upload"
              className="input"
              type="file"
              accept="jpg"
              onChange={handleUpload}
              name={name}
            />
          </div>  
        </>  
      }
    </>
  )
}

export default ImageUploadField