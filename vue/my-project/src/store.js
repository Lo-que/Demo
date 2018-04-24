import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.store({
	state: {
		count:1
	},
	mutations: {
		Count (state, platform) {
			state.count = platform
		}
	},
	actions: {
		setCount ({commit}, platform) {
			commit('Count', platform)
		}
	},
	getters: {
		getCount: (state) => state.count
	}
})