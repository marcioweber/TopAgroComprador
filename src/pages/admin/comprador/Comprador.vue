<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs10 sm10 md12 offset-md0>
        <v-dialog v-model="st_editar" max-width="600">
          <v-card>
            <v-flex xs12 sm12 md12 offset-md0>
              <v-toolbar color="blue darken-3" dark>
                <v-toolbar-title>{{lb_editardialog}}</v-toolbar-title>
              </v-toolbar>
              <v-container grid-list-xl text-xs-center>
                <v-layout fill-height>
                  <v-layout row wrap>
                    <v-flex xs12 align-end flexbox>
                      <v-spacer></v-spacer>
                        <v-layout row>
                          <v-flex xs12 sm12 md9>
                            <v-text-field label="Nome" v-model="itemEdit.firstName" :counter="60" :error-messages="errors.collect('firstName')"
                                          v-validate="'required|max:60'" data-vv-name="firstName" ref="firstName" required v-focus></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm12 md9>
                            <v-radio-group v-model="itemEdit.tipopessoa" col>
                              <v-radio label="Física"   value="F" @change="trocaMascara('F')" ></v-radio>
                              <v-radio label="Jurídica" value="J" @change="trocaMascara('J')"></v-radio>
                            </v-radio-group>
                          </v-flex>
                        </v-layout>
                        <v-layout col>
                          <v-flex xs5 sm5 md4>
                            <v-text-field v-bind:label="lb_CPFCNPJ"  v-model="itemEdit.cpf" :error-messages="errors.collect('cpf')" v-mask=mask_cpfcnpj masked="masked"
                                          v-validate="'required|max:20'" data-vv-name="cpf" required></v-text-field>
                          </v-flex>
                          <v-flex xs5 sm5 md4>
                            <v-text-field label="Celular" v-model="itemEdit.phone" :error-messages="errors.collect('phonr')"
                                          v-validate="'max:15'" data-vv-name="phone" mask="(##) #####-####" v-if="isLoggin"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout col> 
                          <v-flex xs5 sm5 md3>
                            <v-text-field label="CEP" v-model="itemEdit.cep" :error-messages="errors.collect('cep')" data-vv-name="cep"></v-text-field>
                          </v-flex>
                          <v-flex xs5 sm5 md7>
                            <v-text-field label="Endereço" v-model="itemEdit.address" :counter="60" :error-messages="errors.collect('address')"
                                          v-validate="'max:60'" data-vv-name="address"></v-text-field>
                          </v-flex>
                          <v-flex xs5 sm5 md2>
                            <v-text-field label="Número" v-model="itemEdit.number" :error-messages="errors.collect('number')"
                                          v-validate="'max:10'" data-vv-name="number"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout col>
                          <v-flex xs5 sm5 md3>
                            <v-text-field label="Bairro" v-model="itemEdit.bairro" :error-messages="errors.collect('bairro')"
                                          v-validate="'max:20'" data-vv-name="bairro"></v-text-field>
                          </v-flex>
                          <v-flex xs5 sm5 md2>
                            <v-select label="Estado" v-model="itemEdit.uf" :items="items_uf" :search-input.sync="search_uf"></v-select>
                          </v-flex>
                          <v-flex xs5 sm5 md8>
                            <v-text-field label="Cidade" v-model="itemEdit.city" :counter="60" :error-messages="errors.collect('city')"
                                          v-validate="'required|max:60'" data-vv-name="city" required></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout col>
                          <v-flex xs5 sm5 md4>
                            <v-menu ref="menu" lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width
                                              :nudge-right="40" min-width="290px" :return-value.sync="itemEdit.date">
                            <v-text-field slot="activator" label="Data de Nascimento" v-model="computedDateFormatted" append-icon="event" readonly ></v-text-field>
                            <v-date-picker v-model="itemEdit.date" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn color="info" @click="$refs.menu.save(itemEdit.date)">OK</v-btn>
                              <v-btn color="error" @click="menu = false">Cancelar</v-btn>
                            </v-date-picker>
                            </v-menu> 
                          </v-flex>
                          <v-flex xs5 sm5 md8>
                            <v-text-field label="Email" v-model="itemEdit.email" :counter="200" :error-messages="errors.collect('email')"
                                          v-validate="'max:200'" data-vv-name="email"></v-text-field>
                          </v-flex>
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
              <v-card-text>Confirma exclusão do {{name}} ({{this.itemApagar.firstName}}) ?</v-card-text>
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
              <td class="text-xs-left">{{ props.item.firstName }}</td>
              <td class="text-xs-left">{{ props.item.phone }}</td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td class="text-xs-left">{{ props.item.city+"-"+props.item.uf}}</td>
              <!--<td class="text-xs-center">{{ props.item.nascimento | moment("DD/MM/YY") }}</td>-->
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
                Nenhum cadastro encontrado!
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
let itemRef = firebase.getDb().ref('/users').orderByChild('role').equalTo('User');

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
        name: 'Comprador',
        title: 'Cadastro do Comprador',
        search: '',
        message: '',
        menu: false,
        directives: {mask},
        error: '',
        st_alert: false,
        st_editar: false,
        st_insert: false,
        st_exclusao: false,
        lb_editardialog: '',
        mask_cpfcnpj: '###.###.###-##',
        lb_cpfcnpj: "CPF",
        search_uf: '',
        items_uf: ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB',
                   'PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'],
        vkey: '',
        masked: true,
        itemRef: '',
        itemApagar: '',
        itemEdit: {
          firstName: "",
          tipopessoa: "F",
          cpf: "",
          phone: '',
          date: null,
          address: "",
          number: "",
          email: '',
          cep: '',
          city: '',
          uf: 'PR',
          bairro: ""
        },
        headers: [
          { text: 'Nome',     align: 'left',    sortable: true, value: 'firstName' },
          { text: 'Celular',  align: 'left',    value: 'phone' },
          { text: 'email',    align: 'left',    value: 'email' },
          { text: 'Cidade',   align: 'left',    value: 'city' },
          //{ text: 'Data',     align: 'center',  value: 'data' },
          { text: '',  align: 'center' }
        ]
      }
    },
    created() {
        if (this.$route.params.id != null) {
          this.search = this.$route.params.id;
        }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.itemEdit.date)
      },
      lb_CPFCNPJ () {
        return this.lb_cpfcnpj;
      },
      isLoggin () {
        return this.$store.getters.user?true:false;
      }
    },
    methods: {
      mounted(){
        this.$refs.firstName.focus();
      },
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      trocaMascara: function (item) {
        if (item == 'F') {
          this.mask_cpfcnpj = '###.###.###-##';
          this.lb_cpfcnpj = 'CPF';
        }
        else {
          this.mask_cpfcnpj = '##.###.###/####-##';
          this.lb_cpfcnpj = 'CNPJ';
        }
      },
      deletar: function (item) {
        this.itemApagar = item;
        this.st_exclusao = true;
      },
      deletarConfirm: function (item) {
        this.st_exclusao = false;
        firebase.getDb().ref('/users/'+item['.key']).remove();
        this.message = this.name+' ('+this.itemApagar.firstName+') removido com sucesso!';
        this.$toastr('add', { title: 'Informação', msg: this.message, clickClose: true, timeout: 5000, position: 'toast-top-right', type: 'success' }) ;
        ///this.st_alert = true;
      },
      editar: function (even) {
        this.vkey       = even['.key'];
        this.itemEdit = this.itemsObj[this.vkey];
        this.lb_editardialog = 'Editar '+this.name;
        this.st_insert  = false;
        this.st_editar  = true;
        this.$refs.firstName.focus();
      },
      inserir: function () {
        this.vkey       = '';
        this.itemEdit = {};
        this.itemEdit = {
          firstName: "",
          tipopessoa: "F",
          cpf: "",
          email: "",
          address: "",
          city: "",
          date: null,
          uf: "PR",
          bairro: "",
          number: "",
          slug: this.generateUUID()
        },
        this.lb_editardialog = 'Novo '+this.name;
        this.st_insert = true;
        this.st_editar = true;
        this.$validator.reset();
        this.$refs.firstName.focus();
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
      salvar: function () {
        this.$validator.validateAll().then((errors) =>  {
          if (errors) {
            // ajusta a mascara do telefone
            console.log('itemRef: '+itemRef);
            if (this.itemEdit.phone.length > 0)
              this.itemEdit.phone = '('+this.itemEdit.phone.substr(0,2)+') '+this.itemEdit.phone.substr(2,5)+'-'+this.itemEdit.phone.substr(7,4);
            // insere ou edita
            if (this.st_insert) {
              itemRef.push(this.itemEdit);
              this.$toastr('add', { title: 'Informação', msg: this.name+' adicionado com sucesso!', clickClose: true, timeout: 5000, position: 'toast-top-right', type: 'success' }) ;
            } else {
              //itemRef.child(this.vkey).set(this.itemEdit);
              firebase.getDb().ref('/users/'+this.vkey).update({
                firstName: this.itemEdit.firstName,
                email: this.itemEdit.email,
                cpf: this.itemEdit.cpf,
                phone: this.itemEdit.phone,
                cep: this.itemEdit.cep,
                address: this.itemEdit.address,
                date: this.itemEdit.date,
                city: this.itemEdit.city,
                uf: this.itemEdit.uf,
                bairro: this.itemEdit.bairro,
                number: this.itemEdit.number
              });
              this.$toastr('add', { title: 'Informação', msg: this.name+' alterado com sucesso!', clickClose: true, timeout: 5000, position: 'toast-top-right', type: 'success' }) ;
            }
            this.st_editar = false;
            this.st_insert = false;
          }
        });
      },
      methodToRunOnSelect(payload) {
        this.itemEdit.uf = payload;
      },
      mascaraMutuario(o,f) {
        v_obj=o
        v_fun=f
        setTimeout('execmascara()',1)
      },
      execmascara() {
        v_obj.value=v_fun(v_obj.value)
      },
      mask_cpfCnpj(v) {
        v=v.replace(/D/g,"")
        if (v.length <= 14) { //CPF
          v=v.replace(/(\d{3})(\d)/,"$1.$2")
          v=v.replace(/(\d{3})(\d)/,"$1.$2")
          v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
        } else { //CNPJ
          v=v.replace(/^(\d{2})(\d)/,"$1.$2")
          v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
          v=v.replace(/\.(\d{3})(\d)/,".$1/$2")
          v=v.replace(/(\d{4})(\d)/,"$1-$2")
        }
        return v
      } 
    }
  }
</script>