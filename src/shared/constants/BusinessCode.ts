export enum BusinessCode {
    SUCCESS= "200",

    UNAUTHORIZED= "401",
    FORBIDDEN= "403",
    NOT_FOUND= "404",
    INVALID_CREDENTIALS= "410",

    FAILED= "500",

    USER_RETRIEVED= "600",
    USER_CREATED= "601",
    USER_UPDATED= "602",
    USER_DELETED= "603",
    USER_CONFLICT= "640",

    ELECTION_RETRIEVED= "700",
    ELECTION_CREATED= "701",
    ELECTION_UPDATED= "702",
    ELECTION_DELETED= "703",
    INVALID_ELECTION= "740",

    CHOICE_RETRIEVED = "800",
    CHOICE_CREATED = "801",
    CHOICE_UPDATED = "802",
    CHOICE_DELETED = "803",

    VOTE_RETRIEVED = "900",
    VOTE_CREATED = "901",
    VOTE_UPDATED = "902",
    VOTE_DELETED = "903"
}
