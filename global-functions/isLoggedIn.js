const isLoggedIn = Variables => {
  //console.log('AUTHORIZATION_HEADER exists:', !!Variables?.AUTHORIZATION_HEADER);
  //console.log('USER exists:', !!Variables?.USER);

  return Variables?.AUTHORIZATION_HEADER && Variables?.USER;
};

export default isLoggedIn;
