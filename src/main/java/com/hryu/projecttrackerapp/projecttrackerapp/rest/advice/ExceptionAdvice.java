package com.hryu.projecttrackerapp.projecttrackerapp.rest.advice;

import com.hryu.projecttrackerapp.projecttrackerapp.error.ServerException;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.CommonResult;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.ErrorCode;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.service.ResponseService;
import java.io.IOException;
import java.sql.SQLException;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {

  private final ResponseService responseService;

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.OK)
  protected CommonResult defaultException(HttpServletRequest req, Exception e) {
    if (e instanceof ServerException) {
      ServerException se = (ServerException) e;
      return new CommonResult(se.getCode(), e.getMessage());
    } else if (e instanceof IOException) {
      return new CommonResult(ErrorCode.FAIL_COMMON_IOEXCEPTION, e.getMessage());
    } else if (e instanceof SQLException) {
      return new CommonResult(ErrorCode.FAIL_COMMON_SQLEXCEPTION, e.getMessage());
    } else {
      CommonResult res = responseService.getFailResult();
      res.setMsg(e.getMessage());
      return res;
    }
  }
}
