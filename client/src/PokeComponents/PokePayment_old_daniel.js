import React from 'react'
import axios from 'axios'
import { headers } from '../lib/api'
import '../styles/PokePayment.scss'
import { Link } from 'react-router-dom'
// import PokeCheckout from './PokeCheckout'

function PokePayment() {
  const [userProfileData, setUserProfileData] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try { 
        const { data } = await axios.get('api/userprofile', headers())
        setUserProfileData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()

  }, [1])

  const [doCheckout, setDoCheckout] = React.useState(true)

  const [formdata, setFormdata] = React.useState({
    name: '',
    card: '',
    month: '',
    year: '',
    code: '',
    country: '',
    postcode: ''
  })

  const [nameValid, setNameValid] = React.useState('')
  const [cardValid, setCardValid] = React.useState('')
  const [monthValid, setMonthValid] = React.useState('')
  const [yearValid, setYearValid] = React.useState('')
  const [codeValid, setCodeValid] = React.useState('')
  const [countryValid, setCountryValid] = React.useState('')
  const [postcodeValid, setPostcodeValid] = React.useState('')
  // console.log(setCardValid)
  // console.log()
  const nameRegex = new RegExp(/^\b(?!.*?\s{2})[A-Za-z ]{1,40}$/)
  const cardRegex = new RegExp(/^[0-9]{4}(?:[-\s]?[A-Za-z0-9]{4})(?:[-\s]?[A-Za-z0-9]{4})(?:[-\s]?[A-Za-z0-9]{4})$/) // ok no this was harder
  const monthRegex = new RegExp(/^[0-9]{1,2}$/)
  const yearRegex = new RegExp(/^[0-9]{4}$/)
  const codeRegex = new RegExp(/^[0-9]{3,4}$/)
  const countryRegex = new RegExp(/^\b(?!.*?\s{2})[A-Za-z ]*\b$/)
  // const postcodeRegex = new RegExp(/^[A-Za-z0-9]{2,4}(?:[-\s][A-Za-z0-9]{3})$/) //hardest regex of my lifetime
  const postcodeRegexSimplified = new RegExp(/^[A-Za-z0-9]{2,10}(?:[-\s]*[A-Za-z0-9]{2,10})/)
  const everyStateValid = cardValid && nameValid && monthValid && yearValid && codeValid && countryValid && postcodeValid

  // function addSpaceToCard(event) {                  //* kept here only for record-keeping reasons
  //   let str = event.target.value
  //   str = str.replace(/\s/g, '')
  //   if ( str.length % 4 === 0 && str.length !== 16){
  //     event.target.value = event.target.value + ' '
  //   }
  // }

  function setStates(eventName, bool) {
    switch (eventName) {
      case 'card':
        setCardValid(bool)
        break
      case 'name':
        setNameValid(bool)
        break
      case 'month':
        setMonthValid(bool)
        break
      case 'year':
        setYearValid(bool)
        break
      case 'code':
        setCodeValid(bool)
        break
      case 'country':
        setCountryValid(bool)
        break
      case 'postcode':
        setPostcodeValid(bool)
    }
  }

  const handleValidation = (event) => {
    let regex = null
    let eventName = ''
    switch (event.target.name) {
      case 'card':
        regex = cardRegex
        eventName = 'card'
        break
      case 'name':
        regex = nameRegex
        eventName = 'name'
        break
      case 'month':
        regex = monthRegex
        eventName = 'month'
        break
      case 'year':
        regex = yearRegex
        eventName = 'year'
        break
      case 'code':
        regex = codeRegex
        eventName = 'code'
        break
      case 'country':
        regex = countryRegex
        eventName = 'country'
        break
      case 'postcode':
        regex = postcodeRegexSimplified
        eventName = 'postcode'
        break
    }
    if (regex.test(event.target.value)) {
      setFormdata({ ...formdata, [event.target.name]: event.target.value })
      setStates(eventName, true)
      const idiot = formdata
      console.log(idiot)
      return
    }
    setStates(eventName, false)

    if ((event.target.name === 'card' || event.target.name === 'postcode' || event.target.name === 'code') && event.target.value === '') {
      setStates(eventName, true)
    }
  }

  function showLink() {
    if (everyStateValid) {
      setDoCheckout(true)
      return true
    }
    return false
  }

  function checkStatus() {
    if (!doCheckout) {
      return (
        <div className="full-wrapper">
          <div className="top-part">
            <div>
            Order Confirmation
            </div>
            <div>
              <p>Order Total :</p> <span>$14500.50</span>
            </div>
            <div>
              <button className="button_wrap" type="button">
                <img src="../assets/pokeball_orange.svg" alt="pokeball" /> 
                <p>Place Order</p>
              </button>
            </div>
          </div>
          <div className="middle-part">
            <div className="middle-part-basic">
              <div>
                <div>
                  <h4>Your Information </h4> <a>Edit</a>
                </div>
                <div className="line"></div>
                <div>
                  <p className="name">Jack May</p><br/>
                  <p>jackmay@email.com</p>
                </div>
              </div>
              <div>
                <div>
                  <h4>Shipping Address </h4> <a>Edit</a>
                </div>
                <div className="line"></div>
                <div>
                  <p className="name">Jack May</p><br/>
                  <p>Apt 16, Pallet Town</p><br/>
                  <p>Kanto, MT </p><br/>
                  <p>Alpha Continent</p><br/>
                  <p>(44) 1234-123456</p>
                </div>
              </div>
            </div>
            <div className="middle-part-basic">
              <div>
                <div>
                  <h4>Payment </h4> <a>Edit</a>
                </div>
                <div className="line"></div>
                <div>
                  <p>VISA(maybe an image of the logo)</p><br/>
                  <p>Visa card ending in 1234</p>
                </div>
              </div>
              <div>
                <div>
                  <h4>Billing Address </h4> <a>Edit</a>
                </div>
                <div className="line"></div>
                <div>
                  <p className="name">Jack May</p><br/>
                  <p>Apt 16, Pallet Town</p><br/>
                  <p>Kanto, MT </p><br/>
                  <p>Alpha Continent</p><br/>
                  <p>(44) 1234-123456</p>
                </div>
              </div>
            </div>  
          </div>
        </div>
      )
    } else if (doCheckout) {
      return (
        <section className="page_wrapper scrolling-box">
          <form className="float_up">
            <div id="div1">
              <div><h2>Card Details</h2></div>
              <div className="input_box">
                <label>Name</label>
                <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                <input 
                  placeholder="Mewtwo"
                  required
                  id="color1"
                  onChange={handleValidation}
                  name="name"
                  // value={formdata.email}
                />
                { nameValid === '' ? null : nameValid ? null : <p>Name cannot contain numbers or special characters</p> }
              </div>
              <div className="input_box">
                <label>Card Number</label>
                <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                <input
                  // onKeyDown={addSpaceToCard}
                  required
                  id="color1"
                  placeholder="0000 0000 0000 0000"
                  name="card"
                  onChange={handleValidation}
                />
                {cardValid === '' ? null : cardValid ? null : <p>Enter a valid card number</p>}
              </div>
              <div>
                <div className="input_box">
                  <label>Expiry Date (MM YYYY)</label>
                  <div style={{ display: 'flex' }}>
                    <select 
                      className="selectPokePayment"
                      name="month"
                      required 
                      id="color2"
                      onChange={handleValidation}
                    >
                      <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                      <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                      <option value="">Select Month</option>
                      <option value="1">January</option>
                      <option value="2">Febuary</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select><div>{ monthValid === '' ? null : monthValid ? null : <p style={{ margin: '5px 0' }}>select a month</p> }</div>
                    <select 
                      className="selectPokePayment"
                      name="year"
                      required 
                      id="color2"
                      onChange={handleValidation}
                    >
                      <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                      <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                      <option value="">Select Year</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                      <option value="2033">2033</option>
                      <option value="2034">2034</option>
                      <option value="2035">2035</option>
                      <option value="2036">2036</option>
                      <option value="2037">2037</option>
                      <option value="2038">2038</option>
                      <option value="2039">2039</option>
                      <option value="2040">2040</option>
                      <option value="2041">2041</option>
                    </select>
                    <div>{ yearValid === '' ? null : yearValid ? null : <p style={{ margin: '5px 0' }}>select a year</p> }</div>
                  </div>
                  
                </div>
                <div className="input_box">
                  <label>Security Code (CVV)</label>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input 
                    id="color1"
                    required
                    placeholder="3 or 4 digit number"
                    onChange={handleValidation}
                    name="code"
                  />
                  {codeValid === '' ? null : codeValid ? null : <p>Enter a valid security code</p>}
                </div>
              </div>
              <div>
                <div className="input_box">
                  <label>Country</label>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <select
                    className="selectPokePayment"
                    id="color2"
                    required
                    onChange={handleValidation}
                    name="country"
                  >
                    <option value="">Select Country</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Aland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos Keeling Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="The Democratic Republic of The Congo">The Democratic Republic of The Congo</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D ivoire">Cote D&#39;ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands Malvinas">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-bissau">Guinea-bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                    <option value="Holy See Vatican City State">Holy See (Vatican City State)</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Islamic Republic of Iran">Islamic Republic of Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Democratic People s Republic of Korea">Democratic People&#39;s Republic of Korea</option>
                    <option value="Republic of Korea">Republic of Korea</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People s Democratic Republic">Lao People&#39;s Democratic Republic</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="The Former Yugoslav Republic of Macedonia">The Former Yugoslav Republic of Macedonia</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Federated States of Micronesia">Micronesia, Federated States of</option>
                    <option value="Republic of Moldova">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory Occupied">Palestinian Territory, Occupied (Palestine)</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                    <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                    <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="United Republic of Tanzania">United Republic of Tanzania</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-leste">Timor-leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Virgin Islands British">Virgin Islands, British</option>
                    <option value="Virgin Islands U.S.">Virgin Islands, U.S.</option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                  {countryValid === '' ? null : countryValid ? null : <p>select a country</p>}
                </div>
                <div className="input_box">
                  <label>Post Code</label>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input 
                    required
                    onChange={handleValidation}
                    name="postcode"
                    id="color1"
                    placeholder="TW6 2PL"
                  />
                  { postcodeValid === '' ? null : postcodeValid ? null : <p>enter a valid postcode</p> }
                </div>
              </div>
            </div>
          </form>
        </section>
      )
    } else if (userProfileData) {
      return (
        <section className="page_wrapper scrolling-box">
          <form className="float_up">
            <div id="div1">
              <div><h2>Card Details</h2></div>
              <div className="input_box">
                <label>Name</label>
                <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                <input 
                  placeholder="Mewtwo"
                  required
                  id="color1"
                  onChange={handleValidation}
                  name="name"
                  // value={formdata.email}
                />
                { nameValid === '' ? null : nameValid ? null : <p>Name cannot contain numbers or special characters</p> }
              </div>
              <div className="input_box">
                <label>Card Number</label>
                <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                <input
                  // onKeyDown={addSpaceToCard}
                  required
                  id="color1"
                  placeholder="0000 0000 0000 0000"
                  name="card"
                  onChange={handleValidation}
                />
                {cardValid === '' ? null : cardValid ? null : <p>Enter a valid card number</p>}
              </div>
              <div>
                <div className="input_box">
                  <label>Expiry Date (MM YYYY)</label>
                  <div style={{ display: 'flex' }}>
                    <select 
                      className="selectPokePayment"
                      name="month"
                      required 
                      id="color2"
                      onChange={handleValidation}
                    >
                      <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                      <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                      <option value="">Select Month</option>
                      <option value="1">January</option>
                      <option value="2">Febuary</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select><div>{ monthValid === '' ? null : monthValid ? null : <p style={{ margin: '5px 0' }}>select a month</p> }</div>
                    <select 
                      className="selectPokePayment"
                      name="year"
                      required 
                      id="color2"
                      onChange={handleValidation}
                    >
                      <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                      <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                      <option value="">Select Year</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                      <option value="2033">2033</option>
                      <option value="2034">2034</option>
                      <option value="2035">2035</option>
                      <option value="2036">2036</option>
                      <option value="2037">2037</option>
                      <option value="2038">2038</option>
                      <option value="2039">2039</option>
                      <option value="2040">2040</option>
                      <option value="2041">2041</option>
                    </select>
                    <div>{ yearValid === '' ? null : yearValid ? null : <p style={{ margin: '5px 0' }}>select a year</p> }</div>
                  </div>
                  
                </div>
                <div className="input_box">
                  <label>Security Code (CVV)</label>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input 
                    id="color1"
                    required
                    placeholder="3 or 4 digit number"
                    onChange={handleValidation}
                    name="code"
                  />
                  {codeValid === '' ? null : codeValid ? null : <p>Enter a valid security code</p>}
                </div>
              </div>
              <div>
                <div className="input_box">
                  <label>Country</label>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <select
                    className="selectPokePayment"
                    id="color2"
                    required
                    onChange={handleValidation}
                    name="country"
                  >
                    <option value="">Select Country</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Aland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos Keeling Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="The Democratic Republic of The Congo">The Democratic Republic of The Congo</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D ivoire">Cote D&#39;ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands Malvinas">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-bissau">Guinea-bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                    <option value="Holy See Vatican City State">Holy See (Vatican City State)</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Islamic Republic of Iran">Islamic Republic of Iran</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Democratic People s Republic of Korea">Democratic People&#39;s Republic of Korea</option>
                    <option value="Republic of Korea">Republic of Korea</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People s Democratic Republic">Lao People&#39;s Democratic Republic</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="The Former Yugoslav Republic of Macedonia">The Former Yugoslav Republic of Macedonia</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Federated States of Micronesia">Micronesia, Federated States of</option>
                    <option value="Republic of Moldova">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory Occupied">Palestinian Territory, Occupied (Palestine)</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                    <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                    <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="United Republic of Tanzania">United Republic of Tanzania</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-leste">Timor-leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Virgin Islands British">Virgin Islands, British</option>
                    <option value="Virgin Islands U.S.">Virgin Islands, U.S.</option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                  {countryValid === '' ? null : countryValid ? null : <p>select a country</p>}
                </div>
                <div className="input_box">
                  <label>Post Code</label>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input 
                    required
                    onChange={handleValidation}
                    name="postcode"
                    id="color1"
                    placeholder="TW6 2PL"
                  />
                  { postcodeValid === '' ? null : postcodeValid ? null : <p>enter a valid postcode</p> }
                </div>
              </div>
            </div>
            <div id="div2">
              <div><h2>Shipping Details</h2></div>
              <div>
                <div className="input_box">
                  <label>Name</label>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input 
                    required
                    className="capitalized"
                    name="name"
                    id="color1"
                    defaultValue={userProfileData.username}
                  />
                </div>
                <div className="input_box">
                  <label>Email</label>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input 
                    type="text"
                    required
                    id="color1"
                    name="shippingemail"
                    defaultValue={userProfileData.email}
                  />
                </div>
              </div>
              <div>
                <div className="input_box">
                  <label>Phone (optional)</label>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input 
                    type="number"
                    onKeyDown={ (evt) => (evt.key === 'e' || evt.key === 'E') && evt.preventDefault() }
                    id="color1"
                    name="phonenumber"
                  />
                </div>
                <div className="input_box">
                  <label>Address</label>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input name="chrome-autofill" style={{ display: 'none' }} disabled/>
                  <input
                    id="color1"
                    type="text"
                    className="capitalized"
                    required
                    name="address"
                    defaultValue={ userProfileData ? userProfileData.address : null }
                  />
                </div>
              </div>
              <div className="button_wrapper">
                {showLink() ?
                  <Link
                    to={{
                      pathname: '/pokecheckout'
                    }}>
                            Checkout
                  </Link>
                  :
                  null}
              </div>
            </div>
          </form>
        </section>
      )
    }
  }









  return (
    checkStatus()
  )
}
export default PokePayment

//             :
//             <p>...Loading</p>}
//         </form>
//       </section>
//   }
//   )
// }



// {userProfileData ?
//   <div>
//     <h3>{userProfileData.username}</h3><br/>
//     <h3>{userProfileData.email}</h3><br/>
//     {/* <h3>{userProfileData.basket}</h3><br/> */}
//     <h3>{userProfileData.dob}</h3><br/>
//     <h3>{userProfileData.address}</h3><br/>
//     <img src='https://res.cloudinary.com/dcwxp0m8g/image/upload/v1610530139/pokezon/testsprite.png' alt="user profile image"/>
//   </div>
//   :
//   <p>...Loading</p>}