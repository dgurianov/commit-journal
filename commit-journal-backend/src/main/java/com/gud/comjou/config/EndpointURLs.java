package com.gud.comjou.config;

public class EndpointURLs {

    //Set up
    public static final String API = "/api";
    public static final String VERSION = "/v1";

    //Root
    public static final String COMMIT_ROOT = API + VERSION + "/commit";
    public static final String TAG_ROOT = API + VERSION +  "/tag";

    //Commit endpoints
    public static final String CREATE_OR_REPLACE_COMMITS = COMMIT_ROOT + "/";
    public static final String GET_ALL_COMMITS = COMMIT_ROOT + "/";
    public static final String GET_COMMIT_BY_ID = COMMIT_ROOT;
    public static final String DELETE_COMMIT_BY_ID = COMMIT_ROOT;
    public static final String GET_ALL_COMMITS_BY_SEARCH_STRING = COMMIT_ROOT;

    //Tag endpoints
    public static final String GET_ALL_TAGS = TAG_ROOT + "/";

    public static String getUrls(){
        return String.join("\n",
                CREATE_OR_REPLACE_COMMITS,
                GET_ALL_COMMITS,
                GET_COMMIT_BY_ID
        );
    }

}
