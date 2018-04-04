<template>
  <div class="helloo">
    <h1>{{ msg }}</h1>
    <p>{{count}}{{tips}}</p>
    <input type="text" class="txt" v-model="newlist" v-on:keyup.enter="addNew" autofocus>
    <input type="button" class="add" value=" add " @click="addNew">
    <ul class="menu">
      <li v-for = "(item,index) in list" :class="{Finish:item.isFinish}" @click.self="setStatus(index)">
          {{item.info}}
        <a @click="removeNode(index)" :title="item.isFinish?'完成':'未完成'">X</a>
      </li>
    </ul>
  </div>
</template>

<script>
import storage from './storage'
export default {
  // name: 'helloo',
  data () {
    return {
      msg: 'to do list',
      tips: "任务未完成",
      list:storage.fetch('todo')?storage.fetch('todo'):[],
      newlist:"",
      Finish:"Finish",
      count: 0
    }
  },
  created() {
    var num = 0
    if (storage.fetch('todo')) {
      storage.fetch('todo').forEach(function(element) {
        if (!element.isFinish) {
          num ++
        }
      });
    }
    this.count = num;
  },
  watch:{
      list: {
        handler:function(list){
          storage.save('todo',list)
          this.count = 0
          for (var i = list.length - 1; i >= 0; i--) {
            if (!list[i].isFinish) {
              this.count ++
            }
          }
        },
        deep:true
      }
  },
  methods: {
    addNew () {
      this.newlist = this.newlist.replace(/\s/g,'')
      if (this.newlist=='') {return false}
      this.list.push({"info":this.newlist,"isFinish":false})
      this.newlist = ''
    },
    setStatus (index){
      this.list[index].isFinish = !this.list[index].isFinish;
    },
    removeNode (index){
      this.list.splice(index, 1)
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
  /*font-size: 4em;*/
}
p{
  /*font-size: 3em;*/
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  position: relative;
  /*font-size: 3em;*/
  margin: 0 15%;
}
li a{
  display: block;
  width: 30px;
  text-decoration: none;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  transition: transform .3s linear;
    &:hover{
    opacity: .8;
    transform: rotate(90deg);
    transition: all .3s linear;
  }
}

input{
  outline: none;
  border: 0;
  padding: 5px 10px;
  /*font-size: 2em;*/
}
.Finish{
  text-decoration: line-through;
}
.helloo{
  color: #fff;
  p{
    margin: 10px 0;
  }
}
.add{
  cursor: pointer;
}
</style>
