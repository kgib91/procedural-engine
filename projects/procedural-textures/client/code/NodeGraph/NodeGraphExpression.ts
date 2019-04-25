import { NodeGraph, NodeGraphAttribute } from "./NodeGraph";
import { NodeGraphNamespace } from "./NodeGraphNamespace";

export class NodeGraphExpression {
    static evaluate(nodeGraph: NodeGraph, expression: string): any {
        if(expression == null) {
            return null;
        }
        if(NodeGraphNamespace.isValidNamespace(expression)) {
            var attribute = nodeGraph.getAssetByNamespace(expression) as NodeGraphAttribute;
            var sourceTextureAttribute = nodeGraph.getSourceOfTargetAttribute(attribute);
            if(sourceTextureAttribute != null) {
                return NodeGraphExpression.evaluate(nodeGraph, sourceTextureAttribute.expression);
            }
        } else if(expression[0] == '#') {
            var id = expression.substr(1);
            var domResult = nodeGraph.getNodeById(id) || document.getElementById(id);
            return domResult;
        }
        return null;
    }
}