<template>
  <div id="app">
    <!-- 当router中捕获到对应的组件之后，就会在router-view标签中进行渲染 -->
    <router-view></router-view>
  </div>
</template>

<script>
// export default和export都能导出一个模块里面的常量，函数，文件，模块等，
//  在其它文件或模块中通过import来导入常量，函数，文件或模块。这样就可以使用它们了。
// 但是，在一个文件或模块中，export,import可以有多个，export default却只能有一个。
export default {
  name: 'app'
}
</script>


<style lang="scss">

</style>
