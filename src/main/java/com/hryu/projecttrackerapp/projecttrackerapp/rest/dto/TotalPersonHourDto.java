package com.hryu.projecttrackerapp.projecttrackerapp.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hryu.projecttrackerapp.projecttrackerapp.type.RequirementType;
import java.util.Date;
import lombok.Data;

@Data
public class TotalPersonHourDto {

  @JsonProperty(value = "id")
  private long id;

  @JsonProperty(value = "hour_total")
  private int total;

  @JsonProperty(value = "hour_analysis")
  private int analysis;

  @JsonProperty(value = "hour_designing")
  private int designing;

  @JsonProperty(value = "hour_coding")
  private int coding;

  @JsonProperty(value = "hour_testing")
  private int testing;

  @JsonProperty(value = "hour_proj_mgt")
  private int projMgt;

}
