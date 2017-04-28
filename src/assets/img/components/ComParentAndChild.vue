<template lang="html">
  <div>
    <child-header-comm :commonHeaderTitle="commTxt" @actionDo="childEventHandler"></child-header-comm>
    <p>父子组件通信</p>
    <componentsTableList :list="childList"></componentsTableList>
  </div>
</template>

<script>
import childHeaderComm from '../components/ComponentsChild'
import componentsTableList from '../components/ComponentsTableList'
export default {
  data(){
    return{
      commTxt:'不是首页是什么',
      childList:[{
              name: '韩小寒',
              sex: 'male',
              age: 10,
              tel: '18720328233'
          },
          {
              name: '黎明',
              sex: 'male',
              age: 19,
              tel: '18720328233'
          },
          {
              name: '王小猫',
              sex: 'female',
              age: 22,
              tel: '18720328233'
          },
          {
              name: '苗小溪',
              sex: 'female',
              age: 16,
              tel: '18720328233'
          },
          {
              name: '王永海',
              sex: 'male',
              age: 18,
              tel: '13677872783'
          }
      ]
    }
  },
  methods:{
    childEventHandler(){
      console.info('子组件事件父组件监听');
    }
  },
  components:{
    childHeaderComm,
    componentsTableList
  }
}
</script>

<style lang="scss">

</style>
