import crypto from "crypto";

export function verifyGithubSignature(secret, payload, signature) {
  if (!signature.startsWith("sha256=")) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  const received = signature.replace("sha256=", "");

  if (expected.length !== received.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(received)
  );
}
