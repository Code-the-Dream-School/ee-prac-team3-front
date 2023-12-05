import React, { useCallback, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import customColors, { defaultTheme } from '../assets/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './AccountSettings.module.css';
import useAuth from '../auth/useAuth';
import { port } from '../App';

const Delete = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      color: customColors.white,
      cursor: 'pointer',
    }}
  >
    <DeleteIcon />
  </div>
);
const Upload = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      color: customColors.white,
      cursor: 'pointer',
    }}
  >
    <AddAPhotoIcon />
  </div>
);

const AvatarSection = ({
  formValues,
  isHovered,
  setIsHovered,
  handleFileChange,
  handleFileInputClick,
  handleDelete,
}) => (
  <label
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <Avatar
      className={s.avatarBlock}
      sx={{
        m: 1,
        width: '100px',
        height: '100px',
        bgcolor: customColors.grey,
      }}
    >
      {formValues.avatarURL ? (
        <>
          <Avatar
            src={formValues.avatarURL}
            alt={`${formValues.firstName} ${formValues.lastName}`}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {isHovered && (
            <Box
              sx={{
                display: 'flex',
                position: 'absolute',
                justifyContent: 'center',
                gap: '10px',
                zIndex: 1,
              }}
            >
              <Upload onClick={handleFileInputClick}/>
              <Delete onClick={handleDelete} />
            </Box>
          )}
        </>
      ) : (
        <>
          <AddAPhotoIcon
            sx={{
              color: customColors.white,
              zIndex: 1,
            }}
          />
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </>
      )}
    </Avatar>
  </label>
);

const UserInfoSection = ({
  formValues,
  setFormValues,
  changeProfileInfoHandler,
}) => (
  <Box
    component="form"
    noValidate
    onSubmit={changeProfileInfoHandler}
    sx={{ mt: 3, mb: 2 }}
  >
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="given-name"
          name="firstName"
          value={formValues.firstName}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              firstName: e.target.value,
            })
          }
          required
          fullWidth
          id="firstName"
          label="First Name"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          value={formValues.lastName}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              lastName: e.target.value,
            })
          }
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          label="Email Address"
          name="email"
          autoComplete="email"
        />
      </Grid>
    </Grid>
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
      Save changes
    </Button>
  </Box>
);

const PasswordSection = ({
  passwordFormValues,
  setPasswordFormValues,
  changePasswordHandler,
}) => (
  <Box
    component="form"
    noValidate
    onSubmit={changePasswordHandler}
    sx={{ mt: 3, mb: 2 }}
  >
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="currentPassword"
          onChange={(e) =>
            setPasswordFormValues({
              ...passwordFormValues,
              currentPassword: e.target.value,
            })
          }
          label="Current password"
          type="password"
          id="currentPassword"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          onChange={(e) =>
            setPasswordFormValues({
              ...passwordFormValues,
              newPassword: e.target.value,
            })
          }
          label="New password"
          type="password"
          id="newPassword"
        />
      </Grid>
    </Grid>
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 5 }}>
      Change password
    </Button>
  </Box>
);

const AccountSettings = ({ userData }) => {
  console.log('userData === ', userData);
  const { auth, setAuth } = useAuth();
  const [formValues, setFormValues] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  });
  const [passwordFormValues, setPasswordFormValues] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [isHovered, setIsHovered] = useState(false);

  const changeProfileInfoHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const payload = {
        firstname: formValues.firstName,
        lastname: formValues.lastName,
        email: formValues.email,
      };

      const url = `${port}/api/v1/updateuser`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to update account information'
          );
        }
        setAuth({
          ...auth,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
        });

        console.log('Account information updated successfully');
      } catch (error) {
        console.error('Error updating account information:', error.message);
      }
    },
    [formValues, setAuth]
  );
  const changePasswordHandler = useCallback(async (event) => {
      event.preventDefault();
      const payload = {
        currentPassword: passwordFormValues.currentPassword,
        newPassword: passwordFormValues.newPassword,
      };

      const url = `${port}/api/v1/updateuser`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to update account information'
          );
        }

        console.log('Account information updated successfully');
      } catch (error) {
        console.error('Error updating account information:', error.message);
      }
    }, [passwordFormValues]);

  const handleFileChange = useCallback((event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const userAvatar = reader.result;
          setFormValues({
            ...formValues,
            avatarURL: userAvatar,
          });

          localStorage.setItem('profilePicture', userAvatar);
        };

        reader.readAsDataURL(file);
      }
    }, [formValues]);
  const handleFileInputClick = useCallback((event) => {
    if (event.current.file) {
      event.current.file.click(); // Trigger click on file input
    }
  }, []);
  const handleDelete = useCallback(() => {
    localStorage.removeItem('profilePicture');
    // Update the state to remove the avatarURL
    setFormValues({
      ...formValues,
      avatarURL: '',
    });
    const fileInput = document.getElementById('avatar-upload');
    if (fileInput) {
      fileInput.value = ''; // This will clear the file input value
    }
  }, []);
  React.useEffect(() => {
    const storedProfilePicture = localStorage.getItem('profilePicture');
    if (storedProfilePicture) {
      setFormValues((prevValues) => ({
        ...prevValues,
        avatarURL: storedProfilePicture,
      }));
    }
  }, []);

  return (
    <Container
      sx={{
        minHeight: '95vh',
        backgroundColor: customColors.backgroundLight,
        maxWidth: 'none !important',
        pt: 6,
        pb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AvatarSection
              formValues={formValues}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
              handleFileChange={handleFileChange}
              handleFileInputClick={handleFileInputClick}
              handleDelete={handleDelete}
            />
            <UserInfoSection
              formValues={formValues}
              setFormValues={setFormValues}
              changeProfileInfoHandler={changeProfileInfoHandler}
            />
            <PasswordSection
              passwordFormValues={passwordFormValues}
              setPasswordFormValues={setPasswordFormValues}
              changePasswordHandler={changePasswordHandler}
            />
          </Box>
          <Grid textAlign={'justify'}>
            <FormControlLabel
              control={
                <Checkbox value="confirmProgressReset" color="primary" />
              }
              label="I want to reset account progress and I understand that it can't be reverted."
            />
          </Grid>
          <Button fullWidth variant="contained" sx={{ mt: 1, mb: 4 }}>
            Reset account progress
          </Button>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox value="confirmAccountDelete" color="primary" />
              }
              label="I want to delete my account."
            />
          </Grid>
          <Button fullWidth variant="contained" sx={{ mb: 2 }}>
            Delete account
          </Button>
        </Container>
      </Box>
    </Container>
  );
};

export default AccountSettings;
