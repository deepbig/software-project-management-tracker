package com.hryu.projecttrackerapp.projecttrackerapp.rest.controller;

import com.hryu.projecttrackerapp.projecttrackerapp.error.ServerException;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.PageDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.RiskDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.CommonResult;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.SingleResult;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.service.ResponseService;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.service.RiskService;
import io.swagger.annotations.Api;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value = "team")
public class RiskController {

  private final ResponseService responseService;
  private final RiskService riskService;

  @Autowired
  public RiskController(ResponseService responseService, RiskService riskService) {
    this.responseService = responseService;
    this.riskService = riskService;
  }

  @RequestMapping(value = "/risk/{project_id}", method = RequestMethod.GET)
  @ResponseStatus(value = HttpStatus.OK)
  public SingleResult<PageDto> getList(HttpServletRequest request,
      @PathVariable("project_id") long project_id,
      @RequestParam("offset") int offset,
      @RequestParam("limit") int limit) throws ServerException {
    return responseService.getSingleResult(riskService.list(project_id, offset, limit));
  }

  @RequestMapping(value = "/risk/{project_id}", method = RequestMethod.POST)
  @ResponseStatus(value = HttpStatus.OK)
  public CommonResult create(
      @PathVariable("project_id") long project_id,
      @RequestBody RiskDto dto)
      throws ServerException {
    try {
      riskService.create(project_id, dto);
      return CommonResult.SUCCESS_RESPONSE;
    } catch (ServerException e) {
      throw e;
    }
  }

  @RequestMapping(value = "/risk/delete/{risk_id}", method = RequestMethod.POST)
  @ResponseStatus(value = HttpStatus.OK)
  public CommonResult delete(
      @PathVariable("risk_id") long risk_id)
      throws ServerException {
    try {
      riskService.delete(risk_id);
      return CommonResult.SUCCESS_RESPONSE;
    } catch (ServerException e) {
      throw e;
    }
  }

}
