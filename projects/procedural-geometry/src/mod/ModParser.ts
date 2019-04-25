// Generated from ./src/mod/ModParser.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ModParserListener } from "./ModParserListener";
import { ModParserVisitor } from "./ModParserVisitor";


export class ModParser extends Parser {
	public static readonly NULL = 1;
	public static readonly IN = 2;
	public static readonly Unit = 3;
	public static readonly COMBINE_COMPARE = 4;
	public static readonly Ellipsis = 5;
	public static readonly InterpolationStart = 6;
	public static readonly LPAREN = 7;
	public static readonly RPAREN = 8;
	public static readonly BlockStart = 9;
	public static readonly BlockEnd = 10;
	public static readonly LBRACK = 11;
	public static readonly RBRACK = 12;
	public static readonly GT = 13;
	public static readonly TIL = 14;
	public static readonly LT = 15;
	public static readonly COLON = 16;
	public static readonly SEMI = 17;
	public static readonly COMMA = 18;
	public static readonly DOT = 19;
	public static readonly DOLLAR = 20;
	public static readonly AT = 21;
	public static readonly AND = 22;
	public static readonly HASH = 23;
	public static readonly COLONCOLON = 24;
	public static readonly PLUS = 25;
	public static readonly TIMES = 26;
	public static readonly DIV = 27;
	public static readonly MINUS = 28;
	public static readonly PERC = 29;
	public static readonly UrlStart = 30;
	public static readonly EQEQ = 31;
	public static readonly NOTEQ = 32;
	public static readonly EQ = 33;
	public static readonly PIPE_EQ = 34;
	public static readonly TILD_EQ = 35;
	public static readonly MIXIN = 36;
	public static readonly FUNCTION = 37;
	public static readonly EXTEND = 38;
	public static readonly IMPLEMENT = 39;
	public static readonly AT_ELSE = 40;
	public static readonly IF = 41;
	public static readonly AT_IF = 42;
	public static readonly AT_FOR = 43;
	public static readonly AT_WHILE = 44;
	public static readonly AT_EACH = 45;
	public static readonly INCLUDE = 46;
	public static readonly IMPORT = 47;
	public static readonly COMPONENT = 48;
	public static readonly RETURN = 49;
	public static readonly FROM = 50;
	public static readonly THROUGH = 51;
	public static readonly POUND_DEFAULT = 52;
	public static readonly Identifier = 53;
	public static readonly StringLiteral = 54;
	public static readonly Number = 55;
	public static readonly Color = 56;
	public static readonly WS = 57;
	public static readonly SL_COMMENT = 58;
	public static readonly COMMENT = 59;
	public static readonly UrlEnd = 60;
	public static readonly Url = 61;
	public static readonly SPACE = 62;
	public static readonly InterpolationStartAfter = 63;
	public static readonly IdentifierAfter = 64;
	public static readonly RULE_stylesheet = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_params = 2;
	public static readonly RULE_param = 3;
	public static readonly RULE_variableName = 4;
	public static readonly RULE_paramOptionalValue = 5;
	public static readonly RULE_mixinDeclaration = 6;
	public static readonly RULE_includeDeclaration = 7;
	public static readonly RULE_emptyListDeclaration = 8;
	public static readonly RULE_mapDeclaration = 9;
	public static readonly RULE_mapPropertyStatement = 10;
	public static readonly RULE_listDeclaration = 11;
	public static readonly RULE_listOrMap = 12;
	public static readonly RULE_functionDeclaration = 13;
	public static readonly RULE_functionBody = 14;
	public static readonly RULE_functionReturn = 15;
	public static readonly RULE_functionStatement = 16;
	public static readonly RULE_commandStatement = 17;
	public static readonly RULE_mathCharacter = 18;
	public static readonly RULE_mathStatement = 19;
	public static readonly RULE_expression = 20;
	public static readonly RULE_ifDeclaration = 21;
	public static readonly RULE_elseIfStatement = 22;
	public static readonly RULE_elseStatement = 23;
	public static readonly RULE_conditions = 24;
	public static readonly RULE_condition = 25;
	public static readonly RULE_variableDeclaration = 26;
	public static readonly RULE_forDeclaration = 27;
	public static readonly RULE_fromNumber = 28;
	public static readonly RULE_throughNumber = 29;
	public static readonly RULE_whileDeclaration = 30;
	public static readonly RULE_eachDeclaration = 31;
	public static readonly RULE_eachValueList = 32;
	public static readonly RULE_importDeclaration = 33;
	public static readonly RULE_referenceUrl = 34;
	public static readonly RULE_mediaTypes = 35;
	public static readonly RULE_nested = 36;
	public static readonly RULE_nest = 37;
	public static readonly RULE_ruleset = 38;
	public static readonly RULE_block = 39;
	public static readonly RULE_selectors = 40;
	public static readonly RULE_selector = 41;
	public static readonly RULE_selectorPrefix = 42;
	public static readonly RULE_module = 43;
	public static readonly RULE_element = 44;
	public static readonly RULE_pseudo = 45;
	public static readonly RULE_attrib = 46;
	public static readonly RULE_attribRelate = 47;
	public static readonly RULE_identifier = 48;
	public static readonly RULE_identifierPart = 49;
	public static readonly RULE_identifierVariableName = 50;
	public static readonly RULE_property = 51;
	public static readonly RULE_values = 52;
	public static readonly RULE_url = 53;
	public static readonly RULE_measurement = 54;
	public static readonly RULE_argumentsStatement = 55;
	public static readonly RULE_functionCall = 56;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"stylesheet", "statement", "params", "param", "variableName", "paramOptionalValue", 
		"mixinDeclaration", "includeDeclaration", "emptyListDeclaration", "mapDeclaration", 
		"mapPropertyStatement", "listDeclaration", "listOrMap", "functionDeclaration", 
		"functionBody", "functionReturn", "functionStatement", "commandStatement", 
		"mathCharacter", "mathStatement", "expression", "ifDeclaration", "elseIfStatement", 
		"elseStatement", "conditions", "condition", "variableDeclaration", "forDeclaration", 
		"fromNumber", "throughNumber", "whileDeclaration", "eachDeclaration", 
		"eachValueList", "importDeclaration", "referenceUrl", "mediaTypes", "nested", 
		"nest", "ruleset", "block", "selectors", "selector", "selectorPrefix", 
		"module", "element", "pseudo", "attrib", "attribRelate", "identifier", 
		"identifierPart", "identifierVariableName", "property", "values", "url", 
		"measurement", "argumentsStatement", "functionCall",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'null'", "'in'", undefined, undefined, "'...'", undefined, 
		"'('", "')'", "'{'", "'}'", "'['", "']'", "'>'", "'~'", "'<'", "':'", 
		"';'", "','", "'.'", "'$'", "'@'", "'&'", "'#'", "'::'", "'+'", "'*'", 
		"'/'", "'-'", "'%'", undefined, "'=='", "'!='", "'='", "'|='", "'~='", 
		"'@mixin'", "'@function'", "'@extend'", "'@implement'", "'@else'", "'if'", 
		"'@if'", "'@for'", "'@while'", "'@each'", "'@include'", "'@import'", "'@component'", 
		"'@return'", "'from'", "'through'", "'!default'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "NULL", "IN", "Unit", "COMBINE_COMPARE", "Ellipsis", "InterpolationStart", 
		"LPAREN", "RPAREN", "BlockStart", "BlockEnd", "LBRACK", "RBRACK", "GT", 
		"TIL", "LT", "COLON", "SEMI", "COMMA", "DOT", "DOLLAR", "AT", "AND", "HASH", 
		"COLONCOLON", "PLUS", "TIMES", "DIV", "MINUS", "PERC", "UrlStart", "EQEQ", 
		"NOTEQ", "EQ", "PIPE_EQ", "TILD_EQ", "MIXIN", "FUNCTION", "EXTEND", "IMPLEMENT", 
		"AT_ELSE", "IF", "AT_IF", "AT_FOR", "AT_WHILE", "AT_EACH", "INCLUDE", 
		"IMPORT", "COMPONENT", "RETURN", "FROM", "THROUGH", "POUND_DEFAULT", "Identifier", 
		"StringLiteral", "Number", "Color", "WS", "SL_COMMENT", "COMMENT", "UrlEnd", 
		"Url", "SPACE", "InterpolationStartAfter", "IdentifierAfter",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ModParser._LITERAL_NAMES, ModParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ModParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "ModParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return ModParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ModParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ModParser._ATN, this);
	}
	// @RuleVersion(0)
	public stylesheet(): StylesheetContext {
		let _localctx: StylesheetContext = new StylesheetContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ModParser.RULE_stylesheet);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 117;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ModParser.InterpolationStart) | (1 << ModParser.DOT) | (1 << ModParser.DOLLAR) | (1 << ModParser.AT) | (1 << ModParser.AND) | (1 << ModParser.HASH) | (1 << ModParser.TIMES))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (ModParser.MIXIN - 36)) | (1 << (ModParser.FUNCTION - 36)) | (1 << (ModParser.AT_IF - 36)) | (1 << (ModParser.AT_FOR - 36)) | (1 << (ModParser.AT_WHILE - 36)) | (1 << (ModParser.AT_EACH - 36)) | (1 << (ModParser.INCLUDE - 36)) | (1 << (ModParser.IMPORT - 36)) | (1 << (ModParser.Identifier - 36)))) !== 0)) {
				{
				{
				this.state = 114;
				this.statement();
				}
				}
				this.state = 119;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ModParser.RULE_statement);
		try {
			this.state = 131;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ModParser.IMPORT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 120;
				this.importDeclaration();
				}
				break;
			case ModParser.AT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 121;
				this.nested();
				}
				break;
			case ModParser.InterpolationStart:
			case ModParser.DOT:
			case ModParser.AND:
			case ModParser.HASH:
			case ModParser.TIMES:
			case ModParser.Identifier:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 122;
				this.ruleset();
				}
				break;
			case ModParser.MIXIN:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 123;
				this.mixinDeclaration();
				}
				break;
			case ModParser.FUNCTION:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 124;
				this.functionDeclaration();
				}
				break;
			case ModParser.DOLLAR:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 125;
				this.variableDeclaration();
				}
				break;
			case ModParser.INCLUDE:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 126;
				this.includeDeclaration();
				}
				break;
			case ModParser.AT_IF:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 127;
				this.ifDeclaration();
				}
				break;
			case ModParser.AT_FOR:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 128;
				this.forDeclaration();
				}
				break;
			case ModParser.AT_WHILE:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 129;
				this.whileDeclaration();
				}
				break;
			case ModParser.AT_EACH:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 130;
				this.eachDeclaration();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public params(): ParamsContext {
		let _localctx: ParamsContext = new ParamsContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ModParser.RULE_params);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 133;
			this.param();
			this.state = 138;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ModParser.COMMA) {
				{
				{
				this.state = 134;
				this.match(ModParser.COMMA);
				this.state = 135;
				this.param();
				}
				}
				this.state = 140;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 142;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ModParser.Ellipsis) {
				{
				this.state = 141;
				this.match(ModParser.Ellipsis);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public param(): ParamContext {
		let _localctx: ParamContext = new ParamContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ModParser.RULE_param);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 144;
			this.variableName();
			this.state = 146;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ModParser.COLON) {
				{
				this.state = 145;
				this.paramOptionalValue();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableName(): VariableNameContext {
		let _localctx: VariableNameContext = new VariableNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ModParser.RULE_variableName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 148;
			this.match(ModParser.DOLLAR);
			this.state = 149;
			this.match(ModParser.Identifier);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paramOptionalValue(): ParamOptionalValueContext {
		let _localctx: ParamOptionalValueContext = new ParamOptionalValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ModParser.RULE_paramOptionalValue);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 151;
			this.match(ModParser.COLON);
			this.state = 153;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 152;
				this.expression();
				}
				}
				this.state = 155;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ModParser.NULL) | (1 << ModParser.InterpolationStart) | (1 << ModParser.LPAREN) | (1 << ModParser.LBRACK) | (1 << ModParser.DOT) | (1 << ModParser.DOLLAR) | (1 << ModParser.HASH) | (1 << ModParser.PLUS) | (1 << ModParser.TIMES) | (1 << ModParser.DIV) | (1 << ModParser.MINUS) | (1 << ModParser.PERC) | (1 << ModParser.UrlStart))) !== 0) || ((((_la - 53)) & ~0x1F) === 0 && ((1 << (_la - 53)) & ((1 << (ModParser.Identifier - 53)) | (1 << (ModParser.StringLiteral - 53)) | (1 << (ModParser.Number - 53)) | (1 << (ModParser.Color - 53)))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mixinDeclaration(): MixinDeclarationContext {
		let _localctx: MixinDeclarationContext = new MixinDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ModParser.RULE_mixinDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 157;
			this.match(ModParser.MIXIN);
			this.state = 158;
			this.match(ModParser.Identifier);
			this.state = 164;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ModParser.LPAREN) {
				{
				this.state = 159;
				this.match(ModParser.LPAREN);
				this.state = 161;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ModParser.DOLLAR) {
					{
					this.state = 160;
					this.params();
					}
				}

				this.state = 163;
				this.match(ModParser.RPAREN);
				}
			}

			this.state = 166;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public includeDeclaration(): IncludeDeclarationContext {
		let _localctx: IncludeDeclarationContext = new IncludeDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ModParser.RULE_includeDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 168;
			this.match(ModParser.INCLUDE);
			this.state = 169;
			this.match(ModParser.Identifier);
			this.state = 184;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ModParser.SEMI:
				{
				this.state = 170;
				this.match(ModParser.SEMI);
				}
				break;
			case ModParser.NULL:
			case ModParser.InterpolationStart:
			case ModParser.LPAREN:
			case ModParser.BlockStart:
			case ModParser.BlockEnd:
			case ModParser.LBRACK:
			case ModParser.DOT:
			case ModParser.DOLLAR:
			case ModParser.AT:
			case ModParser.AND:
			case ModParser.HASH:
			case ModParser.PLUS:
			case ModParser.TIMES:
			case ModParser.DIV:
			case ModParser.MINUS:
			case ModParser.PERC:
			case ModParser.UrlStart:
			case ModParser.MIXIN:
			case ModParser.FUNCTION:
			case ModParser.EXTEND:
			case ModParser.IMPLEMENT:
			case ModParser.AT_IF:
			case ModParser.AT_FOR:
			case ModParser.AT_WHILE:
			case ModParser.AT_EACH:
			case ModParser.INCLUDE:
			case ModParser.IMPORT:
			case ModParser.RETURN:
			case ModParser.Identifier:
			case ModParser.StringLiteral:
			case ModParser.Number:
			case ModParser.Color:
				{
				this.state = 179;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
				case 1:
					{
					this.state = 171;
					this.match(ModParser.LPAREN);
					this.state = 173;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ModParser.NULL) | (1 << ModParser.InterpolationStart) | (1 << ModParser.LPAREN) | (1 << ModParser.LBRACK) | (1 << ModParser.DOT) | (1 << ModParser.DOLLAR) | (1 << ModParser.HASH) | (1 << ModParser.PLUS) | (1 << ModParser.TIMES) | (1 << ModParser.DIV) | (1 << ModParser.MINUS) | (1 << ModParser.PERC) | (1 << ModParser.UrlStart))) !== 0) || ((((_la - 53)) & ~0x1F) === 0 && ((1 << (_la - 53)) & ((1 << (ModParser.Identifier - 53)) | (1 << (ModParser.StringLiteral - 53)) | (1 << (ModParser.Number - 53)) | (1 << (ModParser.Color - 53)))) !== 0)) {
						{
						this.state = 172;
						this.values();
						}
					}

					this.state = 175;
					this.match(ModParser.RPAREN);
					this.state = 177;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ModParser.SEMI) {
						{
						this.state = 176;
						this.match(ModParser.SEMI);
						}
					}

					}
					break;
				}
				this.state = 182;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ModParser.BlockStart) {
					{
					this.state = 181;
					this.block();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public emptyListDeclaration(): EmptyListDeclarationContext {
		let _localctx: EmptyListDeclarationContext = new EmptyListDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, ModParser.RULE_emptyListDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 186;
			this.match(ModParser.LPAREN);
			this.state = 190;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ModParser.WS) {
				{
				{
				this.state = 187;
				this.match(ModParser.WS);
				}
				}
				this.state = 192;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 193;
			this.match(ModParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mapDeclaration(): MapDeclarationContext {
		let _localctx: MapDeclarationContext = new MapDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ModParser.RULE_mapDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 195;
			this.match(ModParser.LPAREN);
			this.state = 196;
			this.mapPropertyStatement();
			this.state = 201;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ModParser.COMMA) {
				{
				{
				this.state = 197;
				this.match(ModParser.COMMA);
				this.state = 198;
				this.mapPropertyStatement();
				}
				}
				this.state = 203;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 204;
			this.match(ModParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mapPropertyStatement(): MapPropertyStatementContext {
		let _localctx: MapPropertyStatementContext = new MapPropertyStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, ModParser.RULE_mapPropertyStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 206;
			this.identifier();
			{
			this.state = 207;
			this.match(ModParser.COLON);
			this.state = 208;
			this.values();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public listDeclaration(): ListDeclarationContext {
		let _localctx: ListDeclarationContext = new ListDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, ModParser.RULE_listDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 210;
			this.match(ModParser.LBRACK);
			this.state = 211;
			this.identifier();
			this.state = 216;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ModParser.COMMA) {
				{
				{
				this.state = 212;
				this.match(ModParser.COMMA);
				this.state = 213;
				this.identifier();
				}
				}
				this.state = 218;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 219;
			this.match(ModParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public listOrMap(): ListOrMapContext {
		let _localctx: ListOrMapContext = new ListOrMapContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, ModParser.RULE_listOrMap);
		try {
			this.state = 224;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 221;
				this.emptyListDeclaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 222;
				this.listDeclaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 223;
				this.mapDeclaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionDeclaration(): FunctionDeclarationContext {
		let _localctx: FunctionDeclarationContext = new FunctionDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, ModParser.RULE_functionDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 226;
			this.match(ModParser.FUNCTION);
			this.state = 227;
			this.match(ModParser.Identifier);
			this.state = 228;
			this.match(ModParser.LPAREN);
			this.state = 230;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ModParser.DOLLAR) {
				{
				this.state = 229;
				this.params();
				}
			}

			this.state = 232;
			this.match(ModParser.RPAREN);
			this.state = 233;
			this.match(ModParser.BlockStart);
			this.state = 235;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ModParser.NULL) | (1 << ModParser.InterpolationStart) | (1 << ModParser.LPAREN) | (1 << ModParser.LBRACK) | (1 << ModParser.DOT) | (1 << ModParser.DOLLAR) | (1 << ModParser.AT) | (1 << ModParser.AND) | (1 << ModParser.HASH) | (1 << ModParser.PLUS) | (1 << ModParser.TIMES) | (1 << ModParser.DIV) | (1 << ModParser.MINUS) | (1 << ModParser.PERC) | (1 << ModParser.UrlStart))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (ModParser.MIXIN - 36)) | (1 << (ModParser.FUNCTION - 36)) | (1 << (ModParser.AT_IF - 36)) | (1 << (ModParser.AT_FOR - 36)) | (1 << (ModParser.AT_WHILE - 36)) | (1 << (ModParser.AT_EACH - 36)) | (1 << (ModParser.INCLUDE - 36)) | (1 << (ModParser.IMPORT - 36)) | (1 << (ModParser.RETURN - 36)) | (1 << (ModParser.Identifier - 36)) | (1 << (ModParser.StringLiteral - 36)) | (1 << (ModParser.Number - 36)) | (1 << (ModParser.Color - 36)))) !== 0)) {
				{
				this.state = 234;
				this.functionBody();
				}
			}

			this.state = 237;
			this.match(ModParser.BlockEnd);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionBody(): FunctionBodyContext {
		let _localctx: FunctionBodyContext = new FunctionBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, ModParser.RULE_functionBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 242;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ModParser.NULL) | (1 << ModParser.InterpolationStart) | (1 << ModParser.LPAREN) | (1 << ModParser.LBRACK) | (1 << ModParser.DOT) | (1 << ModParser.DOLLAR) | (1 << ModParser.AT) | (1 << ModParser.AND) | (1 << ModParser.HASH) | (1 << ModParser.PLUS) | (1 << ModParser.TIMES) | (1 << ModParser.DIV) | (1 << ModParser.MINUS) | (1 << ModParser.PERC) | (1 << ModParser.UrlStart))) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & ((1 << (ModParser.MIXIN - 36)) | (1 << (ModParser.FUNCTION - 36)) | (1 << (ModParser.AT_IF - 36)) | (1 << (ModParser.AT_FOR - 36)) | (1 << (ModParser.AT_WHILE - 36)) | (1 << (ModParser.AT_EACH - 36)) | (1 << (ModParser.INCLUDE - 36)) | (1 << (ModParser.IMPORT - 36)) | (1 << (ModParser.Identifier - 36)) | (1 << (ModParser.StringLiteral - 36)) | (1 << (ModParser.Number - 36)) | (1 << (ModParser.Color - 36)))) !== 0)) {
				{
				{
				this.state = 239;
				this.functionStatement();
				}
				}
				this.state = 244;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 245;
			this.functionReturn();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionReturn(): FunctionReturnContext {
		let _localctx: FunctionReturnContext = new FunctionReturnContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, ModParser.RULE_functionReturn);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 247;
			this.match(ModParser.RETURN);
			this.state = 248;
			this.commandStatement();
			this.state = 249;
			this.match(ModParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionStatement(): FunctionStatementContext {
		let _localctx: FunctionStatementContext = new FunctionStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, ModParser.RULE_functionStatement);
		try {
			this.state = 255;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 251;
				this.commandStatement();
				this.state = 252;
				this.match(ModParser.SEMI);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 254;
				this.statement();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public commandStatement(): CommandStatementContext {
		let _localctx: CommandStatementContext = new CommandStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, ModParser.RULE_commandStatement);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 266;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				this.state = 258;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 257;
						this.expression();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 260;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;

			case 2:
				{
				this.state = 262;
				this.match(ModParser.LPAREN);
				this.state = 263;
				this.commandStatement();
				this.state = 264;
				this.match(ModParser.RPAREN);
				}
				break;
			}
			this.state = 269;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				{
				this.state = 268;
				this.mathStatement();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mathCharacter(): MathCharacterContext {
		let _localctx: MathCharacterContext = new MathCharacterContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, ModParser.RULE_mathCharacter);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 271;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ModParser.PLUS) | (1 << ModParser.TIMES) | (1 << ModParser.DIV) | (1 << ModParser.MINUS) | (1 << ModParser.PERC))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mathStatement(): MathStatementContext {
		let _localctx: MathStatementContext = new MathStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, ModParser.RULE_mathStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 273;
			this.mathCharacter();
			this.state = 274;
			this.commandStatement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, ModParser.RULE_expression);
		try {
			this.state = 287;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 276;
				this.mathStatement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 277;
				this.measurement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 278;
				this.module();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 279;
				this.identifier();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 280;
				this.listOrMap();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 281;
				this.match(ModParser.Color);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 282;
				this.match(ModParser.StringLiteral);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 283;
				this.match(ModParser.NULL);
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 284;
				this.url();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 285;
				this.variableName();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 286;
				this.functionCall();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifDeclaration(): IfDeclarationContext {
		let _localctx: IfDeclarationContext = new IfDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, ModParser.RULE_ifDeclaration);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 289;
			this.match(ModParser.AT_IF);
			this.state = 290;
			this.conditions();
			this.state = 291;
			this.block();
			this.state = 295;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 25, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 292;
					this.elseIfStatement();
					}
					}
				}
				this.state = 297;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 25, this._ctx);
			}
			this.state = 299;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ModParser.AT_ELSE) {
				{
				this.state = 298;
				this.elseStatement();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elseIfStatement(): ElseIfStatementContext {
		let _localctx: ElseIfStatementContext = new ElseIfStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, ModParser.RULE_elseIfStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 301;
			this.match(ModParser.AT_ELSE);
			this.state = 302;
			this.match(ModParser.IF);
			this.state = 303;
			this.conditions();
			this.state = 304;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elseStatement(): ElseStatementContext {
		let _localctx: ElseStatementContext = new ElseStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, ModParser.RULE_elseStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 306;
			this.match(ModParser.AT_ELSE);
			this.state = 307;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conditions(): ConditionsContext {
		let _localctx: ConditionsContext = new ConditionsContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, ModParser.RULE_conditions);
		try {
			this.state = 315;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 309;
				this.condition();
				this.state = 312;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 27, this._ctx) ) {
				case 1:
					{
					this.state = 310;
					this.match(ModParser.COMBINE_COMPARE);
					this.state = 311;
					this.conditions();
					}
					break;
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 314;
				this.match(ModParser.NULL);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public condition(): ConditionContext {
		let _localctx: ConditionContext = new ConditionContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, ModParser.RULE_condition);
		let _la: number;
		try {
			this.state = 326;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 317;
				this.commandStatement();
				this.state = 320;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 13)) & ~0x1F) === 0 && ((1 << (_la - 13)) & ((1 << (ModParser.GT - 13)) | (1 << (ModParser.LT - 13)) | (1 << (ModParser.EQEQ - 13)) | (1 << (ModParser.NOTEQ - 13)))) !== 0)) {
					{
					this.state = 318;
					_la = this._input.LA(1);
					if (!(((((_la - 13)) & ~0x1F) === 0 && ((1 << (_la - 13)) & ((1 << (ModParser.GT - 13)) | (1 << (ModParser.LT - 13)) | (1 << (ModParser.EQEQ - 13)) | (1 << (ModParser.NOTEQ - 13)))) !== 0))) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 319;
					this.conditions();
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 322;
				this.match(ModParser.LPAREN);
				this.state = 323;
				this.conditions();
				this.state = 324;
				this.match(ModParser.RPAREN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableDeclaration(): VariableDeclarationContext {
		let _localctx: VariableDeclarationContext = new VariableDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, ModParser.RULE_variableDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 328;
			this.variableName();
			this.state = 329;
			this.match(ModParser.COLON);
			this.state = 330;
			this.values();
			this.state = 332;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ModParser.POUND_DEFAULT) {
				{
				this.state = 331;
				this.match(ModParser.POUND_DEFAULT);
				}
			}

			this.state = 334;
			this.match(ModParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forDeclaration(): ForDeclarationContext {
		let _localctx: ForDeclarationContext = new ForDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, ModParser.RULE_forDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 336;
			this.match(ModParser.AT_FOR);
			this.state = 337;
			this.variableName();
			this.state = 338;
			this.match(ModParser.FROM);
			this.state = 339;
			this.fromNumber();
			this.state = 340;
			this.match(ModParser.THROUGH);
			this.state = 341;
			this.throughNumber();
			this.state = 342;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fromNumber(): FromNumberContext {
		let _localctx: FromNumberContext = new FromNumberContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, ModParser.RULE_fromNumber);
		try {
			this.state = 346;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ModParser.Number:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 344;
				this.match(ModParser.Number);
				}
				break;
			case ModParser.DOLLAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 345;
				this.variableName();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public throughNumber(): ThroughNumberContext {
		let _localctx: ThroughNumberContext = new ThroughNumberContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, ModParser.RULE_throughNumber);
		try {
			this.state = 350;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ModParser.Number:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 348;
				this.match(ModParser.Number);
				}
				break;
			case ModParser.DOLLAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 349;
				this.variableName();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public whileDeclaration(): WhileDeclarationContext {
		let _localctx: WhileDeclarationContext = new WhileDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, ModParser.RULE_whileDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 352;
			this.match(ModParser.AT_WHILE);
			this.state = 353;
			this.conditions();
			this.state = 354;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eachDeclaration(): EachDeclarationContext {
		let _localctx: EachDeclarationContext = new EachDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, ModParser.RULE_eachDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 356;
			this.match(ModParser.AT_EACH);
			this.state = 357;
			this.variableName();
			this.state = 362;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ModParser.COMMA) {
				{
				{
				this.state = 358;
				this.match(ModParser.COMMA);
				this.state = 359;
				this.variableName();
				}
				}
				this.state = 364;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 365;
			this.match(ModParser.IN);
			this.state = 366;
			this.eachValueList();
			this.state = 367;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eachValueList(): EachValueListContext {
		let _localctx: EachValueListContext = new EachValueListContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, ModParser.RULE_eachValueList);
		let _la: number;
		try {
			this.state = 385;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ModParser.Identifier:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 369;
				this.match(ModParser.Identifier);
				this.state = 374;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ModParser.COMMA) {
					{
					{
					this.state = 370;
					this.match(ModParser.COMMA);
					this.state = 371;
					this.match(ModParser.Identifier);
					}
					}
					this.state = 376;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case ModParser.LPAREN:
			case ModParser.LBRACK:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 377;
				this.listOrMap();
				this.state = 382;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ModParser.COMMA) {
					{
					{
					this.state = 378;
					this.match(ModParser.COMMA);
					this.state = 379;
					this.listOrMap();
					}
					}
					this.state = 384;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public importDeclaration(): ImportDeclarationContext {
		let _localctx: ImportDeclarationContext = new ImportDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, ModParser.RULE_importDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 387;
			this.match(ModParser.IMPORT);
			this.state = 388;
			this.referenceUrl();
			this.state = 390;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ModParser.Identifier) {
				{
				this.state = 389;
				this.mediaTypes();
				}
			}

			this.state = 392;
			this.match(ModParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public referenceUrl(): ReferenceUrlContext {
		let _localctx: ReferenceUrlContext = new ReferenceUrlContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, ModParser.RULE_referenceUrl);
		try {
			this.state = 398;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ModParser.StringLiteral:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 394;
				this.match(ModParser.StringLiteral);
				}
				break;
			case ModParser.UrlStart:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 395;
				this.match(ModParser.UrlStart);
				this.state = 396;
				this.match(ModParser.Url);
				this.state = 397;
				this.match(ModParser.UrlEnd);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mediaTypes(): MediaTypesContext {
		let _localctx: MediaTypesContext = new MediaTypesContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, ModParser.RULE_mediaTypes);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 400;
			this.match(ModParser.Identifier);
			this.state = 405;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ModParser.COMMA) {
				{
				{
				this.state = 401;
				this.match(ModParser.COMMA);
				this.state = 402;
				this.match(ModParser.Identifier);
				}
				}
				this.state = 407;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nested(): NestedContext {
		let _localctx: NestedContext = new NestedContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, ModParser.RULE_nested);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 408;
			this.match(ModParser.AT);
			this.state = 409;
			this.nest();
			this.state = 410;
			this.selectors();
			this.state = 411;
			this.match(ModParser.BlockStart);
			this.state = 412;
			this.stylesheet();
			this.state = 413;
			this.match(ModParser.BlockEnd);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nest(): NestContext {
		let _localctx: NestContext = new NestContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, ModParser.RULE_nest);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 415;
			_la = this._input.LA(1);
			if (!(_la === ModParser.AND || _la === ModParser.Identifier)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 419;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 416;
					this.match(ModParser.Identifier);
					}
					}
				}
				this.state = 421;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx);
			}
			this.state = 425;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ModParser.COLON || _la === ModParser.COLONCOLON) {
				{
				{
				this.state = 422;
				this.pseudo();
				}
				}
				this.state = 427;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ruleset(): RulesetContext {
		let _localctx: RulesetContext = new RulesetContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, ModParser.RULE_ruleset);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 428;
			this.selectors();
			this.state = 429;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let _localctx: BlockContext = new BlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, ModParser.RULE_block);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 431;
			this.match(ModParser.BlockStart);
			this.state = 438;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 44, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					this.state = 436;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 43, this._ctx) ) {
					case 1:
						{
						this.state = 432;
						this.property();
						this.state = 433;
						this.match(ModParser.SEMI);
						}
						break;

					case 2:
						{
						this.state = 435;
						this.statement();
						}
						break;
					}
					}
				}
				this.state = 440;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 44, this._ctx);
			}
			this.state = 442;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ModParser.InterpolationStart || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & ((1 << (ModParser.EXTEND - 38)) | (1 << (ModParser.IMPLEMENT - 38)) | (1 << (ModParser.Identifier - 38)))) !== 0)) {
				{
				this.state = 441;
				this.property();
				}
			}

			this.state = 444;
			this.match(ModParser.BlockEnd);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectors(): SelectorsContext {
		let _localctx: SelectorsContext = new SelectorsContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, ModParser.RULE_selectors);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 446;
			this.selector();
			this.state = 451;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ModParser.COMMA) {
				{
				{
				this.state = 447;
				this.match(ModParser.COMMA);
				this.state = 448;
				this.selector();
				}
				}
				this.state = 453;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selector(): SelectorContext {
		let _localctx: SelectorContext = new SelectorContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, ModParser.RULE_selector);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 455;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 454;
				this.element();
				}
				}
				this.state = 457;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ModParser.InterpolationStart) | (1 << ModParser.DOT) | (1 << ModParser.AND) | (1 << ModParser.HASH) | (1 << ModParser.TIMES))) !== 0) || _la === ModParser.Identifier);
			this.state = 464;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ModParser.GT) | (1 << ModParser.TIL) | (1 << ModParser.PLUS))) !== 0)) {
				{
				{
				this.state = 459;
				this.selectorPrefix();
				this.state = 460;
				this.element();
				}
				}
				this.state = 466;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 470;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ModParser.LBRACK) {
				{
				{
				this.state = 467;
				this.attrib();
				}
				}
				this.state = 472;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 474;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ModParser.COLON || _la === ModParser.COLONCOLON) {
				{
				this.state = 473;
				this.pseudo();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectorPrefix(): SelectorPrefixContext {
		let _localctx: SelectorPrefixContext = new SelectorPrefixContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, ModParser.RULE_selectorPrefix);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 476;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ModParser.GT) | (1 << ModParser.TIL) | (1 << ModParser.PLUS))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public module(): ModuleContext {
		let _localctx: ModuleContext = new ModuleContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, ModParser.RULE_module);
		try {
			this.state = 482;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ModParser.HASH:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 478;
				this.match(ModParser.HASH);
				this.state = 479;
				this.identifier();
				}
				break;
			case ModParser.DOT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 480;
				this.match(ModParser.DOT);
				this.state = 481;
				this.identifier();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public element(): ElementContext {
		let _localctx: ElementContext = new ElementContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, ModParser.RULE_element);
		try {
			this.state = 488;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ModParser.InterpolationStart:
			case ModParser.Identifier:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 484;
				this.identifier();
				}
				break;
			case ModParser.DOT:
			case ModParser.HASH:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 485;
				this.module();
				}
				break;
			case ModParser.AND:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 486;
				this.match(ModParser.AND);
				}
				break;
			case ModParser.TIMES:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 487;
				this.match(ModParser.TIMES);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pseudo(): PseudoContext {
		let _localctx: PseudoContext = new PseudoContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, ModParser.RULE_pseudo);
		let _la: number;
		try {
			this.state = 494;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 53, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 490;
				_la = this._input.LA(1);
				if (!(_la === ModParser.COLON || _la === ModParser.COLONCOLON)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 491;
				this.match(ModParser.Identifier);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 492;
				_la = this._input.LA(1);
				if (!(_la === ModParser.COLON || _la === ModParser.COLONCOLON)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 493;
				this.functionCall();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attrib(): AttribContext {
		let _localctx: AttribContext = new AttribContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, ModParser.RULE_attrib);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 496;
			this.match(ModParser.LBRACK);
			this.state = 497;
			this.match(ModParser.Identifier);
			this.state = 501;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (ModParser.EQ - 33)) | (1 << (ModParser.PIPE_EQ - 33)) | (1 << (ModParser.TILD_EQ - 33)))) !== 0)) {
				{
				this.state = 498;
				this.attribRelate();
				this.state = 499;
				_la = this._input.LA(1);
				if (!(_la === ModParser.Identifier || _la === ModParser.StringLiteral)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
			}

			this.state = 503;
			this.match(ModParser.RBRACK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attribRelate(): AttribRelateContext {
		let _localctx: AttribRelateContext = new AttribRelateContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, ModParser.RULE_attribRelate);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 505;
			_la = this._input.LA(1);
			if (!(((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (ModParser.EQ - 33)) | (1 << (ModParser.PIPE_EQ - 33)) | (1 << (ModParser.TILD_EQ - 33)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, ModParser.RULE_identifier);
		let _la: number;
		try {
			this.state = 523;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ModParser.Identifier:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 507;
				this.match(ModParser.Identifier);
				this.state = 511;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ModParser.InterpolationStartAfter || _la === ModParser.IdentifierAfter) {
					{
					{
					this.state = 508;
					this.identifierPart();
					}
					}
					this.state = 513;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case ModParser.InterpolationStart:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 514;
				this.match(ModParser.InterpolationStart);
				this.state = 515;
				this.identifierVariableName();
				this.state = 516;
				this.match(ModParser.BlockEnd);
				this.state = 520;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ModParser.InterpolationStartAfter || _la === ModParser.IdentifierAfter) {
					{
					{
					this.state = 517;
					this.identifierPart();
					}
					}
					this.state = 522;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifierPart(): IdentifierPartContext {
		let _localctx: IdentifierPartContext = new IdentifierPartContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, ModParser.RULE_identifierPart);
		try {
			this.state = 530;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ModParser.InterpolationStartAfter:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 525;
				this.match(ModParser.InterpolationStartAfter);
				this.state = 526;
				this.identifierVariableName();
				this.state = 527;
				this.match(ModParser.BlockEnd);
				}
				break;
			case ModParser.IdentifierAfter:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 529;
				this.match(ModParser.IdentifierAfter);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifierVariableName(): IdentifierVariableNameContext {
		let _localctx: IdentifierVariableNameContext = new IdentifierVariableNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, ModParser.RULE_identifierVariableName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 532;
			this.match(ModParser.DOLLAR);
			this.state = 533;
			_la = this._input.LA(1);
			if (!(_la === ModParser.Identifier || _la === ModParser.IdentifierAfter)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public property(): PropertyContext {
		let _localctx: PropertyContext = new PropertyContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, ModParser.RULE_property);
		try {
			this.state = 543;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ModParser.IMPLEMENT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 535;
				this.match(ModParser.IMPLEMENT);
				this.state = 536;
				this.module();
				}
				break;
			case ModParser.EXTEND:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 537;
				this.match(ModParser.EXTEND);
				this.state = 538;
				this.module();
				}
				break;
			case ModParser.InterpolationStart:
			case ModParser.Identifier:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 539;
				this.identifier();
				this.state = 540;
				this.match(ModParser.COLON);
				this.state = 541;
				this.values();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public values(): ValuesContext {
		let _localctx: ValuesContext = new ValuesContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, ModParser.RULE_values);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 545;
			this.commandStatement();
			this.state = 550;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 60, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 546;
					this.match(ModParser.COMMA);
					this.state = 547;
					this.commandStatement();
					}
					}
				}
				this.state = 552;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 60, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public url(): UrlContext {
		let _localctx: UrlContext = new UrlContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, ModParser.RULE_url);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 553;
			this.match(ModParser.UrlStart);
			this.state = 554;
			this.match(ModParser.Url);
			this.state = 555;
			this.match(ModParser.UrlEnd);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public measurement(): MeasurementContext {
		let _localctx: MeasurementContext = new MeasurementContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, ModParser.RULE_measurement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 557;
			this.match(ModParser.Number);
			this.state = 559;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ModParser.Unit) {
				{
				this.state = 558;
				this.match(ModParser.Unit);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public argumentsStatement(): ArgumentsStatementContext {
		let _localctx: ArgumentsStatementContext = new ArgumentsStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, ModParser.RULE_argumentsStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 562;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ModParser.NULL) | (1 << ModParser.InterpolationStart) | (1 << ModParser.LPAREN) | (1 << ModParser.LBRACK) | (1 << ModParser.DOT) | (1 << ModParser.DOLLAR) | (1 << ModParser.HASH) | (1 << ModParser.PLUS) | (1 << ModParser.TIMES) | (1 << ModParser.DIV) | (1 << ModParser.MINUS) | (1 << ModParser.PERC) | (1 << ModParser.UrlStart))) !== 0) || ((((_la - 53)) & ~0x1F) === 0 && ((1 << (_la - 53)) & ((1 << (ModParser.Identifier - 53)) | (1 << (ModParser.StringLiteral - 53)) | (1 << (ModParser.Number - 53)) | (1 << (ModParser.Color - 53)))) !== 0)) {
				{
				this.state = 561;
				this.commandStatement();
				}
			}

			this.state = 570;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ModParser.COMMA) {
				{
				{
				this.state = 564;
				this.match(ModParser.COMMA);
				this.state = 566;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ModParser.NULL) | (1 << ModParser.InterpolationStart) | (1 << ModParser.LPAREN) | (1 << ModParser.LBRACK) | (1 << ModParser.DOT) | (1 << ModParser.DOLLAR) | (1 << ModParser.HASH) | (1 << ModParser.PLUS) | (1 << ModParser.TIMES) | (1 << ModParser.DIV) | (1 << ModParser.MINUS) | (1 << ModParser.PERC) | (1 << ModParser.UrlStart))) !== 0) || ((((_la - 53)) & ~0x1F) === 0 && ((1 << (_la - 53)) & ((1 << (ModParser.Identifier - 53)) | (1 << (ModParser.StringLiteral - 53)) | (1 << (ModParser.Number - 53)) | (1 << (ModParser.Color - 53)))) !== 0)) {
					{
					this.state = 565;
					this.commandStatement();
					}
				}

				}
				}
				this.state = 572;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionCall(): FunctionCallContext {
		let _localctx: FunctionCallContext = new FunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, ModParser.RULE_functionCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 573;
			this.match(ModParser.Identifier);
			this.state = 574;
			this.match(ModParser.LPAREN);
			this.state = 575;
			this.argumentsStatement();
			this.state = 576;
			this.match(ModParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03B\u0245\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x03\x02\x07\x02v\n" +
		"\x02\f\x02\x0E\x02y\v\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03\x86\n\x03\x03\x04" +
		"\x03\x04\x03\x04\x07\x04\x8B\n\x04\f\x04\x0E\x04\x8E\v\x04\x03\x04\x05" +
		"\x04\x91\n\x04\x03\x05\x03\x05\x05\x05\x95\n\x05\x03\x06\x03\x06\x03\x06" +
		"\x03\x07\x03\x07\x06\x07\x9C\n\x07\r\x07\x0E\x07\x9D\x03\b\x03\b\x03\b" +
		"\x03\b\x05\b\xA4\n\b\x03\b\x05\b\xA7\n\b\x03\b\x03\b\x03\t\x03\t\x03\t" +
		"\x03\t\x03\t\x05\t\xB0\n\t\x03\t\x03\t\x05\t\xB4\n\t\x05\t\xB6\n\t\x03" +
		"\t\x05\t\xB9\n\t\x05\t\xBB\n\t\x03\n\x03\n\x07\n\xBF\n\n\f\n\x0E\n\xC2" +
		"\v\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x07\v\xCA\n\v\f\v\x0E\v\xCD\v" +
		"\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x07\r\xD9" +
		"\n\r\f\r\x0E\r\xDC\v\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xE3" +
		"\n\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xE9\n\x0F\x03\x0F\x03\x0F" +
		"\x03\x0F\x05\x0F\xEE\n\x0F\x03\x0F\x03\x0F\x03\x10\x07\x10\xF3\n\x10\f" +
		"\x10\x0E\x10\xF6\v\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11" +
		"\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12\u0102\n\x12\x03\x13\x06\x13\u0105" +
		"\n\x13\r\x13\x0E\x13\u0106\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\u010D" +
		"\n\x13\x03\x13\x05\x13\u0110\n\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03" +
		"\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x05\x16\u0122\n\x16\x03\x17\x03\x17\x03\x17\x03\x17" +
		"\x07\x17\u0128\n\x17\f\x17\x0E\x17\u012B\v\x17\x03\x17\x05\x17\u012E\n" +
		"\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x03" +
		"\x1A\x03\x1A\x03\x1A\x05\x1A\u013B\n\x1A\x03\x1A\x05\x1A\u013E\n\x1A\x03" +
		"\x1B\x03\x1B\x03\x1B\x05\x1B\u0143\n\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x05\x1B\u0149\n\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05\x1C\u014F\n\x1C" +
		"\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D" +
		"\x03\x1D\x03\x1E\x03\x1E\x05\x1E\u015D\n\x1E\x03\x1F\x03\x1F\x05\x1F\u0161" +
		"\n\x1F\x03 \x03 \x03 \x03 \x03!\x03!\x03!\x03!\x07!\u016B\n!\f!\x0E!\u016E" +
		"\v!\x03!\x03!\x03!\x03!\x03\"\x03\"\x03\"\x07\"\u0177\n\"\f\"\x0E\"\u017A" +
		"\v\"\x03\"\x03\"\x03\"\x07\"\u017F\n\"\f\"\x0E\"\u0182\v\"\x05\"\u0184" +
		"\n\"\x03#\x03#\x03#\x05#\u0189\n#\x03#\x03#\x03$\x03$\x03$\x03$\x05$\u0191" +
		"\n$\x03%\x03%\x03%\x07%\u0196\n%\f%\x0E%\u0199\v%\x03&\x03&\x03&\x03&" +
		"\x03&\x03&\x03&\x03\'\x03\'\x07\'\u01A4\n\'\f\'\x0E\'\u01A7\v\'\x03\'" +
		"\x07\'\u01AA\n\'\f\'\x0E\'\u01AD\v\'\x03(\x03(\x03(\x03)\x03)\x03)\x03" +
		")\x03)\x07)\u01B7\n)\f)\x0E)\u01BA\v)\x03)\x05)\u01BD\n)\x03)\x03)\x03" +
		"*\x03*\x03*\x07*\u01C4\n*\f*\x0E*\u01C7\v*\x03+\x06+\u01CA\n+\r+\x0E+" +
		"\u01CB\x03+\x03+\x03+\x07+\u01D1\n+\f+\x0E+\u01D4\v+\x03+\x07+\u01D7\n" +
		"+\f+\x0E+\u01DA\v+\x03+\x05+\u01DD\n+\x03,\x03,\x03-\x03-\x03-\x03-\x05" +
		"-\u01E5\n-\x03.\x03.\x03.\x03.\x05.\u01EB\n.\x03/\x03/\x03/\x03/\x05/" +
		"\u01F1\n/\x030\x030\x030\x030\x030\x050\u01F8\n0\x030\x030\x031\x031\x03" +
		"2\x032\x072\u0200\n2\f2\x0E2\u0203\v2\x032\x032\x032\x032\x072\u0209\n" +
		"2\f2\x0E2\u020C\v2\x052\u020E\n2\x033\x033\x033\x033\x033\x053\u0215\n" +
		"3\x034\x034\x034\x035\x035\x035\x035\x035\x035\x035\x035\x055\u0222\n" +
		"5\x036\x036\x036\x076\u0227\n6\f6\x0E6\u022A\v6\x037\x037\x037\x037\x03" +
		"8\x038\x058\u0232\n8\x039\x059\u0235\n9\x039\x039\x059\u0239\n9\x079\u023B" +
		"\n9\f9\x0E9\u023E\v9\x03:\x03:\x03:\x03:\x03:\x03:\x02\x02\x02;\x02\x02" +
		"\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16" +
		"\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02" +
		".\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02" +
		"J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02" +
		"f\x02h\x02j\x02l\x02n\x02p\x02r\x02\x02\n\x03\x02\x1B\x1F\x05\x02\x0F" +
		"\x0F\x11\x11!\"\x04\x02\x18\x1877\x04\x02\x0F\x10\x1B\x1B\x04\x02\x12" +
		"\x12\x1A\x1A\x03\x0278\x03\x02#%\x04\x0277BB\x02\u0262\x02w\x03\x02\x02" +
		"\x02\x04\x85\x03\x02\x02\x02\x06\x87\x03\x02\x02\x02\b\x92\x03\x02\x02" +
		"\x02\n\x96\x03\x02\x02\x02\f\x99\x03\x02\x02\x02\x0E\x9F\x03\x02\x02\x02" +
		"\x10\xAA\x03\x02\x02\x02\x12\xBC\x03\x02\x02\x02\x14\xC5\x03\x02\x02\x02" +
		"\x16\xD0\x03\x02\x02\x02\x18\xD4\x03\x02\x02\x02\x1A\xE2\x03\x02\x02\x02" +
		"\x1C\xE4\x03\x02\x02\x02\x1E\xF4\x03\x02\x02\x02 \xF9\x03\x02\x02\x02" +
		"\"\u0101\x03\x02\x02\x02$\u010C\x03\x02\x02\x02&\u0111\x03\x02\x02\x02" +
		"(\u0113\x03\x02\x02\x02*\u0121\x03\x02\x02\x02,\u0123\x03\x02\x02\x02" +
		".\u012F\x03\x02\x02\x020\u0134\x03\x02\x02\x022\u013D\x03\x02\x02\x02" +
		"4\u0148\x03\x02\x02\x026\u014A\x03\x02\x02\x028\u0152\x03\x02\x02\x02" +
		":\u015C\x03\x02\x02\x02<\u0160\x03\x02\x02\x02>\u0162\x03\x02\x02\x02" +
		"@\u0166\x03\x02\x02\x02B\u0183\x03\x02\x02\x02D\u0185\x03\x02\x02\x02" +
		"F\u0190\x03\x02\x02\x02H\u0192\x03\x02\x02\x02J\u019A\x03\x02\x02\x02" +
		"L\u01A1\x03\x02\x02\x02N\u01AE\x03\x02\x02\x02P\u01B1\x03\x02\x02\x02" +
		"R\u01C0\x03\x02\x02\x02T\u01C9\x03\x02\x02\x02V\u01DE\x03\x02\x02\x02" +
		"X\u01E4\x03\x02\x02\x02Z\u01EA\x03\x02\x02\x02\\\u01F0\x03\x02\x02\x02" +
		"^\u01F2\x03\x02\x02\x02`\u01FB\x03\x02\x02\x02b\u020D\x03\x02\x02\x02" +
		"d\u0214\x03\x02\x02\x02f\u0216\x03\x02\x02\x02h\u0221\x03\x02\x02\x02" +
		"j\u0223\x03\x02\x02\x02l\u022B\x03\x02\x02\x02n\u022F\x03\x02\x02\x02" +
		"p\u0234\x03\x02\x02\x02r\u023F\x03\x02\x02\x02tv\x05\x04\x03\x02ut\x03" +
		"\x02\x02\x02vy\x03\x02\x02\x02wu\x03\x02\x02\x02wx\x03\x02\x02\x02x\x03" +
		"\x03\x02\x02\x02yw\x03\x02\x02\x02z\x86\x05D#\x02{\x86\x05J&\x02|\x86" +
		"\x05N(\x02}\x86\x05\x0E\b\x02~\x86\x05\x1C\x0F\x02\x7F\x86\x056\x1C\x02" +
		"\x80\x86\x05\x10\t\x02\x81\x86\x05,\x17\x02\x82\x86\x058\x1D\x02\x83\x86" +
		"\x05> \x02\x84\x86\x05@!\x02\x85z\x03\x02\x02\x02\x85{\x03\x02\x02\x02" +
		"\x85|\x03\x02\x02\x02\x85}\x03\x02\x02\x02\x85~\x03\x02\x02\x02\x85\x7F" +
		"\x03\x02\x02\x02\x85\x80\x03\x02\x02\x02\x85\x81\x03\x02\x02\x02\x85\x82" +
		"\x03\x02\x02\x02\x85\x83\x03\x02\x02\x02\x85\x84\x03\x02\x02\x02\x86\x05" +
		"\x03\x02\x02\x02\x87\x8C\x05\b\x05\x02\x88\x89\x07\x14\x02\x02\x89\x8B" +
		"\x05\b\x05\x02\x8A\x88\x03\x02\x02\x02\x8B\x8E\x03\x02\x02\x02\x8C\x8A" +
		"\x03\x02\x02\x02\x8C\x8D\x03\x02\x02\x02\x8D\x90\x03\x02\x02\x02\x8E\x8C" +
		"\x03\x02\x02\x02\x8F\x91\x07\x07\x02\x02\x90\x8F\x03\x02\x02\x02\x90\x91" +
		"\x03\x02\x02\x02\x91\x07\x03\x02\x02\x02\x92\x94\x05\n\x06\x02\x93\x95" +
		"\x05\f\x07\x02\x94\x93\x03\x02\x02\x02\x94\x95\x03\x02\x02\x02\x95\t\x03" +
		"\x02\x02\x02\x96\x97\x07\x16\x02\x02\x97\x98\x077\x02\x02\x98\v\x03\x02" +
		"\x02\x02\x99\x9B\x07\x12\x02\x02\x9A\x9C\x05*\x16\x02\x9B\x9A\x03\x02" +
		"\x02\x02\x9C\x9D\x03\x02\x02\x02\x9D\x9B\x03\x02\x02\x02\x9D\x9E\x03\x02" +
		"\x02\x02\x9E\r\x03\x02\x02\x02\x9F\xA0\x07&\x02\x02\xA0\xA6\x077\x02\x02" +
		"\xA1\xA3\x07\t\x02\x02\xA2\xA4\x05\x06\x04\x02\xA3\xA2\x03\x02\x02\x02" +
		"\xA3\xA4\x03\x02\x02\x02\xA4\xA5\x03\x02\x02\x02\xA5\xA7\x07\n\x02\x02" +
		"\xA6\xA1\x03\x02\x02\x02\xA6\xA7\x03\x02\x02\x02\xA7\xA8\x03\x02\x02\x02" +
		"\xA8\xA9\x05P)\x02\xA9\x0F\x03\x02\x02\x02\xAA\xAB\x070\x02\x02\xAB\xBA" +
		"\x077\x02\x02\xAC\xBB\x07\x13\x02\x02\xAD\xAF\x07\t\x02\x02\xAE\xB0\x05" +
		"j6\x02\xAF\xAE\x03\x02\x02\x02\xAF\xB0\x03\x02\x02\x02\xB0\xB1\x03\x02" +
		"\x02\x02\xB1\xB3\x07\n\x02\x02\xB2\xB4\x07\x13\x02\x02\xB3\xB2\x03\x02" +
		"\x02\x02\xB3\xB4\x03\x02\x02\x02\xB4\xB6\x03\x02\x02\x02\xB5\xAD\x03\x02" +
		"\x02\x02\xB5\xB6\x03\x02\x02\x02\xB6\xB8\x03\x02\x02\x02\xB7\xB9\x05P" +
		")\x02\xB8\xB7\x03\x02\x02\x02\xB8\xB9\x03\x02\x02\x02\xB9\xBB\x03\x02" +
		"\x02\x02\xBA\xAC\x03\x02\x02\x02\xBA\xB5\x03\x02\x02\x02\xBB\x11\x03\x02" +
		"\x02\x02\xBC\xC0\x07\t\x02\x02\xBD\xBF\x07;\x02\x02\xBE\xBD\x03\x02\x02" +
		"\x02\xBF\xC2\x03\x02\x02\x02\xC0\xBE\x03\x02\x02\x02\xC0\xC1\x03\x02\x02" +
		"\x02\xC1\xC3\x03\x02\x02\x02\xC2\xC0\x03\x02\x02\x02\xC3\xC4\x07\n\x02" +
		"\x02\xC4\x13\x03\x02\x02\x02\xC5\xC6\x07\t\x02\x02\xC6\xCB\x05\x16\f\x02" +
		"\xC7\xC8\x07\x14\x02\x02\xC8\xCA\x05\x16\f\x02\xC9\xC7\x03\x02\x02\x02" +
		"\xCA\xCD\x03\x02\x02\x02\xCB\xC9\x03\x02\x02\x02\xCB\xCC\x03\x02\x02\x02" +
		"\xCC\xCE\x03\x02\x02\x02\xCD\xCB\x03\x02\x02\x02\xCE\xCF\x07\n\x02\x02" +
		"\xCF\x15\x03\x02\x02\x02\xD0\xD1\x05b2\x02\xD1\xD2\x07\x12\x02\x02\xD2" +
		"\xD3\x05j6\x02\xD3\x17\x03\x02\x02\x02\xD4\xD5\x07\r\x02\x02\xD5\xDA\x05" +
		"b2\x02\xD6\xD7\x07\x14\x02\x02\xD7\xD9\x05b2\x02\xD8\xD6\x03\x02\x02\x02" +
		"\xD9\xDC\x03\x02\x02\x02\xDA\xD8\x03\x02\x02\x02\xDA\xDB\x03\x02\x02\x02" +
		"\xDB\xDD\x03\x02\x02\x02\xDC\xDA\x03\x02\x02\x02\xDD\xDE\x07\n\x02\x02" +
		"\xDE\x19\x03\x02\x02\x02\xDF\xE3\x05\x12\n\x02\xE0\xE3\x05\x18\r\x02\xE1" +
		"\xE3\x05\x14\v\x02\xE2\xDF\x03\x02\x02\x02\xE2\xE0\x03\x02\x02\x02\xE2" +
		"\xE1\x03\x02\x02\x02\xE3\x1B\x03\x02\x02\x02\xE4\xE5\x07\'\x02\x02\xE5" +
		"\xE6\x077\x02\x02\xE6\xE8\x07\t\x02\x02\xE7\xE9\x05\x06\x04\x02\xE8\xE7" +
		"\x03\x02\x02\x02\xE8\xE9\x03\x02\x02\x02\xE9\xEA\x03\x02\x02\x02\xEA\xEB" +
		"\x07\n\x02\x02\xEB\xED\x07\v\x02\x02\xEC\xEE\x05\x1E\x10\x02\xED\xEC\x03" +
		"\x02\x02\x02\xED\xEE\x03\x02\x02\x02\xEE\xEF\x03\x02\x02\x02\xEF\xF0\x07" +
		"\f\x02\x02\xF0\x1D\x03\x02\x02\x02\xF1\xF3\x05\"\x12\x02\xF2\xF1\x03\x02" +
		"\x02\x02\xF3\xF6\x03\x02\x02\x02\xF4\xF2\x03\x02\x02\x02\xF4\xF5\x03\x02" +
		"\x02\x02\xF5\xF7\x03\x02\x02\x02\xF6\xF4\x03\x02\x02\x02\xF7\xF8\x05 " +
		"\x11\x02\xF8\x1F\x03\x02\x02\x02\xF9\xFA\x073\x02\x02\xFA\xFB\x05$\x13" +
		"\x02\xFB\xFC\x07\x13\x02\x02\xFC!\x03\x02\x02\x02\xFD\xFE\x05$\x13\x02" +
		"\xFE\xFF\x07\x13\x02\x02\xFF\u0102\x03\x02\x02\x02\u0100\u0102\x05\x04" +
		"\x03\x02\u0101\xFD\x03\x02\x02\x02\u0101\u0100\x03\x02\x02\x02\u0102#" +
		"\x03\x02\x02\x02\u0103\u0105\x05*\x16\x02\u0104\u0103\x03\x02\x02\x02" +
		"\u0105\u0106\x03\x02\x02\x02\u0106\u0104\x03\x02\x02\x02\u0106\u0107\x03" +
		"\x02\x02\x02\u0107\u010D\x03\x02\x02\x02\u0108\u0109\x07\t\x02\x02\u0109" +
		"\u010A\x05$\x13\x02\u010A\u010B\x07\n\x02\x02\u010B\u010D\x03\x02\x02" +
		"\x02\u010C\u0104\x03\x02\x02\x02\u010C\u0108\x03\x02\x02\x02\u010D\u010F" +
		"\x03\x02\x02\x02\u010E\u0110\x05(\x15\x02\u010F\u010E\x03\x02\x02\x02" +
		"\u010F\u0110\x03\x02\x02\x02\u0110%\x03\x02\x02\x02\u0111\u0112\t\x02" +
		"\x02\x02\u0112\'\x03\x02\x02\x02\u0113\u0114\x05&\x14\x02\u0114\u0115" +
		"\x05$\x13\x02\u0115)\x03\x02\x02\x02\u0116\u0122\x05(\x15\x02\u0117\u0122" +
		"\x05n8\x02\u0118\u0122\x05X-\x02\u0119\u0122\x05b2\x02\u011A\u0122\x05" +
		"\x1A\x0E\x02\u011B\u0122\x07:\x02\x02\u011C\u0122\x078\x02\x02\u011D\u0122" +
		"\x07\x03\x02\x02\u011E\u0122\x05l7\x02\u011F\u0122\x05\n\x06\x02\u0120" +
		"\u0122\x05r:\x02\u0121\u0116\x03\x02\x02\x02\u0121\u0117\x03\x02\x02\x02" +
		"\u0121\u0118\x03\x02\x02\x02\u0121\u0119\x03\x02\x02\x02\u0121\u011A\x03" +
		"\x02\x02\x02\u0121\u011B\x03\x02\x02\x02\u0121\u011C\x03\x02\x02\x02\u0121" +
		"\u011D\x03\x02\x02\x02\u0121\u011E\x03\x02\x02\x02\u0121\u011F\x03\x02" +
		"\x02\x02\u0121\u0120\x03\x02\x02\x02\u0122+\x03\x02\x02\x02\u0123\u0124" +
		"\x07,\x02\x02\u0124\u0125\x052\x1A\x02\u0125\u0129\x05P)\x02\u0126\u0128" +
		"\x05.\x18\x02\u0127\u0126\x03\x02\x02\x02\u0128\u012B\x03\x02\x02\x02" +
		"\u0129\u0127\x03\x02\x02\x02\u0129\u012A\x03\x02\x02\x02\u012A\u012D\x03" +
		"\x02\x02\x02\u012B\u0129\x03\x02\x02\x02\u012C\u012E\x050\x19\x02\u012D" +
		"\u012C\x03\x02\x02\x02\u012D\u012E\x03\x02\x02\x02\u012E-\x03\x02\x02" +
		"\x02\u012F\u0130\x07*\x02\x02\u0130\u0131\x07+\x02\x02\u0131\u0132\x05" +
		"2\x1A\x02\u0132\u0133\x05P)\x02\u0133/\x03\x02\x02\x02\u0134\u0135\x07" +
		"*\x02\x02\u0135\u0136\x05P)\x02\u01361\x03\x02\x02\x02\u0137\u013A\x05" +
		"4\x1B\x02\u0138\u0139\x07\x06\x02\x02\u0139\u013B\x052\x1A\x02\u013A\u0138" +
		"\x03\x02\x02\x02\u013A\u013B\x03\x02\x02\x02\u013B\u013E\x03\x02\x02\x02" +
		"\u013C\u013E\x07\x03\x02\x02\u013D\u0137\x03\x02\x02\x02\u013D\u013C\x03" +
		"\x02\x02\x02\u013E3\x03\x02\x02\x02\u013F\u0142\x05$\x13\x02\u0140\u0141" +
		"\t\x03\x02\x02\u0141\u0143\x052\x1A\x02\u0142\u0140\x03\x02\x02\x02\u0142" +
		"\u0143\x03\x02\x02\x02\u0143\u0149\x03\x02\x02\x02\u0144\u0145\x07\t\x02" +
		"\x02\u0145\u0146\x052\x1A\x02\u0146\u0147\x07\n\x02\x02\u0147\u0149\x03" +
		"\x02\x02\x02\u0148\u013F\x03\x02\x02\x02\u0148\u0144\x03\x02\x02\x02\u0149" +
		"5\x03\x02\x02\x02\u014A\u014B\x05\n\x06\x02\u014B\u014C\x07\x12\x02\x02" +
		"\u014C\u014E\x05j6\x02\u014D\u014F\x076\x02\x02\u014E\u014D\x03\x02\x02" +
		"\x02\u014E\u014F\x03\x02\x02\x02\u014F\u0150\x03\x02\x02\x02\u0150\u0151" +
		"\x07\x13\x02\x02\u01517\x03\x02\x02\x02\u0152\u0153\x07-\x02\x02\u0153" +
		"\u0154\x05\n\x06\x02\u0154\u0155\x074\x02\x02\u0155\u0156\x05:\x1E\x02" +
		"\u0156\u0157\x075\x02\x02\u0157\u0158\x05<\x1F\x02\u0158\u0159\x05P)\x02" +
		"\u01599\x03\x02\x02\x02\u015A\u015D\x079\x02\x02\u015B\u015D\x05\n\x06" +
		"\x02\u015C\u015A\x03\x02\x02\x02\u015C\u015B\x03\x02\x02\x02\u015D;\x03" +
		"\x02\x02\x02\u015E\u0161\x079\x02\x02\u015F\u0161\x05\n\x06\x02\u0160" +
		"\u015E\x03\x02\x02\x02\u0160\u015F\x03\x02\x02\x02\u0161=\x03\x02\x02" +
		"\x02\u0162\u0163\x07.\x02\x02\u0163\u0164\x052\x1A\x02\u0164\u0165\x05" +
		"P)\x02\u0165?\x03\x02\x02\x02\u0166\u0167\x07/\x02\x02\u0167\u016C\x05" +
		"\n\x06\x02\u0168\u0169\x07\x14\x02\x02\u0169\u016B\x05\n\x06\x02\u016A" +
		"\u0168\x03\x02\x02\x02\u016B\u016E\x03\x02\x02\x02\u016C\u016A\x03\x02" +
		"\x02\x02\u016C\u016D\x03\x02\x02\x02\u016D\u016F\x03\x02\x02\x02\u016E" +
		"\u016C\x03\x02\x02\x02\u016F\u0170\x07\x04\x02\x02\u0170\u0171\x05B\"" +
		"\x02\u0171\u0172\x05P)\x02\u0172A\x03\x02\x02\x02\u0173\u0178\x077\x02" +
		"\x02\u0174\u0175\x07\x14\x02\x02\u0175\u0177\x077\x02\x02\u0176\u0174" +
		"\x03\x02\x02\x02\u0177\u017A\x03\x02\x02\x02\u0178\u0176\x03\x02\x02\x02" +
		"\u0178\u0179\x03\x02\x02\x02\u0179\u0184\x03\x02\x02\x02\u017A\u0178\x03" +
		"\x02\x02\x02\u017B\u0180\x05\x1A\x0E\x02\u017C\u017D\x07\x14\x02\x02\u017D" +
		"\u017F\x05\x1A\x0E\x02\u017E\u017C\x03\x02\x02\x02\u017F\u0182\x03\x02" +
		"\x02\x02\u0180\u017E\x03\x02\x02\x02\u0180\u0181\x03\x02\x02\x02\u0181" +
		"\u0184\x03\x02\x02\x02\u0182\u0180\x03\x02\x02\x02\u0183\u0173\x03\x02" +
		"\x02\x02\u0183\u017B\x03\x02\x02\x02\u0184C\x03\x02\x02\x02\u0185\u0186" +
		"\x071\x02\x02\u0186\u0188\x05F$\x02\u0187\u0189\x05H%\x02\u0188\u0187" +
		"\x03\x02\x02\x02\u0188\u0189\x03\x02\x02\x02\u0189\u018A\x03\x02\x02\x02" +
		"\u018A\u018B\x07\x13\x02\x02\u018BE\x03\x02\x02\x02\u018C\u0191\x078\x02" +
		"\x02\u018D\u018E\x07 \x02\x02\u018E\u018F\x07?\x02\x02\u018F\u0191\x07" +
		">\x02\x02\u0190\u018C\x03\x02\x02\x02\u0190\u018D\x03\x02\x02\x02\u0191" +
		"G\x03\x02\x02\x02\u0192\u0197\x077\x02\x02\u0193\u0194\x07\x14\x02\x02" +
		"\u0194\u0196\x077\x02\x02\u0195\u0193\x03\x02\x02\x02\u0196\u0199\x03" +
		"\x02\x02\x02\u0197\u0195\x03\x02\x02\x02\u0197\u0198\x03\x02\x02\x02\u0198" +
		"I\x03\x02\x02\x02\u0199\u0197\x03\x02\x02\x02\u019A\u019B\x07\x17\x02" +
		"\x02\u019B\u019C\x05L\'\x02\u019C\u019D\x05R*\x02\u019D\u019E\x07\v\x02" +
		"\x02\u019E\u019F\x05\x02\x02\x02\u019F\u01A0\x07\f\x02\x02\u01A0K\x03" +
		"\x02\x02\x02\u01A1\u01A5\t\x04\x02\x02\u01A2\u01A4\x077\x02\x02\u01A3" +
		"\u01A2\x03\x02\x02\x02\u01A4\u01A7\x03\x02\x02\x02\u01A5\u01A3\x03\x02" +
		"\x02\x02\u01A5\u01A6\x03\x02\x02\x02\u01A6\u01AB\x03\x02\x02\x02\u01A7" +
		"\u01A5\x03\x02\x02\x02\u01A8\u01AA\x05\\/\x02\u01A9\u01A8\x03\x02\x02" +
		"\x02\u01AA\u01AD\x03\x02\x02\x02\u01AB\u01A9\x03\x02\x02\x02\u01AB\u01AC" +
		"\x03\x02\x02\x02\u01ACM\x03\x02\x02\x02\u01AD\u01AB\x03\x02\x02\x02\u01AE" +
		"\u01AF\x05R*\x02\u01AF\u01B0\x05P)\x02\u01B0O\x03\x02\x02\x02\u01B1\u01B8" +
		"\x07\v\x02\x02\u01B2\u01B3\x05h5\x02\u01B3\u01B4\x07\x13\x02\x02\u01B4" +
		"\u01B7\x03\x02\x02\x02\u01B5\u01B7\x05\x04\x03\x02\u01B6\u01B2\x03\x02" +
		"\x02\x02\u01B6\u01B5\x03\x02\x02\x02\u01B7\u01BA\x03\x02\x02\x02\u01B8" +
		"\u01B6\x03\x02\x02\x02\u01B8\u01B9\x03\x02\x02\x02\u01B9\u01BC\x03\x02" +
		"\x02\x02\u01BA\u01B8\x03\x02\x02\x02\u01BB\u01BD\x05h5\x02\u01BC\u01BB" +
		"\x03\x02\x02\x02\u01BC\u01BD\x03\x02\x02\x02\u01BD\u01BE\x03\x02\x02\x02" +
		"\u01BE\u01BF\x07\f\x02\x02\u01BFQ\x03\x02\x02\x02\u01C0\u01C5\x05T+\x02" +
		"\u01C1\u01C2\x07\x14\x02\x02\u01C2\u01C4\x05T+\x02\u01C3\u01C1\x03\x02" +
		"\x02\x02\u01C4\u01C7\x03\x02\x02\x02\u01C5\u01C3\x03\x02\x02\x02\u01C5" +
		"\u01C6\x03\x02\x02\x02\u01C6S\x03\x02\x02\x02\u01C7\u01C5\x03\x02\x02" +
		"\x02\u01C8\u01CA\x05Z.\x02\u01C9\u01C8\x03\x02\x02\x02\u01CA\u01CB\x03" +
		"\x02\x02\x02\u01CB\u01C9\x03\x02\x02\x02\u01CB\u01CC\x03\x02\x02\x02\u01CC" +
		"\u01D2\x03\x02\x02\x02\u01CD\u01CE\x05V,\x02\u01CE\u01CF\x05Z.\x02\u01CF" +
		"\u01D1\x03\x02\x02\x02\u01D0\u01CD\x03\x02\x02\x02\u01D1\u01D4\x03\x02" +
		"\x02\x02\u01D2\u01D0\x03\x02\x02\x02\u01D2\u01D3\x03\x02\x02\x02\u01D3" +
		"\u01D8\x03\x02\x02\x02\u01D4\u01D2\x03\x02\x02\x02\u01D5\u01D7\x05^0\x02" +
		"\u01D6\u01D5\x03\x02\x02\x02\u01D7\u01DA\x03\x02\x02\x02\u01D8\u01D6\x03" +
		"\x02\x02\x02\u01D8\u01D9\x03\x02\x02\x02\u01D9\u01DC\x03\x02\x02\x02\u01DA" +
		"\u01D8\x03\x02\x02\x02\u01DB\u01DD\x05\\/\x02\u01DC\u01DB\x03\x02\x02" +
		"\x02\u01DC\u01DD\x03\x02\x02\x02\u01DDU\x03\x02\x02\x02\u01DE\u01DF\t" +
		"\x05\x02\x02\u01DFW\x03\x02\x02\x02\u01E0\u01E1\x07\x19\x02\x02\u01E1" +
		"\u01E5\x05b2\x02\u01E2\u01E3\x07\x15\x02\x02\u01E3\u01E5\x05b2\x02\u01E4" +
		"\u01E0\x03\x02\x02\x02\u01E4\u01E2\x03\x02\x02\x02\u01E5Y\x03\x02\x02" +
		"\x02\u01E6\u01EB\x05b2\x02\u01E7\u01EB\x05X-\x02\u01E8\u01EB\x07\x18\x02" +
		"\x02\u01E9\u01EB\x07\x1C\x02\x02\u01EA\u01E6\x03\x02\x02\x02\u01EA\u01E7" +
		"\x03\x02\x02\x02\u01EA\u01E8\x03\x02\x02\x02\u01EA\u01E9\x03\x02\x02\x02" +
		"\u01EB[\x03\x02\x02\x02\u01EC\u01ED\t\x06\x02\x02\u01ED\u01F1\x077\x02" +
		"\x02\u01EE\u01EF\t\x06\x02\x02\u01EF\u01F1\x05r:\x02\u01F0\u01EC\x03\x02" +
		"\x02\x02\u01F0\u01EE\x03\x02\x02\x02\u01F1]\x03\x02\x02\x02\u01F2\u01F3" +
		"\x07\r\x02\x02\u01F3\u01F7\x077\x02\x02\u01F4\u01F5\x05`1\x02\u01F5\u01F6" +
		"\t\x07\x02\x02\u01F6\u01F8\x03\x02\x02\x02\u01F7\u01F4\x03\x02\x02\x02" +
		"\u01F7\u01F8\x03\x02\x02\x02\u01F8\u01F9\x03\x02\x02\x02\u01F9\u01FA\x07" +
		"\x0E\x02\x02\u01FA_\x03\x02\x02\x02\u01FB\u01FC\t\b\x02\x02\u01FCa\x03" +
		"\x02\x02\x02\u01FD\u0201\x077\x02\x02\u01FE\u0200\x05d3\x02\u01FF\u01FE" +
		"\x03\x02\x02\x02\u0200\u0203\x03\x02\x02\x02\u0201\u01FF\x03\x02\x02\x02" +
		"\u0201\u0202\x03\x02\x02\x02\u0202\u020E\x03\x02\x02\x02\u0203\u0201\x03" +
		"\x02\x02\x02\u0204\u0205\x07\b\x02\x02\u0205\u0206\x05f4\x02\u0206\u020A" +
		"\x07\f\x02\x02\u0207\u0209\x05d3\x02\u0208\u0207\x03\x02\x02\x02\u0209" +
		"\u020C\x03\x02\x02\x02\u020A\u0208\x03\x02\x02\x02\u020A\u020B\x03\x02" +
		"\x02\x02\u020B\u020E\x03\x02\x02\x02\u020C\u020A\x03\x02\x02\x02\u020D" +
		"\u01FD\x03\x02\x02\x02\u020D\u0204\x03\x02\x02\x02\u020Ec\x03\x02\x02" +
		"\x02\u020F\u0210\x07A\x02\x02\u0210\u0211\x05f4\x02\u0211\u0212\x07\f" +
		"\x02\x02\u0212\u0215\x03\x02\x02\x02\u0213\u0215\x07B\x02\x02\u0214\u020F" +
		"\x03\x02\x02\x02\u0214\u0213\x03\x02\x02\x02\u0215e\x03\x02\x02\x02\u0216" +
		"\u0217\x07\x16\x02\x02\u0217\u0218\t\t\x02\x02\u0218g\x03\x02\x02\x02" +
		"\u0219\u021A\x07)\x02\x02\u021A\u0222\x05X-\x02\u021B\u021C\x07(\x02\x02" +
		"\u021C\u0222\x05X-\x02\u021D\u021E\x05b2\x02\u021E\u021F\x07\x12\x02\x02" +
		"\u021F\u0220\x05j6\x02\u0220\u0222\x03\x02\x02\x02\u0221\u0219\x03\x02" +
		"\x02\x02\u0221\u021B\x03\x02\x02\x02\u0221\u021D\x03\x02\x02\x02\u0222" +
		"i\x03\x02\x02\x02\u0223\u0228\x05$\x13\x02\u0224\u0225\x07\x14\x02\x02" +
		"\u0225\u0227\x05$\x13\x02\u0226\u0224\x03\x02\x02\x02\u0227\u022A\x03" +
		"\x02\x02\x02\u0228\u0226\x03\x02\x02\x02\u0228\u0229\x03\x02\x02\x02\u0229" +
		"k\x03\x02\x02\x02\u022A\u0228\x03\x02\x02\x02\u022B\u022C\x07 \x02\x02" +
		"\u022C\u022D\x07?\x02\x02\u022D\u022E\x07>\x02\x02\u022Em\x03\x02\x02" +
		"\x02\u022F\u0231\x079\x02\x02\u0230\u0232\x07\x05\x02\x02\u0231\u0230" +
		"\x03\x02\x02\x02\u0231\u0232\x03\x02\x02\x02\u0232o\x03\x02\x02\x02\u0233" +
		"\u0235\x05$\x13\x02\u0234\u0233\x03\x02\x02\x02\u0234\u0235\x03\x02\x02" +
		"\x02\u0235\u023C\x03\x02\x02\x02\u0236\u0238\x07\x14\x02\x02\u0237\u0239" +
		"\x05$\x13\x02\u0238\u0237\x03\x02\x02\x02\u0238\u0239\x03\x02\x02\x02";
	private static readonly _serializedATNSegment1: string =
		"\u0239\u023B\x03\x02\x02\x02\u023A\u0236\x03\x02\x02\x02\u023B\u023E\x03" +
		"\x02\x02\x02\u023C\u023A\x03\x02\x02\x02\u023C\u023D\x03\x02\x02\x02\u023D" +
		"q\x03\x02\x02\x02\u023E\u023C\x03\x02\x02\x02\u023F\u0240\x077\x02\x02" +
		"\u0240\u0241\x07\t\x02\x02\u0241\u0242\x05p9\x02\u0242\u0243\x07\n\x02" +
		"\x02\u0243s\x03\x02\x02\x02Cw\x85\x8C\x90\x94\x9D\xA3\xA6\xAF\xB3\xB5" +
		"\xB8\xBA\xC0\xCB\xDA\xE2\xE8\xED\xF4\u0101\u0106\u010C\u010F\u0121\u0129" +
		"\u012D\u013A\u013D\u0142\u0148\u014E\u015C\u0160\u016C\u0178\u0180\u0183" +
		"\u0188\u0190\u0197\u01A5\u01AB\u01B6\u01B8\u01BC\u01C5\u01CB\u01D2\u01D8" +
		"\u01DC\u01E4\u01EA\u01F0\u01F7\u0201\u020A\u020D\u0214\u0221\u0228\u0231" +
		"\u0234\u0238\u023C";
	public static readonly _serializedATN: string = Utils.join(
		[
			ModParser._serializedATNSegment0,
			ModParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ModParser.__ATN) {
			ModParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ModParser._serializedATN));
		}

		return ModParser.__ATN;
	}

}

export class StylesheetContext extends ParserRuleContext {
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_stylesheet; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterStylesheet) {
			listener.enterStylesheet(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitStylesheet) {
			listener.exitStylesheet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitStylesheet) {
			return visitor.visitStylesheet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public importDeclaration(): ImportDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ImportDeclarationContext);
	}
	public nested(): NestedContext | undefined {
		return this.tryGetRuleContext(0, NestedContext);
	}
	public ruleset(): RulesetContext | undefined {
		return this.tryGetRuleContext(0, RulesetContext);
	}
	public mixinDeclaration(): MixinDeclarationContext | undefined {
		return this.tryGetRuleContext(0, MixinDeclarationContext);
	}
	public functionDeclaration(): FunctionDeclarationContext | undefined {
		return this.tryGetRuleContext(0, FunctionDeclarationContext);
	}
	public variableDeclaration(): VariableDeclarationContext | undefined {
		return this.tryGetRuleContext(0, VariableDeclarationContext);
	}
	public includeDeclaration(): IncludeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, IncludeDeclarationContext);
	}
	public ifDeclaration(): IfDeclarationContext | undefined {
		return this.tryGetRuleContext(0, IfDeclarationContext);
	}
	public forDeclaration(): ForDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ForDeclarationContext);
	}
	public whileDeclaration(): WhileDeclarationContext | undefined {
		return this.tryGetRuleContext(0, WhileDeclarationContext);
	}
	public eachDeclaration(): EachDeclarationContext | undefined {
		return this.tryGetRuleContext(0, EachDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_statement; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamsContext extends ParserRuleContext {
	public param(): ParamContext[];
	public param(i: number): ParamContext;
	public param(i?: number): ParamContext | ParamContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParamContext);
		} else {
			return this.getRuleContext(i, ParamContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.COMMA);
		} else {
			return this.getToken(ModParser.COMMA, i);
		}
	}
	public Ellipsis(): TerminalNode | undefined { return this.tryGetToken(ModParser.Ellipsis, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_params; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterParams) {
			listener.enterParams(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitParams) {
			listener.exitParams(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitParams) {
			return visitor.visitParams(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamContext extends ParserRuleContext {
	public variableName(): VariableNameContext {
		return this.getRuleContext(0, VariableNameContext);
	}
	public paramOptionalValue(): ParamOptionalValueContext | undefined {
		return this.tryGetRuleContext(0, ParamOptionalValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_param; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterParam) {
			listener.enterParam(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitParam) {
			listener.exitParam(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitParam) {
			return visitor.visitParam(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableNameContext extends ParserRuleContext {
	public DOLLAR(): TerminalNode { return this.getToken(ModParser.DOLLAR, 0); }
	public Identifier(): TerminalNode { return this.getToken(ModParser.Identifier, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_variableName; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterVariableName) {
			listener.enterVariableName(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitVariableName) {
			listener.exitVariableName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitVariableName) {
			return visitor.visitVariableName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamOptionalValueContext extends ParserRuleContext {
	public COLON(): TerminalNode { return this.getToken(ModParser.COLON, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_paramOptionalValue; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterParamOptionalValue) {
			listener.enterParamOptionalValue(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitParamOptionalValue) {
			listener.exitParamOptionalValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitParamOptionalValue) {
			return visitor.visitParamOptionalValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MixinDeclarationContext extends ParserRuleContext {
	public MIXIN(): TerminalNode { return this.getToken(ModParser.MIXIN, 0); }
	public Identifier(): TerminalNode { return this.getToken(ModParser.Identifier, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ModParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ModParser.RPAREN, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_mixinDeclaration; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterMixinDeclaration) {
			listener.enterMixinDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitMixinDeclaration) {
			listener.exitMixinDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitMixinDeclaration) {
			return visitor.visitMixinDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IncludeDeclarationContext extends ParserRuleContext {
	public INCLUDE(): TerminalNode { return this.getToken(ModParser.INCLUDE, 0); }
	public Identifier(): TerminalNode { return this.getToken(ModParser.Identifier, 0); }
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ModParser.SEMI, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ModParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ModParser.RPAREN, 0); }
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public values(): ValuesContext | undefined {
		return this.tryGetRuleContext(0, ValuesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_includeDeclaration; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterIncludeDeclaration) {
			listener.enterIncludeDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitIncludeDeclaration) {
			listener.exitIncludeDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitIncludeDeclaration) {
			return visitor.visitIncludeDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EmptyListDeclarationContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ModParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ModParser.RPAREN, 0); }
	public WS(): TerminalNode[];
	public WS(i: number): TerminalNode;
	public WS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.WS);
		} else {
			return this.getToken(ModParser.WS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_emptyListDeclaration; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterEmptyListDeclaration) {
			listener.enterEmptyListDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitEmptyListDeclaration) {
			listener.exitEmptyListDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitEmptyListDeclaration) {
			return visitor.visitEmptyListDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MapDeclarationContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ModParser.LPAREN, 0); }
	public mapPropertyStatement(): MapPropertyStatementContext[];
	public mapPropertyStatement(i: number): MapPropertyStatementContext;
	public mapPropertyStatement(i?: number): MapPropertyStatementContext | MapPropertyStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MapPropertyStatementContext);
		} else {
			return this.getRuleContext(i, MapPropertyStatementContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(ModParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.COMMA);
		} else {
			return this.getToken(ModParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_mapDeclaration; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterMapDeclaration) {
			listener.enterMapDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitMapDeclaration) {
			listener.exitMapDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitMapDeclaration) {
			return visitor.visitMapDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MapPropertyStatementContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(ModParser.COLON, 0); }
	public values(): ValuesContext | undefined {
		return this.tryGetRuleContext(0, ValuesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_mapPropertyStatement; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterMapPropertyStatement) {
			listener.enterMapPropertyStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitMapPropertyStatement) {
			listener.exitMapPropertyStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitMapPropertyStatement) {
			return visitor.visitMapPropertyStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ListDeclarationContext extends ParserRuleContext {
	public LBRACK(): TerminalNode { return this.getToken(ModParser.LBRACK, 0); }
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(ModParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.COMMA);
		} else {
			return this.getToken(ModParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_listDeclaration; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterListDeclaration) {
			listener.enterListDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitListDeclaration) {
			listener.exitListDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitListDeclaration) {
			return visitor.visitListDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ListOrMapContext extends ParserRuleContext {
	public emptyListDeclaration(): EmptyListDeclarationContext | undefined {
		return this.tryGetRuleContext(0, EmptyListDeclarationContext);
	}
	public listDeclaration(): ListDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ListDeclarationContext);
	}
	public mapDeclaration(): MapDeclarationContext | undefined {
		return this.tryGetRuleContext(0, MapDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_listOrMap; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterListOrMap) {
			listener.enterListOrMap(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitListOrMap) {
			listener.exitListOrMap(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitListOrMap) {
			return visitor.visitListOrMap(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionDeclarationContext extends ParserRuleContext {
	public FUNCTION(): TerminalNode { return this.getToken(ModParser.FUNCTION, 0); }
	public Identifier(): TerminalNode { return this.getToken(ModParser.Identifier, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ModParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ModParser.RPAREN, 0); }
	public BlockStart(): TerminalNode { return this.getToken(ModParser.BlockStart, 0); }
	public BlockEnd(): TerminalNode { return this.getToken(ModParser.BlockEnd, 0); }
	public params(): ParamsContext | undefined {
		return this.tryGetRuleContext(0, ParamsContext);
	}
	public functionBody(): FunctionBodyContext | undefined {
		return this.tryGetRuleContext(0, FunctionBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_functionDeclaration; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterFunctionDeclaration) {
			listener.enterFunctionDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitFunctionDeclaration) {
			listener.exitFunctionDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitFunctionDeclaration) {
			return visitor.visitFunctionDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionBodyContext extends ParserRuleContext {
	public functionReturn(): FunctionReturnContext {
		return this.getRuleContext(0, FunctionReturnContext);
	}
	public functionStatement(): FunctionStatementContext[];
	public functionStatement(i: number): FunctionStatementContext;
	public functionStatement(i?: number): FunctionStatementContext | FunctionStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FunctionStatementContext);
		} else {
			return this.getRuleContext(i, FunctionStatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_functionBody; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterFunctionBody) {
			listener.enterFunctionBody(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitFunctionBody) {
			listener.exitFunctionBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitFunctionBody) {
			return visitor.visitFunctionBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionReturnContext extends ParserRuleContext {
	public RETURN(): TerminalNode { return this.getToken(ModParser.RETURN, 0); }
	public commandStatement(): CommandStatementContext {
		return this.getRuleContext(0, CommandStatementContext);
	}
	public SEMI(): TerminalNode { return this.getToken(ModParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_functionReturn; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterFunctionReturn) {
			listener.enterFunctionReturn(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitFunctionReturn) {
			listener.exitFunctionReturn(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitFunctionReturn) {
			return visitor.visitFunctionReturn(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionStatementContext extends ParserRuleContext {
	public commandStatement(): CommandStatementContext | undefined {
		return this.tryGetRuleContext(0, CommandStatementContext);
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ModParser.SEMI, 0); }
	public statement(): StatementContext | undefined {
		return this.tryGetRuleContext(0, StatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_functionStatement; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterFunctionStatement) {
			listener.enterFunctionStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitFunctionStatement) {
			listener.exitFunctionStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitFunctionStatement) {
			return visitor.visitFunctionStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CommandStatementContext extends ParserRuleContext {
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ModParser.LPAREN, 0); }
	public commandStatement(): CommandStatementContext | undefined {
		return this.tryGetRuleContext(0, CommandStatementContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ModParser.RPAREN, 0); }
	public mathStatement(): MathStatementContext | undefined {
		return this.tryGetRuleContext(0, MathStatementContext);
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_commandStatement; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterCommandStatement) {
			listener.enterCommandStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitCommandStatement) {
			listener.exitCommandStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitCommandStatement) {
			return visitor.visitCommandStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MathCharacterContext extends ParserRuleContext {
	public TIMES(): TerminalNode | undefined { return this.tryGetToken(ModParser.TIMES, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(ModParser.PLUS, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(ModParser.DIV, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(ModParser.MINUS, 0); }
	public PERC(): TerminalNode | undefined { return this.tryGetToken(ModParser.PERC, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_mathCharacter; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterMathCharacter) {
			listener.enterMathCharacter(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitMathCharacter) {
			listener.exitMathCharacter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitMathCharacter) {
			return visitor.visitMathCharacter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MathStatementContext extends ParserRuleContext {
	public mathCharacter(): MathCharacterContext {
		return this.getRuleContext(0, MathCharacterContext);
	}
	public commandStatement(): CommandStatementContext {
		return this.getRuleContext(0, CommandStatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_mathStatement; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterMathStatement) {
			listener.enterMathStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitMathStatement) {
			listener.exitMathStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitMathStatement) {
			return visitor.visitMathStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public mathStatement(): MathStatementContext | undefined {
		return this.tryGetRuleContext(0, MathStatementContext);
	}
	public measurement(): MeasurementContext | undefined {
		return this.tryGetRuleContext(0, MeasurementContext);
	}
	public module(): ModuleContext | undefined {
		return this.tryGetRuleContext(0, ModuleContext);
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public listOrMap(): ListOrMapContext | undefined {
		return this.tryGetRuleContext(0, ListOrMapContext);
	}
	public Color(): TerminalNode | undefined { return this.tryGetToken(ModParser.Color, 0); }
	public StringLiteral(): TerminalNode | undefined { return this.tryGetToken(ModParser.StringLiteral, 0); }
	public NULL(): TerminalNode | undefined { return this.tryGetToken(ModParser.NULL, 0); }
	public url(): UrlContext | undefined {
		return this.tryGetRuleContext(0, UrlContext);
	}
	public variableName(): VariableNameContext | undefined {
		return this.tryGetRuleContext(0, VariableNameContext);
	}
	public functionCall(): FunctionCallContext | undefined {
		return this.tryGetRuleContext(0, FunctionCallContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_expression; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfDeclarationContext extends ParserRuleContext {
	public AT_IF(): TerminalNode { return this.getToken(ModParser.AT_IF, 0); }
	public conditions(): ConditionsContext {
		return this.getRuleContext(0, ConditionsContext);
	}
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public elseIfStatement(): ElseIfStatementContext[];
	public elseIfStatement(i: number): ElseIfStatementContext;
	public elseIfStatement(i?: number): ElseIfStatementContext | ElseIfStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ElseIfStatementContext);
		} else {
			return this.getRuleContext(i, ElseIfStatementContext);
		}
	}
	public elseStatement(): ElseStatementContext | undefined {
		return this.tryGetRuleContext(0, ElseStatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_ifDeclaration; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterIfDeclaration) {
			listener.enterIfDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitIfDeclaration) {
			listener.exitIfDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitIfDeclaration) {
			return visitor.visitIfDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElseIfStatementContext extends ParserRuleContext {
	public AT_ELSE(): TerminalNode { return this.getToken(ModParser.AT_ELSE, 0); }
	public IF(): TerminalNode { return this.getToken(ModParser.IF, 0); }
	public conditions(): ConditionsContext {
		return this.getRuleContext(0, ConditionsContext);
	}
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_elseIfStatement; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterElseIfStatement) {
			listener.enterElseIfStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitElseIfStatement) {
			listener.exitElseIfStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitElseIfStatement) {
			return visitor.visitElseIfStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElseStatementContext extends ParserRuleContext {
	public AT_ELSE(): TerminalNode { return this.getToken(ModParser.AT_ELSE, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_elseStatement; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterElseStatement) {
			listener.enterElseStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitElseStatement) {
			listener.exitElseStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitElseStatement) {
			return visitor.visitElseStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionsContext extends ParserRuleContext {
	public condition(): ConditionContext | undefined {
		return this.tryGetRuleContext(0, ConditionContext);
	}
	public COMBINE_COMPARE(): TerminalNode | undefined { return this.tryGetToken(ModParser.COMBINE_COMPARE, 0); }
	public conditions(): ConditionsContext | undefined {
		return this.tryGetRuleContext(0, ConditionsContext);
	}
	public NULL(): TerminalNode | undefined { return this.tryGetToken(ModParser.NULL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_conditions; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterConditions) {
			listener.enterConditions(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitConditions) {
			listener.exitConditions(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitConditions) {
			return visitor.visitConditions(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionContext extends ParserRuleContext {
	public commandStatement(): CommandStatementContext | undefined {
		return this.tryGetRuleContext(0, CommandStatementContext);
	}
	public conditions(): ConditionsContext | undefined {
		return this.tryGetRuleContext(0, ConditionsContext);
	}
	public EQEQ(): TerminalNode | undefined { return this.tryGetToken(ModParser.EQEQ, 0); }
	public LT(): TerminalNode | undefined { return this.tryGetToken(ModParser.LT, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(ModParser.GT, 0); }
	public NOTEQ(): TerminalNode | undefined { return this.tryGetToken(ModParser.NOTEQ, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ModParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ModParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_condition; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterCondition) {
			listener.enterCondition(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitCondition) {
			listener.exitCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitCondition) {
			return visitor.visitCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableDeclarationContext extends ParserRuleContext {
	public variableName(): VariableNameContext {
		return this.getRuleContext(0, VariableNameContext);
	}
	public COLON(): TerminalNode { return this.getToken(ModParser.COLON, 0); }
	public values(): ValuesContext {
		return this.getRuleContext(0, ValuesContext);
	}
	public SEMI(): TerminalNode { return this.getToken(ModParser.SEMI, 0); }
	public POUND_DEFAULT(): TerminalNode | undefined { return this.tryGetToken(ModParser.POUND_DEFAULT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_variableDeclaration; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterVariableDeclaration) {
			listener.enterVariableDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitVariableDeclaration) {
			listener.exitVariableDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitVariableDeclaration) {
			return visitor.visitVariableDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForDeclarationContext extends ParserRuleContext {
	public AT_FOR(): TerminalNode { return this.getToken(ModParser.AT_FOR, 0); }
	public variableName(): VariableNameContext {
		return this.getRuleContext(0, VariableNameContext);
	}
	public FROM(): TerminalNode { return this.getToken(ModParser.FROM, 0); }
	public fromNumber(): FromNumberContext {
		return this.getRuleContext(0, FromNumberContext);
	}
	public THROUGH(): TerminalNode { return this.getToken(ModParser.THROUGH, 0); }
	public throughNumber(): ThroughNumberContext {
		return this.getRuleContext(0, ThroughNumberContext);
	}
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_forDeclaration; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterForDeclaration) {
			listener.enterForDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitForDeclaration) {
			listener.exitForDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitForDeclaration) {
			return visitor.visitForDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FromNumberContext extends ParserRuleContext {
	public Number(): TerminalNode | undefined { return this.tryGetToken(ModParser.Number, 0); }
	public variableName(): VariableNameContext | undefined {
		return this.tryGetRuleContext(0, VariableNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_fromNumber; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterFromNumber) {
			listener.enterFromNumber(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitFromNumber) {
			listener.exitFromNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitFromNumber) {
			return visitor.visitFromNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ThroughNumberContext extends ParserRuleContext {
	public Number(): TerminalNode | undefined { return this.tryGetToken(ModParser.Number, 0); }
	public variableName(): VariableNameContext | undefined {
		return this.tryGetRuleContext(0, VariableNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_throughNumber; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterThroughNumber) {
			listener.enterThroughNumber(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitThroughNumber) {
			listener.exitThroughNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitThroughNumber) {
			return visitor.visitThroughNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhileDeclarationContext extends ParserRuleContext {
	public AT_WHILE(): TerminalNode { return this.getToken(ModParser.AT_WHILE, 0); }
	public conditions(): ConditionsContext {
		return this.getRuleContext(0, ConditionsContext);
	}
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_whileDeclaration; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterWhileDeclaration) {
			listener.enterWhileDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitWhileDeclaration) {
			listener.exitWhileDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitWhileDeclaration) {
			return visitor.visitWhileDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EachDeclarationContext extends ParserRuleContext {
	public AT_EACH(): TerminalNode { return this.getToken(ModParser.AT_EACH, 0); }
	public variableName(): VariableNameContext[];
	public variableName(i: number): VariableNameContext;
	public variableName(i?: number): VariableNameContext | VariableNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableNameContext);
		} else {
			return this.getRuleContext(i, VariableNameContext);
		}
	}
	public IN(): TerminalNode { return this.getToken(ModParser.IN, 0); }
	public eachValueList(): EachValueListContext {
		return this.getRuleContext(0, EachValueListContext);
	}
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.COMMA);
		} else {
			return this.getToken(ModParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_eachDeclaration; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterEachDeclaration) {
			listener.enterEachDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitEachDeclaration) {
			listener.exitEachDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitEachDeclaration) {
			return visitor.visitEachDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EachValueListContext extends ParserRuleContext {
	public Identifier(): TerminalNode[];
	public Identifier(i: number): TerminalNode;
	public Identifier(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.Identifier);
		} else {
			return this.getToken(ModParser.Identifier, i);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.COMMA);
		} else {
			return this.getToken(ModParser.COMMA, i);
		}
	}
	public listOrMap(): ListOrMapContext[];
	public listOrMap(i: number): ListOrMapContext;
	public listOrMap(i?: number): ListOrMapContext | ListOrMapContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ListOrMapContext);
		} else {
			return this.getRuleContext(i, ListOrMapContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_eachValueList; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterEachValueList) {
			listener.enterEachValueList(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitEachValueList) {
			listener.exitEachValueList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitEachValueList) {
			return visitor.visitEachValueList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportDeclarationContext extends ParserRuleContext {
	public IMPORT(): TerminalNode { return this.getToken(ModParser.IMPORT, 0); }
	public referenceUrl(): ReferenceUrlContext {
		return this.getRuleContext(0, ReferenceUrlContext);
	}
	public SEMI(): TerminalNode { return this.getToken(ModParser.SEMI, 0); }
	public mediaTypes(): MediaTypesContext | undefined {
		return this.tryGetRuleContext(0, MediaTypesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_importDeclaration; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterImportDeclaration) {
			listener.enterImportDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitImportDeclaration) {
			listener.exitImportDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitImportDeclaration) {
			return visitor.visitImportDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReferenceUrlContext extends ParserRuleContext {
	public StringLiteral(): TerminalNode | undefined { return this.tryGetToken(ModParser.StringLiteral, 0); }
	public UrlStart(): TerminalNode | undefined { return this.tryGetToken(ModParser.UrlStart, 0); }
	public Url(): TerminalNode | undefined { return this.tryGetToken(ModParser.Url, 0); }
	public UrlEnd(): TerminalNode | undefined { return this.tryGetToken(ModParser.UrlEnd, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_referenceUrl; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterReferenceUrl) {
			listener.enterReferenceUrl(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitReferenceUrl) {
			listener.exitReferenceUrl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitReferenceUrl) {
			return visitor.visitReferenceUrl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MediaTypesContext extends ParserRuleContext {
	public Identifier(): TerminalNode[];
	public Identifier(i: number): TerminalNode;
	public Identifier(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.Identifier);
		} else {
			return this.getToken(ModParser.Identifier, i);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.COMMA);
		} else {
			return this.getToken(ModParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_mediaTypes; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterMediaTypes) {
			listener.enterMediaTypes(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitMediaTypes) {
			listener.exitMediaTypes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitMediaTypes) {
			return visitor.visitMediaTypes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NestedContext extends ParserRuleContext {
	public AT(): TerminalNode { return this.getToken(ModParser.AT, 0); }
	public nest(): NestContext {
		return this.getRuleContext(0, NestContext);
	}
	public selectors(): SelectorsContext {
		return this.getRuleContext(0, SelectorsContext);
	}
	public BlockStart(): TerminalNode { return this.getToken(ModParser.BlockStart, 0); }
	public stylesheet(): StylesheetContext {
		return this.getRuleContext(0, StylesheetContext);
	}
	public BlockEnd(): TerminalNode { return this.getToken(ModParser.BlockEnd, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_nested; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterNested) {
			listener.enterNested(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitNested) {
			listener.exitNested(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitNested) {
			return visitor.visitNested(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NestContext extends ParserRuleContext {
	public Identifier(): TerminalNode[];
	public Identifier(i: number): TerminalNode;
	public Identifier(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.Identifier);
		} else {
			return this.getToken(ModParser.Identifier, i);
		}
	}
	public AND(): TerminalNode | undefined { return this.tryGetToken(ModParser.AND, 0); }
	public pseudo(): PseudoContext[];
	public pseudo(i: number): PseudoContext;
	public pseudo(i?: number): PseudoContext | PseudoContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PseudoContext);
		} else {
			return this.getRuleContext(i, PseudoContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_nest; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterNest) {
			listener.enterNest(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitNest) {
			listener.exitNest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitNest) {
			return visitor.visitNest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RulesetContext extends ParserRuleContext {
	public selectors(): SelectorsContext {
		return this.getRuleContext(0, SelectorsContext);
	}
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_ruleset; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterRuleset) {
			listener.enterRuleset(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitRuleset) {
			listener.exitRuleset(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitRuleset) {
			return visitor.visitRuleset(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	public BlockStart(): TerminalNode { return this.getToken(ModParser.BlockStart, 0); }
	public BlockEnd(): TerminalNode { return this.getToken(ModParser.BlockEnd, 0); }
	public property(): PropertyContext[];
	public property(i: number): PropertyContext;
	public property(i?: number): PropertyContext | PropertyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PropertyContext);
		} else {
			return this.getRuleContext(i, PropertyContext);
		}
	}
	public SEMI(): TerminalNode[];
	public SEMI(i: number): TerminalNode;
	public SEMI(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.SEMI);
		} else {
			return this.getToken(ModParser.SEMI, i);
		}
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_block; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterBlock) {
			listener.enterBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitBlock) {
			listener.exitBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectorsContext extends ParserRuleContext {
	public selector(): SelectorContext[];
	public selector(i: number): SelectorContext;
	public selector(i?: number): SelectorContext | SelectorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SelectorContext);
		} else {
			return this.getRuleContext(i, SelectorContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.COMMA);
		} else {
			return this.getToken(ModParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_selectors; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterSelectors) {
			listener.enterSelectors(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitSelectors) {
			listener.exitSelectors(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitSelectors) {
			return visitor.visitSelectors(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectorContext extends ParserRuleContext {
	public element(): ElementContext[];
	public element(i: number): ElementContext;
	public element(i?: number): ElementContext | ElementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ElementContext);
		} else {
			return this.getRuleContext(i, ElementContext);
		}
	}
	public selectorPrefix(): SelectorPrefixContext[];
	public selectorPrefix(i: number): SelectorPrefixContext;
	public selectorPrefix(i?: number): SelectorPrefixContext | SelectorPrefixContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SelectorPrefixContext);
		} else {
			return this.getRuleContext(i, SelectorPrefixContext);
		}
	}
	public attrib(): AttribContext[];
	public attrib(i: number): AttribContext;
	public attrib(i?: number): AttribContext | AttribContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AttribContext);
		} else {
			return this.getRuleContext(i, AttribContext);
		}
	}
	public pseudo(): PseudoContext | undefined {
		return this.tryGetRuleContext(0, PseudoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_selector; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterSelector) {
			listener.enterSelector(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitSelector) {
			listener.exitSelector(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitSelector) {
			return visitor.visitSelector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectorPrefixContext extends ParserRuleContext {
	public GT(): TerminalNode | undefined { return this.tryGetToken(ModParser.GT, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(ModParser.PLUS, 0); }
	public TIL(): TerminalNode | undefined { return this.tryGetToken(ModParser.TIL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_selectorPrefix; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterSelectorPrefix) {
			listener.enterSelectorPrefix(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitSelectorPrefix) {
			listener.exitSelectorPrefix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitSelectorPrefix) {
			return visitor.visitSelectorPrefix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModuleContext extends ParserRuleContext {
	public HASH(): TerminalNode | undefined { return this.tryGetToken(ModParser.HASH, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ModParser.DOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_module; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterModule) {
			listener.enterModule(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitModule) {
			listener.exitModule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitModule) {
			return visitor.visitModule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public module(): ModuleContext | undefined {
		return this.tryGetRuleContext(0, ModuleContext);
	}
	public AND(): TerminalNode | undefined { return this.tryGetToken(ModParser.AND, 0); }
	public TIMES(): TerminalNode | undefined { return this.tryGetToken(ModParser.TIMES, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_element; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterElement) {
			listener.enterElement(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitElement) {
			listener.exitElement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitElement) {
			return visitor.visitElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PseudoContext extends ParserRuleContext {
	public Identifier(): TerminalNode | undefined { return this.tryGetToken(ModParser.Identifier, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(ModParser.COLON, 0); }
	public COLONCOLON(): TerminalNode | undefined { return this.tryGetToken(ModParser.COLONCOLON, 0); }
	public functionCall(): FunctionCallContext | undefined {
		return this.tryGetRuleContext(0, FunctionCallContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_pseudo; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterPseudo) {
			listener.enterPseudo(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitPseudo) {
			listener.exitPseudo(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitPseudo) {
			return visitor.visitPseudo(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AttribContext extends ParserRuleContext {
	public LBRACK(): TerminalNode { return this.getToken(ModParser.LBRACK, 0); }
	public Identifier(): TerminalNode[];
	public Identifier(i: number): TerminalNode;
	public Identifier(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.Identifier);
		} else {
			return this.getToken(ModParser.Identifier, i);
		}
	}
	public RBRACK(): TerminalNode { return this.getToken(ModParser.RBRACK, 0); }
	public attribRelate(): AttribRelateContext | undefined {
		return this.tryGetRuleContext(0, AttribRelateContext);
	}
	public StringLiteral(): TerminalNode | undefined { return this.tryGetToken(ModParser.StringLiteral, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_attrib; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterAttrib) {
			listener.enterAttrib(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitAttrib) {
			listener.exitAttrib(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitAttrib) {
			return visitor.visitAttrib(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AttribRelateContext extends ParserRuleContext {
	public EQ(): TerminalNode | undefined { return this.tryGetToken(ModParser.EQ, 0); }
	public TILD_EQ(): TerminalNode | undefined { return this.tryGetToken(ModParser.TILD_EQ, 0); }
	public PIPE_EQ(): TerminalNode | undefined { return this.tryGetToken(ModParser.PIPE_EQ, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_attribRelate; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterAttribRelate) {
			listener.enterAttribRelate(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitAttribRelate) {
			listener.exitAttribRelate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitAttribRelate) {
			return visitor.visitAttribRelate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public Identifier(): TerminalNode | undefined { return this.tryGetToken(ModParser.Identifier, 0); }
	public identifierPart(): IdentifierPartContext[];
	public identifierPart(i: number): IdentifierPartContext;
	public identifierPart(i?: number): IdentifierPartContext | IdentifierPartContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierPartContext);
		} else {
			return this.getRuleContext(i, IdentifierPartContext);
		}
	}
	public InterpolationStart(): TerminalNode | undefined { return this.tryGetToken(ModParser.InterpolationStart, 0); }
	public identifierVariableName(): IdentifierVariableNameContext | undefined {
		return this.tryGetRuleContext(0, IdentifierVariableNameContext);
	}
	public BlockEnd(): TerminalNode | undefined { return this.tryGetToken(ModParser.BlockEnd, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_identifier; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterIdentifier) {
			listener.enterIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitIdentifier) {
			listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierPartContext extends ParserRuleContext {
	public InterpolationStartAfter(): TerminalNode | undefined { return this.tryGetToken(ModParser.InterpolationStartAfter, 0); }
	public identifierVariableName(): IdentifierVariableNameContext | undefined {
		return this.tryGetRuleContext(0, IdentifierVariableNameContext);
	}
	public BlockEnd(): TerminalNode | undefined { return this.tryGetToken(ModParser.BlockEnd, 0); }
	public IdentifierAfter(): TerminalNode | undefined { return this.tryGetToken(ModParser.IdentifierAfter, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_identifierPart; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterIdentifierPart) {
			listener.enterIdentifierPart(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitIdentifierPart) {
			listener.exitIdentifierPart(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitIdentifierPart) {
			return visitor.visitIdentifierPart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierVariableNameContext extends ParserRuleContext {
	public DOLLAR(): TerminalNode { return this.getToken(ModParser.DOLLAR, 0); }
	public Identifier(): TerminalNode | undefined { return this.tryGetToken(ModParser.Identifier, 0); }
	public IdentifierAfter(): TerminalNode | undefined { return this.tryGetToken(ModParser.IdentifierAfter, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_identifierVariableName; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterIdentifierVariableName) {
			listener.enterIdentifierVariableName(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitIdentifierVariableName) {
			listener.exitIdentifierVariableName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitIdentifierVariableName) {
			return visitor.visitIdentifierVariableName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PropertyContext extends ParserRuleContext {
	public IMPLEMENT(): TerminalNode | undefined { return this.tryGetToken(ModParser.IMPLEMENT, 0); }
	public module(): ModuleContext | undefined {
		return this.tryGetRuleContext(0, ModuleContext);
	}
	public EXTEND(): TerminalNode | undefined { return this.tryGetToken(ModParser.EXTEND, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(ModParser.COLON, 0); }
	public values(): ValuesContext | undefined {
		return this.tryGetRuleContext(0, ValuesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_property; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterProperty) {
			listener.enterProperty(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitProperty) {
			listener.exitProperty(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitProperty) {
			return visitor.visitProperty(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValuesContext extends ParserRuleContext {
	public commandStatement(): CommandStatementContext[];
	public commandStatement(i: number): CommandStatementContext;
	public commandStatement(i?: number): CommandStatementContext | CommandStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CommandStatementContext);
		} else {
			return this.getRuleContext(i, CommandStatementContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.COMMA);
		} else {
			return this.getToken(ModParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_values; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterValues) {
			listener.enterValues(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitValues) {
			listener.exitValues(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitValues) {
			return visitor.visitValues(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UrlContext extends ParserRuleContext {
	public UrlStart(): TerminalNode { return this.getToken(ModParser.UrlStart, 0); }
	public Url(): TerminalNode { return this.getToken(ModParser.Url, 0); }
	public UrlEnd(): TerminalNode { return this.getToken(ModParser.UrlEnd, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_url; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterUrl) {
			listener.enterUrl(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitUrl) {
			listener.exitUrl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitUrl) {
			return visitor.visitUrl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MeasurementContext extends ParserRuleContext {
	public Number(): TerminalNode { return this.getToken(ModParser.Number, 0); }
	public Unit(): TerminalNode | undefined { return this.tryGetToken(ModParser.Unit, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_measurement; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterMeasurement) {
			listener.enterMeasurement(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitMeasurement) {
			listener.exitMeasurement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitMeasurement) {
			return visitor.visitMeasurement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentsStatementContext extends ParserRuleContext {
	public commandStatement(): CommandStatementContext[];
	public commandStatement(i: number): CommandStatementContext;
	public commandStatement(i?: number): CommandStatementContext | CommandStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CommandStatementContext);
		} else {
			return this.getRuleContext(i, CommandStatementContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ModParser.COMMA);
		} else {
			return this.getToken(ModParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_argumentsStatement; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterArgumentsStatement) {
			listener.enterArgumentsStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitArgumentsStatement) {
			listener.exitArgumentsStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitArgumentsStatement) {
			return visitor.visitArgumentsStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionCallContext extends ParserRuleContext {
	public Identifier(): TerminalNode { return this.getToken(ModParser.Identifier, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ModParser.LPAREN, 0); }
	public argumentsStatement(): ArgumentsStatementContext {
		return this.getRuleContext(0, ArgumentsStatementContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ModParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ModParser.RULE_functionCall; }
	// @Override
	public enterRule(listener: ModParserListener): void {
		if (listener.enterFunctionCall) {
			listener.enterFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: ModParserListener): void {
		if (listener.exitFunctionCall) {
			listener.exitFunctionCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ModParserVisitor<Result>): Result {
		if (visitor.visitFunctionCall) {
			return visitor.visitFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


