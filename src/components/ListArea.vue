<template>
    <div>
       <v-form @submit.prevent="processForm(data)" ref="form" class="my-5">
        <v-text-field v-model="data.data" :counter="10" label="input" required></v-text-field>
        <v-btn type="submit" elevation="2">Submit</v-btn>
      </v-form>
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th class="text-center">Name</th>
              <th class="text-center">To-Do List</th>
              <th class="text-center">Mark</th>
              <th class="text-center">Edit</th>
              <th class="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in storeData" :key="index">
              <td :style="item.estado ? 'text-decoration:line-through;' : 'text-decoration:none;'">{{ item.data }}</td>
              <td><v-chip close-icon="mdi-close-outline" dark :color="item.estado ? 'green' : '' ">{{ item.estado ? 'completed' : 'To-Do' }}</v-chip></td>
              <td><v-btn id="mark" depressed color="primary" @click="processMark(item)">Mark</v-btn></td>
              <td><v-btn id="edit" depressed color="primary" @click="processEdit(item,index)">Edit</v-btn></td>
              <td><v-btn id="delete" depressed color="error" @click="eliminardata(item.id)">Delete</v-btn></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      </div>
    </template>
    <script>
    import { mapActions, mapState } from 'vuex'
    export default {
      data: () => ({
          valid: true,
          data: {
            id: '',
            data: '',
            estado: false, 
            index:null   
          },
          Position:null
        }),
        computed:{
            ...mapState(['storeData']),
            
        },
        methods:{
          ...mapActions(['markdata', 'eliminardata','setdata']),
         processForm: function(data){
          if(this.data.data.trim() !== ''){
            if(this.data.index !== null ){
               this.setdata(this.data)
            }   
            else{
              this.data.id = this.storeData.length + 1
              this.setdata(data)
            }
                
             this.data = {
                id: '',
                data: '',
                estado: false,
                index:null
             }
                }
         },
    
          processMark: function(data){
            data.estado = !data.estado
            this.markdata(data)
          },
         
          processEdit: function(data,index){
            this.Position=null
            this.data.data  = data.data;
            this.data.estado  = data.estado;
            this.data.id  = data.id;
            this.data.index  =index
          },
    
        }
    }
    </script>
    <style  scoped>
    #mark{
        background: rgb(21, 161, 21);
    }
    #edit{
        background: hwb(0 22% 77%);
    }
    #delete{
        background: red;
    }
    
    </style>