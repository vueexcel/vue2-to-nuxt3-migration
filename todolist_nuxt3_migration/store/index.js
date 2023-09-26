import { computed, ref } from 'vue';

const storeData = ref([])

const setdata = (data) => {
  if(data.flag == true)
  {
    data.flag = false
    {
      storeData.value.splice(data.index,1,data)
    }
  }
  else{
  if(data.index)
      {
          storeData.value.splice(data.index,1,data)
      }
      else{
        storeData.value.push(data);
      }
    }
     
}
// const markdata = (data) => {
//       storeData = storeData.value.map(element => element.id === data.id ? data : element)
// }
const eliminardata = (data) => {
      storeData.value = storeData.value.filter((item,index) => 
      index !== data
      )
}



export {
  eliminardata,
  setdata,
  storeData
  
}