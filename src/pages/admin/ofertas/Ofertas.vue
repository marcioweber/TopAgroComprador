<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs10 sm10 md12 offset-md0>
        <v-card>
          <v-card-title>
            <v-toolbar color="blue darken-3" dark>
              <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Localizar"  hide-details></v-text-field>
            </v-toolbar>
          </v-card-title>
          <v-data-table :headers="headers" :items="items" :search="search">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.fornecedor }}</td>
              <td class="text-xs-left">{{ props.item.produto }}</td>
              <td class="text-xs-center">{{ props.item.lote }}</td>
              <td class="text-xs-center">{{ props.item.entrega }}</td>
              <td class="text-xs-center">{{ props.item.validade}}</td>
              <td class="text-xs-right">{{ props.item.quantidade}}</td>
              <td class="text-xs-right">{{ props.item.preco}}</td>
              <td class="text-xs-center">{{ props.item.medida}}</td>
              <td class="text-xs-center">{{ "2,5 km"}}</td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Sua pesquisa por ("{{ search }}") não encontrou ocorrências.
            </v-alert>
            <template slot="no-data">
              <v-alert :value="true" color="blue" icon="warning">
                Nenhuma oferta encontrada!
              </v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mask} from 'vue-the-mask'
import VueToastr from '@deveodk/vue-toastr'
import firebase from '@/services/firebase'
let itemRef = firebase.getDb().ref('/offers');

  const focus = {
    inserted(el) {
      el.focus()
    },
  }

  export default {
    directives: {mask, focus},
    firebase: {
      items: itemRef,
      itemsObj: {
        source:  itemRef,
        asObject: true
      }
    },
    data () {
      return {
        name: 'Ofertas',
        title: 'Ofertas de Produtos',
        search: '',
        message: '',
        menu: false,
        error: '',
        masked: true,
        itemRef: '',
        itemEdit: {
          fornecedor: "",
          produto: "",
          lote: "",
          entrega: null,
          validade: null,
          quantidade: null,
          preco: "",
          medida: ""
        },
        headers: [
          { text: 'Fornecedor',     align: 'left',   value: 'fornecedor' },
          { text: 'Produto',        align: 'left',   value: 'produto' },
          { text: 'Lote',           align: 'left',   value: 'lote' },
          { text: 'Dt.Entrega',     align: 'center',   value: 'entrega' },
          { text: 'Dt.Validade',    align: 'center',   value: 'validade' },
          { text: 'Quantidade',     align: 'right',   value: 'quantidade' },
          { text: 'Preço R$',       align: 'right',   value: 'preco' },
          { text: 'Unidade',        align: 'center',   value: 'medida' },
          { text: 'Distância',      align: 'center'},
          { text: '',               align: 'center' }
        ]
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.itemEdit.date)
      },
      isLoggin () {
        return this.$store.getters.user?true:false;
      }
    }
  }
</script>