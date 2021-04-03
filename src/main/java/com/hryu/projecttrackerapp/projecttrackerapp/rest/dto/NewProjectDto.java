package com.hryu.projecttrackerapp.projecttrackerapp.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Member;
import java.sql.Date;
import javax.persistence.Column;
import lombok.Data;

@Data
public class NewProjectDto {

  @JsonProperty(value = "name")
  private String name;

  @JsonProperty(value = "description")
  private String description;

  @JsonProperty(value = "username")
  private String username;

}
