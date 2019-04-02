export default (user)=> {
  //uid, photoURL, displayName, email
  if(!user) return
  let {uid, photoURL, displayName, email} = user;
  return {uid, photoURL, displayName, email}
}