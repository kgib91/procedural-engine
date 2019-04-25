// Generated from ./src/mod/ModParser.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { StylesheetContext } from "./ModParser";
import { StatementContext } from "./ModParser";
import { ParamsContext } from "./ModParser";
import { ParamContext } from "./ModParser";
import { VariableNameContext } from "./ModParser";
import { ParamOptionalValueContext } from "./ModParser";
import { MixinDeclarationContext } from "./ModParser";
import { IncludeDeclarationContext } from "./ModParser";
import { EmptyListDeclarationContext } from "./ModParser";
import { MapDeclarationContext } from "./ModParser";
import { MapPropertyStatementContext } from "./ModParser";
import { ListDeclarationContext } from "./ModParser";
import { ListOrMapContext } from "./ModParser";
import { FunctionDeclarationContext } from "./ModParser";
import { FunctionBodyContext } from "./ModParser";
import { FunctionReturnContext } from "./ModParser";
import { FunctionStatementContext } from "./ModParser";
import { CommandStatementContext } from "./ModParser";
import { MathCharacterContext } from "./ModParser";
import { MathStatementContext } from "./ModParser";
import { ExpressionContext } from "./ModParser";
import { IfDeclarationContext } from "./ModParser";
import { ElseIfStatementContext } from "./ModParser";
import { ElseStatementContext } from "./ModParser";
import { ConditionsContext } from "./ModParser";
import { ConditionContext } from "./ModParser";
import { VariableDeclarationContext } from "./ModParser";
import { ForDeclarationContext } from "./ModParser";
import { FromNumberContext } from "./ModParser";
import { ThroughNumberContext } from "./ModParser";
import { WhileDeclarationContext } from "./ModParser";
import { EachDeclarationContext } from "./ModParser";
import { EachValueListContext } from "./ModParser";
import { ImportDeclarationContext } from "./ModParser";
import { ReferenceUrlContext } from "./ModParser";
import { MediaTypesContext } from "./ModParser";
import { NestedContext } from "./ModParser";
import { NestContext } from "./ModParser";
import { RulesetContext } from "./ModParser";
import { BlockContext } from "./ModParser";
import { SelectorsContext } from "./ModParser";
import { SelectorContext } from "./ModParser";
import { SelectorPrefixContext } from "./ModParser";
import { ModuleContext } from "./ModParser";
import { ElementContext } from "./ModParser";
import { PseudoContext } from "./ModParser";
import { AttribContext } from "./ModParser";
import { AttribRelateContext } from "./ModParser";
import { IdentifierContext } from "./ModParser";
import { IdentifierPartContext } from "./ModParser";
import { IdentifierVariableNameContext } from "./ModParser";
import { PropertyContext } from "./ModParser";
import { ValuesContext } from "./ModParser";
import { UrlContext } from "./ModParser";
import { MeasurementContext } from "./ModParser";
import { ArgumentsStatementContext } from "./ModParser";
import { FunctionCallContext } from "./ModParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ModParser`.
 */
export interface ModParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ModParser.stylesheet`.
	 * @param ctx the parse tree
	 */
	enterStylesheet?: (ctx: StylesheetContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.stylesheet`.
	 * @param ctx the parse tree
	 */
	exitStylesheet?: (ctx: StylesheetContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.params`.
	 * @param ctx the parse tree
	 */
	enterParams?: (ctx: ParamsContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.params`.
	 * @param ctx the parse tree
	 */
	exitParams?: (ctx: ParamsContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.param`.
	 * @param ctx the parse tree
	 */
	enterParam?: (ctx: ParamContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.param`.
	 * @param ctx the parse tree
	 */
	exitParam?: (ctx: ParamContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.variableName`.
	 * @param ctx the parse tree
	 */
	enterVariableName?: (ctx: VariableNameContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.variableName`.
	 * @param ctx the parse tree
	 */
	exitVariableName?: (ctx: VariableNameContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.paramOptionalValue`.
	 * @param ctx the parse tree
	 */
	enterParamOptionalValue?: (ctx: ParamOptionalValueContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.paramOptionalValue`.
	 * @param ctx the parse tree
	 */
	exitParamOptionalValue?: (ctx: ParamOptionalValueContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.mixinDeclaration`.
	 * @param ctx the parse tree
	 */
	enterMixinDeclaration?: (ctx: MixinDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.mixinDeclaration`.
	 * @param ctx the parse tree
	 */
	exitMixinDeclaration?: (ctx: MixinDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.includeDeclaration`.
	 * @param ctx the parse tree
	 */
	enterIncludeDeclaration?: (ctx: IncludeDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.includeDeclaration`.
	 * @param ctx the parse tree
	 */
	exitIncludeDeclaration?: (ctx: IncludeDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.emptyListDeclaration`.
	 * @param ctx the parse tree
	 */
	enterEmptyListDeclaration?: (ctx: EmptyListDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.emptyListDeclaration`.
	 * @param ctx the parse tree
	 */
	exitEmptyListDeclaration?: (ctx: EmptyListDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.mapDeclaration`.
	 * @param ctx the parse tree
	 */
	enterMapDeclaration?: (ctx: MapDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.mapDeclaration`.
	 * @param ctx the parse tree
	 */
	exitMapDeclaration?: (ctx: MapDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.mapPropertyStatement`.
	 * @param ctx the parse tree
	 */
	enterMapPropertyStatement?: (ctx: MapPropertyStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.mapPropertyStatement`.
	 * @param ctx the parse tree
	 */
	exitMapPropertyStatement?: (ctx: MapPropertyStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.listDeclaration`.
	 * @param ctx the parse tree
	 */
	enterListDeclaration?: (ctx: ListDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.listDeclaration`.
	 * @param ctx the parse tree
	 */
	exitListDeclaration?: (ctx: ListDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.listOrMap`.
	 * @param ctx the parse tree
	 */
	enterListOrMap?: (ctx: ListOrMapContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.listOrMap`.
	 * @param ctx the parse tree
	 */
	exitListOrMap?: (ctx: ListOrMapContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.functionDeclaration`.
	 * @param ctx the parse tree
	 */
	enterFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.functionDeclaration`.
	 * @param ctx the parse tree
	 */
	exitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.functionBody`.
	 * @param ctx the parse tree
	 */
	enterFunctionBody?: (ctx: FunctionBodyContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.functionBody`.
	 * @param ctx the parse tree
	 */
	exitFunctionBody?: (ctx: FunctionBodyContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.functionReturn`.
	 * @param ctx the parse tree
	 */
	enterFunctionReturn?: (ctx: FunctionReturnContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.functionReturn`.
	 * @param ctx the parse tree
	 */
	exitFunctionReturn?: (ctx: FunctionReturnContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.functionStatement`.
	 * @param ctx the parse tree
	 */
	enterFunctionStatement?: (ctx: FunctionStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.functionStatement`.
	 * @param ctx the parse tree
	 */
	exitFunctionStatement?: (ctx: FunctionStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.commandStatement`.
	 * @param ctx the parse tree
	 */
	enterCommandStatement?: (ctx: CommandStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.commandStatement`.
	 * @param ctx the parse tree
	 */
	exitCommandStatement?: (ctx: CommandStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.mathCharacter`.
	 * @param ctx the parse tree
	 */
	enterMathCharacter?: (ctx: MathCharacterContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.mathCharacter`.
	 * @param ctx the parse tree
	 */
	exitMathCharacter?: (ctx: MathCharacterContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.mathStatement`.
	 * @param ctx the parse tree
	 */
	enterMathStatement?: (ctx: MathStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.mathStatement`.
	 * @param ctx the parse tree
	 */
	exitMathStatement?: (ctx: MathStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.ifDeclaration`.
	 * @param ctx the parse tree
	 */
	enterIfDeclaration?: (ctx: IfDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.ifDeclaration`.
	 * @param ctx the parse tree
	 */
	exitIfDeclaration?: (ctx: IfDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.elseIfStatement`.
	 * @param ctx the parse tree
	 */
	enterElseIfStatement?: (ctx: ElseIfStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.elseIfStatement`.
	 * @param ctx the parse tree
	 */
	exitElseIfStatement?: (ctx: ElseIfStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.elseStatement`.
	 * @param ctx the parse tree
	 */
	enterElseStatement?: (ctx: ElseStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.elseStatement`.
	 * @param ctx the parse tree
	 */
	exitElseStatement?: (ctx: ElseStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.conditions`.
	 * @param ctx the parse tree
	 */
	enterConditions?: (ctx: ConditionsContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.conditions`.
	 * @param ctx the parse tree
	 */
	exitConditions?: (ctx: ConditionsContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.condition`.
	 * @param ctx the parse tree
	 */
	enterCondition?: (ctx: ConditionContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.condition`.
	 * @param ctx the parse tree
	 */
	exitCondition?: (ctx: ConditionContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.variableDeclaration`.
	 * @param ctx the parse tree
	 */
	enterVariableDeclaration?: (ctx: VariableDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.variableDeclaration`.
	 * @param ctx the parse tree
	 */
	exitVariableDeclaration?: (ctx: VariableDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.forDeclaration`.
	 * @param ctx the parse tree
	 */
	enterForDeclaration?: (ctx: ForDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.forDeclaration`.
	 * @param ctx the parse tree
	 */
	exitForDeclaration?: (ctx: ForDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.fromNumber`.
	 * @param ctx the parse tree
	 */
	enterFromNumber?: (ctx: FromNumberContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.fromNumber`.
	 * @param ctx the parse tree
	 */
	exitFromNumber?: (ctx: FromNumberContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.throughNumber`.
	 * @param ctx the parse tree
	 */
	enterThroughNumber?: (ctx: ThroughNumberContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.throughNumber`.
	 * @param ctx the parse tree
	 */
	exitThroughNumber?: (ctx: ThroughNumberContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.whileDeclaration`.
	 * @param ctx the parse tree
	 */
	enterWhileDeclaration?: (ctx: WhileDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.whileDeclaration`.
	 * @param ctx the parse tree
	 */
	exitWhileDeclaration?: (ctx: WhileDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.eachDeclaration`.
	 * @param ctx the parse tree
	 */
	enterEachDeclaration?: (ctx: EachDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.eachDeclaration`.
	 * @param ctx the parse tree
	 */
	exitEachDeclaration?: (ctx: EachDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.eachValueList`.
	 * @param ctx the parse tree
	 */
	enterEachValueList?: (ctx: EachValueListContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.eachValueList`.
	 * @param ctx the parse tree
	 */
	exitEachValueList?: (ctx: EachValueListContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.importDeclaration`.
	 * @param ctx the parse tree
	 */
	enterImportDeclaration?: (ctx: ImportDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.importDeclaration`.
	 * @param ctx the parse tree
	 */
	exitImportDeclaration?: (ctx: ImportDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.referenceUrl`.
	 * @param ctx the parse tree
	 */
	enterReferenceUrl?: (ctx: ReferenceUrlContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.referenceUrl`.
	 * @param ctx the parse tree
	 */
	exitReferenceUrl?: (ctx: ReferenceUrlContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.mediaTypes`.
	 * @param ctx the parse tree
	 */
	enterMediaTypes?: (ctx: MediaTypesContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.mediaTypes`.
	 * @param ctx the parse tree
	 */
	exitMediaTypes?: (ctx: MediaTypesContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.nested`.
	 * @param ctx the parse tree
	 */
	enterNested?: (ctx: NestedContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.nested`.
	 * @param ctx the parse tree
	 */
	exitNested?: (ctx: NestedContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.nest`.
	 * @param ctx the parse tree
	 */
	enterNest?: (ctx: NestContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.nest`.
	 * @param ctx the parse tree
	 */
	exitNest?: (ctx: NestContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.ruleset`.
	 * @param ctx the parse tree
	 */
	enterRuleset?: (ctx: RulesetContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.ruleset`.
	 * @param ctx the parse tree
	 */
	exitRuleset?: (ctx: RulesetContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.block`.
	 * @param ctx the parse tree
	 */
	enterBlock?: (ctx: BlockContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.block`.
	 * @param ctx the parse tree
	 */
	exitBlock?: (ctx: BlockContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.selectors`.
	 * @param ctx the parse tree
	 */
	enterSelectors?: (ctx: SelectorsContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.selectors`.
	 * @param ctx the parse tree
	 */
	exitSelectors?: (ctx: SelectorsContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.selector`.
	 * @param ctx the parse tree
	 */
	enterSelector?: (ctx: SelectorContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.selector`.
	 * @param ctx the parse tree
	 */
	exitSelector?: (ctx: SelectorContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.selectorPrefix`.
	 * @param ctx the parse tree
	 */
	enterSelectorPrefix?: (ctx: SelectorPrefixContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.selectorPrefix`.
	 * @param ctx the parse tree
	 */
	exitSelectorPrefix?: (ctx: SelectorPrefixContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.module`.
	 * @param ctx the parse tree
	 */
	enterModule?: (ctx: ModuleContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.module`.
	 * @param ctx the parse tree
	 */
	exitModule?: (ctx: ModuleContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.element`.
	 * @param ctx the parse tree
	 */
	enterElement?: (ctx: ElementContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.element`.
	 * @param ctx the parse tree
	 */
	exitElement?: (ctx: ElementContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.pseudo`.
	 * @param ctx the parse tree
	 */
	enterPseudo?: (ctx: PseudoContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.pseudo`.
	 * @param ctx the parse tree
	 */
	exitPseudo?: (ctx: PseudoContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.attrib`.
	 * @param ctx the parse tree
	 */
	enterAttrib?: (ctx: AttribContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.attrib`.
	 * @param ctx the parse tree
	 */
	exitAttrib?: (ctx: AttribContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.attribRelate`.
	 * @param ctx the parse tree
	 */
	enterAttribRelate?: (ctx: AttribRelateContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.attribRelate`.
	 * @param ctx the parse tree
	 */
	exitAttribRelate?: (ctx: AttribRelateContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.identifierPart`.
	 * @param ctx the parse tree
	 */
	enterIdentifierPart?: (ctx: IdentifierPartContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.identifierPart`.
	 * @param ctx the parse tree
	 */
	exitIdentifierPart?: (ctx: IdentifierPartContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.identifierVariableName`.
	 * @param ctx the parse tree
	 */
	enterIdentifierVariableName?: (ctx: IdentifierVariableNameContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.identifierVariableName`.
	 * @param ctx the parse tree
	 */
	exitIdentifierVariableName?: (ctx: IdentifierVariableNameContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.property`.
	 * @param ctx the parse tree
	 */
	enterProperty?: (ctx: PropertyContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.property`.
	 * @param ctx the parse tree
	 */
	exitProperty?: (ctx: PropertyContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.values`.
	 * @param ctx the parse tree
	 */
	enterValues?: (ctx: ValuesContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.values`.
	 * @param ctx the parse tree
	 */
	exitValues?: (ctx: ValuesContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.url`.
	 * @param ctx the parse tree
	 */
	enterUrl?: (ctx: UrlContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.url`.
	 * @param ctx the parse tree
	 */
	exitUrl?: (ctx: UrlContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.measurement`.
	 * @param ctx the parse tree
	 */
	enterMeasurement?: (ctx: MeasurementContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.measurement`.
	 * @param ctx the parse tree
	 */
	exitMeasurement?: (ctx: MeasurementContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.argumentsStatement`.
	 * @param ctx the parse tree
	 */
	enterArgumentsStatement?: (ctx: ArgumentsStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.argumentsStatement`.
	 * @param ctx the parse tree
	 */
	exitArgumentsStatement?: (ctx: ArgumentsStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ModParser.functionCall`.
	 * @param ctx the parse tree
	 */
	enterFunctionCall?: (ctx: FunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by `ModParser.functionCall`.
	 * @param ctx the parse tree
	 */
	exitFunctionCall?: (ctx: FunctionCallContext) => void;
}

