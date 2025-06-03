/**
 * @typedef {Object} CommonOptions
 * @property {import("typescript").TypeChecker} typeChecker
 */
import { Resolver } from "./utils/Resolver.js";

/**
 * @param {CommonOptions} opts
 * @returns {import('@custom-elements-manifest/analyzer').Plugin}
 */
export function parsedTypeEnhancerPlugin(opts) {
  return {
    name: "parsed-type-enhancer",
    /**
     * @param {object} params
     * @param {typeof import("typescript")} params.ts
     * @param {import('typescript').Node} params.node
     * @param {import('@custom-elements-manifest/analyzer').AnalyzePhaseParams.moduleDoc} params.moduleDoc
     * @param {import('@custom-elements-manifest/analyzer').AnalyzePhaseParams.context} params.context
     */
    analyzePhase({ ts, node, moduleDoc, context }) {
      if (
        (!ts.isPropertyDeclaration(node) && !ts.isGetAccessorDeclaration(node)) ||
        !node.name ||
        !node.type ||
        node.modifiers?.some(
          m =>
            m.kind === ts.SyntaxKind.PrivateKeyword ||
            m.kind === ts.SyntaxKind.StaticKeyword ||
            m.kind === ts.SyntaxKind.ProtectedKeyword
        )
      )
        return;

      const classDecl = node.parent;
      const className = classDecl.name?.getText();
      const classDoc = moduleDoc.declarations?.find(
        d => d.kind === "class" && d.name === className
      );
      if (!classDoc) return;

      const propName = node.name.getText();

      const resolver = new Resolver({
        ts,
        typeChecker: opts.typeChecker,
        classDeclaration: classDecl,
        context,
      });

      const targetMember = classDoc.members?.find(m => m.name === propName);
      if (targetMember) {
        targetMember.parsedType = {
          text: resolver.resolveTypeNode(node.type),
        };
      }

      const targetAttribute = classDoc.attributes?.find(a => a.name === propName);
      if (targetAttribute) {
        targetAttribute.parsedType = {
          text: resolver.resolveTypeNode(node.type),
        };
      }
    },
  };
}
