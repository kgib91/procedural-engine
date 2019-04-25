import * as THREE from "three";

/**
 * @author Mugen87 / https://github.com/Mugen87
 *
 */

export class DepthTester extends THREE.Mesh {
    static DepthTesterShader = {

        uniforms: {
    
            'color': {
                type: 'c',
                value: null
            },
    
            'tDiffuse': {
                type: 't',
                value: null
            },
    
            'textureMatrix': {
                type: 'm4',
                value: null
            }
    
        },
    
        vertexShader: [
    
            'uniform mat4 textureMatrix;',
    
            'varying vec4 vUv;',
    
            'void main() {',
    
            '	vUv = textureMatrix * vec4( position, 1.0 );',
    
            '	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    
            '}'
    
        ].join( '\n' ),
    
        fragmentShader: [
    
            'uniform vec3 color;',
            'uniform sampler2D tDiffuse;',
    
            'varying vec4 vUv;',
    
            'float blendOverlay( float base, float blend ) {',
    
            '	return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );',
    
            '}',
    
            'vec3 blendOverlay( vec3 base, vec3 blend ) {',
    
            '	return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );',
    
            '}',
    
            'void main() {',
    
            '	vec4 base = texture2DProj( tDiffuse, vUv );',
    
            '	gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );',
    
            '}'
    
        ].join( '\n' )
    };

    renderTarget: THREE.WebGLRenderTarget;
    material: THREE.ShaderMaterial;
    
    refractorPlane: THREE.Plane = new THREE.Plane();
    textureMatrix: THREE.Matrix4 = new THREE.Matrix4();
    virtualCamera: THREE.PerspectiveCamera;
    parameters;

    color: THREE.Color;
    textureWidth: number;
    textureHeight: number;
    clipBias: number;
    shader: THREE.Shader;
    depthTestMaterial: THREE.MeshDepthMaterial;

    constructor( geometry, options ) {
        super(geometry);

        this.type = 'DepthTester';

        options = options || {};

        this.color = ( options.color !== undefined ) ? new THREE.Color( options.color ) : new THREE.Color( 0x7F7F7F );
        this.textureWidth = options.textureWidth || 512;
        this.textureHeight = options.textureHeight || 512;
        this.clipBias = options.clipBias || 0;
        this.shader = options.shader || DepthTester.DepthTesterShader;
    
        //
        this.virtualCamera = new THREE.PerspectiveCamera();
        this.virtualCamera.matrixAutoUpdate = false;
        this.virtualCamera.userData.depthTester = true;
    
        //
        this.refractorPlane = new THREE.Plane();
        this.textureMatrix = new THREE.Matrix4();
    
        this.depthTestMaterial = new THREE.MeshDepthMaterial();

        // render target
    
        this.parameters = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBFormat,
            stencilBuffer: false
        };
    
        this.renderTarget = new THREE.WebGLRenderTarget( this.textureWidth, this.textureHeight, this.parameters );
    
        if ( ! THREE.Math.isPowerOfTwo( this.textureWidth ) || ! THREE.Math.isPowerOfTwo( this.textureHeight ) ) {
            this.renderTarget.texture.generateMipmaps = false;
        }
    
        // material
        this.material = new THREE.ShaderMaterial( {
            uniforms: THREE.UniformsUtils.clone( this.shader.uniforms ),
            vertexShader: this.shader.vertexShader,
            fragmentShader: this.shader.fragmentShader,
            transparent: true // ensures, refractors are drawn from farthest to closest
        } );
    
        this.material.uniforms.color.value = this.color;
        this.material.uniforms.tDiffuse.value = this.renderTarget.texture;
        this.material.uniforms.textureMatrix.value = this.textureMatrix;
    }

    private refractorWorldPosition: THREE.Vector3 = new THREE.Vector3();
    private cameraWorldPosition: THREE.Vector3 = new THREE.Vector3();
    private rotationMatrix: THREE.Matrix4 = new THREE.Matrix4();

    private visibleNormal: THREE.Vector3 = new THREE.Vector3();
    private visibleView: THREE.Vector3 = new THREE.Vector3();

    private visibilityTest( camera ) {
        this.refractorWorldPosition.setFromMatrixPosition( this.matrixWorld );
        this.cameraWorldPosition.setFromMatrixPosition( camera.matrixWorld );
    
        this.visibleView.subVectors( this.refractorWorldPosition, this.cameraWorldPosition );
    
        this.rotationMatrix.extractRotation( this.matrixWorld );
    
        this.visibleNormal.set( 0, 0, 1 );
        this.visibleNormal.applyMatrix4( this.rotationMatrix );
    
        return this.visibleView.dot( this.visibleNormal ) < 0;
    }

    private refractorNormal: THREE.Vector3 = new THREE.Vector3();
    private refractorScale: THREE.Vector3 = new THREE.Vector3();
	private refractorPosition = new THREE.Vector3();
	private refractorQuaternion:  THREE.Quaternion = new THREE.Quaternion();
	
    protected updateRefractorPlane() {
        this.matrixWorld.decompose( this.refractorPosition, this.refractorQuaternion, this.refractorScale );
        this.refractorNormal.set( 0, 0, 1 ).applyQuaternion( this.refractorQuaternion ).normalize();

        // flip the normal because we want to cull everything above the plane
        this.refractorNormal.negate();

        this.refractorPlane.setFromNormalAndCoplanarPoint( this.refractorNormal, this.refractorPosition );
    }

    updateTextureMatrix( camera ) {
        // this matrix does range mapping to [ 0, 1 ]
        this.textureMatrix.set(
            0.5, 0.0, 0.0, 0.5,
            0.0, 0.5, 0.0, 0.5,
            0.0, 0.0, 0.5, 0.5,
            0.0, 0.0, 0.0, 1.0
        );

        // we use "Object Linear Texgen", so we need to multiply the texture matrix T
        // (matrix above) with the projection and view matrix of the virtual camera
        // and the model matrix of the refractor
        this.textureMatrix.multiply( camera.projectionMatrix );
        this.textureMatrix.multiply( camera.matrixWorldInverse );
        this.textureMatrix.multiply( this.matrixWorld );
    }

    private clipPlane: THREE.Plane = new THREE.Plane();
    private clipVector: THREE.Vector4 = new THREE.Vector4();
    private q: THREE.Vector4 = new THREE.Vector4();

    updateVirtualCamera(camera) {
        this.virtualCamera.matrixWorld.copy( camera.matrixWorld );
        this.virtualCamera.projectionMatrix.copy( camera.projectionMatrix );
        this.virtualCamera.matrixWorldInverse.getInverse( this.virtualCamera.matrixWorld );
        this.virtualCamera.near = camera.near; // used in WebGLBackground
        this.virtualCamera.far = camera.far; // used in WebGLBackground

        // The following code creates an oblique view frustum for clipping.
        // see: Lengyel, Eric. “Oblique View Frustum Depth Projection and Clipping”.
        // Journal of Game Development, Vol. 1, No. 2 (2005), Charles River Media, pp. 5–16
        this.clipPlane.copy( this.refractorPlane );
        this.clipPlane.applyMatrix4( this.virtualCamera.matrixWorldInverse );
        this.clipVector.set( this.clipPlane.normal.x, this.clipPlane.normal.y, this.clipPlane.normal.z, this.clipPlane.constant );

        // calculate the clip-space corner point opposite the clipping plane and
        // transform it into camera space by multiplying it by the inverse of the projection matrix
        var projectionMatrix = this.virtualCamera.projectionMatrix;

        this.q.x = ( Math.sign( this.clipVector.x ) + projectionMatrix.elements[ 8 ] ) / projectionMatrix.elements[ 0 ];
        this.q.y = ( Math.sign( this.clipVector.y ) + projectionMatrix.elements[ 9 ] ) / projectionMatrix.elements[ 5 ];
        this.q.z = - 1.0;
        this.q.w = ( 1.0 + projectionMatrix.elements[ 10 ] ) / projectionMatrix.elements[ 14 ];

        // calculate the scaled plane vector
        this.clipVector.multiplyScalar( 2.0 / this.clipVector.dot( this.q ) );

        // replacing the third row of the projection matrix
        projectionMatrix.elements[ 2 ] = this.clipVector.x;
        projectionMatrix.elements[ 6 ] = this.clipVector.y;
        projectionMatrix.elements[ 10 ] = this.clipVector.z + 1.0 - this.clipBias;
        projectionMatrix.elements[ 14 ] = this.clipVector.w;
    }

    refractorViewport: THREE.Vector4 = new THREE.Vector4();

    render( renderer, scene, camera: THREE.PerspectiveCamera ) {
        this.visible = false;
    
        var currentRenderTarget = renderer.getRenderTarget();
        var currentVrEnabled = renderer.vr.enabled;
        var currentShadowAutoUpdate = renderer.shadowMap.autoUpdate;
        var currentMaterialOverride = scene.overrideMaterial;

        scene.overrideMaterial = this.depthTestMaterial;
        renderer.vr.enabled = false; // avoid camera modification
        renderer.shadowMap.autoUpdate = false; // avoid re-computing shadows

        renderer.render( scene, this.virtualCamera, this.renderTarget, true );

        renderer.vr.enabled = currentVrEnabled;
        renderer.shadowMap.autoUpdate = currentShadowAutoUpdate;
        scene.overrideMaterial = currentMaterialOverride;
        renderer.setRenderTarget( currentRenderTarget );

        // restore viewport
        var bounds = (camera as any).bounds;
        if ( bounds !== undefined ) {
            var size = renderer.getSize();
            var pixelRatio = renderer.getPixelRatio();

            this.refractorViewport.x = bounds.x * size.width * pixelRatio;
            this.refractorViewport.y = bounds.y * size.height * pixelRatio;
            this.refractorViewport.z = bounds.z * size.width * pixelRatio;
            this.refractorViewport.w = bounds.w * size.height * pixelRatio;

            renderer.state.viewport( this.refractorViewport );
        }

        //this.visible = true;
    }
    
    onBeforeRender = ( renderer, scene, camera: THREE.PerspectiveCamera ) => {
        // ensure refractors are rendered only once per frame
        if ( camera.userData.depthTester === true ) return;
    
        // avoid rendering when the refractor is viewed from behind
        if ( ! this.visibilityTest( camera ) === true ) return;
    
        // update
        this.updateRefractorPlane();
        this.updateTextureMatrix( camera );
        this.updateVirtualCamera( camera );
        this.render( renderer, scene, camera );

        camera.userData.depthTester = true
    };

    onAfterRender = ( renderer, scene, camera: THREE.PerspectiveCamera) => {
        camera.userData.depthTester = false;
    }

	getRenderTarget() {
		return this.renderTarget;
    }
}