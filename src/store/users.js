import axios from 'axios'
import router from '../router/index'

const API_URL = 'http://localhost:8080'
const USERS_URL = API_URL + '/v1/admin/users'

export default {
  namespaced: true,
  state: {
    users: [],
    error: ''
  },
  mutations: {},
  actions: {
    fetchUsers({ state }) {
      axios({
        method: 'get',
        url: USERS_URL,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('tk')
        }
      })
        .then(function(response) {
          state.users = response.data
        })
        .catch(function(error) {
          state.error = error.message
        })
    },
    addUser({ state }, user) {
      axios({
        method: 'post',
        url: USERS_URL,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('tk')
        },
        data: {
          'email': user.email,
          'name': user.name,
          'surname': user.surname,
          'username': user.username,
          'password': user.password
        }
      })
        .then(function() {
          router.push({ name: 'users' })
        })
        .catch(function(error) {
          state.error = error.message
        })
    },
    editUser({ state }, user) {
      axios({
        method: 'patch',
        url: USERS_URL + '/' + user.id,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('tk')
        },
        data: {
          'email': user.email,
          'name': user.name,
          'surname': user.surname,
          'password': user.password
        }
      })
        .then(function() {
          router.push({ name: 'users' })
        })
        .catch(function(error) {
          state.error = error.message
        })
    }
  },
  getters: {
    getUsers(state) {
      return state.users
    },
    getError(state) {
      return state.error
    }
  }
}
