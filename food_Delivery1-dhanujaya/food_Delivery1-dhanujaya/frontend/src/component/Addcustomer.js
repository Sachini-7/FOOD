import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderMain from "./Header"; 
import   "./css_yapa/addAccount.css";


function Addcustomer() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [nic, setNic] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [no, setNo] = useState('');
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();
    console.log('sendData function called'); 
  
    const newCustomer = {
      fname,
      lname,
      nic,
      phone,
      email,
      no,
      street1,
      street2,
      city,
      password,
      confirmPassword,
    };
    
  console.log(newCustomer); // Log the form data

  axios.post('http://localhost:8070/customers/register', newCustomer)
    .then(response => {
      console.log('Data sent successfully', response.data);
      // Show success alert
      alert('Data sent successfully');
      navigate('/loginCus');
    })
    .catch(error => {
      console.error('Error sending data', error);
      // Show error alert
      alert('Error sending data');
    });
  
    console.log(newCustomer); // Log the form data
  
    axios.post('http://localhost:8070/customers/register', newCustomer)
      .then(response => {
        console.log('Data sent successfully', response.data);
      })
      .catch(error => {
        console.error('Error sending data', error);
      });
  }

  return (
    <div>
        <HeaderMain />
      <form method="POST" onSubmit={sendData}>
        <center>
          <h1>Register</h1>{' '}
        </center>


<div className="input-group">
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    title="Enter only letters"
                    required
                    placeholder="Enter First Name"
                    onChange={(e) => {
                        const input = e.target.value;
                        if (/^[A-Za-z]*$/.test(input)) {
                            setFname(input);
                        }
                    }}
                    onKeyPress={(e) => {
                        const charCode = e.charCode;
                        if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
                            e.preventDefault();
                        }
                    }}
                />
                </div>


                <div className="input-group">
                <input
                    type="text"
                    id="lname"
                    name="lname"
                    title="Enter only letters"
                    required
                    placeholder="Enter Last Name"
                    onChange={(e) => {
                        const input = e.target.value;
                        if (/^[A-Za-z]*$/.test(input)) {
                            setLname(input);
                        }
                    }}
                    onKeyPress={(e) => {
                        const charCode = e.charCode;
                        if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
                            e.preventDefault();
                        }
                    }}
                />
                </div>


                <div className="input-group">
                <input
                    type="text"
                    id="nic"
                    name="nic"
                    pattern="^(?:\d{12}|\d{12}[Vv])$"
                    title="Enter exactly 12 numbers or 12 numbers followed by 'V'/'v'"
                    required
                    placeholder="Enter NIC No"
                    value={nic}
                    onChange={(e) => {
                         const input = e.target.value;
                         if (/^\d{0,12}[Vv]?$/.test(input)) {
                            setNic(input);
                        }
                    }}
                />
                </div>
                <div className="input-group">
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength="10"
                    placeholder="Enter phone No"
                    title="Enter a number that starts with 0 and has 9 additional digits"
                    required
                    onKeyPress={(e) => {
                        const charCode = e.charCode;
                        const currentValue = e.target.value;
            
                        if (currentValue.length === 0 && charCode !== 48) { 
                            e.preventDefault();
                        } else if (currentValue.length > 0 && (charCode < 48 || charCode > 57)) {
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => {
                        const input = e.target.value;
                        if (/^[0-9]*$/.test(input) && input.length <= 10) {
                            setPhone(input);
                        }
                    }}
                />
                </div>


                <div className="input-group">
  <input
    type="email"
    id="email"
    name="email"
    placeholder="Enter email"
    title="Enter a valid email address"
    required
    onChange={(e) => {
      const input = e.target.value;
      // Basic email validation using a regular expression
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        setEmail(input);
      }
    }}
  />
</div>

               
                <div className="input-group address-group">
                    <label htmlFor="address">Address Details</label><br></br>
                    <input
                        type="text"
                        id="no"
                        name="no"
                        placeholder="No"
                        required
                        onChange={(e) => {
                            let input = e.target.value;
                           
                            input = input.replace(/\/+/g, '/');
                            
                            if (input.length > 8) {
                                
                                input = input.slice(0, 8);
                            }
                            setNo(input);
                        }}
                        onKeyPress={(e) => {
                            const charCode = e.charCode;
                            const input = e.target.value;
                            
                            if (charCode >= 48 && charCode <= 57) {
                                
                                if (input.indexOf('/') === -1) {
                                    
                                    if (input.length >= 4) {
                                        e.preventDefault();
                                    }
                                } else {
                                    
                                    const parts = input.split('/');
                                    if (parts.length === 2) {
                                        if (parts[0].length >= 4 || parts[1].length >= 4) {
                                            e.preventDefault();
                                        }
                                    } else {
                                        e.preventDefault();
                                    }
                                }
                            } else if (charCode === 47) {
                                
                                if (input.indexOf('/') !== -1) {
                                    
                                    e.preventDefault();
                                }
                            } else {
                                e.preventDefault(); 
                            }
                        }}
                    />
                    
                    <input
                        type="text"
                        id="street1"
                        name="street1"
                        placeholder="Street/city"
                        required
                        onChange={(e) => {
                            let input = e.target.value;
                            input = input.replace(/[^A-Za-z\s]/g, '');
                            if (input.length > 50) {
                                input = input.slice(0, 50);
                            }
                            setStreet1(input);
                        }}
                        onKeyPress={(e) => {
                            const charCode = e.charCode;
                            if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                                e.preventDefault();
                            }
                        }}
                    />


<input
                        type="text"
                        id="street2"
                        name="street2"
                        placeholder="Street/city"
                        required
                        onChange={(e) => {
                            let input = e.target.value;
                            input = input.replace(/[^A-Za-z\s]/g, '');
                            if (input.length > 50) {
                                input = input.slice(0, 50);
                            }
                            setStreet2(input);
                        }}
                        onKeyPress={(e) => {
                            const charCode = e.charCode;
                            if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
                                e.preventDefault();
                            }
                        }}
                    />

                    
                <select
                    id="city"
                    name="city"
                    required
                    onChange={(e) => {
                    setCity(e.target.value);
                    }}
                >
                    <option value="" disabled selected>Select City</option>
                    <option value="AM">Ampara</option>
                    <option value="AD">Anuradhapura</option>
                    <option value="BD">Badulla</option>
                    <option value="BT">Batticaloa</option>
                    <option value="CB">Colombo</option>
                    <option value="GL">Galle</option>
                    <option value="GP">Gampaha</option>
                    <option value="HB">Hambantota</option>
                    <option value="JA">Jaffna</option>
                    <option value="KT">Kalutara</option>
                    <option value="KD">Kandy</option>
                    <option value="KG">Kegalle</option>
                    <option value="KL">Kilinochchi</option>
                    <option value="KR">Kurunegala</option>
                    <option value="MN">Mannar</option>
                    <option value="MT">Matale</option>
                    <option value="MA">Matara</option>
                    <option value="MG">Monaragala</option>
                    <option value="ML">Mullaitivu</option>
                    <option value="NE">Nuwara Eliya</option>
                    <option value="PL">Polonnaruwa</option>
                    <option value="PT">Puttalam</option>
                    <option value="RT">Ratnapura</option>
                    <option value="TC">Trincomalee</option>
                    <option value="VA">Vavuniya</option>
                </select>
                    
                </div>


                <div className="password-fields">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        minLength="8" 
                        required
                        onChange={(e) => {
                            const password = e.target.value;
                
                            
                            const lettersOnly = /^[a-zA-Z]*$/.test(password);
                
                            
                            const numbersOnly = /^[0-9]*$/.test(password);
                
                            if (password.length < 8 || lettersOnly || numbersOnly) {
                                
                                e.target.setCustomValidity('Weak Password');
                            } else {
                                
                                e.target.setCustomValidity('');
                            }
                
                            setPassword(password);
                        }}
                    />
                        {password && (password.length < 8 || /^[a-zA-Z]*$/.test(password) || /^[0-9]*$/.test(password)) && (
                            <p className="password-strength">Weak Password</p>
                        )}



                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        minLength="8" 
                        required
                        onBlur={(e) => {
                            const confirmPassword = e.target.value;
                            
                            if (confirmPassword !== password) {
                                e.target.setCustomValidity("Passwords do not match");
                            } else {
                                e.target.setCustomValidity("");
                            }
                        }}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                </div>


                
             
                
              

<button type="submit">Submit</button>
</form> 

</div>     


   
                    )}

    export default Addcustomer;