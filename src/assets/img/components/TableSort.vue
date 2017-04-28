<template lang="html">
  <div class="container">
    <p>这是一个关于table筛选的vue实例</p><router-link :to="{name:'Home'}">首页</router-link>
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
    <button class="sort-label" @click="showBg = !showBg">大于18岁的成年人</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            sortName: 'name',
            showBg: false,
            tableList: [{
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
    methods: {
        removeLi(v) {
            let idex = this.tableList.indexOf(v);
            return this.tableList.splice(idex, 1);
        }
    },
    computed: {
        list() {
            let list
            if (this.sortName === 'name') {
                list = this.tableList
            } else {
                list = this.tableList.concat().sort((a, b) => {
                    return b[this.sortName] - a[this.sortName];
                })
            }
            return list;
        }
    }
}
</script>

<style lang="scss">
.container {
    padding: 20px;
}
table {
    margin: 10px auto;
    font-size: 12px;
    border: 1px solid #999;
    td,
    th,
    tr {
        border: 1px solid #999;
        text-align: center;
        padding: 2px 6px;
    }
}
.active {
    color: red;
}
.tr-active {
    background: blue;
    color: #fff;
}
.sort-label {
    color: blue;
    cursor: pointer;
    margin-left: 5px;
    font-size: 10px;
}
</style>
