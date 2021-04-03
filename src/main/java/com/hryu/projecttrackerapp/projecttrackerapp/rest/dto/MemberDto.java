package com.hryu.projecttrackerapp.projecttrackerapp.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MemberDto {

  @JsonProperty(value = "id")
  private long id;

  @JsonProperty(value = "username")
  private String username;

  @JsonProperty(value = "rolename")
  private String rolename;

}
