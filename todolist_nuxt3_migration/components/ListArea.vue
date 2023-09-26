<template>
  <div>
     <v-form @submit.prevent="processForm(data)" ref="form" class="my-5">
      <v-text-field v-model="data.data" :counter="10" label="input" required></v-text-field>
      <v-btn type="submit" elevation="2" class="text_align">Submit</v-btn>
    </v-form>
    <v-table>
      <!-- <template> -->
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
          <!-- {{   storeData  }} -->
          <tr v-for="(item, index) in storedata" :key="index">
            <td :style="item.estado ? 'text-decoration:line-through;' : 'text-decoration:none;'" class="text_align">{{ item.data }}</td>
            <td class="text_align"><v-chip close-icon="mdi-close-outline" dark :color="item.estado ? 'green' : '' ">{{ item.estado ? 'completed' : 'To-Do' }}</v-chip></td>
            <td class="text_align"><v-btn id="mark" depressed color="primary" @click="processMark(item)">Mark</v-btn></td>
            <td class="text_align"><v-btn id="edit" depressed color="primary" @click="processEdit(item,index)">Edit</v-btn></td>
            <td class="text_align"><v-btn id="delete" depressed color="error" @click="eliminarData(index)">Delete</v-btn></td>
          </tr>
        </tbody>
      <!-- </template> -->
    </v-table>
    </div>
  </template>

<script>
import { ref } from 'vue';
import {eliminardata,setdata,storeData} from '~/store/index'

export default {
  setup() {
    // Define reactive properties using ref
    const valid = ref(true);
    const data = ref({
      id: '',
      data: '',
      estado: false,
      flag :false,
      index: 0,
    });
    
    const position = ref(null);
    const storedata = storeData

    // Define the processForm function
    const processForm = (item) => {
      if (item.data.trim() !== '') {
        if (item.index !== null || item.index == 0) {
          setdata(item);
        } else {
          item.index = storeData.value.length + 1;
          setdata(item);
        }
        data.value = {
          id: '',
          data: '',
          estado: false,
          flag :false,
          index: 0,
        };
      }
    };

    const processEdit = (item, index) => {
      position.value = null;
      data.value.data = item.data;
      if(index == 0){
        data.value = {
          data: item.data,
          estado:item.estado,
          index: index,
          flag :true
        };
      }
      else{
        data.value = {
          data: item.data,
          estado:item.estado,
          index: index,
          flag :false
        };

      }
        console.log(data.value)
    };
    const eliminarData =(index) =>{
      return eliminardata(index)
    }
    const processMark = (data) => {
      data.estado = !data.estado;
    };

    // Define the processEdit function
    
    // Return the computed properties and methods to the template
    return {
      valid,
      data,
      position,
      storedata,
      processForm,
      processMark,
      processEdit,
      eliminarData
    };
  },
};
</script>
<style scoped>
.text_align{
  text-align: center;
}
</style>
