import * as React from "react";
import * as Goblin from "goblinphysics";
import * as THREE from "three";

const ThreeBSP = require('three-js-csg')(THREE);
(window as any).THREE = THREE;
import 'three/examples/js/controls/TransformControls.js';
import 'three/examples/js/controls/TrackballControls.js';

import EffectComposer, { RenderPass, CopyShader, ShaderPass } from "three-effectcomposer-es6";

import SSAOPass from "./postprocessing/SSAOPass";

import ModExpression, { ModScope, ModScopeInspector, ModDictionary, isModFunctionCall, ModFunctionCall, ModVariable, IModFunction, isValuesLink, isValuesMathLink, ModValuesLink } from "../../mod/ModExpression";
import { isNumber, isUndefined } from "util";

import DatGui, { DatFolder, DatBoolean, DatButton, DatNumber, DatString, DatColor, DatSelect, DatPresets } from 'react-dat-gui';
import { MeshNormalMaterial, MeshFaceMaterial, MeshLambertMaterial, MeshPhongMaterial, MeshStandardMaterial, WebGLDepthBuffer, Vector3, Object3D } from "three";

export interface IOcclusionTest {
    target: string;
    test: string;
}

export interface IClipTest {
    target: string;
    operation: string;
}

export interface IDeferredTest<T> {
    mesh: THREE.Mesh;
    tests: T[];
}

export interface ModProc {
    name: string;
    clipTests: IClipTest[];
    wireframe: boolean;
    color: THREE.Color;
    visible: boolean;
    occlusionTests: IOcclusionTest[]
    scale: THREE.Vector3;
    position: THREE.Vector3;
    rotation: THREE.Vector3;
    geometry: THREE.Geometry;
    boundingBox: THREE.Box3;
    children: ModProc[];
}

export interface ModRendererOptions {
    selected_module: string;
    selected_material: string;
}

export interface ModRendererState {
    availModules: string[];
    quality_mode: boolean;
    data: ModRendererOptions;
}

export class ModRenderer extends React.Component<any, ModRendererState> {
    modExpression: ModExpression;
    renderTarget: HTMLCanvasElement;

    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    group: THREE.Group;
    camera: THREE.PerspectiveCamera;
    geometry: THREE.BoxGeometry;
    material: THREE.MeshNormalMaterial; 

    trackball: THREE.TrackballControls;
    control: THREE.TransformControls;
    composer: EffectComposer;

    light: THREE.DirectionalLight;

    ambientOcclusionPass: SSAOPass;

    modSelect: DatSelect;

    goblinWorld: any;

    rotVelocities = {
        x: 0.01,
        y: 0.001,
        z: 0.02
    };

    componentWillMount() {
        this.setState({
            quality_mode: false,
            availModules: [],
            data: {
                selected_module: 'Default',
                selected_material: 'MeshBasicMaterial'
            }
        });

        window.addEventListener( 'keydown', (event) => {
            switch ( event.keyCode ) {
                case 81: // Q
                    this.setState({ quality_mode: !this.state.quality_mode });
                case 70: // F
                    this.fitCameraToObject(this.group);
                    break;
                case 49:
                    this.group.lookAt(this.group.position.clone().add(new THREE.Vector3(0, 10, 0)));
                    break;
                case 50:
                    this.group.lookAt(this.group.position.clone().add(new THREE.Vector3(0, -10, 0)));
                    break;
                case 51:
                    this.group.lookAt(this.group.position.clone().add(new THREE.Vector3(10, 0, 0)));
                    break;
                case 52:
                    this.group.lookAt(this.group.position.clone().add(new THREE.Vector3(-10, 0, 0)));
                    break;
                case 53:
                    this.group.lookAt(this.group.position.clone().add(new THREE.Vector3(0, 0, 10)));
                    break;
                case 54:
                    this.group.lookAt(this.group.position.clone().add(new THREE.Vector3(0, 0, -10)));
                    break;
                case 88: // X
                    this.regenerate();
                    break;
                case 84: // T
                    if(this.control != null) this.control.setMode( 'translate' );
                    break;
                case 82: // R
                    if(this.control != null) this.control.setMode( 'rotate' );
                    break;
                case 83: // S
                    if(this.control != null) this.control.setMode( 'scale' );
                    break;
                case 187:
                case 107: // +, =, num+
                    if(this.control != null) this.control.setSize( this.control.size + 0.1 );
                    break;
                case 189:
                case 109: // -, _, num-
                    if(this.control != null) this.control.setSize( Math.max( this.control.size - 0.1, 0.1 ) );
                    break;
            }
        });
    }

    componentDidMount() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.renderTarget,
            alpha: false,
            antialias: false,
            logarithmicDepthBuffer: false
        });

        this.renderer.setClearColor('#6495ED');

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 10 );
        
        this.light = new THREE.DirectionalLight(new THREE.Color(1, 1, 1), 2);
        this.light.position.set(0, -20, 0);
        this.scene = new THREE.Scene();
        this.group = new THREE.Group();
        
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        
        this.ambientOcclusionPass = new SSAOPass(this.scene, this.camera);
        this.ambientOcclusionPass.onlyAO = false;
        this.ambientOcclusionPass.radius = 1;
        this.ambientOcclusionPass.aoClamp = 0.8;
        this.ambientOcclusionPass.lumInfluence = 0.75;
        this.composer.addPass(this.ambientOcclusionPass);

        // 1. EffectCopy, which output the result as is:
        var copyPass = new ShaderPass(CopyShader);
        copyPass.renderToScreen = true;
        this.composer.addPass(copyPass);

        this.scene.add(this.group);

        this.control = new THREE.TransformControls( this.camera, this.renderer.domElement );
        this.control.setMode( "rotate" );
/*
        this.trackball = new THREE.TrackballControls( this.camera );
        this.trackball.rotateSpeed = 1.0;
        this.trackball.zoomSpeed = 1.2;
        this.trackball.panSpeed = 0.8;
        this.trackball.noZoom = false;
        this.trackball.noPan = false;
        this.trackball.staticMoving = true;
        this.trackball.dynamicDampingFactor = 0.3;
        this.trackball.keys = [ 65, 83, 68 ];
*/
        (window as any).scene = this.scene;

        if(this.control != null) {
            this.scene.add(this.control);
            this.control.attach( this.group );
            
            this.control.update();
        }

        this.renderScene();
    }

    renderScene() {
        if(this.control != null) {
            this.control.update();
        }
        if(this.trackball != null) {
            this.trackball.update()
        }

        if(this.state.quality_mode) {
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }

        window.requestAnimationFrame(() => this.renderScene());
    }

    clearScene() {
        while(this.group.children.length > 0) {
            this.group.remove(this.group.children[0]);
        }
    }

    clearMod() {
        this.clearScene();

        this.setState({
            availModules: [],
            data: {
                selected_module: this.state.data.selected_module,
                selected_material: this.state.data.selected_material || 'MeshBasicMaterial'
            }
        });
    }

    computeGeometryChecksum(geom: THREE.Geometry) {
        return geom.vertices.map(function( vertex ){
            return [vertex.x.toPrecision(3), vertex.y.toPrecision(3), vertex.z.toPrecision(3)]
        }).join(',');
    }

    generateMod(scopes: ModDictionary, name: string) {
        try {
            var proc = this.buildProcFromMod(scopes[name], scopes);
            var deferredClipping: IDeferredTest<IClipTest>[] = [];
            var deferredOcclusion: IDeferredTest<IOcclusionTest>[] = [];
            var generatedGroup = this.buildGroupFromProc(proc, null, deferredOcclusion, deferredClipping, {});

            if(generatedGroup == null) {
                return;
            }
            
            generatedGroup.updateMatrix();
            generatedGroup.updateMatrixWorld(true);
            for(var i = 0; i < deferredOcclusion.length; ++i) {
                var mesh = deferredOcclusion[i].mesh;
                var occTests = deferredOcclusion[i].tests;
                const box: THREE.Mesh = mesh;
                box.updateMatrix();
                box.updateMatrixWorld(true);
                box.geometry.applyMatrix(box.matrixWorld);
                box.geometry.computeBoundingBox();
                const bBSP = new ThreeBSP(box);

                for(var  j = 0; j < occTests.length; ++j) {
                    if(mesh.parent == null) {
                        continue;
                    }
                    var occTest = occTests[j];
                    var findResults = this.findRelativeObjects(mesh, occTest.target);
                    for(var f = 0; f < findResults.length; ++f) {
                        var findResult = findResults[f];
                        for(var q = 0; q < findResult.children.length; ++q) {
                            var target = findResult.children[q].children[0];
                            if(mesh.parent == null || target == null || target.uuid == mesh.uuid) {
                                continue;
                            }

                            const sphere: THREE.Mesh = target as THREE.Mesh;

                            sphere.updateMatrix();
                            sphere.updateMatrixWorld(true);
                            
                            var boundingBox = sphere.geometry.boundingBox.applyMatrix4(sphere.matrixWorld);

                            sphere.geometry.applyMatrix(sphere.matrixWorld);

                            sphere.updateMatrix();
                            sphere.updateMatrixWorld(true);
                            
                            // todo: need more precise than bounding box because of rotation
                            if(!sphere.geometry.boundingBox.intersectsBox(box.geometry.boundingBox)) {
                                sphere.geometry.applyMatrix(sphere.matrixWorld.getInverse(sphere.matrixWorld));
                                continue;
                            }
        
                            const sBSP = new ThreeBSP(sphere);
                            
                            const sub = bBSP.subtract(sBSP);
                            sphere.geometry.applyMatrix(sphere.matrixWorld.getInverse(sphere.matrixWorld));
        
                            var subGeom: THREE.Geometry = sub.toGeometry();
                            if(subGeom.vertices.length > 0) {
                                if(occTests[j].test == 'partial') {
                                    if(mesh.parent != null) {
                                        mesh.parent.remove(mesh);
                                        mesh.remove();
                                    }
                                }
                            } else {
                                if(mesh.parent != null) {
                                    mesh.parent.remove(mesh);
                                    mesh.remove();
                                }
                            }
                        }
                    }
                }

                box.geometry.applyMatrix(box.matrixWorld.getInverse(box.matrixWorld));
                box.geometry.computeBoundingBox();
            }

            for(var i = 0; i < deferredClipping.length; ++i) {
                var mesh = this.findRelativeObjectByUUID(generatedGroup, deferredClipping[i].mesh.uuid) as THREE.Mesh;
                if(mesh == null) {
                    continue;
                }
                var clpTests = deferredClipping[i].tests;
                
                var box: THREE.Mesh = mesh;
                box.updateMatrixWorld(true);
                box.geometry.applyMatrix(box.matrixWorld);
                box.geometry.computeBoundingBox();
                var bBSP = new ThreeBSP(box);

                for(var  j = 0; j < clpTests.length; ++j) {
                    if(mesh.parent == null) {
                        continue;
                    }
                    var clipTest = clpTests[j];
                    var findResults = this.findRelativeObjects(mesh, clipTest.target);
                    for(var f = 0; f < findResults.length; ++f) {
                        var findResult = findResults[f];
                        for(var q = 0; q < findResult.children.length; ++q) {
                            var target = findResult.children[q].children[0];
                            if(mesh.parent == null || target == null || target.uuid == mesh.uuid) {
                                continue;
                            }

                            generatedGroup.updateMatrixWorld(true);

                            const sphere: THREE.Mesh = target as THREE.Mesh;
                            if(sphere.uuid == box.uuid) {
                                continue;
                            }
                            sphere.updateMatrix();
                            sphere.updateMatrixWorld(true);
                            
                            sphere.geometry.applyMatrix(sphere.matrixWorld);

                            sphere.updateMatrix();
                            sphere.updateMatrixWorld(true);

                            sphere.geometry.computeBoundingBox();
                            if(!sphere.geometry.boundingBox.intersectsBox(box.geometry.boundingBox)) {
                                
                                sphere.geometry.applyMatrix(sphere.matrixWorld.getInverse(sphere.matrixWorld));
                                continue;
                            }

                            const sBSP = new ThreeBSP(sphere);
                            bBSP = bBSP[clipTest.operation.toLowerCase()](sBSP);
                            
                            sphere.geometry.applyMatrix(sphere.matrixWorld.getInverse(sphere.matrixWorld));
                        }
                    }

                    var newBox: THREE.Mesh = bBSP.toMesh();

                    if((newBox.geometry as THREE.Geometry).vertices.length > 0) {
                        (newBox.material as any).color = ((mesh as THREE.Mesh).material as any).color;
                        newBox.parent = mesh.parent;
                        newBox.name = mesh.name;
                        newBox.uuid = mesh.uuid;
                        newBox.geometry.applyMatrix(box.matrixWorld.getInverse(box.matrixWorld));
                        newBox.geometry.computeVertexNormals();
                        newBox.geometry.computeBoundingBox();
                        mesh.parent.add(newBox);

                        if(mesh.parent != null) {
                            mesh.parent.remove(mesh);
                        }
                        mesh.remove();

                        mesh = newBox;

                        // update box
                        box = newBox;
                        box.updateMatrixWorld(true);
                        box.geometry.applyMatrix(box.matrixWorld);
                        box.geometry.computeBoundingBox();
                        bBSP = new ThreeBSP(box);
                    }
                }
                
                box.geometry.applyMatrix(box.matrixWorld.getInverse(box.matrixWorld));
                box.geometry.computeBoundingBox();
            }
            
            this.clearScene();
            this.group.add(generatedGroup);

            this.fitCameraToObject(this.group);
        } catch(ex) {
            console.error(ex)
        }
    }

    fitCameraToObject(object: THREE.Object3D) {
        var boundingBox = new THREE.Box3();
    
        // get bounding box of object - this will be used to setup controls and camera
        boundingBox.setFromObject( object );
    
        var center = boundingBox.getCenter(object.position);
        var size = boundingBox.getSize(object.position);
    
        const maxDim = Math.max( size.x, size.y, size.z ) * 0.5;
        this.camera.position.z = maxDim;

        var groupPos = size.clone().multiplyScalar(-0.5);
        this.group.position.set(groupPos.x, groupPos.y, groupPos.z);
    
        var near = maxDim * 0.99;
        var far = maxDim * 4.5;
        this.camera.near = near;
        this.camera.far = far;

        this.camera.lookAt( center );
        this.light.lookAt( center );

        this.camera.updateProjectionMatrix();
        this.ambientOcclusionPass.updateCamera(this.camera.near, this.camera.far);
    }

    findRelativeObjectByUUID(obj: THREE.Object3D, uuid: string): THREE.Object3D {
        var parent = obj
        while(parent.parent != null) {
            parent = parent.parent;
        }

        var stack = [parent];
        while(stack.length > 0) {
            var item = stack.pop();
            if(item.uuid == uuid) {
                return item;
            }
            for(var i = 0; i < item.children.length; ++i) {
                stack.push(item.children[i]);
            }
        }
        return null;
    }

    findRelativeObjects(obj: THREE.Object3D, name: string): THREE.Object3D[] {
        var found = [];
        var parent = obj
        while(parent.parent != null) {
            parent = parent.parent;
        }

        var stack = [parent];
        while(stack.length > 0) {
            var item = stack.pop();
            if(item.name == name) {
                found.push(item);
            }
            for(var i = 0; i < item.children.length; ++i) {
                stack.push(item.children[i]);
            }
        }
        return found;
    }

    buildGroupFromProc(proc: ModProc, parent: ModProc, deferredOcclusion: IDeferredTest<IOcclusionTest>[], deferredClipping: IDeferredTest<IClipTest>[], selectorLookup: { [name: string]: THREE.Object3D }): THREE.Group {
        var group = new THREE.Group();
        if(!proc.visible) {
            group.visible = false;
        }
        group.name = proc.name;

        if(proc.geometry != null) {
            var material = new THREE[this.state.data.selected_material]({
                roughness: 2,
                flatShading: true,
                color: parent.color,
                wireframe: parent.wireframe || proc.wireframe
            });
            var mesh = new THREE.Mesh( proc.geometry.clone(), material );
            mesh.name = group.name;

            group.add(mesh);

            var occTests = parent.occlusionTests.concat(proc.occlusionTests);
            if(occTests.length > 0) {
                deferredOcclusion.push({ mesh: mesh, tests: occTests });
            }

            var clpTests = parent.clipTests.concat(proc.clipTests);
            if(clpTests.length > 0) {
                deferredClipping.push({ mesh: mesh, tests: clpTests });
            }
            
        }
        group.scale.set(proc.scale.x, proc.scale.y, proc.scale.z);

        group.rotateOnAxis(new THREE.Vector3(1, 0, 0), proc.rotation.x);
        group.rotateOnAxis(new THREE.Vector3(0, 1, 0), proc.rotation.y);
        group.rotateOnAxis(new THREE.Vector3(0, 0, 1), proc.rotation.z);
        
        group.position.set(proc.position.x, proc.position.y, proc.position.z);     
        for(var i = 0; i < proc.children.length; ++i) {
            var childProc = proc.children[i];
            var childGroup = this.buildGroupFromProc(childProc, proc, deferredOcclusion, deferredClipping, selectorLookup);
            if(childGroup != null) {
                group.add(childGroup);
            }
        }
        return group;
    }

    setModExpression(modName: string, mod: ModExpression) {
        this.clearMod();

        const { data } = this.state;
        var availModules = [];

        console.debug('setModExpression:', modName, mod);

        this.modExpression = mod;
        for(var name in mod.scopes) {
            availModules.push(name);
        }
        var firstMod = mod.defaultScope || availModules[0];

        if(data.selected_module == 'Default') {
            data.selected_module = firstMod;
        }

        if(availModules.indexOf(data.selected_module) < 0) {
            data.selected_module = firstMod;
        }

        if(this.modSelect != null) {
            this.modSelect.setState({ value: data.selected_module, options: availModules });
        }   
        this.generateMod(mod.scopes, data.selected_module);
        this.setState({ availModules: availModules, data });
    }

    forceChildInheritProperties(parent: ModProc, child: ModProc) {
        child.color.set(parent.color);
        child.visible = parent.visible;
        child.wireframe = parent.wireframe;
        child.clipTests = parent.clipTests;
        child.occlusionTests = parent.occlusionTests;
    }

    buildProcFromMod(scope: ModScope, siblings: ModDictionary = null, parentVariables: ModVariable[] = null): ModProc {
        var scopes  = scope.scopes;
        var scopedSiblings = ModScopeInspector.mergeScopes(scopes, siblings);
        var variables = scope.variables;
        var scopedVariables = variables;
        if(parentVariables != null) {
            scopedVariables = scopedVariables.concat(parentVariables);
        }
        
        var proc: ModProc = {
            name: scope.name,
            clipTests: [],
            wireframe: false,
            visible: true,
            occlusionTests: [],
            color: new THREE.Color(1, 1, 1),
            scale: new THREE.Vector3(1, 1, 1),
            position: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Vector3(0, 0, 0),
            geometry: null,
            children: [],
            boundingBox: new THREE.Box3(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0))
        };

        scope.properties.forEach(property => {
            switch(property.name) {
                case 'scale':
                    var scale = [proc.scale.x, proc.scale.y, proc.scale.y];
                    for(var  i = 0; i < property.value.length; ++i) {
                        scale[i] = this.getVariableValue(scopedVariables, property.value[i%property.value.length]) as number;
                    }
                    proc.scale.x = scale[0];
                    proc.scale.y = scale[1];
                    proc.scale.z = scale[2];
                    break;
                case 'module':
                case 'instance':
                    var propValue = this.getVariableValue(scopedVariables, property.value);
                    var targets = Array.isArray(propValue) ? propValue : [propValue];
                    for(var j = 0; j < targets.length; ++j) {
                        var instance: ModProc = null;
                        var targetName = targets[j];

                        if(scopedSiblings[targetName] != null) {
                            instance = this.buildProcFromMod(scopedSiblings[targetName], scopedSiblings, scopedVariables);
                            this.addChild(proc, instance);
                        } else if(targetName instanceof Object && isModFunctionCall(targetName)) {
                            var func: ModFunctionCall = targetName;
                            instance = this.procFunctionCall(proc, scopedSiblings, scopedVariables, func.name, func.arguments);
                            this.addChild(proc, instance);
                        }

                        if(instance != null && property.name === 'module') {
                            this.forceChildInheritProperties(proc, instance);
                        }
                    }
                    
                    break;
                case 'visible':
                    var val = this.getVariableValue(scopedVariables, property.value);
                    if(val === 'debug') {
                        (proc.visible as any) = 'debug';
                    }
                    if(val === true) {
                        proc.visible = true;
                    }
                    if(val === false) {
                        proc.visible = false;
                    }
                    break;
                case 'wireframe':
                    var val = this.getVariableValue(scopedVariables, property.value);
                    if(val === true) {
                        proc.wireframe = true;
                    }
                    if(val === false) {
                        proc.wireframe = false;
                    }
                    break;
                case 'occlude':
                    var val = this.getVariableValue(scopedVariables, property.value);
                    var [target, test] = val;
                    proc.occlusionTests.push({ target, test });
                    break;
                case 'clip':
                    var val = this.getVariableValue(scopedVariables, property.value);
                    var [ target, operation ] = val;
                    proc.clipTests.push({ target, operation });
                    break;
                case 'color':
                    var args = [];
                    if(Array.isArray(property.value)) {
                        for(var i = 0; i < property.value.length; ++i) {
                            args.push(this.getVariableValue(scopedVariables, property.value[i]));
                        }
                    } else {
                        args = this.getVariableValue(scopedVariables, property.value) as any[];
                    }
                    var color = new THREE.Color(args[0], args[1], args[2]);

                    proc.color.set(color);
                    break;
                case 'move':
                    var args = [];
                    for(var i = 0; i < property.value.length; ++i) {
                        args.push(this.getVariableValue(scopedVariables, property.value[i]));
                    }
                    proc.position.add(new THREE.Vector3(args[0], args[1], args[2]));
                    break;
                case 'rotate':
                    var args = [];
                    for(var i = 0; i < property.value.length; ++i) {
                        var val = this.getVariableValue(scopedVariables, property.value[i]);
                        if(val < 0) {
                            val = 360 - (Math.abs(val) % 360);
                        }
                        args.push((val % 360) * (Math.PI / 180));
                    }
                    proc.rotation.add(new THREE.Vector3(args[0], args[1], args[2]));
                    break;
                case 'repeat':
                    var [axis, size, target] = property.value;
                    var getChild = (index, maxIndex) => {
                        var child = null;
                        if(typeof target === 'string') {
                            child = this.buildProcFromMod(scopedSiblings[target as string], scopedSiblings, scopedVariables);
                        } else if(isModFunctionCall(target)) {
                            var func: ModFunctionCall = target;
                            var distribution = [];
                            var selectedDistributionIndex = 0;
                            var interpWeight = (index / maxIndex);
                            switch(func.name) {
                                case 'probability':
                                case 'distribute':
                                    for(var i = 0; i < func.arguments.length; i += 2) {
                                        distribution.push({ perc: this.getVariableValue(scopedVariables, func.arguments[i]), module: func.arguments[i+1] });
                                    }
                                    selectedDistributionIndex = index % distribution.length;
                                    break;
                                case 'randomize':
                                case 'sequence':
                                    for(var i = 0; i < func.arguments.length; i++) {
                                        distribution.push({ module: func.arguments[i] });
                                    }
                                    if(func.name == 'randomize') {
                                        selectedDistributionIndex = Math.round(Math.random() * distribution.length) % distribution.length;
                                    } else {
                                        selectedDistributionIndex = index % distribution.length;
                                    }
                                    break;
                            }
                            var mod = distribution[selectedDistributionIndex].module;
                            child = this.buildProcFromMod(scopedSiblings[mod], scopedSiblings, scopedVariables);
                        }
                        return child;
                    }
                    var firstChild = getChild(0, 1);
                    size = this.getVariableValue(scopedVariables, size);

                    switch(axis) {
                        case 'x':
                            var boundSize = firstChild.boundingBox.getSize(firstChild.position);
                            var aCount = Math.ceil(boundSize.x / size);
                            var scaleX = size / boundSize.x;
                            for(var i = 0; i < aCount; ++i) {
                                var thisChild = getChild(i, aCount);
                                var subChild = this.cloneModProc(thisChild, true);
                                subChild.position.add(new THREE.Vector3((boundSize.x * 0.5) - (i * size) - (size * 0.5), 0, 0));
                                subChild.scale.multiply(new THREE.Vector3(scaleX, 1, 1));
                                this.addChild(proc, subChild);
                            }
                            break;
                        case 'y':
                            var boundSize = firstChild.boundingBox.getSize(firstChild.position);
                            var aCount = Math.ceil(boundSize.y / size);
                            var scaleY = size / boundSize.y;
                            for(var i = 0; i < aCount; ++i) {
                                var thisChild = getChild(i, aCount);
                                var subChild = this.cloneModProc(thisChild, true);
                                subChild.position.add(new THREE.Vector3(0, (boundSize.y * 0.5) - (i * size) - (size * 0.5), 0));
                                subChild.scale.multiply(new THREE.Vector3(1, scaleY, 1));
                                this.addChild(proc, subChild);
                            }
                            break;
                    }
                    break;
                case 'segment':
                    var [axis, shapeMeta, padding, target] = property.value;
                    var getChild = (index, maxIndex) => {
                        var child = null;
                        if(typeof target === 'string') {
                            child = this.buildProcFromMod(scopedSiblings[target as string], scopedSiblings, scopedVariables);
                        } else if(isModFunctionCall(target)) {
                            var func: ModFunctionCall = target;
                            var distribution = [];
                            var selectedDistributionIndex = 0;
                            var interpWeight = (index / maxIndex);
                            switch(func.name) {
                                case 'probability':
                                case 'distribute':
                                    for(var i = 0; i < func.arguments.length; i += 2) {
                                        distribution.push({ perc: this.getVariableValue(scopedVariables, func.arguments[i]), module: func.arguments[i+1] });
                                    }
                                    selectedDistributionIndex = index % distribution.length;
                                    break;
                                case 'randomize':
                                case 'sequence':
                                    for(var i = 0; i < func.arguments.length; i++) {
                                        distribution.push({ module: func.arguments[i] });
                                    }
                                    if(func.name == 'randomize') {
                                        selectedDistributionIndex = Math.round(Math.random() * distribution.length) % distribution.length;
                                    } else {
                                        selectedDistributionIndex = index % distribution.length;
                                    }
                                    break;
                            }
                            var mod = distribution[selectedDistributionIndex].module;
                            child = this.buildProcFromMod(scopedSiblings[mod], scopedSiblings, scopedVariables);
                        }
                        return child;
                    }

                    var shapeValue = this.getVariableValue(scopedVariables, shapeMeta);
                    if(isModFunctionCall(shapeValue)) {
                        var evaluatedFuncArgs = this.parseValueArray(variables, shapeValue.arguments);
                        shapeValue = this.modExpression.functions[shapeValue.name].function.apply(this, evaluatedFuncArgs);
                    }
                    var centroid = new THREE.Vector3(0, 0, 0);
                    var points = null;

                    if(Array.isArray(shapeValue)) {
                        points = [];
                        // convert to vectors
                        while(shapeValue.length > 0) {
                            var vecX = shapeValue.shift();
                            var point = null;
                            if(vecX instanceof Object && isModFunctionCall(vecX)) {
                                var pathArgs = this.parseValueArray(variables, vecX.arguments);
                                var [x, y, z] = pathArgs;
                                point = new THREE.Vector3(x, y, z);
                            } else if(Array.isArray(vecX)) {
                                var [x, y, z] = vecX;
                                point = new THREE.Vector3(x, y, z);
                            } else {
                                var vecY = shapeValue.shift() || 0;
                                var vecZ = shapeValue.shift() || 0;
                                point = new THREE.Vector3(vecX, vecY, vecZ);
                            }
                            centroid = centroid.add(point);
                            points.push(point);
                        }
                    }

                    centroid = centroid.divideScalar(points.length);
                    
                    if(points != null && points.length > 1) {
                        var j = 0;
                        for(var i = 0; i < points.length; ++i) {
                            var start: THREE.Vector3 = points[i].clone();
                            var end: THREE.Vector3 = points[(i+1)%points.length].clone();

                            var dif = end.clone().sub(start);
                            var dir = dif.clone().normalize();
                            var offset = start;
                            var samples = dif.length() | 0;
                            var dim = 0;
                            var pad = 0;
                            j = j % samples;
                            while(samples > (dim + pad) * 0.5) {
                                pad = this.getVariableValue(scopedVariables, padding);
                                var thisChild = getChild(j++, samples);
                                var subChild = this.cloneModProc(thisChild, true);
                                dim = (subChild.boundingBox.max.x - subChild.boundingBox.min.x) * 0.5;
                                offset = offset.add(dir.clone().multiplyScalar(dim));
                                subChild.position.add(offset.clone().sub(centroid));

                                var m1 = new THREE.Matrix4();
                                var tanA = Math.atan2(dir.y, dir.x);
                                if(axis == 'y') {
                                    subChild.rotation.add(new THREE.Vector3(0, tanA, 0));
                                }else if(axis == 'x') {
                                    subChild.rotation.add(new THREE.Vector3(0, 0, tanA));
                                }else if(axis == 'z') {
                                    subChild.rotation.add(new THREE.Vector3(tanA, 0, 0));
                                }

                                offset = offset.add(dir.clone().multiplyScalar(dim));
                                offset = offset.add(dir.clone().multiplyScalar(pad));
                                this.addChild(proc, subChild);
                                samples -= (dim * 2) + pad;
                            }
                        }
                    }
                    
                    break;
                case 'tile':
                    var [axis, times, padding, target] = property.value;
                    var getChild = (index, maxIndex) => {
                    var child = null;
                    if(typeof target === 'string') {
                        child = this.buildProcFromMod(siblings[target as string], scopedSiblings, scopedVariables);
                    } else if(isModFunctionCall(target)) {
                        var func: ModFunctionCall = target;
                        var distribution = [];
                        var selectedDistributionIndex = 0;
                        var interpWeight = (index / maxIndex);
                        switch(func.name) {
                            case 'probability':
                            case 'distribute':
                                for(var i = 0; i < func.arguments.length; i += 2) {
                                    distribution.push({ perc: this.getVariableValue(scopedVariables, func.arguments[i]), module: func.arguments[i+1] });
                                }
                                selectedDistributionIndex = index % distribution.length;
                                break;
                            case 'randomize':
                            case 'sequence':
                                for(var i = 0; i < func.arguments.length; i++) {
                                    distribution.push({ module: func.arguments[i] });
                                }
                                if(func.name == 'randomize') {
                                    selectedDistributionIndex = Math.round(Math.random() * distribution.length) % distribution.length;
                                } else {
                                    selectedDistributionIndex = index % distribution.length;
                                }
                                break;
                        }
                        var mod = distribution[selectedDistributionIndex].module;
                        child = this.buildProcFromMod(scopedSiblings[mod], scopedSiblings, scopedVariables);
                    }
                    return child;
                }

                axis = this.getVariableValue(scopedVariables, axis);
                times = this.getVariableValue(scopedVariables, times);
                padding = this.getVariableValue(scopedVariables, padding);

                var tileOffset = new THREE.Vector3(0, 0, 0); 
                switch(axis) {
                    case 'x':
                        for(var i = 0; i < times; ++i) {
                            var thisChild = getChild(i, times);
                            var subChild = this.cloneModProc(thisChild, true);
                            var w = (subChild.boundingBox.max.x - subChild.boundingBox.min.x) * 0.5;
                            tileOffset.x += w;
                            subChild.position.add(tileOffset);
                            tileOffset.x += w;
                            tileOffset.x += padding;
                            this.addChild(proc, subChild);
                        }
                        break;
                    case 'y':
                        for(var i = 0; i < times; ++i) {
                            var thisChild = getChild(i, times);
                            var subChild = this.cloneModProc(thisChild, true);
                            var h = (subChild.boundingBox.max.y - subChild.boundingBox.min.y) * 0.5;
                            tileOffset.y += h;
                            subChild.position.add(tileOffset);
                            tileOffset.y += h;
                            tileOffset.y += padding;
                            this.addChild(proc, subChild);
                        }
                        break;
                }
                proc.position.add(tileOffset.multiplyScalar(-0.5));
                break;
            }
        });

        return proc;
    }

    addChild(proc: ModProc, child: ModProc) {
        proc.boundingBox.expandByPoint(child.boundingBox.min);
        proc.boundingBox.expandByPoint(child.boundingBox.max);
        proc.children.push(child);
    }

    cloneModProc(proc: ModProc, recursive: boolean): ModProc {
        var children = [];
        if(recursive) {
            for(var i = 0; i < proc.children.length; ++i) {
                children.push(this.cloneModProc(proc.children[i], true));
            }
        }
        return {
            name: `${proc.name}`,
            clipTests: proc.clipTests,
            wireframe: proc.wireframe,
            visible: proc.visible,
            occlusionTests: proc.occlusionTests,
            color: proc.color.clone(),
            position: proc.position.clone(),
            rotation: proc.rotation.clone(),
            scale: proc.scale.clone(),
            geometry: (proc.geometry != null) ? proc.geometry : null,
            boundingBox: proc.boundingBox.clone(),
            children: children
        };
    }

    parseValue(variables: ModVariable[], val: any): string | boolean | number | any[] | ModFunctionCall {
        if(typeof val == 'string') {
            if(val[val.length - 1] == '%') {
                var perc = val.substr(0, val.length - 1);
                return parseInt(perc) / 100;
            } else if(
                val[0] == "'" &&
                val[val.length - 1] == "'"
            ) {
                val = val.substr(1, val.length - 2);
                return val;
            }
            var trueBoolean = ['true','yes','on'];
            var falseBoolean = ['false','no','off'];
            var asLower = val.toLowerCase().trim();
            if(trueBoolean.indexOf(asLower) >= 0) {
                return true;
            }
            if(falseBoolean.indexOf(asLower) >= 0) {
                return false;
            }
            var asFloat = parseFloat(asLower);
            var asInt = parseInt(asLower);
            if(!isNaN(asFloat)) {
                return asFloat;
            } else if(!isNaN(asInt)) {
                return asInt;
            }
            return val; 
        } else if(isNumber(val)) {
            return val;
        } else if(isModFunctionCall(val)) {
            var args = [];
            var func = val as ModFunctionCall;
            if(func.arguments != null) {
                for(var i = 0; i < func.arguments.length; ++i) {
                    args.push(this.getVariableValue(variables, func.arguments[i]));
                }
            }

            var actions = {
                "rand": (s: number, e: number) => {
                    s = s || 0;
                    e = e || (s+1);
                    return s + Math.random() * (e - s);
                }
            }

            var actionResult = func;
            if(actions.hasOwnProperty(func.name)) {
                actionResult = actions[func.name].apply(this, args);
            }

            return actionResult;
        }
        return null;
    }

    getVariableValue(variables: ModVariable[], source: {} | string | any[]) {
        if(Array.isArray(source)) {
            if(source[0] == '(' && source[2] == ')') {
                var args = [];
                for(var i = 0 ; i < source[1].length; ++i) {
                    args.push(this.getVariableValue(variables, source[1][i]));
                }
                return args;
            } else if(source[1] instanceof Object && isValuesMathLink(source[1])) {
                var left = this.getVariableValue(variables, source[0]);
                var right = this.getVariableValue(variables, source[1].right);
                var mathBody = `return ${left} ${source[1].operation} ${right}`;
                return (new Function(mathBody))(); 
            } else {
                var arr = source as any[];
                var args = [];
                for(var i = 0 ; i < arr.length; ++i) {
                    args.push(this.getVariableValue(variables, arr[i]));
                }
                return args;
            }
        } else if(typeof source == 'string') {
            var name = (source as string).trim();       
            for(var i = 0; i < variables.length; ++i) {
                if(variables[i].name == name) {
                    return this.getVariableValue(variables, variables[i].value);
                }
            }
        } else if (source instanceof Object) {
            if(isModFunctionCall(source)) {
                return this.parseValue(variables, source);
            }
            if(isValuesLink(source)) {
                var left = this.getVariableValue(variables, source.linkFrom);
                var right = this.getVariableValue(variables, source.linkTo);

                const regex = /\$\w+/gm;
                const str = right;
                let m;
                
                var params = [];
                while ((m = regex.exec(str)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    
                    // The result can be accessed through the `m`-variable.
                    m.forEach((match, groupIndex) => {
                        if(params.indexOf(match) < 0) {
                            params.push(match);
                        }
                    });
                }
                
                var args = [];
                for(var i = 0; i < params.length; ++i) {
                    args.push(this.getVariableValue(variables, params[i]));
                }

                return new Function(...params, `return ${left} ${right};`)(...args);
            }
            if(isValuesMathLink(source)) {
                var right = this.getVariableValue(variables, source.right);
                return `${source.operation} ${right}`;
            }
        }
        return this.parseValue(variables, source);
    }

    parseValueArray(variables: ModVariable[], args: string[]) {
        if(Array.isArray(args)) {
            var evaluatedArgs = [];
            for(var i = 0; i < args.length; ++i) {
                evaluatedArgs[i] = this.getVariableValue(variables, args[i]);
            }
            return evaluatedArgs;
        }
        return this.getVariableValue(variables, [args]);
    }

    parseDrawingSteps(variables: ModVariable[], drawingSteps: ModFunctionCall[], stepCallback: { (drawFunc: string, drawArgs: any[]) }) {
        for(var j = 0; j < drawingSteps.length; ++j) {
            var drawingStep = drawingSteps[j] as ModFunctionCall;
            var drawingArgs = this.parseValueArray(variables, drawingStep.arguments);
            stepCallback(drawingStep.name, drawingArgs);
        }
    }

    procFunctionCall(proc: ModProc, scopedSiblings: ModDictionary, variables: ModVariable[], name: string, args: any[]): ModProc {
        var shapes = ['cube','sphere','shape', 'tube'];
        if(shapes.indexOf(name) >= 0) {
            var evaluatedArgs = this.parseValueArray(variables, args);
            var geometry: THREE.Geometry = null;
            switch(name) {
                case 'cube':
                    var [ w, h, d ] = evaluatedArgs;
                    geometry = this.createCube(w, h, d);
                    break;
                case 'sphere':
                    var [ r ] = evaluatedArgs;
                    geometry = this.createSphere(r);
                    break;
                case 'tube':
                    var [ segments, radiusTop, radiusBottom, radiusSegments, closed, center, cap ] = evaluatedArgs.splice(0, 7);
                    var path = [];
                    var pathComponents = [];
                    if(evaluatedArgs.length >= 3) {
                        while(evaluatedArgs.length >= 3) {
                            if(isModFunctionCall(evaluatedArgs[0])) {
                                var functionCall = evaluatedArgs.shift();
                                var evaluatedFuncArgs = this.parseValueArray(variables, functionCall.arguments);
                                var result = this.modExpression.functions[functionCall.name].function.apply(this, evaluatedFuncArgs);
                                if(Array.isArray(result)) {
                                    pathComponents = pathComponents.concat(result);
                                } else {
                                    pathComponents.push(result);
                                }
                            } else {
                                pathComponents = pathComponents.concat(evaluatedArgs.splice(0, 3));
                            }
                        }
                    } else {
                        while(evaluatedArgs.length >= 1) {
                            var functionCall = evaluatedArgs.shift();
                            if(isModFunctionCall(functionCall)) {
                                var evaluatedFuncArgs = this.parseValueArray(variables, functionCall.arguments);
                                var result = this.modExpression.functions[functionCall.name].function.apply(this, evaluatedFuncArgs);
                                if(Array.isArray(result)) {
                                    pathComponents = pathComponents.concat(result);
                                } else {
                                    pathComponents.push(result);
                                }
                            }
                        }
                    }

                    // convert to vectors
                    while(pathComponents.length >= 3) {
                        var [x, y, z] = pathComponents.splice(0, 3);
                        path.push(new THREE.Vector3(x, y, z));
                    }
                    var curve = new THREE.CatmullRomCurve3(path);
                    
                    geometry = new THREE.TubeGeometry(curve, segments, 1, radiusSegments, closed );
                    // transform radius(bottom -> top)
                    for(var  i = 0; i < segments+1; ++i) {
                        var centroid = new THREE.Vector3();
                        for(var j = 0; j < radiusSegments; ++j) {
                            var vertIndex = j + i * radiusSegments;
                            centroid.add(geometry.vertices[vertIndex]);
                        }
                        centroid.divideScalar(radiusSegments);
                        for(var j = 0; j < radiusSegments; ++j) {
                            var vertIndex = j + i * radiusSegments;
                            var dif = geometry.vertices[vertIndex]
                                .clone()
                                .sub(centroid);
                            var radiusSize = radiusTop - radiusBottom;
                            var strideIndex = (vertIndex / radiusSegments) | 0;
                            var strideWeight = (strideIndex / (segments+1));
                            var radius = radiusBottom + (radiusSize * strideWeight);
                            geometry.vertices[vertIndex] = centroid.clone().add(dif.multiplyScalar(radius));
                        }
                    }
                    // todo: add caps
                    geometry.verticesNeedUpdate = true;
                    
                    geometry.mergeVertices();
                    if(center) {
                        geometry.center();
                    }
                    break;
                case 'shape':
                    var heartShape = new THREE.Shape();
                    var drawingSteps = this.getVariableValue(variables, args);

                    // flatten array
                    drawingSteps = [].concat.apply([], drawingSteps);

                    var [depth, center] = drawingSteps.splice(0, 2);

                    this.parseDrawingSteps(variables, drawingSteps, (drawFunc, drawArgs) => {
                        heartShape[drawFunc].apply(heartShape, drawArgs);
                    });
                    
                    var extrudeSettings = {
                        depth,
                        bevelEnabled: false,
                        bevelSegments: 1,
                        steps: 2,
                        bevelSize: 1,
                        bevelThickness: 1
                    };
                    geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
                    geometry.mergeVertices();
                    if(center) {
                        geometry.center();
                    }
                    break;
            }
            if(geometry != null) {
                geometry.computeBoundingBox();
                var newProc = {
                    name: `${proc.name}-${name}`,
                    wireframe: false,
                    clipTests: [],
                    visible: true,
                    occlusionTests: [],
                    scale: new THREE.Vector3(1, 1, 1),
                    children: [],
                    rotation: new THREE.Vector3(0, 0, 0),
                    color: new THREE.Color(1, 1, 1),
                    geometry,
                    boundingBox: geometry.boundingBox,
                    position: new THREE.Vector3(0, 0, 0)
                };
                return newProc;
            }
        }

        var modSelection = ['sequence','randomize'];
        if(modSelection.indexOf(name) >= 0) {
            var maxIndex = 10;
            var index = 10;
                var distribution = [];
                var selectedDistributionIndex = 0;
                var interpWeight = (index / maxIndex);
                switch(name) {
                    case 'probability':
                    case 'distribute':
                        for(var i = 0; i < evaluatedArgs.length; i += 2) {
                            distribution.push({ perc: this.getVariableValue(variables, args[i]), module: args[i+1] });
                        }
                        selectedDistributionIndex = index % distribution.length;
                        break;
                    case 'randomize':
                    case 'sequence':
                        for(var i = 0; i < args.length; i++) {
                            distribution.push({ module: args[i] });
                        }
                        if(name == 'randomize') {
                            selectedDistributionIndex = Math.round(Math.random() * distribution.length) % distribution.length;
                        } else {
                            selectedDistributionIndex = index % distribution.length;
                        }
                        break;
                }
                var mod = distribution[selectedDistributionIndex].module;
                return this.buildProcFromMod(scopedSiblings[mod], scopedSiblings, variables);
            
        }
        return null;
    }

    createCube(width = 1, height = 1, depth = 1) {
        var geometry = new THREE.BoxGeometry( width, height, depth );
        geometry.computeFaceNormals();
        return geometry;
    }

    createSphere(radius = 1) {
        var geometry = new THREE.SphereGeometry(radius);
        geometry.computeFaceNormals();
        geometry.computeBoundingBox();
        return geometry;
    }

    resize(w: number, h: number) {
        w = w || window.innerWidth;
        h = h || window.innerHeight;

        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(w, h);
        this.ambientOcclusionPass.setSize(w, h);

        if(this.trackball != null) {
            this.trackball.handleResize();
        }
    }

    handleUpdate = data => {
        this.setState({ data });
    }

    componentDidUpdate() {
        this.regenerate();
    }

    regenerate() {
        if(
            this.state.data.selected_module == 'Default' ||
            this.state.data.selected_module == null
        ) {
            return;
        }
        this.generateMod(this.modExpression.scopes, this.state.data.selected_module);
    }

    getSelectedModScope() {
        if(this.modExpression == null) {
            return null;
        }
        return this.modExpression.scopes[this.state.data.selected_module];
    }

    render() {
        const { availModules, data } = this.state;
        var rendererItems = [];
        if(
            availModules.length > 0 ||
            this.state.data.selected_module != 'Default'
        ) {
            rendererItems.push(<DatSelect ref={(sel) => this.modSelect = sel } key={0} path='selected_module' label='Module' options={availModules} />);
            rendererItems.push(<DatSelect key={1} path='selected_material' label='Material' options={['MeshNormalMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial', 'MeshStandardMaterial', 'MeshDepthMaterial']} />);
        }
        var variableItems = [];
        var scope = this.getSelectedModScope();
        if(scope != null) {
            var variables = scope.variables;
            for(var i = 0; i < variables.length; ++i) {
                var key = variables[i].name;
                var value = variables[i].value;
                variableItems.push(
                    <DatString key={i} path='somepath' label={key} />
                );
            }
        }
        return (
            <div>
            <DatGui data={data} onUpdate={this.handleUpdate}>
                {rendererItems}
                <DatFolder title='Module Variables' expanded={true}>
                    {variableItems}
                </DatFolder>
                <DatButton label='Regenerate' onClick={()=>{this.regenerate()}} />
            </DatGui>
            <canvas className="container" ref={(ref) => this.renderTarget = ref} />
            </div>
        );
    }
}