'use strict';

/**
 * Screen-space ambient occlusion pass.
 *
 * Has the following parameters
 *  - radius
 *  	- Ambient occlusion shadow radius (numeric value).
 *  - onlyAO
 *  	- Display only ambient occlusion result (boolean value).
 *  - aoClamp
 *  	- Ambient occlusion clamp (numeric value).
 *  - lumInfluence
 *  	- Pixel luminosity influence in AO calculation (numeric value).
 * 
 * To output to screen set renderToScreens true
 *
 * @author alteredq / http://alteredqualia.com/
 * @author tentone
 * @class SSAOPass
 */

import * as THREE from "three";
import { SSAOShader } from "../shaders/SSAOShader";
import { ShaderPass } from "three-effectcomposer-es6";

export default class SSAOPass extends ShaderPass {
	width: number;
	height: number;
	renderToScreen: boolean;
	camera2: THREE.PerspectiveCamera;
	scene2: THREE.Scene;

	depthMaterial: THREE.MeshDepthMaterial;
	depthRenderTarget: THREE.WebGLRenderTarget;
	diffuseRenderTarget: THREE.WebGLRenderTarget;
	
	uniforms: { [name: string]: THREE.Uniform };

	constructor(scene, camera, width = null, height = null)
	{
		super(SSAOShader, null);

		this.width = ( width !== undefined ) ? width : 512;
		this.height = ( height !== undefined ) ? height : 256;

		this.renderToScreen = false;

		this.camera2 = camera;
		this.scene2 = scene;

		//Depth material
		this.depthMaterial = new THREE.MeshDepthMaterial();
		this.depthMaterial.blending = THREE.NoBlending;

		//Depth render target
		this.depthRenderTarget = new THREE.WebGLRenderTarget( this.width, this.height, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter } );

		//Depth render target
		this.diffuseRenderTarget = new THREE.WebGLRenderTarget( this.width, this.height, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter } );

		//Shader uniforms
		this.uniforms['tDiffuse'] = new THREE.Uniform(this.diffuseRenderTarget.texture);
		this.uniforms['tDepth'] = new THREE.Uniform(this.depthRenderTarget.texture);
		this.uniforms['size'] = new THREE.Uniform(new THREE.Vector2(this.width, this.height));
		this.uniforms['cameraNear'] = new THREE.Uniform(this.camera2.near);
		this.uniforms['cameraFar'] = new THREE.Uniform(this.camera2.far);

		this.uniforms['radius'] = new THREE.Uniform(4);
		this.uniforms['onlyAO'] = new THREE.Uniform(false);
		this.uniforms['aoClamp'] = new THREE.Uniform(0.25);
		this.uniforms['lumInfluence'] = new THREE.Uniform(0.7);
	}

	get radius() {
		return this.uniforms['radius'].value;
	}

	set radius( value ) {
		this.uniforms['radius'].value = value;
	}

	get onlyAO() {
		return this.uniforms['onlyAO'].value;
	}

	set onlyAO( value ) {
		this.uniforms['onlyAO'].value = value;
	}

	get aoClamp() {
		return this.uniforms['aoClamp'].value;
	}

	set aoClamp( value ) {
		this.uniforms['aoClamp'].value = value;
	}

	get lumInfluence() {
		return this.uniforms['lumInfluence'].value;
	}

	set lumInfluence( value ) {
		this.uniforms['lumInfluence'].value = value;
	}

	/**
	 * Render using this pass.
	 * 
	 * @method render
	 * @param {WebGLRenderer} renderer
	 * @param {WebGLRenderTarget} writeBuffer Buffer to write output.
	 * @param {WebGLRenderTarget} readBuffer Input buffer.
	 * @param {Number} delta Delta time in milliseconds.
	 * @param {Boolean} maskActive Not used in this pass.
	 */
	render( renderer: THREE.WebGLRenderer, writeBuffer, readBuffer, delta )
	{
		//Render depth into depthRenderTarget
		this.scene2.overrideMaterial = this.depthMaterial;
		renderer.render( this.scene2, this.camera2, this.depthRenderTarget, true );
		
		this.uniforms['tDepth'].value = this.depthRenderTarget.texture;

		this.scene2.overrideMaterial = null;

		renderer.render( this.scene2, this.camera2, this.diffuseRenderTarget, true );
		this.uniforms['tDiffuse'].value = this.diffuseRenderTarget.texture;

		super.render(renderer, writeBuffer, readBuffer, delta );
	};

	/**
	 * Change scene to be renderer by this render pass.
	 *
	 * @method setScene
	 * @param {Scene} scene
	 */
	setScene(scene) {
		
		this.scene2 = scene;

	};

	/**
	 * Set camera used by this render pass.
	 *
	 * @method setCamera
	 * @param {Camera} camera
	 */
	setCamera( camera ) {

		this.camera2 = camera;

		this.uniforms[ 'cameraNear' ].value = this.camera2.near;
		this.uniforms[ 'cameraFar' ].value = this.camera2.far;

	};

	updateCamera(near, far) {
		this.uniforms['cameraNear'].value = near;
		this.uniforms['cameraFar'].value = far;
	}

	/**
	 * Set resolution of this render pass.
	 * 
	 * @method setSize
	 * @param {Number} width
	 * @param {Number} height
	 */
	setSize( width, height )
	{
		this.width = width;
		this.height = height;

		this.uniforms[ 'size' ].value.set( this.width, this.height );
		this.depthRenderTarget.setSize( this.width, this.height );
		this.diffuseRenderTarget.setSize( this.width, this.height );
	};
}