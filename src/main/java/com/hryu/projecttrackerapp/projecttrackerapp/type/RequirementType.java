package com.hryu.projecttrackerapp.projecttrackerapp.type;

import lombok.Getter;

public enum RequirementType {
  FUNCTIONAL(0),
  NON_FUNCTIONAL(1),
  ;

  @Getter
  private final int code;

  RequirementType(int code) { this.code = code;}

}
