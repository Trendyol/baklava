import { expect } from "@open-wc/testing";
import { ComponentRegistry } from "../registry/ComponentRegistry";
import { defaultBuilders } from "../registry/defaultBuilders";
import React from "react";

describe("ComponentRegistry", () => {
  it("register edilmiş builder'ı resolve eder", () => {
    const reg = new ComponentRegistry();
    reg.register("BlButton", defaultBuilders["BlButton"]);
    expect(reg.resolve("BlButton")).to.not.be.undefined;
  });

  it("kayıtsız type için undefined döner", () => {
    const reg = new ComponentRegistry();
    expect(reg.resolve("BlNonExistent")).to.be.undefined;
  });

  it("OCP: yeni component mevcut kayıtlara dokunmaz", () => {
    const reg = new ComponentRegistry();
    reg.register("BlButton", defaultBuilders["BlButton"]);
    // Yeni component ekleniyor
    reg.register("BlSlider", () => React.createElement("span", null, "slider"));
    expect(reg.resolve("BlButton")).to.not.be.undefined;
    expect(reg.resolve("BlSlider")).to.not.be.undefined;
  });
});
