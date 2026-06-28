/**
 * DIP: UI katmanı bu soyutlamaya bağımlı, asla somut bir SDK'ya değil.
 * Strategy pattern — adapter'ı değiştirmek için başka hiçbir dosyaya dokunulmaz.
 */
export interface GenUiTransportAdapter {
  complete(prompt: string): Promise<string>;
}
