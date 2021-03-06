import * as types from './mutation-types'
import { _setToken,_removeToken,_set } from 'common/js/cookie'

const mutations = {
	[types.SET_PUT_QUESTION_MASK](state,isDispaly) {
		state.put_question_mask = isDispaly;
	},
	[types.SET_WRITE_IDEA_MASK](state,isDispaly) {
		state.write_idea_mask = isDispaly;
	},
	[types.SET_INDEX_DROPDOWN](state,isDispaly) {
		state.index_dropdown = isDispaly;
	},
	[types.SET_FORM_TYPE](state,type) {
		state.form_type = type;
	},
	[types.SET_PEOPLE_DROPUP](state,isDispaly) {
		state.people_dropup = isDispaly
	},
	[types.SET_TOKEN](state,token) {
		state.token = _setToken(token)
	},
	[types.REMOVE_TOKEN](state) {
		state.token = _removeToken()
	},
	[types.SET_USER](state,user) {
		state.user = user
	},
	[types.SET_USER_ATTRIBUTES] (state,attributes) {
		attributes.forEach(({key,value})=>{
			state.user[ key ] = value
		})
	},
	[types.SET_CUT_AVATAR_MASK](state,isDispaly) {
		state.cut_avatar_mask = isDispaly
	},
	[types.SET_ADD_ANSWER_STATUS](state,isDispaly) {
		state.add_answer_status = isDispaly
	},
	[types.SET_CONVERSATION_MASK](state,isDispaly) {
		state.conversation_mask = isDispaly
	},
	[types.SET_ATTENTION_QUESTION_MODAL] (state,isDispaly) {
		state.attention_question_modal = isDispaly
	},
	[types.SET_DETAIL_QUESTION] (state,detail_question) {
		state.detail_question = detail_question
	},
	[types.SET_DETAIL_QUESTION_ATTENTIONSTATUS] (state,action) {
		if ( action == 1 ) {
			state.detail_question.attentionSum++
			state.detail_question.attentionStatus = 1
		}else {
			state.detail_question.attentionSum--
			state.detail_question.attentionStatus = 0
		}
	},
	[types.SET_DETAIL_QUESTION_USER_FOLLOWSTATUS] (state,action) {
		if ( action === 1 ) {
			state.detail_question.user.followStatus = 1
			state.detail_question.user.fansSum++
		}else {
			state.detail_question.user.followStatus = 0
			state.detail_question.user.fansSum--
		}
	},
	[types.SET_DETAIL_QUESTION_COMMENTSUM] (state,count) {
		state.detail_question.commentSum += (count)
	},
	[types.SET_PEOPLE_DETAIL_USER] (state,people_detail_user) {
		state.people_detail_user = people_detail_user
	},
	[types.SET_PEOPLE_DETAIL_USER_FOLLOWSUM] (state,{from,action}) {
		if (from==0) {
			if (action==1) {
				state.people_detail_user.followerSum++
			}else {
				state.people_detail_user.followerSum--
			}
		}else {
			if (action==1) {
				state.people_detail_user.fansSum++
			}else {
				state.people_detail_user.fansSum--
			}
		}
	},
	[types.SET_PEOPLE_DETAIL_USER_FOLLOWSTATUS] (state,action) {
		if ( action ===  1 ) {
			state.people_detail_user.followStatus = 1
			state.people_detail_user.fansSum++
		}else {
			state.people_detail_user.followStatus = 0
			state.people_detail_user.fansSum--
		}
	}	
}
export default mutations