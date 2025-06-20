// 📂 Lokasi: client/auth/auth-helper.js

import { signout } from './api-auth.js'

const auth = {
  isAuthenticated() {
    if (typeof window === 'undefined') return false

    const jwt = sessionStorage.getItem('jwt')
    return jwt ? JSON.parse(jwt) : false
  },

  authenticate(jwt, cb) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    }
    cb()
  },

  clearJWT(cb) {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('jwt')
    }
    cb()

    // Optional signout from server
    signout().then(() => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
  }
}

export default auth
