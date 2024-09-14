
const CONST = {
  HTTP_BASE_URL: "http://localhost:8080",
  HTTP_API_VERSION: "/api/v1",
  HTTP_COMMIT_RESOURCE: "/commit",
  HTTP_CONTENT_TYPE: "application/json",

  COMMITID_MIN_LENGTH: 3,
  COMMITID_MIN_LENGTH_MESSAGE: `Commit Id must be at least 3 characters long.`,
  COMMITID_MAX_LENGTH: 12,
  COMMITID_MAX_LENGTH_MESSAGE: `Commit Id must be at most 12 characters long.`,
  COMMITID_PATTERN: /^[0-9]+$/,
  COMMITID_PATTERN_MESSAGE: "Commit Id must contain only digits.",
  COMMITID_REQUIRED_MESSAGE: "Commit Id is required.",

  USERNAME_MIN_LENGTH: 3,
  USERNAME_MIN_LENGTH_MESSAGE: `Username must be at least 3 characters long.`,
  USERNAME_MAX_LENGTH: 12,
  USERNAME_MAX_LENGTH_MESSAGE: `Username must be at most 12 characters long.`,
  USERNAME_PATTERN: /^[a-zA-Z0-9]+$/,
  USERNAME_PATTERN_MESSAGE: "Username must contain only latin letters and digits.",
  USERNAME_REQUIRED_MESSAGE: "Username is required.",

  REPOID_MIN_LENGTH: 3,
  REPOID_MIN_LENGTH_MESSAGE: `Repository Id must be at least 3 characters long.`,
  REPOID_MAX_LENGTH: 12,
  REPOID_MAX_LENGTH_MESSAGE: `Repository Id must be at most 12 characters long.`,
  REPOID_PATTERN: /^[a-zA-Z0-9]+$/,
  REPOID_PATTERN_MESSAGE: "Repository Id must contain only latin letters and digits.",
  REPOID_REQUIRED_MESSAGE: "Repository Id is required.",

  DESCRIPTION_MIN_LENGTH: 3,
  DESCRIPTION_MIN_LENGTH_MESSAGE: `Description must be at least 3 characters long.`,
  DESCRIPTION_MAX_LENGTH: 3000,
  DESCRIPTION_MAX_LENGTH_MESSAGE: `Description must be at most 3000 characters long.`,
  DESCRIPTION_PATTERN: /^.+$/,
  DESCRIPTION_PATTERN_MESSAGE: "Description must contain only latin letters and digits.",
  DESCRIPTION_REQUIRED_MESSAGE: "Description is required.",

  TAGS_MIN_LENGTH: 1,
  TAGS_MIN_LENGTH_MESSAGE: `Tags must be at least 1 character long.`,
  TAGS_MAX_LENGTH: 8,
  TAGS_MAX_LENGTH_MESSAGE: `Tags must be at most 8 characters long.`,
  TAGS_PATTERN: /^[a-zA-Z0-9 ]*$/,
  TAGS_PATTERN_MESSAGE: "Tags must contain only latin letters and digits."
};

export default CONST;
