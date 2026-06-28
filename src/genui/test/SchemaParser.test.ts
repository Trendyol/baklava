import { expect } from "@open-wc/testing";
import { SchemaParser } from "../parser/SchemaParser";

const parser = new SchemaParser();

describe("SchemaParser", () => {
  it("plain JSON'u parse eder", () => {
    const schema = parser.parse('{"type":"BlButton","props":{"label":"OK"}}');
    expect(schema.type).to.equal("BlButton");
    expect(schema.props?.["label"]).to.equal("OK");
  });

  it("```json fence'i temizler", () => {
    const schema = parser.parse('```json\n{"type":"BlInput"}\n```');
    expect(schema.type).to.equal("BlInput");
  });

  it("plain fence'i temizler", () => {
    const schema = parser.parse('```\n{"type":"BlSpinner"}\n```');
    expect(schema.type).to.equal("BlSpinner");
  });

  it("prose içindeki JSON'u bulur", () => {
    const schema = parser.parse('Sure! {"type":"BlBadge","props":{"variant":"success"}} Done.');
    expect(schema.type).to.equal("BlBadge");
    expect(schema.props?.["variant"]).to.equal("success");
  });

  it("iç içe children'ı parse eder", () => {
    const schema = parser.parse(
      JSON.stringify({
        type: "BkColumn",
        children: [
          { type: "BlButton", props: { label: "A" } },
          { type: "BlInput", props: { label: "B" } },
        ],
      }),
    );
    expect(schema.children).to.have.length(2);
    expect(schema.children?.[0].type).to.equal("BlButton");
  });

  it("geçersiz JSON'da hata fırlatır", () => {
    expect(() => parser.parse("tamamen bozuk metin ###")).to.throw();
  });
});
