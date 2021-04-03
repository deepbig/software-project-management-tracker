package com.hryu.projecttrackerapp.projecttrackerapp.rest.service;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Member;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Project;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Risk;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.ProjectRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.RiskRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.error.ServerException;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.MemberDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.PageDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.RiskDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.mapper.ModelMapper;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.ErrorCode;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RiskService {

  private static final Logger logger = LoggerFactory.getLogger(RiskService.class);

  private final RiskRepository riskRepository;
  private final ProjectRepository projectRepository;
  private final ModelMapper modelMapper;

  @Autowired
  public RiskService(RiskRepository riskRepository, ProjectRepository projectRepository,
      ModelMapper modelMapper) {
    this.riskRepository = riskRepository;
    this.projectRepository = projectRepository;
    this.modelMapper = modelMapper;
  }

  public PageDto<RiskDto> list(long project_id, int offset, int limit)
      throws ServerException {

    Optional<Project> project = projectRepository.findById(project_id);

    if (!project.isPresent()) {
      logger.error(
          "The project id [{}] is not exist.", project_id);
      ServerException se =
          new ServerException(ErrorCode.FAIL_MEMBER_GET_BY_PROJECT_NOT_EXIST);
      throw se;
    }

    PageDto<RiskDto> ret = new PageDto<>();

    List<Risk> risks = riskRepository.findByProject(project.get());

    if (risks.size() > 0) {
      List<RiskDto> listDto = new ArrayList<>();
      for (Risk risk : risks) {
        RiskDto riskDto = modelMapper.from(risk);
        listDto.add(riskDto);
      }
      ret.setList(listDto);
      ret.setOffset(offset);
      ret.setSize(risks.size());
      ret.setTotal(offset + risks.size());
    }

    return ret;
  }

  @Transactional
  public void create(long project_id, RiskDto dto) throws ServerException {

    Optional<Project> project = projectRepository.findById(project_id);
    if (!project.isPresent()) {
      logger.error(
          "The project id [{}] does not exist.", project_id);
      ServerException se =
          new ServerException(ErrorCode.FAIL_MEMBER_CREATE_BY_PROJECT_NOT_EXIST);
      throw se;
    }

//    if (riskRepository.existsByName(dto.getName())) {
//      logger.error(
//          "The risk name [{}] already exist.", dto.getName());
//      ServerException se =
//          new ServerException(ErrorCode.FAIL_RISK_CREATE_BY_NAME_ALREADY_EXIST);
//      throw se;
//    }

    Risk risk = new Risk();
    risk.setName(dto.getName());
    risk.setPriority(dto.getPriority());
    risk.setProject(project.get());
    riskRepository.save(risk);
  }
}
