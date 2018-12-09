// Generated from ./src/mod/ModParser.g4 by ANTLR 4.6-SNAPSHOT


import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { StylesheetContext } from './ModParser';
import { StatementContext } from './ModParser';
import { ParamsContext } from './ModParser';
import { ParamContext } from './ModParser';
import { VariableNameContext } from './ModParser';
import { ParamOptionalValueContext } from './ModParser';
import { MixinDeclarationContext } from './ModParser';
import { IncludeDeclarationContext } from './ModParser';
import { EmptyListDeclarationContext } from './ModParser';
import { MapDeclarationContext } from './ModParser';
import { MapPropertyStatementContext } from './ModParser';
import { ListDeclarationContext } from './ModParser';
import { ListOrMapContext } from './ModParser';
import { FunctionDeclarationContext } from './ModParser';
import { FunctionBodyContext } from './ModParser';
import { FunctionReturnContext } from './ModParser';
import { FunctionStatementContext } from './ModParser';
import { CommandStatementContext } from './ModParser';
import { MathCharacterContext } from './ModParser';
import { MathStatementContext } from './ModParser';
import { ExpressionContext } from './ModParser';
import { IfDeclarationContext } from './ModParser';
import { ElseIfStatementContext } from './ModParser';
import { ElseStatementContext } from './ModParser';
import { ConditionsContext } from './ModParser';
import { ConditionContext } from './ModParser';
import { VariableDeclarationContext } from './ModParser';
import { ForDeclarationContext } from './ModParser';
import { FromNumberContext } from './ModParser';
import { ThroughNumberContext } from './ModParser';
import { WhileDeclarationContext } from './ModParser';
import { EachDeclarationContext } from './ModParser';
import { EachValueListContext } from './ModParser';
import { ImportDeclarationContext } from './ModParser';
import { ReferenceUrlContext } from './ModParser';
import { MediaTypesContext } from './ModParser';
import { NestedContext } from './ModParser';
import { NestContext } from './ModParser';
import { RulesetContext } from './ModParser';
import { BlockContext } from './ModParser';
import { SelectorsContext } from './ModParser';
import { SelectorContext } from './ModParser';
import { SelectorPrefixContext } from './ModParser';
import { ModuleContext } from './ModParser';
import { ElementContext } from './ModParser';
import { PseudoContext } from './ModParser';
import { AttribContext } from './ModParser';
import { AttribRelateContext } from './ModParser';
import { IdentifierContext } from './ModParser';
import { IdentifierPartContext } from './ModParser';
import { IdentifierVariableNameContext } from './ModParser';
import { PropertyContext } from './ModParser';
import { ValuesContext } from './ModParser';
import { UrlContext } from './ModParser';
import { MeasurementContext } from './ModParser';
import { ArgumentsStatementContext } from './ModParser';
import { FunctionCallContext } from './ModParser';


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ModParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ModParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `ModParser.stylesheet`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStylesheet?: (ctx: StylesheetContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.params`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParams?: (ctx: ParamsContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.param`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam?: (ctx: ParamContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.variableName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariableName?: (ctx: VariableNameContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.paramOptionalValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamOptionalValue?: (ctx: ParamOptionalValueContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.mixinDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMixinDeclaration?: (ctx: MixinDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.includeDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncludeDeclaration?: (ctx: IncludeDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.emptyListDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmptyListDeclaration?: (ctx: EmptyListDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.mapDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapDeclaration?: (ctx: MapDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.mapPropertyStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapPropertyStatement?: (ctx: MapPropertyStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.listDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListDeclaration?: (ctx: ListDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.listOrMap`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListOrMap?: (ctx: ListOrMapContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.functionDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionDeclaration?: (ctx: FunctionDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.functionBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionBody?: (ctx: FunctionBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.functionReturn`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionReturn?: (ctx: FunctionReturnContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.functionStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionStatement?: (ctx: FunctionStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.commandStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommandStatement?: (ctx: CommandStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.mathCharacter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMathCharacter?: (ctx: MathCharacterContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.mathStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMathStatement?: (ctx: MathStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.ifDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfDeclaration?: (ctx: IfDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.elseIfStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElseIfStatement?: (ctx: ElseIfStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.elseStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElseStatement?: (ctx: ElseStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.conditions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditions?: (ctx: ConditionsContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondition?: (ctx: ConditionContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.variableDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariableDeclaration?: (ctx: VariableDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.forDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForDeclaration?: (ctx: ForDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.fromNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFromNumber?: (ctx: FromNumberContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.throughNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThroughNumber?: (ctx: ThroughNumberContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.whileDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhileDeclaration?: (ctx: WhileDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.eachDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEachDeclaration?: (ctx: EachDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.eachValueList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEachValueList?: (ctx: EachValueListContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.importDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportDeclaration?: (ctx: ImportDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.referenceUrl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReferenceUrl?: (ctx: ReferenceUrlContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.mediaTypes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMediaTypes?: (ctx: MediaTypesContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.nested`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNested?: (ctx: NestedContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.nest`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNest?: (ctx: NestContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.ruleset`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuleset?: (ctx: RulesetContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock?: (ctx: BlockContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.selectors`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectors?: (ctx: SelectorsContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.selector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelector?: (ctx: SelectorContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.selectorPrefix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectorPrefix?: (ctx: SelectorPrefixContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.module`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule?: (ctx: ModuleContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.element`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElement?: (ctx: ElementContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.pseudo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPseudo?: (ctx: PseudoContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.attrib`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttrib?: (ctx: AttribContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.attribRelate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttribRelate?: (ctx: AttribRelateContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.identifierPart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierPart?: (ctx: IdentifierPartContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.identifierVariableName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierVariableName?: (ctx: IdentifierVariableNameContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.property`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty?: (ctx: PropertyContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.values`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValues?: (ctx: ValuesContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.url`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUrl?: (ctx: UrlContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.measurement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMeasurement?: (ctx: MeasurementContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.argumentsStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgumentsStatement?: (ctx: ArgumentsStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `ModParser.functionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionCall?: (ctx: FunctionCallContext) => Result;
}

