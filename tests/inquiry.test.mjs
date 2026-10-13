import { test } from "node:test";
import assert from "node:assert/strict";
import { validateInquiry } from "../src/data/inquiry.ts";
const good = {
  name: "Demo Couple",
  email: "demo@example.com",
  event: "Wedding",
  date: "2027-07-17",
  location: "Sample venue",
  country: "Canada",
  budget: "Sample budget",
  services: "Photography",
  style: "Editorial",
  details: "Sample celebration",
  consent: true,
};
test("valid sample inquiry has no errors", () =>
  assert.deepEqual(validateInquiry(good), {}));
test("missing required values produce field-level errors", () => {
  const e = validateInquiry({});
  assert.equal(Object.keys(e).length, 11);
  assert.ok(e.name && e.consent);
});
test("email rejects invalid inputs", () => {
  for (const email of ["bad", "a@", "@domain.com", "a b@x.com"])
    assert.ok(validateInquiry({ ...good, email }).email);
});
test("consent is required and malformed date is rejected", () => {
  const e = validateInquiry({ ...good, consent: false, date: "wrong" });
  assert.ok(e.consent && e.date);
});
test("overlong fields are rejected without mutating caller data", () => {
  const data = { ...good, details: "a".repeat(2001) };
  assert.ok(validateInquiry(data).details);
  assert.equal(data.details.length, 2001);
});
