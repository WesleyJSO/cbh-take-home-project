import deterministicPartitionKey from "./dpk.js";
import crypto from  "crypto";

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Should return the same string that contains less than 256 character", () => {

    const testValue = { partitionKey: "0".repeat(156) };
    const key = deterministicPartitionKey(testValue);
    expect(key).toBe(testValue.partitionKey);
  });
  it("Should return the same string that contains 256 character", () => {

    const testValue = { partitionKey: "0".repeat(256) };
    const key = deterministicPartitionKey(testValue);
    expect(key).toBe(testValue.partitionKey);
  });
  it("Should return the same hash value as the partitionKey property", () => {
    
    const testValue = { partitionKey: "0".repeat(257) };

    const hashed = crypto.createHash("sha3-512")
      .update(testValue.partitionKey)
      .digest("hex");

    const key = deterministicPartitionKey(testValue);

    expect(hashed).toBe(key);
  });  
  it("Should return the hashed value if the partitionKey evaluates to false", () => {

    const testValue = { partitionKey: 0 };

    const hashed = crypto.createHash("sha3-512")
      .update(JSON.stringify(testValue))
      .digest("hex");

    const key = deterministicPartitionKey(testValue);

    expect(key).toBe(hashed);
  });
  it("Should return the value converted to a string", () => {

    const testValue = { partitionKey: 256 };
    const key = deterministicPartitionKey(testValue);
    expect(key).toBe(testValue.partitionKey.toString());
  });
  it("Should return the same string value", () => {

    const testValue = { partitionKey: "256" };
    const key = deterministicPartitionKey(testValue);
    expect(key).toBe(testValue.partitionKey);
  });
  it("Should return the same hash when receive a string with 256 zeros", () => {

    const testValue = "0".repeat(256);

    const hashed = crypto.createHash("sha3-512")
      .update(JSON.stringify(testValue))
      .digest("hex");

    const key = deterministicPartitionKey(testValue);
    expect(key).toBe(hashed);
  });
  it("Should return the same hash when receive a object with a different property", () => {

    const testValue = {a: "256"};
    
    const hashed = crypto.createHash("sha3-512")
      .update(JSON.stringify(testValue))
      .digest("hex");

    const key = deterministicPartitionKey(testValue);
    expect(key).toBe(hashed);
  });
});
