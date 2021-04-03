package com.hryu.projecttrackerapp.projecttrackerapp.database.entity;

import com.hryu.projecttrackerapp.projecttrackerapp.type.PriorityType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "RISKS")
@Data
public class Risk {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "RISK_ID")
  private long id;

  @Column(name = "RISK_NAME")
  private String name;

  @Enumerated(EnumType.STRING)
  @Column(name = "RISK_PRIORITY")
  private PriorityType priority;

  @ManyToOne
  @JoinColumn(name="PROJECT_ID")
  private Project project;
}
