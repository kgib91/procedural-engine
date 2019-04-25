import { PrimitiveNode } from "./Nodes/PrimitiveNode";
import { NodeGraphChannel, NodeGraphChannelDirection } from "./NodeGraphChannel";
import { NodeGraphAttribute } from "./NodeGraph";

export class NodeGraphNamespace {
    static getNodeNamespace(node: PrimitiveNode): string {
        return `~/${node.id}`;
    }

    static getChannelNamespace(channel: NodeGraphChannel): string {
        return `${this.getNodeNamespace(channel.node)}/${this.getChannelDirectionNamespace(channel.direction)}/${channel.name}`;
    }

    static getChannelDirectionNamespace(direction: NodeGraphChannelDirection): string {
        switch(direction) {
            case NodeGraphChannelDirection.Inbound:
                return 'inputs';
            case NodeGraphChannelDirection.Outbound:
                return 'outputs';
        }
        return null;
    }

    static getAttributeNamespace(attribute: NodeGraphAttribute): string {
        if(attribute.object instanceof NodeGraphChannel) {
            return `${this.getChannelNamespace(attribute.object)}/@${attribute.name}`;
        } else if(attribute.object instanceof PrimitiveNode) {
            return `${this.getNodeNamespace(attribute.object)}/@${attribute.name}`;
        }
        return null;
    }

    static isValidNamespace(namespace: string) {
        if(namespace.indexOf('/') >= 1) {
            return true;
        } else {
            return false;
        }
    }
}