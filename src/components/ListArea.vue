<template>
    <div>
       <v-form @submit.prevent="processForm(tarea)" ref="form" class="my-5">
        <v-text-field v-model="tarea.tarea" :counter="10" label="input" required></v-text-field>
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
            <tr v-for="(item, index) in tareas" :key="index">
              <td :style="item.estado ? 'text-decoration:line-through;' : 'text-decoration:none;'">{{ item.tarea }}</td>
              <td><v-chip close-icon="mdi-close-outline" dark :color="item.estado ? 'green' : '' ">{{ item.estado ? 'completed' : 'To-Do' }}</v-chip></td>
              <td><v-btn id="mark" depressed color="primary" @click="processMark(item)">Mark</v-btn></td>
              <td><v-btn id="edit" depressed color="primary" @click="processEdit(item,index)">Edit</v-btn></td>
              <td><v-btn id="delete" depressed color="error" @click="eliminarTarea(item.id)">Delete</v-btn></td>
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
          tarea: {
            id: '',
            tarea: '',
            estado: false, 
            index:null   
          },
          Position:null
        }),
        computed:{
            ...mapState(['tareas']),
            
        },
        methods:{
          ...mapActions(['markTarea', 'eliminarTarea','enviarFormulario']),
         processForm: function(tarea){
          if(this.tarea.tarea.trim() !== ''){
            if(this.tarea.index !== null ){
               this.enviarFormulario(this.tarea)
            }   
            else{
              this.tarea.id = this.tareas.length + 1
              this.enviarFormulario(tarea)
            }
                
             this.tarea = {
                id: '',
                tarea: '',
                estado: false,
                index:null
             }
                }
         },
    
          processMark: function(tarea){
            tarea.estado = !tarea.estado
            this.markTarea(tarea)
          },
         
          processEdit: function(tarea,index){
            this.Position=null
            this.tarea.tarea  = tarea.tarea;
            this.tarea.estado  = tarea.estado;
            this.tarea.id  = tarea.id;
            this.tarea.index  = index
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