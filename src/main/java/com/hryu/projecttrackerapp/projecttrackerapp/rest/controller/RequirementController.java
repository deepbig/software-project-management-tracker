package com.hryu.projecttrackerapp.projecttrackerapp.rest.controller;

import com.hryu.projecttrackerapp.projecttrackerapp.error.ServerException;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.PageDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.RequirementDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.CommonResult;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.SingleResult;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.service.RequirementService;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.service.ResponseService;
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
@Api(value = "requirement")
public class RequirementController {

  private final ResponseService responseService;
  private final RequirementService requirementService;

  @Autowired
  public RequirementController(ResponseService responseService,
      RequirementService requirementService) {
    this.responseService = responseService;
    this.requirementService = requirementService;
  }

  @RequestMapping(value = "/requirement/{project_id}", method = RequestMethod.GET)
  @ResponseStatus(value = HttpStatus.OK)
  public SingleResult<PageDto> getList(HttpServletRequest request,
      @PathVariable("project_id") long project_id,
      @RequestParam("offset") int offset,
      @RequestParam("limit") int limit) throws ServerException {
    return responseService.getSingleResult(requirementService.list(project_id, offset, limit));
  }

  @RequestMapping(value = "/requirement/{project_id}", method = RequestMethod.POST)
  @ResponseStatus(value = HttpStatus.OK)
  public CommonResult create(
      @PathVariable("project_id") long project_id,
      @RequestBody RequirementDto dto)
      throws ServerException {
    try {
      requirementService.create(project_id, dto);
      return CommonResult.SUCCESS_RESPONSE;
    } catch (ServerException e) {
      throw e;
    }
  }

  @RequestMapping(value = "/requirement/delete/{requirement_id}", method = RequestMethod.POST)
  @ResponseStatus(value = HttpStatus.OK)
  public CommonResult delete(
      @PathVariable("requirement_id") long requirement_id)
      throws ServerException {
    try {
      requirementService.delete(requirement_id);
      return CommonResult.SUCCESS_RESPONSE;
    } catch (ServerException e) {
      throw e;
    }
  }

  @RequestMapping(value = "/requirement/hours/{project_id}", method = RequestMethod.POST)
  @ResponseStatus(value = HttpStatus.OK)
  public CommonResult updateHours(
      @PathVariable("project_id") long project_id,
      @RequestBody RequirementDto dto)
      throws ServerException {
    try {
      requirementService.updateHours(project_id, dto);
      return CommonResult.SUCCESS_RESPONSE;
    } catch (ServerException e) {
      throw e;
    }
  }

  @RequestMapping(value = "/requirement/total_person_hours/{project_id}", method = RequestMethod.GET)
  @ResponseStatus(value = HttpStatus.OK)
  public SingleResult getListTotalPersonHour(
      @PathVariable("project_id") long project_id)
      throws ServerException {
    return responseService.getSingleResult(requirementService.listTotalPersonHour(project_id));
  }

}
