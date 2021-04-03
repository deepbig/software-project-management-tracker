package com.hryu.projecttrackerapp.projecttrackerapp.rest.service;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Member;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Project;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.ProjectSummary;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.User;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.MemberRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.ProjectRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.UserRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.error.ServerException;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.NewProjectDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.PageDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.SummaryProjectDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.mapper.ModelMapper;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.ErrorCode;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
  private static final Logger logger = LoggerFactory.getLogger(ProjectService.class);

  private final ProjectRepository projectRepository;
  private final UserRepository userRepository;
  private final MemberRepository memberRepository;
  private final ModelMapper modelMapper;

  @Autowired
  public ProjectService(ProjectRepository projectRepository, UserRepository userRepository,
      MemberRepository memberRepository, ModelMapper modelMapper) {
    this.projectRepository = projectRepository;
    this.userRepository = userRepository;
    this.memberRepository = memberRepository;
    this.modelMapper = modelMapper;
  }

  public PageDto<SummaryProjectDto> list(int offset, int limit) throws ServerException {

    PageDto<SummaryProjectDto> ret = new PageDto();

    List<ProjectSummary> summaries = projectRepository.findSummaryProjectList();

    List<SummaryProjectDto> projects = new ArrayList<>();


    for(ProjectSummary summary: summaries) {
      SummaryProjectDto project = new SummaryProjectDto();
      project.setId(summary.getId());
      project.setName(summary.getName());
      project.setProjectManager(summary.getProjectManager());
      project.setLastModified(summary.getLastModified());
      projects.add(project);
    }

    if (projects.size() > 0) {
      ret.setList(projects);
      ret.setOffset(offset);
      ret.setSize(projects.size());
      ret.setTotal(offset + projects.size());
    }
    return ret;
  }

  @Transactional
  public void create(NewProjectDto dto) throws ServerException {
    if (logger.isInfoEnabled()) {
      logger.info("Create an category [{}]", dto);

      if (projectRepository.existsByName(dto.getName())) {
        logger.error(
            "The project name [{}] is already exist.", dto.getName());
        ServerException se =
            new ServerException(ErrorCode.FAIL_PROJECT_CREATE_BY_NAME_ALREADY_EXIST);
        throw se;
      }
      if (!userRepository.existsByName(dto.getUsername())) {
        logger.error(
            "The project manager [{}] does not exist.", dto.getUsername());
        ServerException se =
            new ServerException(ErrorCode.FAIL_PROJECT_CREATE_BY_USERNAME_NOT_EXIST);
        throw se;
      }

      Project project = new Project();

      project.setName(dto.getName());
      project.setDescription(dto.getDescription());

      project.setLastModified(new Date());
      List<User> manager = userRepository.findByName(dto.getUsername());
      if (!manager.isEmpty() && manager.size() == 1) {
        project.setManager(manager.get(0));
      } else {
        logger.error(
            "The project manager [{}] does not exist.", dto.getUsername());
        ServerException se =
            new ServerException(ErrorCode.FAIL_PROJECT_CREATE_BY_DUPLICATE_USER_RESULT);
        throw se;
      }

      projectRepository.save(project);

      Member member = new Member();
      member.setUsername(dto.getUsername());
      member.setRolename("Project Manager");
      member.setProject(project);

      memberRepository.save(member);

      if (logger.isInfoEnabled()) {
        logger.info("Success to add a project[{}]", project);
      }
    }
  }

}
