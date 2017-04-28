<template lang="html">
    <table>
      <thead>
        <tr>
          <th @click="sortName = 'name'">姓名</th>
          <th @click="sortName = 'sex'" :class="{'active':sortName === 'sex'}">性别</th>
          <th @click="sortName = 'age'" :class="{'active':sortName === 'age'}">年龄</th>
          <th @click="sortName = 'tel'" :class="{'active':sortName === 'tel'}">电话号码</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(v,i) in list" :class="{'tr-active':showBg && v.age>=18}">
          <td>{{v.name}}</td>
          <td>{{v.sex}}</td>
          <td>{{v.age}}</td>
          <td>{{v.tel}}</td>
          <td @click="removeLi(v)">删除</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  data(){
    return{
      sortName:'name',
      showBg:false,
    }
  },
  props:{
    list:{
      type:Array,
      required:true
    }
  },
  // computed: {
  //     list() {
  //         let list
  //         if (this.sortName === 'name') {
  //             list = this.tableList
  //         } else {
  //             list = this.tableList.concat().sort((a, b) => {
  //                 return b[this.sortName] - a[this.sortName];
  //             })
  //         }
  //         return list;
  //     }
  // }
}
</script>

<style lang="scss">

</style>
