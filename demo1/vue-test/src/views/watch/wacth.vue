<template>
  <div>
    <input type="text" v-model="text1" />
    <input type="text" v-model="text2" />
    {{changeInput}}
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      text1: "input1",
      text2: "input2"
    };
  },
  computed: {
    changeInput() {
      const { text1, text2 } = this;
      return { text1, text2 };
    }
  },
  watch: {
    changeInput(val) {
      console.log("changeInput:", val);
    }
  }
});
</script>
