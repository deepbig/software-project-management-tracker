package com.hryu.projecttrackerapp.projecttrackerapp.error;

import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.ErrorCode;
import lombok.Getter;
import lombok.NonNull;

public class ServerException extends Exception {
  @Getter
  private final ErrorCode code;

  public ServerException(@NonNull ErrorCode code) {
    super(code.getMsg());
    this.code = code;
  }
}
