
import * as React from "react";
import * as Enumerable from 'linq';
import "./objectinspector.scss";
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ComboBox, IComboBoxOption, IComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { ExpansionPanel } from "./ExpansionPanel";
import { IconButton, IButtonProps, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { NumberField } from "../NodeGraph/NumberField";

initializeIcons();

export interface IObjectSchema {
    [property: string]: string;
}

export class ObjectSchemaProperty {
    private propertyName: string;
    private propertyDisplayName: string;
    private propertyType: ObjectSchema;
    private propertyClassType: ObjectSchema;
    private constantValue: string;
    private decorators: string[];

    public static STR_KEY_DECORATOR = 'key'; 

    constructor(name: string, type: ObjectSchema, classType: ObjectSchema) {
        this.propertyName = name;
        this.propertyDisplayName = Enumerable.from(name.split('_')).selectMany(x => x.split('-')).selectMany(x => x.split('.')).select(x => `${x.charAt(0).toUpperCase()}${x.substr(1)}`).toArray().join('');
        this.propertyType = type;
        this.propertyClassType = classType;
        this.decorators = [];
    }

    isKey(): boolean {
        return this.hasDecorator(ObjectSchemaProperty.STR_KEY_DECORATOR);
    }

    hasDecorator(name: string): boolean {
        return this.decorators.indexOf(name) >= 0;
    }

    addDecorator(name: string) {
        this.decorators.push(name);
    }

    getName(): string {
        return this.propertyName;
    }

    getDisplayName(): string {
        return this.propertyDisplayName;
    }

    getValue(reflectedInstance: any): any {
        return reflectedInstance[this.getName()];
    }

    setConstantValue(value: string) {
        this.constantValue = value;
    }

    hasConstantValue(): boolean {
        return this.constantValue != null;
    }

    getConstantValue(): string {
        return this.constantValue;
    }

    getReflectedType(): ObjectSchema {
        return this.propertyClassType;
    }

    getType(): ObjectSchema {
        return this.propertyType;
    }
}

export class ObjectSchema {
    private decorators: string[];
    private typeName: string;
    private typeSchema: IObjectSchema;
    private genericType: ObjectSchema;
    private executingAssembly: ObjectInspectorAssembly;
    private inheritedType: ObjectSchema;

    protected static acceptedTypeDecorators = ['enum', 'flags'];
    protected static acceptedPropertyDecorators = [
        ObjectSchemaProperty.STR_KEY_DECORATOR
    ];

    constructor(name: string = null, schema: IObjectSchema = null, executingAssembly: ObjectInspectorAssembly = null) {
        if(name == null) {
            return;
        }
        this.decorators = [];
        var hasDecorator = name.indexOf(';') >= 0;
        if (hasDecorator) {
            var [decorator, name] = name.split(';');
            decorator = decorator.substr(1);
            if(ObjectSchema.acceptedTypeDecorators.indexOf(decorator) >= 0) {
                this.decorators.push(decorator);
            }
        }
        var [name, inheritType] = name.split(':');
        this.typeName = name;
        this.typeSchema = schema;
        this.executingAssembly = executingAssembly;
        if (inheritType != null) {
            this.inheritedType = this.executingAssembly.getType(inheritType);
        }
    }

    getEnumKeyByValue(value: string): string {
        var props = this.getProperties();
        return Enumerable.from(props)
            .where(x => value == x.getConstantValue())
            .select(x => x.getName())
            .firstOrDefault()
    }

    getFlagFromEnumValues(values: string[]): number {
        var result = 0;
        for(var i = 0; i < values.length; ++i) {
            result |= Number(values[i]);
        }
        return result;
    }

    getEnumValuesInFlag(flag: number): string[] {
        var props = this.getProperties();
        return Enumerable.from(props)
            .where(x => (flag & Number(x.getConstantValue())) > 0)
            .select(x => x.getConstantValue())
            .toArray();
    }

    getEnumKeysInFlag(flag: number): string[] {
        var props = this.getProperties();
        return Enumerable.from(props)
            .where(x => (flag & Number(x.getConstantValue())) > 0)
            .select(x => x.getName())
            .toArray();
    }

    hasDecorator(name: string) {
        return this.decorators.indexOf(name) >= 0;
    }

    isEnum(): boolean {
        return this.hasDecorator('enum') || this.isFlags();
    }

    isFlags(): boolean {
        return this.hasDecorator('flags');
    }

    getName(): string {
        return this.typeName;
    }

    setGenericType(type: ObjectSchema) {
        this.genericType = type;
    }

    hasInheritedType(): boolean {
        return this.inheritedType != null;
    }

    getInheritedType(): ObjectSchema {
        return this.inheritedType;
    }

    getExecutingAssembly(): ObjectInspectorAssembly {
        return this.executingAssembly;
    }

    getGenericType(): ObjectSchema {
        return this.genericType;
    }

    getProperties(): ObjectSchemaProperty[] {
        var properties = [];
        var polySchema = {};
        if (this.hasInheritedType()) {
            var inheritedSchema = this.getInheritedType().typeSchema;
            for(var inheritedPropertyName in inheritedSchema) {
                if(inheritedSchema.hasOwnProperty(inheritedPropertyName)) {
                    polySchema[inheritedPropertyName] = inheritedSchema[inheritedPropertyName];
                }
            }
        }
        for(var schemaPropertyName in this.typeSchema) {
            if(this.typeSchema.hasOwnProperty(schemaPropertyName)) {
                polySchema[schemaPropertyName] = this.typeSchema[schemaPropertyName];
            }
        }
        for (var property in polySchema) {
            if (polySchema.hasOwnProperty(property)) {
                var typeOrValue = polySchema[property];
                var prop: ObjectSchemaProperty = null;
                if (this.isEnum()) {
                    prop = new ObjectSchemaProperty(property, this.inheritedType, this);
                    prop.setConstantValue(typeOrValue);
                    properties.push(prop);
                } else {
                    var propType = null;
                    if(typeOrValue.indexOf(';') >= 0) {
                        var [decorator, typeOrValue] = typeOrValue.split(';');
                        decorator = decorator.substr(1);
                        if(ObjectSchema.acceptedPropertyDecorators.indexOf(decorator) >= 0) {
                            propType = this.executingAssembly.getType(typeOrValue);
                            prop = new ObjectSchemaProperty(property, propType, this);
                            prop.addDecorator(decorator);
                        }
                    } else {
                        propType = this.executingAssembly.getType(typeOrValue);
                        prop = new ObjectSchemaProperty(property, propType, this);
                    }
                    properties.push(prop);
                }
            }
        }
        return properties;
    }
}

export interface IObjectInspectorAssembly {
    [name: string]: IObjectSchema;
}

export interface IObjectSchemaDictionary {
    [name: string]: ObjectSchema;
}

export const JavascriptAssembly = {
    "number": {},
    "string": {},
    "boolean": {}
};

export interface NodeGraphActivator {
    (className: string): any;
}

export interface NodeGraphTypeRenderCallback {
    (
        inspector: ObjectInspectorRenderer,
        key: string,
        label: string,
        name: string,
        inspectorTypeName: string,
        disabled: boolean
    ): React.ReactNode;
}



export class ObjectInspectorAssembly {
    private name: string;
    private types: IObjectSchemaDictionary;
    private activator: NodeGraphActivator;
    private onRenderType: NodeGraphTypeRenderCallback;

    constructor(
            name: string,
            types: IObjectInspectorAssembly,
            activator: NodeGraphActivator,
            onRenderType: NodeGraphTypeRenderCallback
    ) {
        this.name = name;
        var assembly = Object.assign(JavascriptAssembly, types);
        this.types = {};
        this.activator = activator;
        this.onRenderType = onRenderType;
        for (var type in assembly) {
            if (assembly.hasOwnProperty(type)) {
                var schema = new ObjectSchema(type, assembly[type], this);
                this.types[schema.getName()] = schema;
            }
        }

    }

    activate(className: string) {
        var instance = this.activator(className);
        if(instance != null) {
            switch(className) {
                case 'number':
                    return 0;
                case 'string':
                    return "";
                case 'boolean':
                    return false;
            }
        }
        return instance;
    }

    getName(): string {
        return this.name;
    }

    getTypes(): IObjectSchemaDictionary {
        return this.types;
    }

    protected static builtInGenerics = ['array', 'readonly', 'nullable', 'dictionary'];
    
    getTypeInterface(
        inspector: ObjectInspectorRenderer,
        key: string,
        label: string,
        name: string,
        inspectorTypeName: string,
        disabled: boolean
    ) {
        return this.onRenderType(
            inspector,
            key,
            label,
            name,
            inspectorTypeName,
            disabled
        );
    }

    getType(name: string): ObjectSchema {
        if (name == null || name.trim() == '') {
            return null;
        }
        var schema = null;
        for (var i = 0; i < ObjectInspectorAssembly.builtInGenerics.length; ++i) {
            var builtInGenericClass = ObjectInspectorAssembly.builtInGenerics[i];
            if (name.indexOf(`${builtInGenericClass}<`) == 0) {
                var genericTypeName = name.substr(builtInGenericClass.length + 1, name.length - (builtInGenericClass.length + 2));
                var genericType = this.getType(genericTypeName);
                schema = new ObjectSchema(builtInGenericClass, {}, this)
                schema.setGenericType(genericType);
                return schema;
            }
        }
        return this.types[name];
    }
}

export interface ObjectInspectorRendererProps {
    onChange: { (): void };
    target?: any;
    propertyName?: string;
    propertyIndex?: number;
    label?: string;
    path?: string;
    instance: any;
    type?: string;
    schema?: ObjectSchema;
    assembly: ObjectInspectorAssembly;
    hidePropertyName?: boolean;
}

export interface ObjectInspectorRendererState {
    expandedKeys: string[];
    values: { [path: string]: any };
}

export class ObjectInspectorRenderer extends React.Component<ObjectInspectorRendererProps, ObjectInspectorRendererState> {
    protected invalidated: boolean;
    constructor(props: ObjectInspectorRendererProps) {
        super(props);
        var values = this.initializeValues(this.props);
        this.state = {
            expandedKeys: [],
            values
        };
    }

    private getValueExpression(value: any, typeName: string) {
        var typeData = this.props.assembly.getType(typeName);
        if(typeData.hasInheritedType()) {
            typeName = typeData.getInheritedType().getName();
        }
        if(value == null){
            return 'null';
        }
        switch(typeName) {
            case 'string':
                return `\`${value}\``;
            case 'number':
                return parseInt(value);
            case 'boolean':
                return value === 'true' || value === true ? 'true' : 'false'
        }
        return 'null';
    }

    setInstanceValueByPath(newValue: any, type: string, instance: any, path: string) {
        var funcSource = `${path} = ${this.getValueExpression(newValue, type)}; return _;`;
        var changedObject = (new Function('_', funcSource))(instance);
        this.props.onChange();
        this.invalidated = true;
        return changedObject;
    }

    toggleNullable(asNull: boolean, key: string, typeName: string) {
        var valueNullKey = `${key}_null`;
        this.state.values[valueNullKey] = asNull;
        if (asNull) {
            this.setInstanceValueByPath(null, typeName, this.props.instance, key);
        } else {
            this.setInstanceValueByPath(this.state.values[key], typeName, this.props.instance, key);
        }
        this.setState({ ...this.state });
    }

    private initializeValues(props: ObjectInspectorRendererProps) {
        var values = {};
        var objType = props.assembly.getType(props.type);
        if (objType != null)
        {
            if(!objType.isFlags()) {
                var properties = objType.getProperties();
                for (var i = 0; i < properties.length; ++i) {
                    var property = properties[i];
                    var key = `${props.path || '_'}.${property.getName()}`;
                    var val = property.getValue(this.getTarget(props));
                    values[key] = val;
                }
            } else {
                values[props.path] = this.getTarget(props);
            }
        }

        if (
            props.path != null &&
            props.propertyName != null &&
            this.getTarget(props) != null
        ) {
            if (props.type === 'nullable') {
                values[`${props.path}.${props.propertyName}_null`] = this.getTarget(props)[props.propertyName] == null ? true : false;
            }
            values[`${props.path}.${props.propertyName}`] = this.getTarget(props)[props.propertyName];
        }
        return values;
    }

    componentWillReceiveProps(newProps: ObjectInspectorRendererProps) {
        var values = this.initializeValues(newProps);
        this.setState({ expandedKeys: this.state.expandedKeys, values });
    }

    onChangeValue(newValue: any, key: string, typeName: string) {
        this.setInstanceValueByPath(newValue, typeName, this.props.instance, key);
        this.state.values[key] = newValue;
        this.setState({ ...this.state });
    }

    shouldComponentUpdate(
        props: ObjectInspectorRendererProps,
        state: ObjectInspectorRendererState
    ) {
        if(this.invalidated) {
            this.invalidated = false;
            return true;
        }
        if (props.instance !== this.props.instance) {
            return true;
        }
        if (state.values === this.state.values) {
            for (var path in state.values) {
                var newValue = state.values[path];
                var oldValue = this.state.values[path];
                if (newValue === oldValue) {
                    return true;
                }
            }
        }
        if (
            state.expandedKeys.length !== this.state.expandedKeys.length ||
            !Enumerable.from(state.expandedKeys).all(x => this.state.expandedKeys.indexOf(x) >= 0)
        ) {
            return true;
        }
        return false;
    }

    getTarget(props: ObjectInspectorRendererProps = null) {
        props = props || this.props;
        return props.target || props.instance;
    }

    renderInspectorOfType(name: string, inspectorType: ObjectSchema, inspectorTypeName: string, label: string) {
        var key = name == null ? this.props.path : `${this.props.path || '_'}.${name}`;
        var disabled = this.state.values[`${key}_null`] || false, nullable = false;
        var formControl = null;

        if (inspectorTypeName === "readonly") {
            disabled = true;
            inspectorType = inspectorType.getGenericType();
            inspectorTypeName = inspectorType.getName();
        } else if (inspectorTypeName === "nullable") {
            nullable = true;
            inspectorType = inspectorType.getGenericType();
            inspectorTypeName = inspectorType.getName();
        } else if (inspectorTypeName === "array") {
            inspectorType = inspectorType.getGenericType();
            inspectorTypeName = inspectorType.getName();
            return (
                <ExpansionPanel
                    key={key}
                    expanded={this.isExpanded(key)}
                    onChange={() => this.toggleExpanded(key)}
                    title={label}
                >
                    <ObjectInspectorArrayRenderer
                        key={key}
                        path={key}
                        onChange={this.props.onChange}
                        label={label}
                        instance={this.props.instance}
                        propertyName={name}
                        target={this.getTarget()[name]}
                        type={inspectorTypeName}
                        assembly={this.props.assembly}
                    />
                </ExpansionPanel>
            );
        } else if (inspectorTypeName === "dictionary") {
            inspectorType = inspectorType.getGenericType();
            inspectorTypeName = inspectorType.getName();
            return (
                <ExpansionPanel
                    key={key}
                    expanded={this.isExpanded(key)}
                    onChange={() => this.toggleExpanded(key)}
                    title={label}
                >
                    <ObjectInspectorDictionaryRenderer
                        key={key}
                        path={key}
                        label={label}
                        onChange={this.props.onChange}
                        instance={this.props.instance}
                        propertyName={name}
                        target={this.getTarget()[name]}
                        type={inspectorTypeName}
                        assembly={this.props.assembly}
                    />
                </ExpansionPanel>
            );
        } else if (inspectorType.isEnum()) {
            var multiple = false,
                selectedValue = this.state.values[key];
            
            if(inspectorType.isFlags()) {
                multiple = true;
                selectedValue = inspectorType.getEnumValuesInFlag(selectedValue);
            }

            var options = inspectorType.getProperties()
            .map((prop) => {
                return {
                    key: prop.getConstantValue(),
                    text: prop.getName()
                };
            });

            console.log('options:', options, 'selectedValue:', selectedValue);
            
            formControl =  (
                <ComboBox
                    multiSelect={multiple}
                    disabled={disabled}
                    key={key}
                    defaultSelectedKey={selectedValue}
                    options={options}
                    onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: any) => {
                        if(option == null) {
                            return;
                        }
                        if(multiple) {
                            var existingIndex = selectedValue.indexOf(option.key);
                            if(existingIndex >= 0) {
                                selectedValue.splice(existingIndex, 1);
                            } else {
                                selectedValue.push(option.key);
                            }
                        }
                        return this.onChangeValue(
                            multiple
                                ? inspectorType.getFlagFromEnumValues(selectedValue)
                                : option.text,
                            key,
                            inspectorTypeName
                        );
                    }}
                />
            );
        }


        if (formControl == null) {
            switch (inspectorTypeName) {
                case 'string':
                    formControl = <TextField
                        id={key}
                        style={{ width: '100%' }}
                        name={key}
                        key={key}
                        disabled={disabled}
                        value={this.state.values[key]}
                        onChange={(x, value) => this.onChangeValue(value, key, inspectorTypeName)}
                    />;
                    break;
                case 'number':
                    formControl = <NumberField
                        id={key}
                        style={{ width: '100%' }}
                        name={key}
                        key={key}
                        disabled={disabled}
                        value={String(this.state.values[key])}
                        onChange={(e, value) => {
                            return this.onChangeValue(parseInt(value), key, inspectorTypeName);
                        }}
                    />;
                    break;
                case 'boolean':
                    formControl = <Checkbox
                        id={key}
                        disabled={disabled}
                        key={key}
                        name={key}
                        checked={this.state.values[key]}
                        value={key}
                        onChange={(x, checked) => this.onChangeValue(checked, key, inspectorTypeName)}
                    />;
                    break;
                default:
                    if (name == null) {
                        return <span>NULL</span>;
                    }

                    var typeInterface = this.props.assembly.getTypeInterface(this, key, label, name, inspectorTypeName, disabled);
                    if(typeInterface != null) {
                        formControl = typeInterface;
                    } else {
                        return (
                            <ExpansionPanel
                                key={key}
                                expanded={this.isExpanded(key)}
                                onChange={() => this.toggleExpanded(key)}
                                title={label}
                            >
                                    <ObjectInspectorRenderer
                                        key={key}
                                        path={key}
                                        label={label}
                                        onChange={this.props.onChange}
                                        instance={this.props.instance}
                                        propertyName={name}
                                        target={this.getTarget()[name]}
                                        type={inspectorTypeName}
                                        assembly={this.props.assembly}
                                    />
                            </ExpansionPanel>
                        );
                    }
            }
        }

        var displayLabel = label || name;
        var labelAvailable = !this.props.hidePropertyName && (label || name) != null;
        var isNullKey = `${key}_null`;
        return <table className='propertyTable' key={key} style={{width:'100%'}}>
            <tbody>
                <tr>
            {
                !labelAvailable
                    ? null
                    : <td className='keyColumn' style={{width:'15%'}}>
                        <Label htmlFor={key}>{displayLabel}</Label>
                    </td>
            }
                {
                    nullable
                        ? ([
                            <td colSpan={!labelAvailable ? 2 : 1} style={{textAlign:'center'}} key={0}>
                            {formControl}
                            </td>,
                            <td key={1}>
                                <Toggle 
                                    id={key}
                                    checked={this.state.values[isNullKey]}
                                    onChange={(x, checked) => this.toggleNullable(checked, key, inspectorTypeName)}
                                />
                            </td>   
                        ])
                        : <td colSpan={!labelAvailable ? 3 : 2} style={{textAlign:'center'}}>{formControl}</td>
                }
                </tr>
            </tbody>
        </table>;
    }

    toggleExpanded(key: string) {
        if (this.isExpanded(key)) {
            var index = this.state.expandedKeys.indexOf(key);
            var expandedKeys = Enumerable.from(this.state.expandedKeys).toArray();
            expandedKeys.splice(index, 1);
            this.setState({ values: this.state.values, expandedKeys });
        } else {
            var expandedKeys = Enumerable.from(this.state.expandedKeys).toArray();
            expandedKeys.push(key);
            this.setState({ values: this.state.values, expandedKeys });
        }
    }

    isExpanded(key: string): boolean {
        return this.state.expandedKeys.indexOf(key) >= 0;
    }

    render() {
        var typeSchema = this.props.schema || this.props.assembly.getType(this.props.type);
        var children = [];
        if (typeSchema != null && !typeSchema.isEnum()) {
            var properties = typeSchema.getProperties();
            for (var i = 0; i < properties.length; ++i) {
                var property = properties[i];
                children.push(this.renderInspectorOfType(property.getName(), property.getType(), property.getType().getName(), property.getDisplayName()))
            }
        }
        if (children.length == 0) {
            console.log('log:', this.props.type, this.props.schema, typeSchema);
            return this.renderInspectorOfType(this.props.propertyName, typeSchema, typeSchema.getName(), this.props.label);
        }
        if (this.props.path == null) {
            return <div>{children}</div>
        }
        return children;
    }
};

export class ObjectInspectorDictionaryRenderer extends ObjectInspectorRenderer {
    constructor(props: ObjectInspectorRendererProps) {
        super(props);
    }

    render() {
        var type = this.props.assembly.getType(this.props.type);
        var typeProperties = Enumerable.from(type.getProperties())
            .where(x=>!x.isKey())
            .toArray();
        var keyValueRecords = [];
        for (var prop in this.props.target) {
            if (this.props.target.hasOwnProperty(prop)) {
                ((key) => {
                    var path = `${this.props.path}['${key}']`;
                    keyValueRecords.push(
                        <tr key={path}>
                            <td className='keyColumn'>{key}</td>
                            {
                                typeProperties.map((property) =>
                                    <td key={property.getName()}>
                                        <ObjectInspectorRenderer
                                            key={key}
                                            onChange={this.props.onChange}
                                            instance={this.props.instance}
                                            label={property.getDisplayName()}
                                            propertyName={property.getName()}
                                            type={property.getType().getName()}
                                            path={path}
                                            hidePropertyName={true}
                                            target={this.props.target[key]}
                                            schema={property.getType()}
                                            assembly={this.props.assembly}
                                        />
                                    </td>
                                )
                            }
                        </tr>);
                })(prop);
            }
        }

        return <table className='inspectorTable'>
            <thead>
                <tr>
                    <th className='keyColumn'>Key</th>
                    {typeProperties.map((property) => <th key={property.getName()}>{property.getDisplayName()}</th>)}
                </tr>
            </thead>
            <tbody>
                {keyValueRecords}
            </tbody>
        </table>;
    }
};

export interface ObjectInspectorArrayRendererState {
    elements: any[];
}

export class ObjectInspectorArrayRenderer extends React.Component<ObjectInspectorRendererProps, ObjectInspectorArrayRendererState> {
    constructor(props: ObjectInspectorRendererProps) {
        super(props);
        this.state = {
            elements: this.props.target
        }
    }

    addElement() {
        this.props.target.push(this.props.assembly.activate(this.props.type));
        this.props.onChange();
        this.setState({ elements: this.props.target });
    }

    removeElement(index: number) {
        this.state.elements.splice(index, 1);
        this.props.onChange();
        this.setState({ elements: this.props.target });
    }

    render() {
        var records = [];
        for (var i = 0; i < this.state.elements.length; ++i) {
                ((index) => {
                    var path = `${this.props.path}[${index}]`;
                    records.push(
                        <tr key={path}>
                            <td className='keyColumn'>
                                <IconButton
                                    iconProps={{ iconName: 'Up' }}
                                    title="Move up"
                                    ariaLabel="Move up"
                                />
                                <IconButton
                                    iconProps={{ iconName: 'Down' }}
                                    title="Move down"
                                    ariaLabel="Move down"
                                />
                                <IconButton
                                    iconProps={{ iconName: 'Delete' }}
                                    title="Remove"
                                    ariaLabel="Remove"
                                />
                            </td>
                            <td>
                                <ObjectInspectorRenderer
                                    key={path}
                                    path={path}
                                    onChange={this.props.onChange}
                                    hidePropertyName={true}
                                    instance={this.props.instance}
                                    propertyIndex={index}
                                    target={this.props.target[index]}
                                    type={this.props.type}
                                    assembly={this.props.assembly}
                                />
                            </td>
                        </tr>);
                })(i);
        }

        return <table className='inspectorTable'>
            <thead>
                <tr>
                    <th className='keyColumn' style={{width:'200px'}}>
                        <DefaultButton iconProps={{iconName:"Add"}} onClick={(e) => this.addElement()} />
                    </th>
                    <th>{this.props.type}</th>
                </tr>
            </thead>
            <tbody>
                {records}
            </tbody>
        </table>;
    }
};