<template>
  <v-app id="inspire">
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" v-if="isLoggin" fixed app>
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" 
                        :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              :to="{name:child.link}">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" 
              :to="{name:item.link}">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">TopAgro Comprador</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-menu offset-y>
        <v-btn slot="activator" icon dark>
          <!--<img src="https://vuetifyjs.com/static/doc-images/logo.svg" alt="Vuetify" height="20px"width="20px">-->
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="menu in menus" :key="menu.title" :to="menu.to" >
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-layout row v-if="error">
        <v-flex xs12 sm6 offset-sm3>
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-flex>
      </v-layout>
      <router-view></router-view>
    </v-content>
    <v-footer class="blue darken-2">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            <v-icon class="red--text">favorite</v-icon>
            by <a class="white--text" href="https://sites.google.com/edu.unipar.br/top-agro/home" target="_blank">TopAgro Brasil</a>
            
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import AppAlert from './components/shared/AppAlert'

export default {
  components: {
    AppAlert
  },
  data () {
    return {
      drawer: null,
      title: 'Vuetify.js'
    }
  },
  beforeCreate: function() {
    console.log('app.vue beforeCreate')
  },  
  methods: {
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isLoggin () {
      return this.$store.getters.user?true:false;
    },
    items () {
      let items = [
        {icon: 'contacts', text: 'Meu Perfil',    link: 'Comprador' },
        /*
        {
          //icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down', text: 'Cadastros', model: true,
          children: [
            { icon: 'contacts', text: 'Comprador',    link: 'Comprador' },
          ]
    },*/
        {icon: 'phonelink', text: 'Ofertas de Produtos',    link: 'Ofertas' },
        {icon: 'phonelink', text: 'Meus Pedidos',    link: 'Pedidos' } /*
        { icon: 'contacts', text: 'Contacts' },
        { icon: 'history', text: 'Frequently contacted' },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Go to the old version' }*/
      ]
      return items;
    },
    menus () {
      let menus = [
        {
          icon: 'home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'label',
          title: 'Login',
          to: '/signin'
        }]
      if (this.$store.getters.user) {
        menus = [
          {
            icon: 'label',
            title: 'Principal',
            to: '/hello'
          },
          {
            icon: 'label',
            title: 'Sair',
            to: '/logout'
          }
        ]
      }
      return menus
    }
  }
}
</script>