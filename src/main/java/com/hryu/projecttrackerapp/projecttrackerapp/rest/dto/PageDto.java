package com.hryu.projecttrackerapp.projecttrackerapp.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageDto<T> {

  @JsonProperty("offset")
  protected long offset;
  @JsonProperty("size")
  protected long size;
  @JsonProperty("total")
  protected long total;
  @JsonProperty("list")
  protected List<T> list;

  public PageDto(long offset, long size, long total) {
    this.offset = offset;
    this.size = size;
    this.total = total;
  }

}