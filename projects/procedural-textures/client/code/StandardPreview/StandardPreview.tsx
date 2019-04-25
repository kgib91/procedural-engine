import * as React from 'react';
import "./standardpreview.scss";
import * as THREE from 'three';
import 'three/examples/js/shaders/CopyShader.js';
import 'three/examples/js/postprocessing/EffectComposer.js';
import 'three/examples/js/postprocessing/RenderPass.js';
import 'three/examples/js/postprocessing/ShaderPass.js';


export interface StandardPreviewProps {
    color: HTMLCanvasElement;
    displacement: HTMLCanvasElement;
}

export interface StandardPreviewState {
}

export class StandardPreview extends React.Component<StandardPreviewProps, StandardPreviewState> {
    private renderCanvas: HTMLCanvasElement;
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private material: THREE.MeshStandardMaterial;
    private opacityMaterial: THREE.MeshStandardMaterial;
    private mesh: THREE.Mesh;
    
    constructor(props: StandardPreviewProps) {
        super(props);
        this.renderCanvas = null;
        this.state = {
        };
    }
    
    setupCanvas(canvas: HTMLCanvasElement) {
        this.renderCanvas = canvas;
    }

    componentDidMount() {
        this.initializeStandardPreview();
    }

    componentWillUnmount() {
        this.disposeStandardPreview();
    }
    
    initializeStandardPreview() {
        if(this.renderCanvas != null) {
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.renderCanvas,
                alpha: true
            });

            var rendererBounds = this.renderCanvas.getBoundingClientRect();
            this.renderer.autoClear = false;
            this.renderer.setPixelRatio( window.devicePixelRatio );
            this.renderer.setSize( rendererBounds.width, rendererBounds.height );
            this.renderer.setClearColor( 0xFFFFFF, 0.0 );

            this.scene = new THREE.Scene();
            
            this.camera = new THREE.PerspectiveCamera( 45, rendererBounds.width / rendererBounds.height, 1, 10000 );
            //controls.update() must be called after any manual changes to the camera's transform
            this.camera.position.set( 0, 0, 3 );

            var light = new THREE.DirectionalLight( 0xffffff );
            light.position.set( 1, 1, 1 );
            this.scene.add( light );

            this.opacityMaterial = new THREE.MeshStandardMaterial();
            this.opacityMaterial.displacementScale = 0.25;
            this.opacityMaterial.needsUpdate = true;

            var geometry = new THREE.SphereBufferGeometry(0.5, 256, 256); 
            this.material = new THREE.MeshStandardMaterial();
            this.material.displacementScale = 0.25;
            this.material.needsUpdate = true;

            this.mesh = new THREE.Mesh(geometry, this.material);
            this.scene.add(this.mesh);
            
            this.animate();
            setInterval(() => {
                this.animate();
            }, 1000/60)
        }
    }

    createBoxSphereProjection(w, h, d, sx, sy, sz) {
        // geometry
        var geometry = new THREE.BoxGeometry( w, h, d, sx, sy, sz );

        // morph box into a sphere
        for ( var i = 0; i < geometry.vertices.length; i ++ ) {

            geometry.vertices[ i ].normalize().multiplyScalar( 0.5 ); // or whatever size you want

        }

        // texture is a collage; set offset/repeat per material index
        var repeat = new THREE.Vector2( 1/3, 1/2 );
        var offsets = [ 
            new THREE.Vector2( 0, 0 ),
            new THREE.Vector2( 0, 1/2 ),
            new THREE.Vector2( 1/3, 0 ),
            new THREE.Vector2( 1/3, 1/2 ),
            new THREE.Vector2( 2/3, 0 ),
            new THREE.Vector2( 2/3, 1/2 )
        ];

        // redefine vertex normals consistent with a sphere; reset UVs
        for ( var i = 0; i < geometry.faces.length; i ++ ) {

            var face = geometry.faces[ i ];

            face.vertexNormals[ 0 ].copy( geometry.vertices[ face.a ] ).normalize();
            face.vertexNormals[ 1 ].copy( geometry.vertices[ face.b ] ).normalize();
            face.vertexNormals[ 2 ].copy( geometry.vertices[ face.c ] ).normalize();

            var uvs = geometry.faceVertexUvs[ 0 ];

            for ( var j = 0; j < 3; j ++ ) {

                uvs[ i ][ j ].multiply( repeat ).add( offsets[ face.materialIndex ] );

            }

            // face.normal - will not be used; don't worry about it

        }

        return geometry;
    }

    animate() {
        if(this.renderer != null) {
            this.mesh.rotateY(0.01);

            this.renderer.clear(true, true, true);
            var currentMaterial = this.scene.overrideMaterial;
            this.scene.overrideMaterial = this.opacityMaterial;
            this.renderer.render(this.scene, this.camera, null, false);
            this.scene.overrideMaterial = currentMaterial;
            
            this.renderer.render(this.scene, this.camera, null, false);
        }
    }

    disposeStandardPreview() {
        if(this.renderer != null) {
            this.renderer.dispose();
            delete this.camera;
            delete this.material;
            delete this.scene;
            delete this.renderer;
        }
    }

    render() {
        if(this.material != null) {
            if(this.props.color != null) {
                var colorTexture = new THREE.Texture(this.props.color);
                colorTexture.needsUpdate = true;
                this.material.map = colorTexture;
                this.material.needsUpdate = true;
            }

            if(this.props.displacement != null) {
                var displacementTexture = new THREE.Texture(this.props.displacement);
                displacementTexture.needsUpdate = true;
                this.material.displacementMap = displacementTexture;
                this.material.needsUpdate = true;

                this.opacityMaterial.displacementMap = displacementTexture;
                this.opacityMaterial.needsUpdate = true;
            }
        }

        return (
            <div className='standardPreview'>
                <canvas ref={(canvas) => this.setupCanvas(canvas)} />
            </div>
        )
    }
}