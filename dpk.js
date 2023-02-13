import crypto from  "crypto";

const getCandidateAsString = (candidate) => {
  if (typeof candidate === "string") {
    return candidate;
  }
  return JSON.stringify(candidate);
};

const getHashedCandidate = (candidate) => {
  return crypto.createHash("sha3-512")
    .update(candidate)
    .digest("hex");
};

const deterministicPartitionKey = (event) => {

  const MAX_PARTITION_KEY_LENGTH = 256;
  const TRIVIAL_PARTITION_KEY = "0";
  
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!event.partitionKey) {
    return getHashedCandidate(JSON.stringify(event));
  }
  
  const candidateString = getCandidateAsString(event.partitionKey);
  
  if (candidateString.length <= MAX_PARTITION_KEY_LENGTH) {
    return candidateString;
  }

  return getHashedCandidate(candidateString);
}

export default deterministicPartitionKey;