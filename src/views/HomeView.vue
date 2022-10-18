<template>
  <div class="home">
    <div>
      <h3>权限按钮</h3>
      <div>
        <a-button type="primary" v-if="hasBtn('home:add')">添加</a-button>
        <a-button type="primary" v-if="hasBtn('home:delete')">删除</a-button>
        <a-button type="primary" v-if="hasBtn('home:edit')">修改</a-button>
      </div>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'HomeView',

}
</script>
