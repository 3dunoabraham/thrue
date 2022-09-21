import * as THREE from "three";

export default {
  methods:
  {
    addLight()
    {
      let suncolor = this.dark_mode ? 0xFFA859 : 0xFFCB91
      let ambientintensity = this.dark_mode ? 0x404040 : 0x909090
      let sunintensity = this.dark_mode ? 3 : 2

      // this.light4 = new THREE.PointLight( 0xffffff, 0.5, 8 );
      // this.light4.position.set(-1,2.5,6)
      // this.scene.add( this.light4 );

      this.sunlight = new THREE.SpotLight( suncolor );
      // this.sunlight = new THREE.DirectionalLight( 0xFFA859, sunintensity );
      this.sunlight.position.set( -10,6,15 ); //default; light shining from top
      this.sunlight.castShadow = true; // default false
      // this.sunlight.shadow.camera.near = 0.5; // default
      this.sunlight.shadow.camera.far = 100; // default
      this.sunlight.shadow.mapSize.width = 2048; // default
      this.sunlight.shadow.mapSize.height = 2048; // default
      this.scene.add( this.sunlight );

      // this.scene.add(new THREE.CameraHelper(light.shadow.camera)) 

      const amlight = new THREE.AmbientLight( ambientintensity ); // soft white light
      this.scene.add( amlight );
    },
    setSceneAndCamera()
    {
      this.scene = new THREE.Scene();

      this.sceneVariables.camera.fov = this.sceneVariables.camera.fovSettings[this.DOM.screenType];
      let camera = new THREE.PerspectiveCamera(
        this.sceneVariables.camera.fov,
        this.DOM.ratio,
        this.sceneVariables.camera.minReach,
        this.sceneVariables.camera.maxReach
      );
      this.camera = camera;
      this.camera.position.set(...this.sceneVariables.camera.pos);
      this.camera.rotation.set(...this.sceneVariables.camera.rot);
    },
    setCameraRenderSize()
    {
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix(window.devicePixelRatio);
    },
    setRenderer()
    {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$refs.canvas,
        // canvas: canvasElement,
      });

      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMapSoft = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.setCameraRenderSize() // set_scene_function
    },
    setWindowRatio()
    {
      this.DOM.ratio = window.innerWidth / window.innerHeight;
      this.DOM.screenType = this.DOM.ratio > 1 ? "desktop" : "mobile";
      this.sceneBreakpoints.default = this.sceneBreakpoints[this.DOM.screenType];
    },
    setDOMHeight()
    {
      this.DOM.height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    },
  }
}