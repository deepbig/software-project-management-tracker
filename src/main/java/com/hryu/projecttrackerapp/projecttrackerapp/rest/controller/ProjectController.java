package com.hryu.projecttrackerapp.projecttrackerapp.rest.controller;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.ProjectSummary;
import com.hryu.projecttrackerapp.projecttrackerapp.error.ServerException;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.NewProjectDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.PageDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.SummaryProjectDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.CommonResult;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.SingleResult;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.service.ProjectService;
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
@Api(value = "project")
public class ProjectController {

  private final ResponseService responseService;
  private final ProjectService projectService;

  @Autowired
  public ProjectController(ResponseService responseService, ProjectService projectService) {
    this.responseService = responseService;
    this.projectService = projectService;
  }

  @RequestMapping(value = "/project", method = RequestMethod.GET)
  @ResponseStatus(value = HttpStatus.OK)
  public SingleResult<PageDto> getList(HttpServletRequest request,
      @RequestParam("offset") int offset,
      @RequestParam("limit") int limit) throws ServerException {
    return responseService.getSingleResult(projectService.list(offset, limit));
  }

  @RequestMapping(value = "/project", method = RequestMethod.POST)
  @ResponseStatus(value = HttpStatus.OK)
  public CommonResult create(
      @RequestBody NewProjectDto dto)
    throws ServerException {
    try {
      projectService.create(dto);
      return CommonResult.SUCCESS_RESPONSE;
    } catch (ServerException e) {
      throw e;
    }
  }

  @RequestMapping(value = "/project/delete/{project_id}", method = RequestMethod.POST)
  @ResponseStatus(value = HttpStatus.OK)
  public CommonResult delete(
      @PathVariable("project_id") long project_id)
      throws ServerException {
    try {
      projectService.delete(project_id);
      return CommonResult.SUCCESS_RESPONSE;
    } catch (ServerException e) {
      throw e;
    }
  }

  @RequestMapping(value = "/project/{project_id}", method = RequestMethod.GET)
  @ResponseStatus(value = HttpStatus.OK)
  public SingleResult<SummaryProjectDto> get(HttpServletRequest request,
      @PathVariable("project_id") long project_id) throws ServerException {
    return responseService.getSingleResult(projectService.get(project_id));
  }
}
