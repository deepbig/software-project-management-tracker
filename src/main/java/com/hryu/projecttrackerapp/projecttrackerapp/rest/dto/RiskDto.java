package com.hryu.projecttrackerapp.projecttrackerapp.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hryu.projecttrackerapp.projecttrackerapp.type.PriorityType;
import lombok.Data;

@Data
public class RiskDto {

  @JsonProperty(value = "id")
  private long id;

  @JsonProperty(value = "name")
  private String name;

  @JsonProperty(value = "priority")
  private PriorityType priority;

}
