import firebase from '@/services/firebase'

export default {
  state: {
    loadedClients: [
      { nome: "Marlon", cpf: "081.976.269-52"},
      { nome: "Mayara", cpf: "081.976.269-52"}
    ]
  },
  mutations: {
    createClient (state, payload) {
      state.loadedClients.push(payload)
    }
  },
  actions: {
    createClient ({commit}, payload) {
      const client = {
        nome: payload.nome,
        cidade: payload.cidade,
        nascimento: payload.nascimento,
        ativo: payload.ativo
      }
      // Reach out to firebase and store it

      commit('createClient', payload)
    }
  },
  getters: {
    loadedClients (state) {
      return state.loadedClients;
    },
    loadedClient (state) {
      return (clientId) => {
        return state.loadedClients.find((client) => {
          return client.id === clientId
        })
      }
    }
  }
}