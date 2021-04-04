package com.hryu.projecttrackerapp.projecttrackerapp.rest.mapper;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Member;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Project;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.ProjectSummary;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Requirement;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Risk;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.TotalPersonHour;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.TotalPersonHourRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.MemberDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.NewProjectDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.RequirementDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.RiskDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.SummaryProjectDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.TotalPersonHourDto;
import lombok.NonNull;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
public class ModelMapper {

  private static final org.modelmapper.ModelMapper secondaryMapper = new org.modelmapper.ModelMapper();

//  PropertyMap<Project, NewProjectDto> projectMap = new PropertyMap<Project, NewProjectDto>() {
//    @Override
//    protected void configure() {
//      map().set
//
//    }
//  }

//  public SummaryProjectDto from(@NonNull Project src) {
//    return secondaryMapper.map(src, SummaryProjectDto.class);
//  }

  public Project from(@NonNull NewProjectDto src) {
    return secondaryMapper.map(src, Project.class);
  }

  public SummaryProjectDto from(@NonNull Project src) {
    return secondaryMapper.map(src, SummaryProjectDto.class);
  }

  public MemberDto from(@NonNull Member src) {
    return secondaryMapper.map(src, MemberDto.class);
  }

  public Member from(@NonNull MemberDto src) {
    return secondaryMapper.map(src, Member.class);
  }

  public RiskDto from(@NonNull Risk src) {
    return secondaryMapper.map(src, RiskDto.class);
  }

  public Risk from(@NonNull RiskDto src) {
    return secondaryMapper.map(src, Risk.class);
  }

  public RequirementDto from(@NonNull Requirement src) {
    return secondaryMapper.map(src, RequirementDto.class);
  }

//  public Requirement from(@NonNull RequirementDto src) {
//    return secondaryMapper.map(src, Requirement.class);
//  }

  public TotalPersonHour from(@NonNull RequirementDto src) {
    return secondaryMapper.map(src, TotalPersonHour.class);
  }

  public TotalPersonHour from(@NonNull TotalPersonHourDto src) {
    return secondaryMapper.map(src, TotalPersonHour.class);
  }

  public TotalPersonHourDto from(@NonNull TotalPersonHour src) {
    return secondaryMapper.map(src, TotalPersonHourDto.class);
  }

}
