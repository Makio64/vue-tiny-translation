import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'
import { OrbitControls } from './OrbitControls.js'

export class ThreeScene {
  constructor(container, languages) {
    this.container = container
    this.languages = languages
    this.scene = null
    this.camera = null
    this.renderer = null
    this.controls = null
    this.flags = []
    this.animationId = null
    this.isDestroyed = false
  }

  init() {
    if (this.isDestroyed) return
    
    this.initThree()
    this.createFloatingElements()
    this.animate()
    this.handleResize()
  }

  initThree() {
    // Scene
    this.scene = new THREE.Scene()
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 15)
    
    // CSS Renderer
    this.renderer = new CSS3DRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.domElement.style.position = 'absolute'
    this.renderer.domElement.style.inset = '0'
    this.renderer.domElement.style.zIndex = '1'
    this.renderer.domElement.style.pointerEvents = this.isMobile() ? 'none' : 'auto'

    this.container.appendChild(this.renderer.domElement)
    
    // Orbital Controls - Rotation only
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.enableZoom = false
    this.controls.enablePan = false
    this.controls.enableRotate = !this.isMobile()
	
		this.controls.minPolarAngle = Math.PI * 0.4  
		this.controls.maxPolarAngle = Math.PI * 0.6
  }

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 768)
  }

  createFloatingElements() {
    // Create floating flags
    this.languages.forEach((lang, index) => {
      const element = document.createElement('div')
      element.className = 'floating-flag'
      element.textContent = lang.flag
      element.style.fontSize = '32px'
      element.style.pointerEvents = 'none'
      
      const object = new CSS3DObject(element)
      
      // Random position
      const radius = 350 + Math.random()*80
      const angle = (index / this.languages.length) * Math.PI * 2
      const y = (Math.random() - 0.5) * 400 // Random Y between -200 and 200
      
      object.position.x = Math.cos(angle) * radius
      object.position.z = Math.sin(angle) * radius
      object.position.y = y
      object.lookAt(0, y, 0)
      
      this.scene.add(object)
      this.flags.push({ object, angle, radius, speed: 0.01 + Math.random() * 0.01 })
    })
  }

  animate = () => {
    if (this.isDestroyed) return
    
    this.animationId = requestAnimationFrame(this.animate)
    
    // Animate floating objects
    this.flags.forEach(item => {
      item.angle += item.speed * 0.05
      item.object.position.x = Math.cos(item.angle) * item.radius
      item.object.position.z = Math.sin(item.angle) * item.radius
      item.object.lookAt(0, item.object.position.y, 0)
    })
    
    if (this.controls) {
      this.controls.update()
    }
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }

  handleResize() {
    this.onWindowResize = () => {
      if (this.isDestroyed) return
      
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', this.onWindowResize)
  }

  destroy() {
    this.isDestroyed = true
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    
    if (this.onWindowResize) {
      window.removeEventListener('resize', this.onWindowResize)
    }
    
    if (this.controls) {
      this.controls.dispose()
    }
    
    if (this.renderer) {
      this.renderer.dispose()
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
      }
    }
    
    // Clear references
    this.scene = null
    this.camera = null
    this.renderer = null
    this.controls = null
    this.flags = []
  }
} 