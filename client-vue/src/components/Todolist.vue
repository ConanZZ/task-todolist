<template>
<div>
<el-input class='input' placeholder="添加todo项  (提示:回车添加任务)" v-model="input" clearable @keyup.enter.native='add($event)'></el-input>
<div class='tip'>
<span class='leftItem'>{{calActiveNum}} items left</span>
<div class='btn'>
<el-button :class="selectBtn==0?'selectStyle':''" type="primary" round size="small" width='10px' @click='switchList(0)'>All</el-button>
<el-button :class="selectBtn==1?'selectStyle':''" type="success" round size="small" width='10px' @click='switchList(1)'>Active</el-button>
<el-button :class="selectBtn==2?'selectStyle':''" type="danger"  round size="small" width='10px' @click='switchList(2)'>Completed</el-button>
</div>
</div>
<div class='listname'><span>Todo清单</span></div>
<ul class='list'>
<li class='item' v-for='(item,index) in items' :label="item" :key='index' @mouseenter='showIcon(index)' @mouseleave='hiddenIcon(index)'>
<el-checkbox class='chk' @change="change(item,index)" v-model='item.isChecked'></el-checkbox>
<div class="msg" :class='isActive(item.active)?"":"delLine"' v-show='!editStatus[index]' @dblclick='edit(index)'>{{item.msg}}</div>
<el-input class='editMsg' :ref='"input"+index' v-focus v-model='item.msg' v-if='editStatus[index]' autofocus  @blur='unEdit(item,index)'></el-input>
<span class="delete" @click="deleteItem(item,index)" title="删除"><i class="el-icon-delete icon" v-if='showlist[index]'></i></span>
</li>
</ul>
</div>
</template>

<script>
import {getAllLists, addItem, updateItem, deleteItem} from '../util.js'
export default {
  data () {
    return {
      input: '',
      items: [],
      showlist: [],
      editStatus: [],
      selectBtn: 0,
      allList: [],
      activeList: [],
      completedList: [],
      activeStatus: []
    }
  },
  created () {
    // then方法的参数函数需要用箭头函数形式，this指向vue实例
    this.getAllList().then(() => {
      console.log(this.items.length)
      for (var i = 0; i < this.items.length; i++) {
        this.showlist.push(false)
        this.editStatus.push(false)
      }
    })
  },
  computed: {
    calActiveNum () {
      var num = 0
      for (var i = 0; i < this.allList.length; i++) {
        var ele = this.allList[i]
        if (ele.active === 1) num++
      }
      return num
    }
  },
  methods: {
    getAllList: function () {
      // console.log(2323)
      return getAllLists().then(res => {
        console.log(res)
        if (res.data.code === 4) {
          this.allList = res.data.data
          this.allList.forEach(function (item, index) {
            if (item.isChecked === 0) item.isChecked = false
            else item.isChecked = true
          })
          this.items = this.allList
          console.log('查看this.items')
          console.log(this.items)
        } else {
          alert('查看失败')
        }
      })
    },
    add: function (e) {
      console.log('添加')
      var item = {
        msg: e.target.value,
        active: 1,
        isChecked: false
      }
      e.target.value = ''
      addItem(item).then(res => {
        console.log('进来了')
        if (res.code === 4) {
          this.getAllList()
          this.selectBtn = 0
        } else if (res.code === 0) {
          alert('任务已存在')
        } else {
          alert('添加失败')
        }
      })
    },
    isActive: function (params) {
      if (params === 1) {
        return true
      } else {
        return false
      }
    },
    change: function (item, index) {
      var flag = item.active
      if (flag === 0) {
        item.active = 1
        item.isChecked = false
        console.log(item.isChecked)
      } else {
        item.active = 0
        item.isChecked = true
        console.log(item.isChecked)
      }
      // 更改active
      updateItem({msg: item.msg, active: item.active, isChecked: item.isChecked, id: item.id}).then(res => {
        console.log(res)
        if (res.code === 4) {
          console.log('更新成功')
        } else {
          console.log('更新失败')
        }
      })
    },
    deleteItem: function (item, index) {
      console.log('删除' + index + item.msg)
      deleteItem({id: item.id}).then(data => {
        if (data.code === 4) {
          alert('删除成功')
          this.getAllList()
          this.selectBtn = 0
        } else {
          console.log('删除失败')
        }
      })
    },
    showIcon: function (index) {
      this.showlist.splice(index, 1, true)
    },
    hiddenIcon: function (index) {
      this.showlist.splice(index, 1, false)
    },
    edit: function (index) {
      console.log(index)
      this.editStatus.splice(index, 1, true)
    // this.$nextTick(() => {
    // console.log(this.$refs)
    // this.$refs['input'+index][0].$refs.input.focus();
    // });
    // alert(this.editStatus[index])
    },
    unEdit: function (item, index) {
      this.editStatus.splice(index, 1, false)
      // alert(this.editStatus[index])
      // 更新
      console.log('更新')
      updateItem({msg: item.msg, active: item.active, isChecked: item.isChecked, id: item.id}).then(res => {
        console.log(res)
        if (res.code === 4) {
          console.log('更新成功')
        } else {
          console.log('更新失败')
        }
      })
    },
    switchList: function (num) {
      this.activeList = this.allList.filter(function (el) { return el.active === 1 })
      this.completedList = this.allList.filter(function (el) { return el.active === 0 })
      this.selectBtn = num
      console.log(num)
      if (num === 0) {
        console.log(this.allList)
        this.items = this.allList
      } else if (num === 1) {
        console.log(this.activeList)
        this.items = this.activeList
      } else {
        console.log(this.completedList)
        this.items = this.completedList
      }
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.querySelector('input').focus()
      }
    }
  }
}
</script>

<style>
 @import '../assets/css/element.css'
</style>
