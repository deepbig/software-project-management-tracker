package com.hryu.projecttrackerapp.projecttrackerapp.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Member;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Requirement;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Risk;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.TotalPersonHour;
import java.sql.Date;
import java.util.List;

public class ProjectDto {

  @JsonProperty(value = "id", required = true)
  private long id;

  @JsonProperty(value = "name", required = true)
  private String name;

  @JsonProperty(value = "description", required = true)
  private String description;

  @JsonProperty(value = "members", required = true)
  private List<Member> members;

  @JsonProperty(value = "risk", required = true)
  private Risk risk;

  @JsonProperty(value = "", required = true)
  private TotalPersonHour totalPersonHour;

  @JsonProperty(value = "id", required = true)
  private Requirement requirement;

  @JsonProperty(value = "id", required = true)
  private Date lastModified;
}
