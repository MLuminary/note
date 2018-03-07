<!--  -->
<template>
  <div>
    <h1>Hello Vue</h1>
    <p>{{u_name}}</p>
    <ul>
      <li v-for="item in list">{{item}}</li>
    </ul>
    <button v-on:click="loadMore" v-if="hasMore">加载更多</button>
    <p v-if="!hasMore">没有更多数据可以加载了</p>
    <input type="text" v-model="msg">
    <span>{{msg}}</span>
  </div>
</template>

<script>
  export default{
    name : 'demo01',
    data(){
      return {
        //当前组件中的数据都在这里初始化
        u_name : 'hutchins',
        list : [100,200,300,400],
        hasMore : true,
        msg : ''
      }
    },
    methods: {
      loadMore(){
        alert('btn is clicked')
      }
    }
  }


</script>
<style>


</style>
