import * as THREE from "three";

export default {
  methods: {
    animate_connectOrb()
    {
      this.connectOrb.position.y =
        this.lerp(this.connectOrb.position.y,Math.sin(this.tcounter*0.03)*0.15+(
        (this.accs_length ||this.is_playing_test ) ? 25 : +0.6
         ),0.02)
      this.connectOrb.rotation.z = -Math.sin(this.tcounter*0.02)*0.35
      this.connectOrb.rotation.x = Math.sin(this.tcounter*0.05)*0.15
      this.connectOrb.rotation.y += 0.006-this.pointer.x*0.01
    },
    checkClick_connectOrb()
    {
      if(this.INTERSECTED && this.INTERSECTED == this.connectOrb)
      {
        this.clicked_connectOrb()
      }
    },
    async clicked_connectOrb()
    {
      await this.$store.dispatch("connectWallet")
      if (!this.mycurrentlevel)
      {
        this.addLevelOne()
        this.enable_help++
        this.show_help = true
      }
    },
    add_connectOrb()
    {
      const orbGeometry = new THREE.SphereGeometry(0.25, 3,4 );
      const orbMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xFFA859 } );
      this.connectOrb = new THREE.Mesh( orbGeometry, orbMaterial );
      this.connectOrb.castShadow = true; //default is false
      this.connectOrb.receiveShadow = true; //default
      this.connectOrb.position.set(-0.25,0,7.3)
      this.scene.add( this.connectOrb );
    },
  }
}