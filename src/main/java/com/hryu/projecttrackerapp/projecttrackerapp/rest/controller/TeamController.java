package com.hryu.projecttrackerapp.projecttrackerapp.rest.controller;

import com.hryu.projecttrackerapp.projecttrackerapp.error.ServerException;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.MemberDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.PageDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.CommonResult;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.SingleResult;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.service.ResponseService;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.service.TeamService;
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
public class TeamController {

  private final ResponseService responseService;
  private final TeamService teamService;

  @Autowired
  public TeamController(ResponseService responseService, TeamService teamService) {
    this.responseService = responseService;
    this.teamService = teamService;
  }

  @RequestMapping(value = "/team/{project_id}", method = RequestMethod.GET)
  @ResponseStatus(value = HttpStatus.OK)
  public SingleResult<PageDto> getList(HttpServletRequest request,
      @PathVariable("project_id") long project_id,
      @RequestParam("offset") int offset,
      @RequestParam("limit") int limit) throws ServerException {
    return responseService.getSingleResult(teamService.listMember(project_id, offset, limit));
  }

  @RequestMapping(value = "/member/{project_id}", method = RequestMethod.POST)
  @ResponseStatus(value = HttpStatus.OK)
  public CommonResult createMember(
      @PathVariable("project_id") long project_id,
      @RequestBody MemberDto dto)
      throws ServerException {
    try {
      teamService.createMember(project_id, dto);
      return CommonResult.SUCCESS_RESPONSE;
    } catch (ServerException e) {
      throw e;
    }
  }

  @RequestMapping(value = "/member/user", method = RequestMethod.GET)
  @ResponseStatus(value = HttpStatus.OK)
  public SingleResult<PageDto> getListUser(HttpServletRequest request,
      @RequestParam("offset") int offset,
      @RequestParam("limit") int limit) throws ServerException {
    return responseService.getSingleResult(teamService.listUser(offset, limit));
  }

  @RequestMapping(value = "/member/user/{name}", method = RequestMethod.POST)
  @ResponseStatus(value = HttpStatus.OK)
  public CommonResult createUser(
      @PathVariable("name") String name)
      throws ServerException {
    try {
      teamService.createUser(name);
      return CommonResult.SUCCESS_RESPONSE;
    } catch (ServerException e) {
      throw e;
    }
  }

  @RequestMapping(value = "/member/role", method = RequestMethod.GET)
  @ResponseStatus(value = HttpStatus.OK)
  public SingleResult<PageDto> getListRole(HttpServletRequest request,
      @RequestParam("offset") int offset,
      @RequestParam("limit") int limit) throws ServerException {
    return responseService.getSingleResult(teamService.listRole(offset, limit));
  }

  @RequestMapping(value = "/member/role/{name}", method = RequestMethod.POST)
  @ResponseStatus(value = HttpStatus.OK)
  public CommonResult createRole(
      @PathVariable("name") String name)
      throws ServerException {
    try {
      teamService.createRole(name);
      return CommonResult.SUCCESS_RESPONSE;
    } catch (ServerException e) {
      throw e;
    }
  }

}
