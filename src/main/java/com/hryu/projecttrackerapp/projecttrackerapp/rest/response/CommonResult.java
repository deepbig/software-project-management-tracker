package com.hryu.projecttrackerapp.projecttrackerapp.rest.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommonResult {

  public static final CommonResult SUCCESS_RESPONSE = new CommonResult(ErrorCode.SUCCESS);

  private boolean success;

  private int code;

  private String msg;

  public CommonResult(ErrorCode code, String msg) {
    this.success = code.isSuccess();
    this.code = code.getCode();
    if (msg == null) {
      this.msg = code.getMsg();
    } else {
      this.msg = msg;
    }
  }

  public CommonResult(ErrorCode code) {
    this.success = code.isSuccess();
    this.code = code.getCode();
    this.msg = code.getMsg();
  }
}
