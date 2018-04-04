/*
* @Author: hucheng.yang
* @Date:   2017-01-25 23:32:17
* @Last Modified by:   hucheng.yang
* @Last Modified time: 2017-02-19 17:16:16
*/
// const s_key = 'icetower'
export default{
	 fetch: function(name) {
		 		return JSON.parse(window.localStorage.getItem(name || '[]'))
	},
	 save: function(name,list) {
		 		window.localStorage.setItem(name, JSON.stringify(list))
	}
}