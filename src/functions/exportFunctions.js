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
      userId: backendUserData.userId,
      firstName: backendUserData.firstname,
      lastName: backendUserData.lastname,
      email: backendUserData.url,
      role: backendUserData.role,
      loggedIn: true,
      accessToken: backendUserData.accessToken,
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
