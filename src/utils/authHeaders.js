export const getHeaders = () => {
  

    return {
      Refresh: localStorage.getItem('refreshTokenFounder'),
      Access: localStorage.getItem('accessTokenFounder')
    };
  };
  