<template>
  <div>{{msg}}</div>
</template>
<script>
export default {
  data() {
    return {
      msg: "登录"
    };
  },
  created() {
    let that = this;
    console.log(that.axios);
    that.submit();
  },
  methods: {
    submit() {
      let that = this;
      let pramas = {
        name: "",
        age: 12
      };
      that.axios.article
        .login(pramas)
        .then(result => {
          if (result.status === 200) {
            console.log(result.data);
          }
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  }
};
</script>