<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <form @submit.prevent="saveProduct">
          <h1>{{ msg }}</h1>
          <v-text-field label="Name" 
                        v-model="model.name" 
                        type="text"
                        required></v-text-field>
          <h5>Hello, {{model.name}}</h5>
          <v-switch :label="`Ativo`" v-model="model.ativo"
          ></v-switch>
          <v-btn @click="saveProduct">
              <span>Salvar Produto</span>
          </v-btn>
          <v-btn @click="clear">Limpar</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//import firebase from '@/services/firebase'
//let productsRef = firebase.getDbs().ref('products')

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello ' + this.$store.state.world,
      model: {}
    }
  },
  methods: {
    saveProduct () {
      console.log(this.model);
      //productsRef.push(this.model);
      this.clear();
       
    },
    clear () {
      this.model = {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
