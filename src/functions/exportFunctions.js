import { port } from 'App';

export const backendApiCall = async (method, url, body) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  if (method !== 'GET' && body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${port}${url}`, options);

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    throw error;
  }
};

export const authenticateUser = async (backendApiCall, setAuth, setLoading) => {
  try {
    const backendUserData = await backendApiCall('GET', '/api/v1/login');
    setAuth({
      userId: backendUserData.user.userId,
      firstName: backendUserData.user.firstname,
      lastName: backendUserData.user.lastname,
      email: backendUserData.user.url,
      role: backendUserData.user.role,
      loggedIn: true,
      accessToken: backendUserData.user.accessToken,
      avatarURL: backendUserData.user.avatarURL,
      isActive: backendUserData.isActive,
    });
  } catch (error) {
    throw new Error(error);
  } finally {
    setLoading(false);
  }
};

export const handleLogout = async (
  backendApiCall,
  setAuth,
  setShowLogoutModal
) => {
  try {
    await backendApiCall('GET', '/api/v1/logout');

    setAuth({
      loggedIn: false,
    });
    setShowLogoutModal(true);
  } catch (error) {
    // Handle any errors here, such as showing an error message
    console.error('Logout failed:', error);
  }
};
