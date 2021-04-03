package com.hryu.projecttrackerapp.projecttrackerapp.database.entity;

import com.hryu.projecttrackerapp.projecttrackerapp.type.RequirementType;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "REQUIREMENTS")
@Data
public class Requirement {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "REQUIREMENT_ID")
  private long id;

  @Column(name = "REQUIREMENT_TITLE")
  private String title;

  @Column(name = "REQUIREMENT_DESCRIPTION")
  private String description;

  @Column(name = "REQUIREMENT_TYPE")
  private RequirementType requirementType;

  @Temporal(TemporalType.DATE)
  @Column(name="LAST_MODIFIED")
  private Date lastModified;

  @Column(name = "REQUIREMENTS_HOURS_TOTAL")
  private int hourTotal;

  @Column(name = "REQUIREMENTS_HOURS_ANALYSIS")
  private int hourAnalysis;

  @Column(name = "REQUIREMENTS_HOURS_DESIGNING")
  private int hourDesigning;

  @Column(name = "REQUIREMENTS_HOURS_CODING")
  private int hourCoding;

  @Column(name = "REQUIREMENTS_HOURS_TESTING")
  private int hourTesting;

  @Column(name = "REQUIREMENTS_HOURS_PROJ_MGT")
  private int hourProjMgt;

  @ManyToOne
  @JoinColumn(name="PROJECT_ID")
  private Project project;
}
