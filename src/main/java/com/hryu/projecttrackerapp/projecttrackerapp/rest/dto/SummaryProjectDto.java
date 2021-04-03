package com.hryu.projecttrackerapp.projecttrackerapp.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import lombok.Data;

@Data
public class SummaryProjectDto {
  @JsonProperty(value = "id")
  private Long id;

  @JsonProperty(value = "name")
  private String name;

  @JsonProperty(value = "project_manager") //user name
  private String projectManager;

  @JsonProperty(value = "last_modified")
  private Date lastModified;
}
