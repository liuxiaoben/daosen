const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.userName,
  roles: state => state.user.roles,
  id: state => state.user.id,
  eid: state => state.user.eid,
  uid: state => state.user.uid,
   phone: state => state.user.phone,
   kind: state => state.user.kind,
}
export default getters
