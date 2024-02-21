import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from "./Header";

function Edit() {
  const navigate = useNavigate();
  const { nic } = useParams();
  const [editedUserDetails, setEditedUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8070/customers/getUser/${nic}`)
      .then((response) => {
        console.log('Fetched data:', response.data);
        setEditedUserDetails(response.data.customer);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user profile', error);
      });
  }, [nic]);

  const validateField = (fieldName, value) => {
    const errors = { ...validationErrors };

    // Add your validation logic here based on the field name
    // Example: Check if the first name contains only letters
    if (fieldName === 'fname' && !/^[A-Za-z]*$/.test(value)) {
      errors[fieldName] = 'Enter only letters';
    } else {
      delete errors[fieldName];
    }

    setValidationErrors(errors);
  };

  const allFieldsValid = () => {
    for (const fieldName in validationErrors) {
      if (validationErrors.hasOwnProperty(fieldName)) {
        if (validationErrors[fieldName]) {
          return false;
        }
      }
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserDetails({ ...editedUserDetails, [name]: value });
    validateField(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (allFieldsValid()) {
      const formData = new FormData();
      formData.append('profileImage', profileImage);

      axios
        .post(`http://localhost:8070/customers/uploadProfileImage/${nic}`, formData)
        .then((response) => {
          console.log('Image uploaded successfully', response.data.imageUrl);
          const uploadedImageUrl = response.data.imageUrl;

          // Save the uploaded photo URL in local storage
          localStorage.setItem('profileImage', uploadedImageUrl);

          setEditedUserDetails({ ...editedUserDetails, profileImage: uploadedImageUrl });
        })
        .catch((error) => {
          console.error('Error uploading image', error);
        });

      axios
        .put(`http://localhost:8070/customers/updateCus/${nic}`, editedUserDetails)
        .then((response) => {
          console.log('User details updated successfully', response.data);
          navigate(`/getUser/${nic}`);
        })
        .catch((error) => {
          console.error('Error updating user profile', error);
        });
    } else {
      console.error('Validation errors exist. Cannot save.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="profile-container">
        <h2>Edit Profile</h2>
        <div className="profile-info">
          <table>
            <tbody>
              <tr>
                <td>First Name</td>
                <td>
                  <input
                    type="text"
                    name="fname"
                    value={editedUserDetails.fname}
                    onChange={handleInputChange}
                  />
                  {validationErrors.fname && (
                    <div className="error-message">{validationErrors.fname}</div>
                  )}
                </td>
              </tr>

              {/* Add similar rows for other fields */}

              <tr>
                <td>Last Name</td>
                <td>
                  <input
                    type="text"
                    name="lname"
                    value={editedUserDetails.lname}
                    onChange={handleInputChange}
                  />
                  {validationErrors.lname && (
                    <div className="error-message">{validationErrors.lname}</div>
                  )}
                </td>
              </tr>

              <tr>
                <td>NIC</td>
                <td>
                  <input
                    type="text"
                    name="nic"
                    value={editedUserDetails.nic}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td>Phone</td>
                <td>
                  <input
                    type="text"
                    name="phone"
                    value={editedUserDetails.phone}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={editedUserDetails.email}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td>No</td>
                <td>
                  <input
                    type="text"
                    name="no"
                    value={editedUserDetails.no}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td>Street 1</td>
                <td>
                  <input
                    type="text"
                    name="street1"
                    value={editedUserDetails.street1}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td>Street 2</td>
                <td>
                  <input
                    type="text"
                    name="street2"
                    value={editedUserDetails.street2}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>

              <tr>
                <td>City</td>
                <td>
                  <select
                    id="city"
                    name="city"
                    required
                  >
                    <option value="" disabled selected>Select City</option>
                    <option value="AM">Ampara</option>
                    <option value="AD">Anuradhapura</option>
                    {/* Add other city options */}
                  </select>
                </td>
              </tr>

              <tr>
                <td>Profile Photo</td>
                <td>
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  {previewImage && (
                    <img src={previewImage} alt="Profile Preview" className="profile-preview" />
                  )}
                  {/* Display the saved photo from local storage */}
                  {localStorage.getItem('profileImage') && (
                    <img
                      src={localStorage.getItem('profileImage')}
                      alt="Uploaded Profile"
                      className="profile-preview"
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <button
            type="button"
            onClick={handleSave}
            className="centered-button"
            disabled={!allFieldsValid()}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default Edit;
