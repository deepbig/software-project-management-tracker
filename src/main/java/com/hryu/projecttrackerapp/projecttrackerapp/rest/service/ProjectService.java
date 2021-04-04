package com.hryu.projecttrackerapp.projecttrackerapp.rest.service;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Member;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Project;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.ProjectSummary;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.TotalPersonHour;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.User;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.MemberRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.ProjectRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.RequirementRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.RiskRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.TotalPersonHourRepository;
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
import java.util.Optional;
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
  private final RiskRepository riskRepository;
  private final RequirementRepository requirementRepository;
  private final TotalPersonHourRepository totalPersonHourRepository;
  private final ModelMapper modelMapper;

  @Autowired
  public ProjectService(ProjectRepository projectRepository, UserRepository userRepository,
      MemberRepository memberRepository, RiskRepository riskRepository,
      RequirementRepository requirementRepository,
      TotalPersonHourRepository totalPersonHourRepository, ModelMapper modelMapper) {
    this.projectRepository = projectRepository;
    this.userRepository = userRepository;
    this.memberRepository = memberRepository;
    this.riskRepository = riskRepository;
    this.requirementRepository = requirementRepository;
    this.totalPersonHourRepository = totalPersonHourRepository;
    this.modelMapper = modelMapper;
  }

  public PageDto<SummaryProjectDto> list(int offset, int limit) throws ServerException {

    PageDto<SummaryProjectDto> ret = new PageDto();

    List<ProjectSummary> summaries = projectRepository.findSummaryProjectList();

    List<SummaryProjectDto> projects = new ArrayList<>();

    for (ProjectSummary summary : summaries) {
      SummaryProjectDto project = new SummaryProjectDto();
      project.setId(summary.getId());
      project.setName(summary.getName());
      project.setDescription(summary.getDescription());
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

  @Transactional
  public void delete(long project_id) throws ServerException {

    if (logger.isInfoEnabled()) {
      logger.info("Delete selected project id [{}]", project_id);
    }

    Optional<Project> project = projectRepository.findById(project_id);
    if (!project.isPresent()) {
      logger.error(
          "The project id [{}] cannot be found.",
          project_id);
      ServerException se =
          new ServerException(ErrorCode.FAIL_PROJECT_DELETE_BY_ID_NOT_FOUND);
      throw se;
    }

    totalPersonHourRepository.deleteByProject(project.get());
    requirementRepository.deleteByProject(project.get());
    riskRepository.deleteByProject(project.get());
    memberRepository.deleteByProject(project.get());

    projectRepository.deleteById(project_id);

    if (logger.isInfoEnabled()) {
      logger.info("Success to delete an requirement [{}]", project_id);
    }
  }


  public SummaryProjectDto get(long project_id) throws ServerException {

    Optional<Project> project = projectRepository.findById(project_id);
    if (!project.isPresent()) {
      logger.error(
          "The project id [{}] does not exist.", project_id);
      ServerException se =
          new ServerException(ErrorCode.FAIL_MEMBER_CREATE_BY_PROJECT_NOT_EXIST);
      throw se;
    }

    SummaryProjectDto ret = modelMapper.from(project.get());

    return ret;
  }

}
