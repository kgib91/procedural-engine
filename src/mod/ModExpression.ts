import { ANTLRInputStream, CommonTokenStream, ParserRuleContext, RuleContext } from "antlr4ts";
import { ModParser, FunctionDeclarationContext, StylesheetContext, StatementContext, RulesetContext, SelectorContext, BlockContext, SelectorsContext, VariableDeclarationContext, ElementContext, ValuesContext, IdentifierContext, PropertyContext, CommandStatementContext, FunctionCallContext, ExpressionContext, AttribContext, FunctionBodyContext, FunctionStatementContext, FunctionReturnContext, MeasurementContext, MathStatementContext, VariableNameContext, ForDeclarationContext, FromNumberContext, ThroughNumberContext, EmptyListDeclarationContext, ListOrMapContext, ArgumentsStatementContext, ModuleContext } from "./ModParser";
import { ModLexer } from "./ModLexer";
import { Tree } from "antlr4ts/tree/Tree";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { runInContext } from "vm";

export interface ModDictionary {
    [name: string]: ModScope;
}

export interface IFunctionScope {
    localVariables: string[];
}

export interface ModVariable {
    name: string;
    value: any;
}

export interface ModProperty {
    name: string;
    value: any;
}

export interface ModFunctionCall {
    name: string;
    arguments: any[];
}

export interface ModValuesLink {
    linkFrom: any;
    linkTo: any;
}

export interface ValuesMathLink {
    operation: string;
    right: any;
}

export function isValuesMathLink(object: any): object is ValuesMathLink {
    return 'operation' in object && 'right' in object;
}

export function isValuesLink(object: any): object is ModValuesLink {
    return 'linkFrom' in object && 'linkTo' in object;
}

export function isModFunctionCall(object: any): object is ModFunctionCall {
    return 'name' in object && 'arguments' in object;
}

export interface ModScope {
    name: string;
    polymorphism: string[];
    properties: ModProperty[];
    variables: ModVariable[];
    scopes: ModDictionary;
}

export class ModScopeInspector {
    static mergeScopes(list1: ModDictionary, list2: ModDictionary): ModDictionary {
        var newList = {};
        for(var name in list1) {
            newList[name] = list1[name];
        }
        for(var name in list2) {
            newList[name] = list2[name];
        }
        return newList;
    }
}

export interface IModFunction {
    name: string;
    parameters: string[];
    function: Function; 
}

export interface ModFunctionDictionary {
    [name: string]: IModFunction;
}

export default class ModExpression {
    private scopeStack: ModScope[];
    private scopeNames: string[];

    defaultScope: string;
    selectors: string[];
    scopes: ModDictionary;
    functions: ModFunctionDictionary;

    constructor() {
        this.scopeStack = [];
        this.selectors = [];
        this.scopeNames = [];
        this.scopes = {};
        this.functions = {};
    }

    private walkRuleContext(ruleContext: ParserRuleContext) {
        //console.log('ruleContext:', ruleContext);
        for(var i = 0; i < ruleContext.childCount; ++i) {
            var child = ruleContext.getChild(i);
            if(child instanceof StatementContext) {
                this.visitStatement(child);
            } else if(child instanceof FunctionDeclarationContext) {
                this.visitFunctionDeclaration(child);
            } else if(child instanceof StylesheetContext) {
                this.visitStylesheet(child);
            } else if(child instanceof RulesetContext) {
                this.visitRuleset(child);
            } else if(child instanceof ArgumentsStatementContext) {
                this.visitArgumentStatement(child);
            } else if(child instanceof SelectorsContext) {
                this.visitSelectors(child);
            } else if(child instanceof SelectorContext) {
                this.visitSelector(child);
            } else if(child instanceof ValuesContext) {
                this.visitValues(child);
            } else if(child instanceof PropertyContext) {
                this.visitProperty(child);
            } else if(child instanceof IdentifierContext) {
                this.visitIdentifier(child);
            } else if(child instanceof TerminalNode) {
                continue;
            } else if(child instanceof ModuleContext) {
                continue;
            } else if(child instanceof CommandStatementContext) {
                this.visitCommandStatement(child);
            } else if(child instanceof VariableDeclarationContext) {
                this.visitVariableDeclaration(child);
            } else if(child instanceof ElementContext) {
                this.visitElement(child);
            } else if(child instanceof BlockContext) {
                this.visitBlock(child);
            } else {
                console.debug('unsupported ruleContext:', (child as any).constructor.name, child);
            }
        }
    }


    private deserializeFunctionBody(context: RuleContext, currentScope: IFunctionScope) {
        if(context instanceof FunctionBodyContext) {
            var ddl = [];
            for(var i = 0; i < context.childCount; ++i) {
                var line_ddl = this.deserializeFunctionBody(context.getChild(i) as RuleContext, currentScope);
                if(line_ddl != null && line_ddl.trim() != '') {
                    ddl.push(line_ddl);
                }
            }
            return ddl.join('\r\n');
        } else if(
            context instanceof VariableDeclarationContext
        ) {
            var variableName = this.deserializeFunctionBody(context.getChild(0) as RuleContext, currentScope);
            var valuesBody = this.deserializeFunctionBody(context.getChild(2) as RuleContext, currentScope);
            var variableDoesNotExist = currentScope.localVariables.indexOf(variableName) < 0;
            var variableSetDdl = `${variableDoesNotExist ? 'var ' : ''}${variableName} = ${valuesBody};`;
            currentScope.localVariables.push(variableName);
            return variableSetDdl;
        } else if(
            context instanceof ValuesContext
        ) {
            if(context.childCount >= 2) {
                var values = [];
                for(var i = 0; i < context.childCount; i+=2) {
                    var child = this.deserializeFunctionBody(context.getChild(i) as RuleContext, currentScope);
                    values.push(child);
                }
                return `[${values.join(',')}]`;
            } else {
                return this.deserializeFunctionBody(context.getChild(0) as RuleContext, currentScope);
            }
        }  else if(
            context instanceof FunctionStatementContext ||
            context instanceof StatementContext
        ) {
            return this.deserializeFunctionBody(context.getChild(0) as RuleContext, currentScope);
        } else if(context instanceof FunctionReturnContext) {
            var returnStatement = this.deserializeFunctionBody(context.getChild(1) as RuleContext, currentScope);
            return `return ${returnStatement};`
        } else if(context instanceof BlockContext) {
            var blockDdl = [];
            var blockScope = { localVariables: [].concat(currentScope.localVariables) };
            for(var i = 0; i < context.childCount; ++i) {
                var blockChild = context.getChild(i);
                blockDdl.push(this.deserializeFunctionBody(blockChild as RuleContext, blockScope));
            }
            return `${blockDdl.join('\r\n')}\r\n`
        } else if(context instanceof ExpressionContext) {
            var exprStatement = this.deserializeFunctionBody(context.getChild(0) as RuleContext, currentScope);
            return exprStatement;
        } else if(context instanceof FunctionCallContext) {
            var funcName = context.getChild(0).text.trim();
            var argsCtx = context.getChild(2);
            var funcArgs = [];
            for(var i = 0; i < argsCtx.childCount; i+=2) {
                funcArgs.push(this.deserializeFunctionBody(argsCtx.getChild(i) as RuleContext, currentScope));
            }
            switch(funcName) {
                // functions
                case 'sin':
                    funcName = 'Math.sin';
                    break;
                case 'rand':
                    funcName = 'Math.random';
                    break;
                case 'cos':
                    funcName = 'Math.cos';
                    break;
                case 'pow':
                    funcName = 'Math.pow';
                    break;
                case 'concat':
                    funcName = `${funcArgs.shift()}.concat`;
                    break;
            }
            return `${funcName}(${funcArgs.join(',')})`;
        } else if(
            context instanceof FromNumberContext ||
            context instanceof ThroughNumberContext
        ) {
            return this.deserializeFunctionBody(context.getChild(0) as RuleContext, currentScope);
        } else if(context instanceof VariableNameContext) {
             return context.getChild(1).text.trim(); // remove '$'
        } else if(
            context instanceof TerminalNode ||
            context instanceof MeasurementContext
        ) {
            var text = context.text.trim();
            if(text.length == 0) {
                return null;
            }
            return text;
        } else if(context instanceof IdentifierContext) {
            var identifierName = context.text.trim();
            switch(identifierName) {
                case 'PI':
                    return 'Math.PI';
            }
            return identifierName;
        } else if(context instanceof EmptyListDeclarationContext) {
            return '[]';
        } else if(context instanceof ListOrMapContext) {
            return this.deserializeFunctionBody(context.getChild(0) as RuleContext, currentScope);
        } else if(context instanceof MathStatementContext) {
            var measurementStatement = `${context.getChild(0).text} ${this.deserializeFunctionBody(context.getChild(1) as RuleContext, currentScope)}`;
            return measurementStatement;
        } else if(context instanceof ForDeclarationContext) {
            var varName = this.deserializeFunctionBody(context.getChild(1) as RuleContext, currentScope);
            var fromValue = this.deserializeFunctionBody(context.getChild(3) as RuleContext, currentScope);
            var toValue = this.deserializeFunctionBody(context.getChild(5) as RuleContext, currentScope);
            var renderedBlock = this.deserializeFunctionBody(context.getChild(6) as RuleContext, currentScope);
            var forStatement = `for(var ${varName} = ${fromValue}; ${varName} < ${toValue}; ++${varName}) ${renderedBlock}`;
            return forStatement;
        } else if(context instanceof CommandStatementContext) {
            if(context.childCount < 1) {
                return null;
            }
            var firstChild = context.getChild(0);
            if(firstChild instanceof IdentifierContext && firstChild.text == '(' && context.childCount == 3) {
                return `(${this.deserializeFunctionBody(context.getChild(1) as RuleContext, currentScope)})`;
            } else {
                var ddl = [];
                for(var i = 0; i < context.childCount; ++i) {
                    ddl.push(this.deserializeFunctionBody(context.getChild(i) as RuleContext, currentScope));
                }
                return ddl.join(' ');
            }
        }
        console.debug('missingContext:', context);
        return null;
    }

    private createFunction(name: string, params: string[], functionBody: FunctionBodyContext) {
        var scope: IFunctionScope = {localVariables: []};
        var renderedBody = this.deserializeFunctionBody(functionBody, scope);
        console.debug('renderedBody:', renderedBody);
        var newFunction = new Function(...params, renderedBody);
        return newFunction;
    }

    private visitFunctionDeclaration(functionDeclaration: FunctionDeclarationContext) {
        var name = functionDeclaration.getChild(1).text;
        var emptyScope = {localVariables: []};
        var params = [];
        var paramsCtx = functionDeclaration.getChild(3);
        for(var i = 0; i < paramsCtx.childCount; i+=2) {
            params.push(this.deserializeFunctionBody(paramsCtx.getChild(i).getChild(0) as RuleContext, emptyScope));
        }
        var functionBodyCtx = functionDeclaration.getChild(6) as FunctionBodyContext;
        var func = this.createFunction(name, params, functionBodyCtx);
        this.functions[name] = {
            name,
            parameters: params,
            function: func
        };
    }

    private visitStatement(statement: StatementContext) {
        this.walkRuleContext(statement);
    }

    private visitElement(element: ElementContext) {
        this.walkRuleContext(element);
    }

    private visitStylesheet(stylesheet: StylesheetContext) {
        this.walkRuleContext(stylesheet);
    }

    private visitRuleset(ruleset: RulesetContext) {
        this.walkRuleContext(ruleset);
    }

    private visitSelector(selector: SelectorContext) {
        this.selectors.push(selector.text);
    }

    private readValues(values: any) {
        if(values instanceof MathStatementContext) {
            return { operation: values.getChild(0).text, right: this.readValues(values.getChild(1)) };
        }
        if(values == null) {
            return null;
        } if(values instanceof FunctionCallContext) {
            return this.readFunctionCall(values);
        } else if(
            values instanceof ValuesContext ||
            values instanceof CommandStatementContext || 
            values instanceof ExpressionContext
        ) {
            var val = null;
            if(values.childCount == 1) {
                val = this.readValues(values.getChild(0));
            } else {
                val = [];
                for(var i = 0; i < values.childCount; ++i) {
                    var ele = this.readValues(values.getChild(i));
                    if(ele === ',') {
                        continue;
                    }
                    var isLinkedElement = i + 1 < values.childCount && values.getChild(i + 1) instanceof MathStatementContext;
                    if(isLinkedElement) {
                        var linkedItem = this.readValues(values.getChild(++i));
                        val.push({ linkFrom: ele, linkTo: linkedItem });
                    } else {
                        val.push(ele);
                    }
                }
            }
            return val;
        }
        return values.text;
    }

    private visitValues(values: ValuesContext) {
        return this.readValues(values);
    }

    private readFunctionCall(functionCall: FunctionCallContext): ModFunctionCall {
        var scope = this.getCurrentScope();
        var name = functionCall.getChild(0).text;
        var args = this.visitArgumentStatement(functionCall.getChild(2) as ArgumentsStatementContext);
        return {
            name: name,
            arguments: args
        };
    }

    private visitArgumentStatement(argumentStatement: ArgumentsStatementContext) {
        var scope = this.getCurrentScope();
        return this.visitCommandStatement(argumentStatement.getChild(0) as CommandStatementContext);
    }

    private mergeTransform(prevScope: ModScope, scope: ModScope): ModScope {
        if(prevScope == null) {
            return scope;
        }
        this.inheritTransform(scope, prevScope, 'extend');
        return scope;
    }

    private cloneVariable(variable: ModVariable) {
        if(variable == null) {
            return null;
        }
        return { name: variable.name, value: variable.value };
    }

    private cloneProperty(property: ModProperty) {
        if(property == null) {
            return null;
        }
        return { name: property.name, value: property.value };
    }

    private cloneScope(scope: ModScope): ModScope {
        if(scope == null) {
            return null;
        }
        return {
            name: scope.name,
            polymorphism: scope.polymorphism.slice(),
            properties: scope.properties.slice(),
            variables: scope.variables.slice(),
            scopes: Object.assign(scope.scopes, {})
        };
    }

    private inheritTransform(scope: ModScope, inheritScope: ModScope, type: string) {
        scope.polymorphism.push(inheritScope.name);
        
        if(true) {
            for(var variableIndex in inheritScope.variables) {
                var vari = inheritScope.variables[variableIndex];
                var exists = false;
                scope.variables.forEach((inVari) => {
                    if(vari.name == inVari.name && vari.value == inVari.value) {
                        exists = true;
                    }
                });
                if(!exists) {
                    scope.variables.push(this.cloneProperty(vari));
                }
            }
        }

        if(type == 'extend') {
            for(var propertyIndex in inheritScope.properties) {
                var prop = inheritScope.properties[propertyIndex];
                var exists = false;
                scope.properties.forEach((inProp) => {
                    if(prop.name == inProp.name && prop.value == inProp.value) {
                        exists = true;
                    }
                });
                if(!exists) {
                    scope.properties.push(this.cloneProperty(prop));
                }
            }
        }
        
        if(true) {
            for(var scopeName in inheritScope.scopes) {
                scope.scopes[scopeName] = this.mergeTransform(scope.scopes[scopeName], this.cloneScope(inheritScope.scopes[scopeName]))
            }
        }
    }

    private visitProperty(property: PropertyContext) {
        
        var root = this.getCurrentRootScope();
        var scope = this.getCurrentScope();
        var name = property.getChild(0).text;
        switch(name) {
            case '@extend':
            case '@implement':
                var type = name.substr(1);
                var inheritObject = property.getChild(1).text.trim();
                var inheritScope = this.scopes[inheritObject] || scope.scopes[inheritObject] || root.scopes[inheritObject];
                scope.polymorphism.push(inheritObject);
                this.inheritTransform(scope, inheritScope, type);
                break;
            default:
                var value = this.readValues(property.getChild(2));
                scope.properties.push({ name, value: value });
        }
    }

    private visitIdentifier(identifier: IdentifierContext) {
        this.walkRuleContext(identifier);
    }

    private visitCommandStatement(commandStatement: CommandStatementContext) {
        return this.readValues(commandStatement);
    }

    private visitSelectors(selectors: SelectorsContext) {
        this.walkRuleContext(selectors);
    }

    private getCurrentRootScope() {
        if(this.scopeStack == null || this.scopeStack.length < 1) {
            return null;
        }
        return this.scopeStack[0];
    }

    private getCurrentScope() {
        if(this.scopeStack == null || this.scopeStack.length < 1) {
            return null;
        }
        return this.scopeStack[this.scopeStack.length - 1];
    }


    private nextAnonymousScopeName() {
        var inputName = "anonymousObject";
        var iter = inputName;
        var i = 1;
        while(this.scopeNames.indexOf(iter) >= 0) {
            iter = `${inputName}${i++}`
        }
        return iter;
    }

    private visitVariableDeclaration(variableDeclaration: VariableDeclarationContext) {
        var scope = this.getCurrentScope();
        var value = this.readValues(variableDeclaration.getChild(2));
        scope.variables.push({ name: variableDeclaration.getChild(0).text, value: value });
    }

    private visitBlock(block: BlockContext)
    {
        var parentScope = this.getCurrentScope();
        var scope = {
            name: null,
            polymorphism: [],
            variables: [],
            scopes: {},
            properties: []
        };
        
        if(this.selectors.length == 1) {
            scope.name = this.selectors[0];
            this.selectors = [];
        }

        if(scope.name == null) {
            if(parent == null) {
                throw new Error("Anonymous scopes must not exist without a named parent scope.");
            } else {
                scope.name = this.nextAnonymousScopeName();
            }
        }

        if(this.scopeNames.indexOf(scope.name) < 0) {
            this.scopeNames.push(scope.name);
        }

        if(this.defaultScope == null) {
            this.defaultScope = scope.name;
        }

        this.scopeStack.push(scope);
        
        this.walkRuleContext(block);

        this.scopeStack.pop();

        var prevScope = this.scopes[scope.name];
        if(parentScope != null) {
            var prevScope = parentScope.scopes[scope.name] || this.scopes[scope.name];
            parentScope.scopes[scope.name] = this.mergeTransform(prevScope, scope);
        } else {
            var prevScope = this.scopes[scope.name];
            this.scopes[scope.name] = this.mergeTransform(prevScope, scope);
        }
    }
    
    static fromString(code: string): ModExpression {
        var expr = new ModExpression();
        var chars = new ANTLRInputStream(code);
        var lexer = new ModLexer(chars);
        var tokens  = new CommonTokenStream(lexer);
        var parser = new ModParser(tokens);
        parser.buildParseTree = true;

        var tree = parser.stylesheet();
        expr.visitStylesheet(tree);
        return expr;
    }
}