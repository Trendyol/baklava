import { expect } from "@open-wc/testing";
import { GenUiEngine } from "../GenUiEngine";
import type { GenUiTransportAdapter } from "../transport/GenUiTransportAdapter";

class FakeAdapter implements GenUiTransportAdapter {
  constructor(private readonly response: string) {}
  async complete(): Promise<string> {
    return this.response;
  }
}

describe("GenUiEngine", () => {
  it("adapter + parser pipeline'ı çalıştırır", async () => {
    const engine = new GenUiEngine(
      new FakeAdapter('{"type":"BlAlert","props":{"description":"Hi"}}'),
    );
    const schema = await engine.generate("show alert");
    expect(schema.type).to.equal("BlAlert");
    expect(schema.props?.["description"]).to.equal("Hi");
  });

  it("markdown fenceli cevabı doğru parse eder", async () => {
    const engine = new GenUiEngine(
      new FakeAdapter("```json\n{\"type\":\"BlButton\"}\n```"),
    );
    const schema = await engine.generate("show button");
    expect(schema.type).to.equal("BlButton");
  });

  it("adapter hatası engine'den fırlar", async () => {
    const failAdapter: GenUiTransportAdapter = {
      complete: async () => { throw new Error("network fail"); },
    };
    const engine = new GenUiEngine(failAdapter);
    try {
      await engine.generate("x");
      expect.fail("hata fırlatılmalıydı");
    } catch (e: unknown) {
      expect((e as Error).message).to.equal("network fail");
    }
  });
});
