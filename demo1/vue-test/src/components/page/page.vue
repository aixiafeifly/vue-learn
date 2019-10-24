<template>
  <div>
    <div class="pageContainer">
      <ul class="pagesInner">
        <li class="page" @click="prevOrNext(-1)">
          <span class="fa fa-chevron-left" aria-hidden="true">&lt;</span>
        </li>
        <li
          v-for="(item, index) in pages"
          :key="index"
          :class="{actived: item === currentPage}"
          @click="select(item)"
        >{{item}}</li>
        <li class="page" @click="prevOrNext(+1)">
          <span class="fa fa-chevron-left" aria-hidden="true">&gt;</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      totalPages: 50
    };
  },
  computed: {
    pages() {
      const c = this.currentPage;
      const t = this.totalPages;
      if (c <= 5) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, "...", t]; //第一种情况
      } else if (c >= t - 4) {
        return [
          1,
          "...",
          t - 8,
          t - 7,
          t - 6,
          t - 5,
          t - 4,
          t - 3,
          t - 2,
          t - 1,
          t
        ]; //第二种情况
      } else {
        return [
          1,
          "...",
          c - 3,
          c - 2,
          c - 1,
          c,
          c + 1,
          c + 2,
          c + 3,
          "...",
          t
        ]; //第三种情况
      }
    }
  },
  methods: {
    select(n) {
      if (n === this.currentPage) return;
      if (typeof n === "string") return;
      this.currentPage = n;
    },
    prevOrNext(n) {
      this.currentPage += n;
      if (this.currentPage < 1) {
        this.currentPage = 1;
      } else if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      console.log(n);
    }
  }
};
</script>
<style lang="stylus">
.actived {
  border-color: #2d8cf0;
  background-color: #2d8cf0;
  color: #fff;
}

li {
  float: left;
  width: 40px;
  height: 40px;
}

li span {
  display: block;
}
</style>
