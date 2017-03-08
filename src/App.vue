<template>
  <div id="app">
    <scroller :on-refresh="refresh"
              :on-infinite="infinite"
              ref="my_scroller">
      <div v-for="(item, index) in items" class="row">
        <h1 class="itme-title" v-text="item.title.__cdata"></h1>
        <div class="itembox clearfix">
          <span class="author" v-text="item.author"></span>
          <span class="category" v-text="item.category"></span>
          <span class="timebox" v-text="newmoment(item.pubDate.__cdata)"></span>
        </div>
        <a class="item-content" :href="item.link">
          <div class="leftbox" v-html="handlerData(item.description.__cdata)"></div>
          <div class="rightbox">
            <div class="imgbox"><img class="img" :src="skewImg.url?skewImg.url:'/src/assets/404.jpg'"></div>
          </div>
        </a>
      </div>
    </scroller>
  </div>
</template>
<style>
  html, body {
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  .clearfix:before,.clearfix:after,{content:"";display:table;}
  .clearfix:after{clear:both;}
  .row {
    width: 100%;
    padding: 1rem .8rem;
    color: #444;
    background-color: #fff;
    border-bottom: 1px solid #c7c7c7;
  }
  .itme-title{
    font-size: 1.4rem;
    font-weight: bold;
  }
  .leftbox-title{
    font-size: .71rem;
  }
  .itembox{
    display: flex;
    position: relative;
  }
  .author{
    display: block;
    background-color: #5391c4;
    padding: .1rem .2rem;
    color: #fff;
    border-radius: .3rem;
    width: 5rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  .category{
    display: block;
    padding: .1rem .2rem;
    background-color: #f1f1f1;
    color: #e48984;
    border-radius: .3rem;
    width: 5rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-left: 2rem;
    text-align: center;
  }
  .timebox{
    display: block;
    background-color: #999;
    padding: .1rem .2rem;
    border-radius: .3rem;
    color: #fff;
    width: 8rem;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
  }
  .item-content{
    display: flex;
    height: 12rem;
    text-decoration: none;
    color: #444;
  }
  .leftbox{
    width: 60%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    overflow: hidden;
    padding: 1rem 0;
    line-height: 1.8rem;
    color: #bfbfbf;
  }
  .rightbox{
    width: 40%;
  }
  .item-content p{
    line-height: 1.8rem;
    margin-top: .9rem;
    margin-bottom: 0;
    color: #bfbfbf;
  }
  .imgbox{
    width: 80%;
    height: 0;
    padding: 40% 0;
    position: relative;
    float: right;
    margin-top: .9rem;
  }
  .imgbox .img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ccc;
    overflow: hidden;
  }
</style>
<script>
  import Scroller from 'vue-scroller'
  import axios from 'axios'
  import moment from 'moment'

  export default {
    components: {
      Scroller
    },
    data() {
      return {
        items: [],
        allData: [],
        dataLen: 0,
        step: 10,
        times: 1,
        skewImg: []
      }
    },
    created() {
        var dataObj = {};
        var self = this;
        axios.get('/feed')
        .then(function (response) {
          var x2js = new X2JS();
          var dataObj = response.data;
          var jsonObj = x2js.xml_str2json( dataObj );
          var itemData = jsonObj.rss.channel.item;
          for (var i = itemData.length; i >= 0; i--) {
            self.allData.push(itemData[i])
          }
          var end = ((self.step)+1)*self.times;
          var sta  = end - self.step;
          self.dataLen = self.allData.length;
          self.items = self.allData.slice(sta,end);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      refresh() {
        setTimeout(() => {
        var dataObj = {};
        var self = this;
        axios.get('/feed')
        .then(function (response) {
          var x2js = new X2JS();
          var dataObj = response.data;
          var jsonObj = x2js.xml_str2json( dataObj );
          var itemData = jsonObj.rss.channel.item;
          for (var i = itemData.length; i >= 0; i--) {
            self.allData.push(itemData[i])
          }
          var end = ((self.step)+1)*self.times;
          var sta  = end - self.step;
          self.items = self.allData.slice(sta,end);
        })
        .catch(function (error) {
          console.log(error);
        });
          if (this.$refs.my_scroller)
            this.$refs.my_scroller.finishPullToRefresh();
        }, 1500)
      },
      infinite() {
        var self = this;
        if (this.bottom >= 30) {
          setTimeout(() => {
            this.$refs.my_scroller.finishInfinite(true)
          }, 1500)
          return;
        }
        setTimeout(() => {
          // let start = this.bottom + 1;
          // this.bottom = this.bottom + 10;
          self.times +=1;
          var end = ((self.step)+1)*self.times;
          var sta  = end - self.step;
          self.items = self.items.concat(self.allData.slice(sta,end));
          console.log(self.items.length)
          if (self.items.length >= 91) {
            this.$refs.my_scroller.finishInfinite(true)
          }
          setTimeout(() => {
            this.$refs.my_scroller.finishInfinite(true)
          })
        }, 1500)
      },
      newmoment(arg) {
        return moment(arg).format('MM月DD日 hh:mm')
      },
      // loadData(){

      // },
      handlerData(str) {
        var self = this;
        var dd = '';
        var arr = str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/i, function (match, capture) {
             dd = capture
        });
        self.skewImg['url'] = dd;

        var str = str.substring(0,300);
        return str.replace(/<[^>]+>/g,"");
      }
  }
}
</script>
