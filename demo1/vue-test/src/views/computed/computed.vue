<template>
  <div>
    <input v-model="search" @focus="foucs" @blur="blur" @input="input" />
    {{isHot}}
    <ul v-if="isHot">
      <li>推荐</li>
      <li>推荐</li>
      <li>推荐</li>
      <li>推荐</li>
      <li>推荐</li>
      <li>推荐</li>
    </ul>

    <ul v-if="isSeach">
      <li>搜索</li>
      <li>搜索</li>
      <li>搜索</li>
      <li>搜索</li>
      <li>搜索</li>
      <li>搜索</li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        search: "",
        isfocus: false
      };
    },
    computed: {
      isHot: function () {
        let that = this;
        return this.isfocus && !this.search;
      },
      isSeach: function () {
        let that = this;
        return this.isfocus && this.search;
      }
    },
    methods: {
      foucs: function () {
        let that = this;
        that.isfocus = true;
      },
      blur: function () {
        let that = this;
        setTimeout(() => {
          that.isfocus = false;
        }, 200);
      },
      input: function () {
        console.log(event);
        console.log("INPUT");
      }
    }
  };

</script>
