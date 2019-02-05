<template>
  <v-container fluid grid-list-lg>
    <v-layout row>
      <v-flex xs10 sm10 md12 offset-md0>
        <v-dialog v-model="st_editar" max-width="1100">
          <v-card>
            <v-flex xs12 sm12 md12 offset-md0>
              <v-toolbar color="blue darken-3" dark>
                <v-toolbar-title>{{lb_editardialog}}</v-toolbar-title>
              </v-toolbar>
              <v-container grid-list-xl text-xs-center>
                <v-layout fill-height>
                  <v-layout row>
                    <v-flex xs12 align-end flexbox>
                      <v-spacer></v-spacer>
                        <v-layout col>
                          <v-flex xs5 sm5 md15>
                            <v-select label="Assinaturas Disponíveis" 
                                      v-model="assinatura" 
                                      v-validate="'required'" 
                                      :items="Assinaturas" 
                                      item-text="produto"
                                      item-value="produto"
                                      persistent-hint
                                      return-object
                                      @change="onChange($event)"
                                      hide-details></v-select>
                          </v-flex>
                        </v-layout>
                        <v-layout>
                          <v-flex xs12 sm12 md12>
                            <v-data-table :headers="headers_assinatura" :items="filteredItems" v-model="selecionado" select-all class="elevation-1">
                              <template slot="items" slot-scope="props">
                                  <td>
                                    <v-checkbox
                                      :input-value="props.selected"
                                      primary
                                      hide-details
                                    ></v-checkbox>
                                  </td>
                                  <td class="text-xs-left">{{ props.item.fornecedor }}</td>
                                  <td class="text-xs-center">{{ props.item.lote }}</td>
                                  <td class="text-xs-center">{{ props.item.entrega }}</td>
                                  <td class="text-xs-center">{{ props.item.validade}}</td>
                                  <td class="text-xs-right">{{ props.item.quantidade}}</td>
                                  <td class="text-xs-right">{{ props.item.preco}}</td>
                                  <td class="text-xs-center">{{ props.item.medida}}</td>
                                  <td class="text-xs-center">{{ props.item.status}}</td>
                              </template>
                            </v-data-table>
                          </v-flex>
                        </v-layout>
                        <v-layout row>
                          <v-flex xs5 sm5 md2>
                            <v-text-field label="Quantidade" v-model="quantidade" :error-messages="errors.collect('estoque')"
                                          data-vv-name="quantidade" ref="quantidade" v-focus 
                                          @keypress="stripTheGarbage($event)" @blur="formatEstoque()"></v-text-field>
                          </v-flex>
                          <v-flex xs5 sm5 md2>
                            <v-text-field label=" Preço" v-model="preco" :error-messages="errors.collect('preco')"
                                          data-vv-name="preco" ref="preco" v-focus 
                                          @keypress="stripTheGarbage($event)" @blur="formatCurrency()"></v-text-field>
                            <!--<input label="Preço" v-model.lazy="itemEdit.preco" v-money="money" ref="preco"/>-->
                            <!--<v-text-field label="Preço" v-model.lazy="itemEdit.preco" v-money="money"></v-text-field>-->
                          </v-flex>
                            <v-flex xs5 sm5 md5>
                              <v-checkbox v-model="recorrente" label="Entrega Recorrente" value="Sim"></v-checkbox>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                          <v-layout col>
                            <v-flex xs5 sm5 md2>
                              <v-checkbox v-model="recorrente" label="Segunda" value="Segunda"></v-checkbox>
                            </v-flex>
                            <v-flex xs5 sm5 md2>
                              <v-checkbox v-model="recorrente" label="Terça" value="Terça"></v-checkbox>
                            </v-flex>
                            <v-flex xs5 sm5 md2>
                              <v-checkbox v-model="recorrente" label="Quarta" value="Quarta"></v-checkbox>
                            </v-flex>
                            <v-flex xs5 sm5 md2>
                              <v-checkbox v-model="recorrente" label="Quinta" value="Quinta"></v-checkbox>
                            </v-flex>
                            <v-flex xs5 sm5 md2>
                              <v-checkbox v-model="recorrente" label="Sexta" value="Sexta"></v-checkbox>
                            </v-flex>
                            <v-flex xs5 sm5 md2>
                              <v-checkbox v-model="recorrente" label="Sábado" value="Sábado"></v-checkbox>
                            </v-flex>
                            <v-flex xs5 sm5 md2>
                              <v-checkbox v-model="recorrente" label="Domingo" value="Domingo"></v-checkbox>
                            </v-flex>
                          </v-layout>
                        </v-layout>
                        <pre>{{ error }}</pre>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="info" @click.native="salvar()">Gravar</v-btn>
                          <v-btn color="error" @click.native="st_editar = false">Cancelar</v-btn>
                        </v-card-actions>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-container>
            </v-flex>
          </v-card>
        </v-dialog>
        <v-dialog v-model="st_exclusao" max-width="290">
          <v-card>
            <v-flex xs12 sm12 md12 offset-md0>
              <v-toolbar color="blue darken-3" dark>
                <v-toolbar-title>Exclusão de {{name}}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>Confirma exclusão do {{name}} ({{this.itemApagar.pedido+' - '+this.itemApagar.produto}}) ?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" @click.native="deletarConfirm(itemApagar)">Sim</v-btn>
                <v-btn color="error" @click.native="st_exclusao = false">Não</v-btn>
              </v-card-actions>
            </v-flex>
          </v-card>
        </v-dialog>
        <v-alert type="success" dismissible icon="check_circle" transition="scale-transition" v-model="st_alert">
          {{message}}
        </v-alert>
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
              <td class="text-xs-right">{{ props.item.pedido }}</td>
              <td class="text-xs-left">{{ props.item.fornecedor }}</td>
              <td class="text-xs-left">{{ props.item.produto }}</td>
              <td class="text-xs-center">{{ props.item.lote }}</td>
              <td class="text-xs-center">{{ props.item.entrega }}</td>
              <td class="text-xs-center">{{ props.item.validade}}</td>
              <td class="text-xs-right">{{ props.item.quantidade}}</td>
              <td class="text-xs-right">{{ props.item.preco}}</td>
              <td class="text-xs-center">{{ props.item.medida}}</td>
              <td class="text-xs-center">{{ "2,5 km" }}</td>
              <td class="text-xs-center">{{ props.item.status}}</td>
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="editar(props.item)">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="deletar(props.item)">
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Sua pesquisa por ("{{ search }}") não encontrou ocorrências.
            </v-alert>
            <template slot="no-data">
              <v-alert :value="true" color="blue" icon="warning">
                Nenhum pedido localizado!
              </v-alert>
            </template>
          </v-data-table>
          <v-btn absolute dark fab bottom right color="pink" @click="inserir()" >
            <v-icon>add</v-icon>
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mask} from 'vue-the-mask'
import VueToastr from '@deveodk/vue-toastr'
import firebase from '@/services/firebase'
let itemRef = firebase.getDb().ref('/orders');
let items = firebase.getDb().ref('/offers');

  const focus = {
    inserted(el) {
      el.focus()
    },
  }

  export default {
    directives: {mask, focus},
    firebase: {
      items: itemRef,
      Assinaturas: items,
      Fornecedores: items,
      itemsObj: {
        source:  itemRef,
        asObject: true
      }
    },
    data () {
      return {
        name: 'Pedido',
        title: 'Meus Pedidos',
        search: '',
        message: '',
        menu: false,
        error: '',
        masked: true,
        st_alert: false,
        st_editar: false,
        st_insert: false,
        st_exclusao: false,
        lb_editardialog: '',
        assinatura: {},
        itemRef: '',
        itemApagar: '',
        selecionado: [],
        recorrente: [],
        quantidade: null,
        preco: null,
        itemEdit: {
          pedido: "",
          fornecedor: "",
          produto: "",
          lote: "",
          entrega: null,
          validade: null,
          quantidade: null,
          preco: "",
          medida: "",
          status: ""
        },
        headers: [
          { text: 'Nº Pedido',      align: 'right',    value: 'pedido' },
          { text: 'Fornecedor',     align: 'left',     value: 'fornecedor' },
          { text: 'Produto',        align: 'left',     value: 'produto' },
          { text: 'Lote',           align: 'left',     value: 'lote' },
          { text: 'Dt.Entrega',     align: 'center',   value: 'entrega' },
          { text: 'Dt.Validade',    align: 'center',   value: 'validade' },
          { text: 'Quantidade',     align: 'right',    value: 'quantidade' },
          { text: 'Preço R$',       align: 'right',    value: 'preco' },
          { text: 'Unidade',         align: 'center',   value: 'medida' },
          { text: 'Distância',         align: 'center',   value: 'distancia' },
          { text: 'Status',         align: 'center',   value: 'status' }
        ],
        headers_assinatura: [
          { text: 'Fornecedor',     align: 'left',     value: 'fornecedor' },
          { text: 'Lote',           align: 'left',     value: 'lote' },
          { text: 'Dt.Entrega',     align: 'center',   value: 'entrega' },
          { text: 'Dt.Validade',    align: 'center',   value: 'validade' },
          { text: 'Quantidade',     align: 'right',    value: 'quantidade' },
          { text: 'Preço R$',       align: 'right',    value: 'preco' },
          { text: 'Unidade',        align: 'center',   value: 'medida' },
          { text: 'Rating',         align: 'center',   value: 'rating' },
        ]
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.itemEdit.date)
      },
      isLoggin () {
        return this.$store.getters.user?true:false;
      },
      filteredItems() {
        return this.Fornecedores.filter((i) => {
          console.log(this.assinatura.produto);
          console.log('vetor: '+i.produto);
          return (i.produto === this.assinatura.produto);
        })
      }
    },
    methods: {
      stripTheGarbage(e) {
        if (e.keyCode < 48 && e.keyCode !== 46 && e.keyCode !== 44 || e.keyCode > 59) {
          e.preventDefault()
        }
      },
      formatCurrency() {
        if (this.itemEdit.preco != '') {
          var num = this.itemEdit.preco;//.toString();
          num = num.replace(",",".");
          num = Number(num);
          var countDecimals = function (value) {
            if(Math.floor(value) === value) return 0;
            return value.toString().split(".")[1].length || 0; 
          }
          var decimal = countDecimals(num);
          if (decimal < 2)
            num = num.toFixed(2)
          if (decimal > 2) 
            num = num.toFixed(decimal)
          if (parseInt(num) < 1)
            num = "." + String(num).split(".")[1];
          if (num === ".00")
            this.itemEdit.preco = "0.00";
          else
            this.itemEdit.preco = num;
        }
      },
      formatEstoque() {
        if (this.itemEdit.estoque != '') {
          var num = this.itemEdit.quantidade;//.toString();
          num = num.replace(",",".");
          num = Number(num);
          if (num === 0) {
            this.itemEdit.quantidade = "0";
          } else {
            var countDecimals = function (value) {
              if(Math.floor(value) === value) return 0;
              return value.toString().split(".")[1].length || 0; 
            }
            var decimal = countDecimals(num);
            num = num.toFixed(decimal)
            if (parseInt(num) < 1)
              num = "." + String(num).split(".")[1];
            if (num === ".00")
              this.itemEdit.quantidade = "0";
            else
              this.itemEdit.quantidade = num;
          }
        }
      },
      onChange(event) {
            //console.log(event.produto);
        },
      inserir: function () {
        this.vkey      = '';
        this.itemEdit  = {};
        this.itemEdit  = {
          selecionado: false,
          pedido: "",
          fornecedor: "",
          produto: "",
          lote: "",
          entrega: null,
          validade: null,
          quantidade: null,
          preco: "",
          medida: "",
          status: "",
          slug: this.generateUUID()
        };
        this.lb_editardialog = 'Novo '+this.name;
        this.st_insert = true;
        this.st_editar = true;
        this.$validator.reset();
        //this.$refs.fornecedor.focus();
      },
      generateUUID () {
        let d = new Date().getTime()
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
        return uuid
      },
      deletar: function (item) {
        this.itemApagar = item;
        this.st_exclusao = true;
      },
      deletarConfirm: function (item) {
        this.st_exclusao = false;
        itemRef.child(item['.key']).remove();
        console.log(this.itemApagar);
        this.message = this.name+' ('+this.itemApagar.pedido+' - '+this.itemApagar.produto+') removido com sucesso!';
        this.$toastr('add', { title: 'Informação', msg: this.message, clickClose: true, timeout: 5000, position: 'toast-top-right', type: 'success' }) ;
        //this.st_alert = true;
      },
      editar: function (even) {
        this.vkey       = even['.key'];
        this.itemEdit = this.itemsObj[this.vkey];
        this.lb_editardialog = 'Editar '+this.name;
        this.st_insert  = false;
        this.st_editar  = true;
        this.$refs.codigo.focus();
      },
      salvar: function () {
        this.$validator.validateAll().then((errors) =>  {
          if (errors) {
            // insere ou edita
            if (this.st_insert) {
              firebase.getDb().ref('/orders/').push({
                pedido: "001",
                comprador: localStorage.getItem('user_database'),
                produto: this.assinatura.produto,
                quantidade: this.quantidade,
                preco: this.preco,
                medida: this.assinatura.medida,
                lote: this.assinatura.lote,
                entrega: this.assinatura.entrega,
                validade: this.assinatura.validade,
                recorrente: this.recorrente,
                fornecedor: this.assinatura.fornecedor,
                status: "Pendente"
              });
              this.$toastr('add', { title: 'Informação', msg: this.name+' adicionado com sucesso!', clickClose: true, timeout: 5000, position: 'toast-top-right', type: 'success' }) ;
            } else {
              itemRef.child(this.vkey).set(this.itemEdit);
              this.$toastr('add', { title: 'Informação', msg: this.name+' alterado com sucesso!', clickClose: true, timeout: 5000, position: 'toast-top-right', type: 'success' }) ;
            }
            this.st_editar = false;
            this.st_insert = false;
          }
        });
      }
    }
  }
</script>