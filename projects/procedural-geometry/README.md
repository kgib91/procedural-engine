# procedural-engine
A typescript based engine to compile a proprietary language into java-script functions designed to construct complex 3d geometries dynamically.

# .mod language documentation
#box {
	scale: rand();
    instance: cube(1 1 1);
}

#repeated-box-y {
	repeat: y 5 #box;
}

#repeated-box-x {
	repeat: x 5 #repeated-box-y;  
}