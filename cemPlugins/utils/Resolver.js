import { dirname, relative, resolve } from "path";
import { removeDuplications } from "./removeDuplications.js";
import { resolveFilePath } from "./resolveFilePath.js";

/**
 * @typedef {object} ImportInfo
 * @property {string} name
 * @property {string} kind
 * @property {string} importPath
 * @property {boolean} isBareModuleSpecifier:
 * @property {boolean} isTypeOnly
 */

/**
 * @typedef {import("typescript").Type} Type
 * @typedef {import("typescript").TypeNode} TypeNode
 * @typedef {import("typescript").TypeReferenceNode} TypeReferenceNode
 * @typedef {import("typescript").Symbol} Symbol
 */

export class Resolver {
  /**
   * @param {object} props
   * @param {typeof import("typescript")} props.ts
   * @param {import("typescript").TypeChecker} props.typeChecker
   * @param {import("typescript").ClassLikeDeclaration} props.classDeclaration
   * @param {import("@custom-elements-manifest/analyzer").Context} props.context
   */
  constructor({ ts, typeChecker, classDeclaration, context }) {
    this.ts = ts;
    this.typeChecker = typeChecker;
    this.classDeclaration = classDeclaration;
    this.context = context;
  }

  /**
   * @param typeNode {TypeNode}
   * @return {string}
   */
  resolveTypeNode(typeNode) {
    const typeName = typeNode.getText();

    const importInfo = this.getImportInfo(typeName);
    if (importInfo) {
      return this.resolveByImportInfo(typeNode, importInfo);
    }

    if (this.ts.isUnionTypeNode(typeNode)) {
      return removeDuplications(typeNode.types.map(tn => this.resolveTypeNode(tn))).join(" | ");
    }

    if (this.ts.isArrayTypeNode(typeNode)) {
      return `${this.resolveTypeNode(typeNode.elementType)}[]`;
    }

    return this.resolveType(this.typeChecker.getTypeFromTypeNode(typeNode));
  }

  /**
   * @param {import("typescript").Type} type
   * @return {string}
   */
  resolveType(type) {
    const typeName = this.typeChecker.typeToString(type);

    if (type.getFlags() & this.ts.TypeFlags.BooleanLike) {
      return typeName;
    }

    if (type.isUnion()) {
      return removeDuplications(type.types.map(t => this.resolveType(t))).join(" | ");
    }

    if (this.typeChecker.isArrayType(type)) {
      const resolvedType = this.resolveType(this.typeChecker.getElementTypeOfArrayType(type));
      return `${resolvedType}[]`;
    }

    if (type.isTypeParameter()) {
      const typeParam = this.classDeclaration.typeParameters?.find(
        p => p.name.getText() === typeName
      );
      if (typeParam?.default) {
        return this.resolveTypeNode(typeParam.default);
      }
    }

    const symbol = type.getSymbol();
    if (!symbol || this.isInlineAnonymousType(symbol)) {
      return typeName;
    }

    const symbolDeclaration = symbol.getDeclarations()?.[0];
    if (!symbolDeclaration) {
      return typeName;
    }

    const filePath = symbolDeclaration.getSourceFile().fileName;
    if (filePath.includes("node_modules")) {
      return typeName;
    }

    const resolvedType = resolveFilePath(filePath, symbol.getName());

    // Has Generics
    const genericArgs = this.getGenericArguments(type);
    if (genericArgs.length > 0) {
      const inner = genericArgs.map(arg => this.resolveType(arg)).join(", ");
      return `${resolvedType}<${inner}>`;
    }

    return resolvedType;
  }

  /**
   * @param symbolName {string}
   * @return {ImportInfo | undefined}
   */
  getImportInfo(symbolName) {
    return this.context?.imports?.find(i => i.name === symbolName);
  }

  /**
   * @param {TypeNode} typeNode
   * @param {ImportInfo} importInfo
   * @returns {string}
   */
  resolveByImportInfo(typeNode, importInfo) {
    const sourceFile = typeNode.getSourceFile();
    const absolutePath = resolve(dirname(sourceFile.fileName), importInfo.importPath);
    return resolveFilePath(absolutePath, typeNode.getText());
  }

  /**
   * @param {Type} type
   */
  getGenericArguments(type) {
    return type.aliasTypeArguments || type.typeArguments || [];
  }

  /**
   * @param {Symbol} symbol
   * @returns {boolean}
   */
  isInlineAnonymousType(symbol) {
    return symbol.getName() === "__type";
  }
}
