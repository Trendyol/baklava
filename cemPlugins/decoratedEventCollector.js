/**
 * @typedef {Object} CommonOptions
 * @property {import("typescript").TypeChecker} typeChecker
 */
import { Resolver } from "./utils/Resolver.js";

/**
 * @param {CommonOptions} opts
 * @returns {import('@custom-elements-manifest/analyzer').Plugin}
 */
export function decoratedEventCollector(opts) {
  return {
    name: "decorated-event-collector",
    /**
     * @param {object} params
     * @param {typeof import("typescript")} params.ts
     * @param {import('typescript').Node} params.node
     * @param {import('@custom-elements-manifest/analyzer').AnalyzePhaseParams.moduleDoc} params.moduleDoc
     */
    analyzePhase({ ts, node, moduleDoc, context }) {
      if (ts.isPropertyDeclaration(node) && node.modifiers) {
        const classDecl = node.parent;
        const className = classDecl.name?.getText?.();
        const classDoc = moduleDoc.declarations?.find(
          d => d.kind === "class" && d.name === className
        );
        if (!classDoc) return;

        const decorators = node.modifiers.filter(m => m.kind === ts.SyntaxKind.Decorator);
        for (const decorator of decorators) {
          const expr = decorator.expression;
          const isEventDecorator =
            ts.isCallExpression(expr) &&
            ts.isIdentifier(expr.expression) &&
            expr.expression.getText() === "event";

          if (!isEventDecorator) continue;

          const arg = expr.arguments?.[0];
          const eventName = ts.isStringLiteral(arg) || ts.isIdentifier(arg) ? arg.text : null;
          if (!eventName) continue;

          const resolver = new Resolver({
            ts,
            typeChecker: opts.typeChecker,
            classDeclaration: classDecl,
            context,
          });

          const [typeText, parsedType] = resolveEventDetailType(resolver, node.type);

          classDoc.events ??= [];
          classDoc.events.push({
            name: eventName,
            type: {
              text: `CustomEvent<${typeText}>`,
            },
            description: resolveDescription(node.jsDoc),
            parsedType: {
              text: parsedType,
            },
          });

          classDoc.members = (classDoc.members ?? []).filter(m => m.name !== node.name?.getText());
        }
      }
    },
  };
}

/**
 * @param {import("typescript").JSDoc[] | undefined} jsDoc
 * @return {string | undefined}
 */
function resolveDescription(jsDoc) {
  if (jsDoc?.length) {
    return jsDoc[0].comment?.toString();
  }
  return undefined;
}

/**
 * @param {Resolver} resolver
 * @param {import("typescript").TypeNode} type
 * @returns {[string, string]}
 */
function resolveEventDetailType(resolver, type) {
  // has generics
  if (resolver.ts.isTypeReferenceNode(type) && type.typeArguments?.length) {
    const eventType = type.typeArguments[0];
    return [eventType.getText(), resolver.resolveTypeNode(eventType)];
  }

  return [type.getText(), type.getText()];
}
