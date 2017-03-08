javaScript interview Q&A:

1. ```javascript
   	//匿名函数
   	(function(){
         var arr = ['a','ad','dd'];
         if(arr.length == 0){
           arr.push(1)
         }else{
           arr.shift()
         };
         return arr;
       })()
       //原型法
       Array.prototype.reSort = function(){
          if(this.length == 0){
           this.push(1)
         }else{
           this.shift()
         };
         return this;
       }
       console.log([].reSort());
       console.log(['a','ad','dd'].reSort());
   ```


2. ```javascript
    var fullname = 'John Doe'
       var obj = {
           fullname: 'Colin Ihrig',
           getFullname: function() {
   　　　　　　return this.fullname;
           }
       }

       var person = obj.getFullname
       console.log(obj.getFullname()) // Colin Ihrig
       console.log(person.call(obj)) // 通过call()方法改变this指向的context（上下文环境）
   ```


3. ```javascript
    	//原型法	
   	String.prototype.repeatify=function(n){
   		if ((typeof n) === 'number'){
   			var num = Math.floor(n);
   			if (num <= 0) {
   				alert('重复次数必须大于0');
   			}else{
   				var arr = [];
   				for (var i = num - 1; i >= 0; i--) {
   					arr.push(this)
   				}
   				return arr.join('');
   			}
   		}else{
   			alert('输入的'+n+'是一个'+(typeof n)+'，不是一个数字，请输入一个数字参数');
   		}
   	}
   	console.log('hello'.repeatify(3))
   ```

4. ```javascript
   //方法一:
   Object.keys(String(Array(101)));
   //方法二:
   new Array(101).join('a').replace(/a/g, function(v, i){return i+',';}).split(',').splice(0, 100);
   ```