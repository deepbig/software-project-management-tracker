package com.hryu.projecttrackerapp.projecttrackerapp.rest.service;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Project;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Requirement;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.TotalPersonHour;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.ProjectRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.RequirementRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.TotalPersonHourRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.error.ServerException;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.PageDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.RequirementDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.TotalPersonHourDto;
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
public class RequirementService {

  private static final Logger logger = LoggerFactory.getLogger(RequirementService.class);

  private final RequirementRepository requirementRepository;
  private final ProjectRepository projectRepository;
  private final TotalPersonHourRepository totalPersonHourRepository;
  private final ModelMapper modelMapper;

  @Autowired
  public RequirementService(RequirementRepository requirementRepository,
      ProjectRepository projectRepository, TotalPersonHourRepository totalPersonHourRepository,
      ModelMapper modelMapper) {
    this.requirementRepository = requirementRepository;
    this.projectRepository = projectRepository;
    this.totalPersonHourRepository = totalPersonHourRepository;
    this.modelMapper = modelMapper;
  }

  public PageDto<RequirementDto> list(long project_id, int offset, int limit)
      throws ServerException {
    Optional<Project> project = projectRepository.findById(project_id);

    if (!project.isPresent()) {
      logger.error(
          "The project id [{}] is not exist.", project_id);
      ServerException se =
          new ServerException(ErrorCode.FAIL_MEMBER_GET_BY_PROJECT_NOT_EXIST);
      throw se;
    }

    PageDto<RequirementDto> ret = new PageDto<>();

    List<Requirement> requirements = requirementRepository.findByProject(project.get());
    if (requirements.size() > 0) {
      List<RequirementDto> listDto = new ArrayList<>();
      for (Requirement requirement : requirements) {
        RequirementDto requirementDto = modelMapper.from(requirement);
        listDto.add(requirementDto);
      }
      ret.setList(listDto);
      ret.setOffset(offset);
      ret.setSize(requirements.size());
      ret.setTotal(offset + requirements.size());
    }

    return ret;
  }

  @Transactional
  public void create(long project_id, RequirementDto dto) throws ServerException {

    Optional<Project> project = projectRepository.findById(project_id);
    if (!project.isPresent()) {
      logger.error(
          "The project id [{}] does not exist.", project_id);
      ServerException se =
          new ServerException(ErrorCode.FAIL_MEMBER_CREATE_BY_PROJECT_NOT_EXIST);
      throw se;
    }

//    if (requirementRepository.existsByTitle(dto.getTitle())) {
//      logger.error(
//          "The requirement title [{}] already exist.", dto.getTitle());
//      ServerException se =
//          new ServerException(ErrorCode.FAIL_REQUIREMENT_CREATE_BY_NAME_ALREADY_EXIST);
//      throw se;
//    }

    Requirement requirement = new Requirement();
    requirement.setTitle(dto.getTitle());
    requirement.setDescription(dto.getDescription());
    requirement.setRequirementType(dto.getRequirementType());
    requirement.setLastModified(new Date());
    requirement.setHourTotal(0);
    requirement.setHourAnalysis(0);
    requirement.setHourDesigning(0);
    requirement.setHourCoding(0);
    requirement.setHourTesting(0);
    requirement.setHourProjMgt(0);
    requirement.setProject(project.get());
    requirementRepository.save(requirement);
  }

  @Transactional
  public void updateHours(long project_id, RequirementDto dto) throws ServerException {

    Optional<Project> project = projectRepository.findById(project_id);
    if (!project.isPresent()) {
      logger.error(
          "The project id [{}] does not exist.", project_id);
      ServerException se =
          new ServerException(ErrorCode.FAIL_MEMBER_CREATE_BY_PROJECT_NOT_EXIST);
      throw se;
    }

    if (dto.getHourAnalysis() + dto.getHourDesigning() + dto.getHourCoding() + dto.getHourTesting()
        + dto.getHourProjMgt() != dto.getHourTotal()) {
      logger.error(
          "Entered number is not valid [{}]", dto);
      ServerException se =
          new ServerException(ErrorCode.FAIL_REQUIREMENT_UPDATE_BY_INVALID_INPUTS);
      throw se;
    }

    Optional<Requirement> result = requirementRepository.findById(dto.getId());
    if (!result.isPresent()) {
      logger.error(
          "The requirement id [{}] does not exist.", dto.getId());
      ServerException se =
          new ServerException(ErrorCode.FAIL_REQUIREMENT_UPDATE_BY_ID_NOT_EXIST);
      throw se;
    }

    Requirement requirement = result.get();
    if (requirement.getProject() != project.get()) {
      logger.error(
          "The requirement [{}] is not in the project.", dto);
      ServerException se =
          new ServerException(ErrorCode.FAIL_REQUIREMENT_UPDATE_BY_INVALID_INPUTS);
      throw se;
    }

    requirement.setHourTotal(requirement.getHourTotal() + dto.getHourTotal());
    requirement.setHourAnalysis(requirement.getHourAnalysis() + dto.getHourAnalysis());
    requirement.setHourDesigning(requirement.getHourDesigning() + dto.getHourDesigning());
    requirement.setHourCoding(requirement.getHourCoding() + dto.getHourCoding());
    requirement.setHourTesting(requirement.getHourTesting() + dto.getHourTesting());
    requirement.setHourProjMgt(requirement.getHourProjMgt() + dto.getHourProjMgt());

    List<TotalPersonHour> totalPersonHours = totalPersonHourRepository.findByProject(project.get());

    if (totalPersonHours.size() > 1) {
      logger.error(
          "There are duplicated total person hour in a project [{}]", project.get());
      ServerException se =
          new ServerException(ErrorCode.FAIL_TOTAL_PERSON_HOUR_UPDATE_BY_DUPLIATE_ROW);
      throw se;
    } else if (totalPersonHours.isEmpty()) {
      TotalPersonHour totalPersonHour = modelMapper.from(dto);
      totalPersonHour.setProject(project.get());
      totalPersonHourRepository.save(totalPersonHour);
    } else {
      for (TotalPersonHour totalPersonHour : totalPersonHours) {
        totalPersonHour.setTotal(totalPersonHour.getTotal() + dto.getHourTotal());
        totalPersonHour.setAnalysis(totalPersonHour.getAnalysis() + dto.getHourAnalysis());
        totalPersonHour.setDesigning(totalPersonHour.getDesigning() + dto.getHourDesigning());
        totalPersonHour.setCoding(totalPersonHour.getCoding() + dto.getHourCoding());
        totalPersonHour.setTesting(totalPersonHour.getTesting() + dto.getHourTesting());
        totalPersonHour.setProjMgt(totalPersonHour.getProjMgt() + dto.getHourProjMgt());
        totalPersonHourRepository.save(totalPersonHour);
      }
    }
    requirementRepository.save(requirement);
  }

  public TotalPersonHourDto listTotalPersonHour(long project_id)
      throws ServerException {
    Optional<Project> project = projectRepository.findById(project_id);

    if (!project.isPresent()) {
      logger.error(
          "The project id [{}] is not exist.", project_id);
      ServerException se =
          new ServerException(ErrorCode.FAIL_MEMBER_GET_BY_PROJECT_NOT_EXIST);
      throw se;
    }

    List<TotalPersonHour> totalPersonHours = totalPersonHourRepository.findByProject(project.get());
    if (totalPersonHours.size() > 1) {
      logger.error(
          "There are duplicated total person hour in a project [{}]", project.get());
      ServerException se =
          new ServerException(ErrorCode.FAIL_TOTAL_PERSON_HOUR_UPDATE_BY_DUPLIATE_ROW);
      throw se;
    }

    if (!totalPersonHours.isEmpty()) {
      TotalPersonHourDto ret = modelMapper.from(totalPersonHours.get(0));
      return ret;
    }

    return null;
  }

}
