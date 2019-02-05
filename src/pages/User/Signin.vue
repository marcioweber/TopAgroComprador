<template>
  <v-container fluid grid-list-lg>
    <v-parallax src="https://scontent.fcac3-1.fna.fbcdn.net/v/t1.0-9/51165144_2682906351752014_9016479412052295680_o.jpg?_nc_cat=102&_nc_ht=scontent.fcac3-1.fna&oh=b065a7bf218979bc7020193ddb713315&oe=5CB31C37" height="600">
    <v-layout row>
      <v-flex xs12 sm4 offset-sm4>
        <v-flex xs12 sm12 sm3>
        </v-flex>
        <v-flex xs12 sm12 sm3>
        </v-flex>
        <v-flex xs12 sm12 sm3>
        </v-flex>
        <v-flex xs12 sm12 sm3>
        </v-flex>
        <v-flex xs12 sm12 sm3>
        </v-flex>
        <v-card>
            <v-toolbar color="blue darken-3" dark>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-container grid-list-xl text-xs-center>
              <v-layout fill-height>
                <v-layout row wrap>
                  <v-flex xs12 align-end flexbox>
                    <v-spacer></v-spacer>
                      <v-layout row>
                        <v-flex xs12 sm12 sm3>
                          <v-form>
                            <v-text-field label="E-mail" v-model="email" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" required></v-text-field>
                            <v-text-field label="Senha" type="password" v-model="password" :error-messages="passwordErrors" @input="$v.password.$touch()" @blur="$v.password.$touch()" required></v-text-field>
                            <v-btn @click="submit" color="info">Login</v-btn>
                            <v-btn @click="clear" color="error">Limpar</v-btn>
                            <v-btn @click="signup" color="orange darken-2">Criar Conta</v-btn>
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
</v-parallax>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Signin',
  mixins: [validationMixin],
  data () {
    return {
      title: 'Signin',
      email: '',
      password: ''
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    clear () {
      this.$v.$reset()
      this.email = ''
      this.password = ''
    },
    signup () {
      this.$v.$touch()
      this.$router.push('/signup')
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        let toNext = localStorage.getItem('toNext')
        if (!toNext)
          toNext = '/home';
        if (localStorage.getItem('user_uid_anterior') !== localStorage.getItem('user_uid')) 
          this.$router.go(0);
        else
          this.$router.push(toNext);
          /*
        let page_reloaded = localStorage.getItem('page_reloaded');
        if (page_reloaded === 1) {*/
          //localStorage.removeItem('toNext');
          //this.$router.push(toNext);
          /*
        } else {
          localStorage.setItem('page_reloaded', 1);
          this.$router.go(0); //toNext);
        }*/
        
      }
    }
  },
  validations: {
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