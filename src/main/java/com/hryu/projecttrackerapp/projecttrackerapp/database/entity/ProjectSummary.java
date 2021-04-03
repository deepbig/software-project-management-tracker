package com.hryu.projecttrackerapp.projecttrackerapp.database.entity;

import java.util.Date;

public interface ProjectSummary {

  long getId();

  String getName();

  String getProjectManager();

  int getTotalPersonHours();

  Date getLastModified();

}
