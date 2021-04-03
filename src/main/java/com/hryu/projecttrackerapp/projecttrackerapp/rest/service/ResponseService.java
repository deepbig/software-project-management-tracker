package com.hryu.projecttrackerapp.projecttrackerapp.rest.service;

import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.CommonResult;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.ErrorCode;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.ListResult;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.SingleResult;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ResponseService {
  private void setSuccessResult(CommonResult result) {
    result.setSuccess(true);
    result.setCode(ErrorCode.SUCCESS.getCode());
    result.setMsg(ErrorCode.SUCCESS.getMsg());
  }

  public <T> SingleResult<T> getSingleResult(T data) {
    SingleResult<T> result = new SingleResult<>();
    result.setData(data);
    setSuccessResult(result);
    return result;
  }

  public <T> ListResult<T> getListResult(List<T> list) {
    ListResult<T> result = new ListResult<>();
    result.setList(list);
    setSuccessResult(result);
    return result;
  }

  public CommonResult getFailResult() {
    CommonResult result = new CommonResult();
    result.setSuccess(false);
    result.setCode(ErrorCode.FAIL.getCode());
    result.setMsg(ErrorCode.FAIL.getMsg());
    return result;
  }
}
