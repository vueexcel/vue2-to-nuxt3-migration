<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <ListArea />
  </div>
</template>

<script>
// @ is an alias to /src
import ListArea from '@/components/ListArea.vue'

export default {
  name: 'HomeView',
  components: {
    ListArea
  }
}
</script>
