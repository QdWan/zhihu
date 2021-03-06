const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types

var QuestionUser = new Schema({
	question_id: {
		type: ObjectId,
		ref: 'Question'
	},
	user_id: {
		type: ObjectId,
		ref: 'User'
	},
	vote: {
		unique: false,
	    required: true,
		type: Number,
		default: 0
	},
	// 0: 不关注,  1:关注
	attentionStatus: {
		unique: false,
	    required: true,
		type: Number,
		default: 0
	},
	meta: {
	    createdAt: {
	      type: Date,
	      default: Date.now()
	    },
	    updatedAt: {
	      type: Date,
	      default: Date.now()
	    }
  	}
})


QuestionUser.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

module.exports = QuestionUser