<template>
	<div id="">
		<div class="content-list-box">
			<div class="list-header" v-if="people_detail_user.info">
				<h4 class="list-header-text">
					<span>
					{{people_detail_user._id==user._id?'我'
					:people_detail_user.info.gender==0?'他'
					:people_detail_user.info.gender==1?'他':'她'}}的动态
				</span>
				</h4>
				<div class=""></div>
			</div>
			<div class="list" v-if="dynamicList.length>0">
				<dynamicItem v-for="( item , index ) in dynamicList" 
				:key="item._id"
				:item="item"
				:index="index"></dynamicItem>
			</div>
			<div style="text-align: center; margin-top: 10px;" v-show="no_more_data"><h1>没有更多数据了</h1></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import comments from 'base/comments.vue'
import { periodWrap } from 'common/js/common.js'
import dynamicItem from 'base/dynamicItem.vue'
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import { dynamicReadSendApi } from 'api/dynamic'
 	export default {
		components: {
			comments,
			dynamicItem
		},
		data(){
			return {
				limit: 5,
				dynamicList: [],
				pend: false, 
				no_more_data: false, 
				page: 1,
				loading: true,
				first: true
			}	
		},
		methods: {
			init(){
				this.pend = true
				dynamicReadSendApi({
					detail_id: this.detail_user_id,
					limit: this.limit,
					page: this.page
				}, (res)=>{
					this.first = false
					this.loading = false
					if ( res.data.result.dynamics.length ) {
						let data = res.data.result.dynamics
						this.dynamicList = this.dynamicList.concat(data)
						this.page++
					}else {
						this.no_more_data = true
					}
					this.pend = false
				})
			},
			loadMore() {
				var $win = $(window)
				if($win.scrollTop()-($(document).height()-$win.height())>-30){
	                if (this.pend||this.no_more_data||this.first) {
	                	return
	                }
	                if ( this.$router.history.current.name == 'people_url' ) {
	                	this.init()
	                }
	            }
			}
		},
		created() {
			this.init()
		},
		mounted() {
			// 加载更多数据
			var $win = $(window)
			$win.on('scroll',this.loadMore)
		},
		beforeDestroy() {
			var $win = $(window)
			$win.off('scroll',this.loadMore)
		},
		computed: {
			detail_user_id() {
				return this.$route.params.user_url
			},
			...mapGetters([
				'user',
				'people_detail_user'
			])
		}
	}
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
	@import url('../cpLess/dynamic-list.less');
</style>
