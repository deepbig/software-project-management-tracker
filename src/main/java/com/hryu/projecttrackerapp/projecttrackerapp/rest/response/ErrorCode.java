package com.hryu.projecttrackerapp.projecttrackerapp.rest.response;

import lombok.Getter;

public enum ErrorCode {
  SUCCESS(true, 0, "Success"),
  FAIL(false, -1, "Failed"),
  FAIL_COMMON_IOEXCEPTION(false, -100, "%s"),
  FAIL_COMMON_COMMEXCEPTION(false, -200, ""),
  FAIL_COMMON_SQLEXCEPTION(false, -300, ""),

  FAIL_PROJECT_CREATE_BY_NAME_ALREADY_EXIST(false, -401, "Same project name is already exist."),
  FAIL_PROJECT_CREATE_BY_USERNAME_NOT_EXIST(false, -402, "Manager does not exist."),
  FAIL_PROJECT_CREATE_BY_DUPLICATE_USER_RESULT(false, -403, "Duplicate managers found in the database."),

  FAIL_MEMBER_GET_BY_PROJECT_NOT_EXIST(false, -501, "Given project id is not valid."),
  FAIL_MEMBER_CREATE_BY_PROJECT_NOT_EXIST(false, -502, "Given project id is not valid."),
  FAIL_MEMBER_CREATE_BY_USER_NOT_EXIST(false, -503, "Given username is not valid."),
  FAIL_MEMBER_CREATE_BY_ROLE_NOT_EXIST(false, -504, "Given role name is not valid."),
  FAIL_USER_CREATE_BY_NAME_ALREADY_EXIST(false, -505, "The user's name already exist."),
  FAIL_ROLE_CREATE_BY_NAME_ALREADY_EXIST(false, -506, "The role's name already exist."),

  FAIL_RISK_CREATE_BY_NAME_ALREADY_EXIST(false, -601, "The risk's name already exist."),

  FAIL_REQUIREMENT_CREATE_BY_NAME_ALREADY_EXIST(false, -701, "The requirement's name already exist."),
  FAIL_REQUIREMENT_UPDATE_BY_ID_NOT_EXIST(false, -702, "The requirement's id does not exist."),
  FAIL_REQUIREMENT_UPDATE_BY_INVALID_INPUTS(false, -703, "Your inputs of the requirement is not valid."),

  FAIL_TOTAL_PERSON_HOUR_UPDATE_BY_DUPLIATE_ROW(false, -801, "There are duplicated total person hour in the project."),

      ;

  @Getter
  private final boolean success;

  @Getter
  private final int code;

  @Getter
  private final String msg;

  ErrorCode(boolean success, int code, String msg) {
    this.success = success;
    this.code = code;
    this.msg = msg;
  }

  public static ErrorCode valueOf(int code) {
    for (ErrorCode rc : values()) {
      if (code == rc.code) {
        return rc;
      }
    }

    return null;
  }

}
