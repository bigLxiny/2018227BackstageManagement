<template>
  <div>
      {{msg}}
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    data(){
        return{
            msg:'这是vue脚手架测试'
        }
    }
}
</script>

<style scoped>

</style>

