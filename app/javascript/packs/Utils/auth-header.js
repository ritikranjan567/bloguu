export const authHeader = () => {
  let user = localStorage.getItem('user');
  let token = localStorage.getItem('token');

  if (user && token){
    return {'Authorization': 'Bearer ' + token};
  }else{
    return {};
  }
}