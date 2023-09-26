<template>
  <div>
     <v-form @submit.prevent="processForm(data)" ref="form" class="my-5">
      <v-text-field v-model="data.data" :counter="10" label="input" required></v-text-field>
      <v-btn type="submit" elevation="2">Submit</v-btn>
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
          <tr v-for="(item, index) in storeData" :key="index">
            <td :style="item.estado ? 'text-decoration:line-through;' : 'text-decoration:none;'" class="text_align">{{ item.data }}</td>
            <td class="text_align"><v-chip close-icon="mdi-close-outline" dark :color="item.estado ? 'green' : '' ">{{ item.estado ? 'completed' : 'To-Do' }}</v-chip></td>
            <td class="text_align"><v-btn id="mark" depressed color="primary" @click="processMark(item)">Mark</v-btn></td>
            <td class="text_align"><v-btn id="edit" depressed color="primary" @click="processEdit(item,index)">Edit</v-btn></td>
            <td class="text_align"><v-btn id="delete" depressed color="error" @click="eliminardata(index)">Delete</v-btn></td>
          </tr>
        </tbody>
      <!-- </template> -->
    </v-table>
    </div>
  </template>

<script>
import { computed, ref } from 'vue';
import { mapState, mapActions } from 'vuex';

export default {
  setup() {
    // Define reactive properties using ref
    const valid = ref(true);
    const data = ref({
      id: '',
      data: '',
      estado: false,
      index: 0,
    });
    const storeData = ref([])
    const position = ref(null);

    // Get storeData from Vuex using computed
    // const storeData = computed(() => {
    //   return storeData
    // });

    // Get Vuex actions using mapActions
    // const { markdata, eliminardata, setdata } = mapActions(['markdata', 'eliminardata', 'setdata']);
    const setdata = (data) => {
      if(data.index)
          {
              storeData.value.splice(data.index,1,data)
              console.log(storeData.value)
          }
          else{
            storeData.value.push(data);
          }
         
          // localStorage.setItem('storeData', JSON.stringify(storeData))
        //   data.value = {
        //   id: '',
        //   data: '',
        //   estado: false,
        //   index: 0,
        // };
    }
    const markdata = (data) => {
          storeData = storeData.value.map(element => element.id === data.id ? data : element)
    }
    const eliminardata = (data) => {
          storeData.value = storeData.value.filter((item,index) => 
          index !== data
          )
    }
    const cargarLocalStorage = (data) => {
            storeData = data
            if (localStorage.getItem('storeData')) {
              storeData = JSON.parse(localStorage.getItem('storeData'))
              return
          }
          localStorage.setItem('storeData', JSON.stringify([]))
      }
    

    // Define the processForm function
    const processForm = (item) => {
      if (item.data.trim() !== '') {
        if (item.index !== null) {
          setdata(item);
        } else {
          item.index = storeData.value.length + 1;
          setdata(item);
        }
        data.value = {
          id: '',
          data: '',
          estado: false,
          index: 0,
        };
      }
    };
    

    // Define the processMark function
    
    const processMark = (data) => {
      data.estado = !data.estado;
      markdata(data);
    };

    // Define the processEdit function
    const processEdit = (item, index) => {
      console.log(index)
      position.value = null;
      data.value.data = item.data;
      data.value = {
          data: item.data,
          estado:item.estado,
          index: index,
        };
        console.log(data.value)
    };
    // Return the computed properties and methods to the template
    return {
      valid,
      data,
      position,
      storeData,
      processForm,
      processMark,
      processEdit,
      eliminardata
    };
  },
};
</script>
<style scoped>
.text_align{
  text-align: center;
}
</style>
