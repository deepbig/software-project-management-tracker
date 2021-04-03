package com.hryu.projecttrackerapp.projecttrackerapp.database.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "TOTAL_PERSON_HOURS")
@Data
public class TotalPersonHour {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "TOTAL_PERSON_HOURS_ID")
  private long id;

  @Column(name = "TOTAL_PERSON_HOURS_TOTAL")
  private int total;

  @Column(name = "TOTAL_PERSON_HOURS_ANALYSIS")
  private int analysis;

  @Column(name = "TOTAL_PERSON_HOURS_DESIGNING")
  private int designing;

  @Column(name = "TOTAL_PERSON_HOURS_CODING")
  private int coding;

  @Column(name = "TOTAL_PERSON_HOURS_TESTING")
  private int testing;

  @Column(name = "TOTAL_PERSON_HOURS_PROJ_MGT")
  private int projMgt;

  @OneToOne
  @JoinColumn(name="PROJECT_ID")
  private Project project;

}
