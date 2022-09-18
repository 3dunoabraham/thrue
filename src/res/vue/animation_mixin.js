export default {


data () {
	return {
		counter: 0,
	}
},
        computed: {
            pro_mode()             { return this.$store.getters.pro_mode },
            accs_length()           { return this.$store.getters.accs_length },
            valuesBlock()             { return this.$store.getters.getBlock("values") },
        },
methods: {
	lerp(min, max, value) {
	  return (max - min) * value + min;
	},
    updateAnimations(e) {
		this.counter++
		// console.log(this.pointer)
		// this.rocketMesh.position.x = this.pointer.x
		// if (this.sunlight) { this.sunlight.position.x = this.pointer.x * 10 + 10 }
		if (this.$parent.$refs.thrue && this.$parent.$refs.thrue.$refs.lotto && this.$parent.$refs.thrue.$refs.lotto.textsignup) 
		{
			let atext = this.$parent.$refs.thrue.$refs.lotto.textsignup
			// console.log(this.$parent.$refs.thrue.$refs.lotto)
			atext.rotation.y = this.lerp(atext.rotation.y,-this.pointer.x,0.07)
		}
		if (this.$parent.$refs.thrue && this.$parent.$refs.thrue.$refs.lotto && this.$parent.$refs.thrue.$refs.lotto.textwelcome) 
		{
			let atext = this.$parent.$refs.thrue.$refs.lotto.textwelcome
			// console.log(this.$parent.$refs.thrue.$refs.lotto)
			atext.rotation.y = this.lerp(atext.rotation.y,this.pointer.x*0.5,0.07)
		}
		this.mysign.rotation.y = this.lerp(this.mysign.rotation.y,this.pointer.x*3.1,0.07)
		this.light4.position.x = this.lerp(this.light4.position.x,this.pointer.x*3.1,0.01)
		// if (this.camera && (this.pointer.x < -0.75 || this.pointer.x > 0.75))
		if (this.camera && this.pro_mode &&
			/*(this.pointer.y < 0.5)*/ true && 
			(this.pointer.x < -0.15 || this.pointer.x > 0.15)
			)
		{
			// this.sunlight.position.x = this.lerp(this.sunlight.position.x,this.pointer.x*15+15,0.07)
			this.camera.rotation.y = this.lerp(this.camera.rotation.y,-this.pointer.x*1.3,0.07)
			// this.camera.rotation.x = this.lerp(this.camera.rotation.y,-1-this.pointer.x,0.07)
			// if (this.camera.rotation.y)

		} else {
			// this.sunlight.position.x = this.lerp(this.sunlight.position.x,15,0.07)
			this.camera.rotation.y = this.lerp(this.camera.rotation.y,0,0.07)

		}
		// this.sunlight.position.x = Math.cos(this.counter*0.001)*3
		// this.sunlight.position.z = Math.sin(this.counter*0.001)*15


	        // this.rocketMesh.position.y = this.lerp(this.rocketMesh.position.y,50,0.007)
		this.rocketMesh.position.y = this.lerp(this.rocketMesh.position.y,Math.sin(this.counter*0.03)*0.15+(this.accs_length ? 25 : 2),0.01)
		this.rocketMesh.rotation.z = -Math.sin(this.counter*0.02)*0.35
		this.rocketMesh.rotation.x = Math.sin(this.counter*0.05)*0.15
		this.rocketMesh.rotation.y += 0.006+this.pointer.x*0.03

      	if (this.accs_length)
      	{
	        this.myobject.position.z = this.lerp(this.myobject.position.z,-50,0.07)
	        this.mysign.position.z = this.lerp(this.mysign.position.z,-50,0.07)
        	if (this.textabraham && this.ticketer && this.valuesBlock  && this.valuesBlock.prize_pool)
        	{
	        	this.textabraham.position.y = this.lerp(this.textabraham.position.y,-1.5,0.05)
        	}
        }

		this.animate_levelone()
		this.animate_ticketer()
    },
}


}