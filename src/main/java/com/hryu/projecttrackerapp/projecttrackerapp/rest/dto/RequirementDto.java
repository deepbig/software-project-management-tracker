package com.hryu.projecttrackerapp.projecttrackerapp.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hryu.projecttrackerapp.projecttrackerapp.type.RequirementType;
import java.util.Date;
import lombok.Data;

@Data
public class RequirementDto {

  @JsonProperty(value = "id")
  private long id;

  @JsonProperty(value = "title")
  private String title;

  @JsonProperty(value = "description")
  private String description;

  @JsonProperty(value = "requirement_type")
  private RequirementType requirementType;

  @JsonProperty(value = "last_modified")
  private Date lastModified;

  @JsonProperty(value = "hour_total")
  private int hourTotal;

  @JsonProperty(value = "hour_analysis")
  private int hourAnalysis;

  @JsonProperty(value = "hour_designing")
  private int hourDesigning;

  @JsonProperty(value = "hour_coding")
  private int hourCoding;

  @JsonProperty(value = "hour_testing")
  private int hourTesting;

  @JsonProperty(value = "hour_proj_mgt")
  private int hourProjMgt;

}
