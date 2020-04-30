<template>
  <div class="drawer-container">
    <div>
     主题设置待定

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagsView:'',
      fixedHeader:'',
      sidebarLogo:''
    }
  },
  computed: {

  },
  methods: {
    themeChange(){

    },
  }
}
</script>

<style  scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}
  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }

</style>
