package com.hryu.projecttrackerapp.projecttrackerapp.type;

import lombok.Getter;


public enum UserRoleType {
  USER(0),
  ROLE(1),
      ;

  @Getter
  private final int code;

  UserRoleType(int code) { this.code = code;}
}
