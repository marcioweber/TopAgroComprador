<template>
  <v-container fluid grid-list-lg>
    <v-layout row>
      <v-flex xs12 sm4 offset-sm4>
        <v-card>
            <v-toolbar color="blue darken-3" dark>
              <v-toolbar-title>Criar conta</v-toolbar-title>
            </v-toolbar>
            <v-container grid-list-xl text-xs-center>
              <v-layout fill-height>
                <v-layout row wrap>
                  <v-flex xs12 align-end flexbox>
                    <v-spacer></v-spacer>
                      <v-layout row>
                        <v-flex xs12 sm12 sm3>
                          <v-form>
                            <v-text-field label="Seu Nome" v-model="name" :error-messages="nameErrors" @input="$v.name.$touch()" @blur="$v.name.$touch()" required></v-text-field>
                            <v-text-field label="E-mail" v-model="email" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" required></v-text-field>
                            <v-text-field label="Senha" type="password" v-model="password" :error-messages="passwordErrors" @input="$v.password.$touch()" @blur="$v.password.$touch()" required></v-text-field>
                            <v-btn @click="submit" color="info">Confirma</v-btn>
                            <v-btn @click="back" color="error">Voltar</v-btn>
                          </v-form>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                </v-layout>
              </v-layout>
            </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Signun',
  mixins: [validationMixin],
  data () {
    return {
      title: 'Criar Conta',
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      this.$store.dispatch('signUserUp', {name: this.name, email: this.email, password: this.password})
    },
    back () {
      this.$v.$touch()
      this.$router.push('/signin')
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/hello')
      }
    }
  },
  validations: {
    name: { required },
    email: { required, email },
    password: { required }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('O nome é obrigatório')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Informe um email válido')
      !this.$v.email.required && errors.push('E-mail é obrigatório')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Senha é obrigatória')
      return errors
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>