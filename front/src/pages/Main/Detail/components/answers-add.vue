<template>
	<div class="answers-wrapper" v-show="add_answer_status"> 
	 	<div class="answersAdd-wrapper">
	 		<a name="draft"></a>
			<div class="answerAdd">
				<div class="answerAdd-header" v-show="anonymousStatus==0" v-if="user">
					<div class="user-info" v-if="user.username">
						<span class="avatar-link"><img :src="imageServer+user.avatar" width="38" height="38"></span>		
						<div class="author-info">
							<div class="info-header"><span class="author-link">{{user.username}}</span></div>
							<div class="info-detail">
								<div class="info-badge" v-if="user.info">
									<span>{{user.info.intro}}</span>
									<button><svg viewBox="0 0 12 12" width="12" height="16">
										<title></title><g><path d="M.423 10.32L0 12l1.667-.474 1.55-.44-2.4-2.33-.394 1.564zM10.153.233c-.327-.318-.85-.31-1.17.018l-.793.817 2.49 2.414.792-.814c.318-.328.312-.852-.017-1.17l-1.3-1.263zM3.84 10.536L1.35 8.122l6.265-6.46 2.49 2.414-6.265 6.46z"></path></g>
									</svg>编辑话题经验</button>
								</div>
							</div>
						</div>
					</div>
					<button class="button" @click.stop.prevent="switchStatus(1)">使用匿名身份回答</button>
				</div>
				<div class="answerAdd-header" v-show="anonymousStatus==1" v-if="user">
					<div class="user-info" v-if="user.username">
						<span class="avatar-link"><img :src="static+'anonymous.jpg'" width="38" height="38"></span>		
						<div class="author-info">
							<div class="info-header"><span class="author-link">{{user.username}}</span></div>
						</div>
					</div>
					<button class="button" @click.stop.prevent="switchStatus(0)">使用实名身份回答</button>
				</div>
				<form class="answer-form">
					<div>
						<div class="top">
							<div class="editor">
								<div class="editable">
									<div class="tool-bar">
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M9 17.025V13h4.418c1.19 0 2.415.562 2.415 2.012s-1.608 2.013-2.9 2.013H9zM9 7h4.336c1 0 1.814.888 1.814 2 0 .89-.814 2-1.814 2H9V7zm8.192 1.899a3.893 3.893 0 0 0-3.888-3.889S9.334 5 8.167 5C7 5 7 6.167 7 6.167v11.666C7 19 8.167 19 8.167 19l5.572.01c2.333 0 4.231-1.86 4.231-4.148a4.122 4.122 0 0 0-1.77-3.372 3.873 3.873 0 0 0 .992-2.591z"></path>
											</svg>
										</button>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M15.751 5h-5.502a.751.751 0 0 0-.749.75c0 .417.336.75.749.75H12l-2 11H8.249a.751.751 0 0 0-.749.75c0 .417.336.75.749.75h5.502a.751.751 0 0 0 .749-.75.748.748 0 0 0-.749-.75H12l2-11h1.751a.751.751 0 0 0 .749-.75.748.748 0 0 0-.749-.75"></path>
											</svg>
										</button>
										<span class="separator"></span>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M7 6.007C7 5.45 7.444 5 8 5c.552 0 1 .45 1 1.007v11.986C9 18.55 8.556 19 8 19c-.552 0-1-.45-1-1.007V6.007zm8 0C15 5.45 15.444 5 16 5c.552 0 1 .45 1 1.007v11.986C17 18.55 16.556 19 16 19c-.552 0-1-.45-1-1.007V6.007zM9 11h6v2H9v-2z"></path>
											</svg>
										</button>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M17.975 12.209c.504.454.822 1.05.952 1.792.061.35.055.715-.022 1.096-.075.379-.209.718-.4 1.018-.465.73-1.155 1.175-2.07 1.337-.874.153-1.684-.06-2.432-.638a3.6 3.6 0 0 1-.916-1.043 3.92 3.92 0 0 1-.506-1.336c-.172-.98-.03-2.026.425-3.142.455-1.116 1.155-2.118 2.1-3.007.8-.757 1.456-1.182 1.97-1.273a.72.72 0 0 1 .544.104.656.656 0 0 1 .286.452c.054.31-.095.601-.45.877-.856.67-1.455 1.27-1.796 1.798-.323.513-.467.873-.43 1.079.034.196.21.287.524.274l.191-.001.249-.029a2.436 2.436 0 0 1 1.781.642zm-7.51 0c.504.454.821 1.05.951 1.792.062.35.056.715-.02 1.096-.077.379-.21.718-.401 1.018-.465.73-1.155 1.175-2.07 1.337-.874.153-1.684-.06-2.432-.638a3.6 3.6 0 0 1-.916-1.043 3.92 3.92 0 0 1-.506-1.336c-.172-.98-.03-2.026.424-3.142.455-1.116 1.156-2.118 2.101-3.007.8-.757 1.456-1.182 1.97-1.273a.72.72 0 0 1 .544.104.656.656 0 0 1 .285.452c.055.31-.094.601-.45.877-.855.67-1.454 1.27-1.796 1.798-.322.513-.466.873-.43 1.079.034.196.21.287.525.274l.191-.001.248-.029a2.436 2.436 0 0 1 1.782.642z"></path>
											</svg>
										</button>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M19.718 11.559a.961.961 0 0 1 .007 1.352l-2.201 2.033-1.319 1.219a.937.937 0 0 1-1.33-.005.961.961 0 0 1-.001-1.345l2.813-2.576-2.804-2.568a.96.96 0 0 1-.008-1.352.963.963 0 0 1 1.337 0l2.475 2.289 1.031.953zm-7.462-5.567a1.001 1.001 0 0 1 1.16-.818c.544.096.907.616.81 1.165l-2.082 11.804a1.001 1.001 0 0 1-1.16.818 1.003 1.003 0 0 1-.81-1.165l2.082-11.804zM9.123 8.316a.96.96 0 0 1 0 1.345l-2.812 2.575 2.806 2.569a.962.962 0 0 1 .006 1.35.935.935 0 0 1-1.337 0l-2.093-1.934-1.412-1.305a.961.961 0 0 1-.007-1.352l2.833-2.62.685-.634c.345-.35.976-.354 1.331.006z"></path>
											</svg>
										</button>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M9 6.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 6.5zM5.884 7.893v-2.09h-.643L5.402 5h1.285v2.893h-.803zm.898 3.83l-.393.395h.862v.733H5v-.482l1.057-.892c.371-.312.461-.434.463-.566.003-.202-.135-.368-.396-.368-.289 0-.418.206-.418.43H5c0-.642.482-1.073 1.125-1.073s1.125.457 1.125.945c0 .307-.106.516-.468.877zM9 11.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01a.995.995 0 0 1-.995-1zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01a.995.995 0 0 1-.995-1zm-1.759.624c0 .14-.025.27-.076.388a.902.902 0 0 1-.217.309 1.017 1.017 0 0 1-.336.205c-.13.05-.275.074-.437.074-.166 0-.32-.027-.462-.08a1.166 1.166 0 0 1-.367-.217 1.062 1.062 0 0 1-.246-.318.914.914 0 0 1-.1-.38v-.055h.765v.054a.343.343 0 0 0 .367.352c.117 0 .207-.03.27-.09.062-.06.093-.152.093-.277 0-.117-.039-.206-.117-.268a.506.506 0 0 0-.32-.091h-.14v-.516h.144c.117 0 .205-.03.264-.09a.31.31 0 0 0 .087-.226.27.27 0 0 0-.087-.209.332.332 0 0 0-.233-.08c-.107 0-.185.027-.236.08a.275.275 0 0 0-.076.197v.055h-.695v-.055a.915.915 0 0 1 .295-.644c.178-.161.436-.242.775-.242.14 0 .27.021.39.064s.224.102.312.176a.802.802 0 0 1 .207.262c.05.1.075.206.075.318 0 .258-.116.46-.348.605v.008a.625.625 0 0 1 .193.119.777.777 0 0 1 .256.572z"></path>
											</svg>
										</button>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M9 7c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 7zM6 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3-6c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 12zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 17z"></path>
											</svg>
										</button>
										<span class="separator"></span>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M6.77 17.23c-.905-.904-.94-2.333-.08-3.193l3.059-3.06-1.192-1.19-3.059 3.058c-1.489 1.489-1.427 3.954.138 5.519s4.03 1.627 5.519.138l3.059-3.059-1.192-1.192-3.059 3.06c-.86.86-2.289.824-3.193-.08zm3.016-8.673l1.192 1.192 3.059-3.06c.86-.86 2.289-.824 3.193.08.905.905.94 2.334.08 3.194l-3.059 3.06 1.192 1.19 3.059-3.058c1.489-1.489 1.427-3.954-.138-5.519s-4.03-1.627-5.519-.138L9.786 8.557zm-1.023 6.68c.33.33.863.343 1.177.029l5.34-5.34c.314-.314.3-.846-.03-1.176-.33-.33-.862-.344-1.176-.03l-5.34 5.34c-.314.314-.3.846.03 1.177z"></path>
											</svg>
										</button>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M21 17.444C21 18.3 20.1 19 19 19H5c-1.1 0-2-.7-2-1.556V6.556C3 5.7 3.9 5 5 5h14c1.1 0 2 .7 2 1.556v10.888zm-9.437-3.919a.5.5 0 0 1-.862.013l-1.26-2.065a.5.5 0 0 0-.861.012l-2.153 3.767a.5.5 0 0 0 .435.748h10.292a.5.5 0 0 0 .438-.741L14.573 9.78a.5.5 0 0 0-.872-.006l-2.138 3.75z"></path>
											</svg>
										</button>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M10.546 15c-.466.273-.86.053-.86-.5V9.505c0-.565.385-.778.86-.501l4.278 2.497c.466.272.475.726 0 1.003L10.546 15zM5 5S3 5 3 7v10s0 2 2.002 2H19c2 0 2-2 2-2V7c0-2-2-2-2-2H5z"></path>
											</svg>
										</button>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M9.033 16.182l3.083-4.133a.885.885 0 0 0 .003-1.12L9.033 6.817h7.985c.606-.03.982-.362.982-.92C18 5.34 17.611 5 17.018 5H6.922a.93.93 0 0 0-.83.509.882.882 0 0 0 .109.946L10 11.5l-3.782 5.037c-.29.289-.246.743-.122.974.172.316.455.489.799.489v-.211l.029.21h10.094c.501 0 .982-.32.982-.909 0-.59-.483-.857-.982-.908H9.033z"></path>
											</svg>
										</button>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M4 7c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H5c-.552 0-1-.444-1-1zm0 5a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2H5.01C4.451 13 4 12.556 4 12zm6 0a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2h-1.98c-.558 0-1.01-.444-1.01-1zm6 0a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2h-1.98c-.558 0-1.01-.444-1.01-1zM4 17c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H5c-.552 0-1-.444-1-1z"></path>
											</svg>
										</button>
										<span class="separator"></span>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M9.864 12.83l1.641 1.642-1.171 2.874a1.693 1.693 0 0 1-1.585 1.055.782.782 0 0 1-.716-1.077l1.83-4.494zM11.5 8.811L12.24 7H9.69l-2-2h10.672a1 1 0 1 1 0 2h-3.813l-1.406 3.452L11.5 8.811zM5.293 6.845a1 1 0 0 1 1.414 0l10.046 10.046a1 1 0 0 1-1.414 1.414L5.293 8.26a1 1 0 0 1 0-1.415z"></path>
											</svg>
										</button>
										<div class="toobar-menu">
											<button class="tool-item">
											<svg viewBox="0 0 24 24" width="24" height="24">
												<path d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
											</svg>
										</button>
										</div>
										<button class="tool-item">
											<svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
												<path d="M20.227 3a.777.777 0 0 1 .773.773V8.67c-.062.432-.404.774-.801.772-.453-.003-.799-.347-.801-.772V5.758a2194.05 2194.05 0 0 0-4.584 4.583c-.975.983-2.136-.177-1.158-1.155 0 0 3.148-3.166 4.582-4.584h-2.93c-.496 0-.77-.413-.773-.801-.003-.462.339-.804.774-.801h4.918zM9.187 13.659c.974-.983 2.135.177 1.155 1.155 0 0-3.147 3.166-4.581 4.584h2.93c.494 0 .77.413.772.801.004.462-.338.804-.773.801H3.772A.776.776 0 0 1 3 20.229v-4.9c.062-.432.404-.774.801-.772.453.003.799.347.801.772v2.913c1.14-1.134 3.794-3.789 4.584-4.583z"></path>
											</svg><span>全屏模式</span>
										</button>
									</div>
								</div>
								<div class="rich-text">
									<div class="rich-text-inner">
										<textarea id="textarea" ref="textarea" name="answer-content" placeholder="写回答..." v-model="content"></textarea>
									</div>
								</div>
							</div>
						</div>
						<div class="bottom">
							<div class="footer-content">
								<div class="footer-content-inner">
									<div class="status"></div>
									<div class="right">
										<div class="popover">
											<button class="setting">
												<svg viewBox="0 0 20 20" width="14" height="16"><title></title>
												<g><path d="M 18.868 15.185 c -0.164 0.096 -0.315 0.137 -0.452 0.137 c -0.123 0 -1.397 -0.26 -1.617 -0.233 c -1.355 0.013 -1.782 1.275 -1.836 1.74 c -0.055 0.454 0 0.893 0.19 1.304 c 0.138 0.29 0.125 0.577 -0.067 0.85 c -0.863 0.893 -2.165 1.016 -2.357 1.016 c -0.123 0 -0.247 -0.055 -0.356 -0.15 c -0.11 -0.097 -0.685 -1.14 -1.07 -1.47 c -1.303 -0.954 -2.246 -0.328 -2.63 0 c -0.397 0.33 -0.67 0.7 -0.835 1.126 c -0.07 0.18 -0.18 0.302 -0.33 0.37 c -1.354 0.426 -2.918 -0.92 -3.014 -1.056 c -0.082 -0.11 -0.123 -0.22 -0.123 -0.356 c -0.014 -0.138 0.383 -1.276 0.342 -1.688 c -0.342 -1.9 -1.836 -1.687 -2.096 -1.673 c -0.303 0.014 -0.604 0.068 -0.92 0.178 c -0.205 0.056 -0.396 0.03 -0.588 -0.054 c -0.888 -0.462 -1.137 -2.332 -1.11 -2.51 c 0.055 -0.315 0.192 -0.52 0.438 -0.604 c 0.425 -0.164 0.81 -0.452 1.15 -0.85 c 0.932 -1.262 0.344 -2.25 0 -2.634 c -0.34 -0.356 -0.725 -0.645 -1.15 -0.81 c -0.137 -0.04 -0.233 -0.15 -0.328 -0.315 C -0.27 6.07 0.724 4.95 0.978 4.733 c 0.255 -0.22 0.6 -0.055 0.723 0 c 0.426 0.164 0.878 0.22 1.344 0.15 C 4.7 4.636 4.784 3.14 4.81 2.908 c 0.015 -0.247 -0.11 -1.29 -0.136 -1.4 c -0.027 -0.123 -0.014 -0.22 0.027 -0.315 C 5.318 0.178 7.073 0 7.223 0 c 0.178 0 0.33 0.055 0.44 0.178 c 0.108 0.124 0.63 1.11 1 1.4 c 0.398 0.338 1.582 0.83 2.588 0.013 c 0.398 -0.273 0.96 -1.288 1.083 -1.412 c 0.123 -0.123 0.26 -0.178 0.384 -0.178 c 1.56 0 2.33 1.03 2.438 1.22 c 0.083 0.124 0.096 0.248 0.07 0.37 c -0.03 0.152 -0.33 1.153 -0.262 1.606 c 0.366 1.537 1.384 1.742 1.89 1.783 c 0.494 0.027 1.645 -0.357 1.81 -0.344 c 0.164 0.014 0.315 0.083 0.424 0.206 c 0.535 0.31 0.85 1.715 0.905 2.14 c 0.027 0.233 -0.014 0.44 -0.11 0.562 c -0.11 0.138 -1.165 0.714 -1.48 1.112 c -0.855 0.982 -0.342 2.25 -0.068 2.606 c 0.26 0.37 1.22 0.905 1.288 0.96 c 0.15 0.137 0.26 0.302 0.315 0.494 c 0.146 1.413 -0.89 2.387 -1.07 2.47 Z m -8.905 -0.535 c 0.644 0 1.246 -0.123 1.822 -0.356 c 0.575 -0.248 1.082 -0.59 1.493 -1.016 c 0.425 -0.425 0.754 -0.92 1 -1.495 c 0.247 -0.562 0.357 -1.18 0.357 -1.81 c 0 -0.66 -0.11 -1.262 -0.356 -1.825 c -0.248 -0.562 -0.577 -1.056 -1.002 -1.48 c -0.41 -0.427 -0.918 -0.756 -1.493 -1.003 c -0.576 -0.233 -1.178 -0.357 -1.822 -0.357 c -0.644 0 -1.247 0.124 -1.81 0.357 c -0.56 0.247 -1.067 0.576 -1.478 1.002 c -0.425 0.425 -0.768 0.92 -1 1.48 c -0.247 0.564 -0.37 1.167 -0.37 1.826 c 0 0.644 0.123 1.248 0.37 1.81 c 0.232 0.563 0.575 1.07 1 1.495 c 0.424 0.426 0.917 0.768 1.48 1.016 c 0.56 0.233 1.164 0.356 1.808 0.356 Z"></path></g></svg>设置</button>
										</div>
										<button type="button" class="answerBtn" @click.stop.prevent="submit">提交回答</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<input type="file" accept="image/png,image/jpeg" style="display: none;">
				</form>
			</div>
	 	</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { makeExpandingArea } from 'common/js/common.js';
	import { mapMutations, mapGetters } from 'vuex';
	import { communicationMixin } from 'common/js/mixin'
	import axios from 'axios'
	import { answerInsertApi } from 'api/answer' 
	export default {
		data() {
			return {
				imageServer: global.imgServer,
				static: '../../../../../static/avatar/38/',
				content: '',
				anonymousStatus: 0,
			}
		},
		methods: {
			switchStatus(status) {
				this.anonymousStatus = status
			},
			submit() {
				if (this.content=='') {
					return
				}
				answerInsertApi({
					content: this.content,
					user_id: this.user._id,
					question_id: this.detail_question._id,
					anonymousStatus: this.anonymousStatus
				}, (res)=>{
					if (res.data.status==1) {
						alert('添加回答失败')
					}else if(res.data.status==2) {
						alert(res.data.result.msg)
					}else{
						communicationMixin.$emit('addAnswer')
						this.setAddAnswerStatus(!this.add_answer_status)
						this.content = ''
					}
				})
			},
			...mapMutations({
				setAddAnswerStatus: 'SET_ADD_ANSWER_STATUS',
			})
		},
		mounted() {
			makeExpandingArea(this.$refs.textarea);
		},
		computed: {
			...mapGetters([
				'user',
				'add_answer_status',
				'detail_question'
			])
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import url('../cpLess/answers-add.less');
</style>
