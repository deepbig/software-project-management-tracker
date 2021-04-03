package com.hryu.projecttrackerapp.projecttrackerapp.type;

import lombok.Getter;

public enum PriorityType {
  LOW(0),
  NORMAL(1),
  HIGH(2),
  ;

  @Getter
  private final int code;

  PriorityType(int code) { this.code = code;}

}
