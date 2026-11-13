import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { buildParamString, md5Signature, pfEncode } from "./payfast.ts";

Deno.test("encodes like PHP urlencode (spaces as +, brackets and apostrophes escaped)", () => {
  assertEquals(pfEncode("Annual Usage (12 Months)"), "Annual+Usage+%2812+Months%29");
  assertEquals(pfEncode("O'Neil!"), "O%27Neil%21");
  assertEquals(pfEncode("a@b.co.za"), "a%40b.co.za");
});

Deno.test("keeps PayFast's field order instead of sorting, and keeps blank fields", () => {
  const itn = { m_payment_id: "1", pf_payment_id: "2", name_last: "", amount_gross: "600.00", signature: "x" };
  assertEquals(buildParamString(itn), "m_payment_id=1&pf_payment_id=2&name_last=&amount_gross=600.00");
});

Deno.test("signature matches the MD5 of the param string plus passphrase", async () => {
  // md5("amount=600.00&item_name=Test&passphrase=secret")
  const sig = await md5Signature({ amount: "600.00", item_name: "Test" }, "secret");
  assertEquals(sig, "f90519a6b9e0a45a08b244d8ef534930");
});
