<template>
  <div class="menu" @mouseleave="mouseleave">
    <ul>
      <li @mouseenter="enter('')">全部分类</li>
      <li v-for="(item) in menu" :key="item.type" @mouseenter="enter(item.type)">{{item.name}}</li>
    </ul>
    <div class="menu_child" v-if="king">
      <template v-for="(item,index) in menuChild.child">
        <dl :key="index">
          <dt>{{item.title}}</dt>
          <dd @mouseenter="childOver" @mouseleave="childOut">
            <span v-for="(it,index) in item.child" :key="it+index">{{it}}</span>
          </dd>
        </dl>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      king: "",
      timer: null,
      menu: [
        {
          type: "food",
          name: "美食",
          child: [
            {
              title: "美食",
              child: ["代金券", "甜点饮品", "火锅", "自助餐", "小吃快餐"]
            }
          ]
        },
        {
          type: "takeout",
          name: "外卖",
          child: [
            {
              title: "外卖",
              child: ["美团外卖"]
            }
          ]
        },
        {
          type: "hotel",
          name: "酒店",
          child: [
            {
              title: "酒店星级",
              child: ["经济型", "舒适/三星", "高档/四星", "豪华/五星"]
            }
          ]
        }
      ]
    };
  },
  computed: {
    menuChild: function() {
      let that = this;
      return that.menu.filter(item => item.type === that.king)[0];
    }
  },
  methods: {
    mouseleave: function() {
      let that = this;
      that.timer = setTimeout(() => {
        that.king = "";
      }, 100);
    },
    enter: function(type) {
      // 鼠标移入
      let that = this;
      that.king = type;
      console.log(type);
    },
    childOver: function() {
      let that = this;
      console.log("==============");
      clearTimeout(that.timer);
    },
    childOut: function() {
      let that = this;
      that.king = "";
    }
  }
};
</script>
<style lang="less" scoped>
.menu {
  position: relative;
  width: 200px;
  height: 200px;
  clear: both;
  background-color: aqua;
  li {
    float: none;
    width: 200px;
  }
}
.menu_child {
  position: absolute;
  top: 0;
  left: 200px;
  padding: 20px;
  background-color: cornflowerblue;
}
</style>
